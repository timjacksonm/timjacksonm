#!/usr/bin/env node
// Builds ai/insights.json from local Claude Code data, using ai/config.json
// (gitignored; copy ai/config.example.json to start). Runs on your Mac only:
// the source data never leaves it, and only the allowlisted fields below are
// written. Run /insights in Claude Code first so the session data is fresh.
//
//   node ai/export.mjs            # full export, asks Claude for the prose
//   node ai/export.mjs --no-llm   # refresh numbers, keep the existing prose

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(join(here, "config.json"), "utf8"));
const outPath = join(here, "insights.json");
const usageDir = join(homedir(), ".claude", "usage-data");
const noLlm = process.argv.includes("--no-llm");

const DAY = 86_400_000;
const localDate = (d) => {
    const x = new Date(d);
    return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
};
const readJsonDir = (dir) =>
    existsSync(dir)
        ? readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(readFileSync(join(dir, f), "utf8")))
        : [];
const sh = (cmd, args, opts = {}) => {
    const r = spawnSync(cmd, args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, ...opts });
    if (r.status !== 0) throw new Error(`${cmd} ${args.join(" ")} failed: ${r.stderr || r.error}`);
    return r.stdout;
};

// ---------- freshness ----------
const reports = existsSync(usageDir) ? readdirSync(usageDir).filter((f) => /^report.*\.html$/.test(f)) : [];
const newestReport = Math.max(0, ...reports.map((f) => statSync(join(usageDir, f)).mtimeMs));
if (!newestReport) {
    console.error("No /insights data found in ~/.claude/usage-data. Run /insights in Claude Code first.");
    process.exit(1);
}
const reportAgeDays = (Date.now() - newestReport) / DAY;
if (reportAgeDays > config.staleAfterDays) {
    console.warn(`⚠ /insights data is ${Math.floor(reportAgeDays)} days old. Run /insights in Claude Code for fresh numbers.\n`);
}

// ---------- per-day ledger ----------
// Claude Code deletes old transcripts (cleanupPeriodDays), so each run only
// sees recent sessions. Days the local data still fully covers are rebuilt;
// older days are carried over from the previous insights.json, so the totals
// keep growing across refreshes instead of sliding with the retention window.
const previous = existsSync(outPath) ? JSON.parse(readFileSync(outPath, "utf8")) : null;
const rawMeta = readJsonDir(join(usageDir, "session-meta"));
// The oldest surviving day may be partly cleaned up, so it only fills a gap.
const coverageStart = localDate(Math.min(...rawMeta.map((m) => Date.parse(m.start_time))));
const excluded = (p) => config.excludePathPrefixes.some((pre) => p.startsWith(pre));
const meta = rawMeta.filter((m) => !excluded(m.project_path));
const facetById = new Map(readJsonDir(join(usageDir, "facets")).map((f) => [f.session_id, f]));

const projectFor = (path) => config.projects[path] ?? null;
const isHidden = (path) => !projectFor(path) || projectFor(path).hidden;

const SESSION_TYPES = {
    multi_task: "Multi-step builds",
    iterative_refinement: "Iterative refinement",
    single_task: "Focused tasks",
    exploration: "Exploration",
    quick_question: "Quick questions",
};
const STRENGTHS = {
    multi_file_changes: "Multi-file changes",
    proactive_help: "Proactive fixes",
    good_debugging: "Debugging",
    good_explanations: "Explaining systems",
    correct_code_edits: "Precise edits",
    fast_accurate_search: "Codebase search",
};
const AGENT_TOOLS = ["Agent", "Task", "SendMessage"];
const toolGroup = (k) =>
    k === "Bash" ? "shell"
        : k.startsWith("mcp__claude-in-chrome__") ? "browser"
            : ["Edit", "Write", "MultiEdit", "NotebookEdit"].includes(k) ? "edits"
                : ["Read", "Grep", "Glob", "WebFetch", "WebSearch"].includes(k) ? "read"
                    : AGENT_TOOLS.includes(k) ? "agents"
                        : k === "AskUserQuestion" ? "questions"
                            : null;

const bump = (o, k, n = 1) => { o[k] = (o[k] || 0) + n; };
const fresh = {};
const dayOf = (d) =>
    (fresh[d] ??= {
        sessions: 0, minutes: 0, prompts: 0, active: 0, linesAdded: 0, agentSessions: 0, analyzed: 0, achieved: 0,
        hours: Array(24).fill(0), tools: {}, types: {}, strengths: {}, languages: {}, projects: {},
    });
for (const m of meta) {
    const d = dayOf(localDate(m.start_time));
    const tc = m.tool_counts || {};
    d.sessions++;
    d.minutes += m.duration_minutes || 0;
    d.prompts += m.user_message_count || 0;
    d.linesAdded += m.lines_added || 0;
    if (m.uses_task_agent === true || AGENT_TOOLS.some((t) => tc[t] > 0)) d.agentSessions++;
    for (const h of m.message_hours || []) d.hours[h]++;
    for (const [k, v] of Object.entries(tc)) if (toolGroup(k)) bump(d.tools, toolGroup(k), v);
    for (const [k, v] of Object.entries(m.languages || {})) bump(d.languages, k, v);
    if (!isHidden(m.project_path)) bump(d.projects, projectFor(m.project_path).label);
    // Heatmap activity lands on the day each prompt was sent, not the session's start.
    for (const t of m.user_message_timestamps || []) dayOf(localDate(t)).active++;
    const f = facetById.get(m.session_id);
    if (f) {
        d.analyzed++;
        if (["fully_achieved", "mostly_achieved"].includes(f.outcome)) d.achieved++;
        if (SESSION_TYPES[f.session_type]) bump(d.types, f.session_type);
        if (STRENGTHS[f.primary_success]) bump(d.strengths, f.primary_success);
    }
}

const days = {};
for (const [d, v] of Object.entries(previous?.days || {})) if (d <= coverageStart) days[d] = v;
for (const [d, v] of Object.entries(fresh)) if (d > coverageStart || !days[d]) days[d] = v;
const ledger = Object.entries(days).sort(([a], [b]) => a.localeCompare(b));
const first = ledger[0][0];
const last = localDate(Math.max(...meta.map((m) => Date.parse(m.start_time))));

const sum = (f) => ledger.reduce((a, [, d]) => a + (Number(f(d)) || 0), 0);
const merge = (key) => {
    const out = {};
    for (const [, d] of ledger) for (const [k, v] of Object.entries(d[key] || {})) bump(out, k, v);
    return out;
};
const tools = merge("tools");
const types = merge("types");
const strengths = merge("strengths");
const sessionsByLabel = merge("projects");
const analyzed = sum((d) => d.analyzed);

// ---------- git + GitHub ----------
// Both keep their own history, so these cover the whole ledger range.
const sinceIso = new Date(`${first}T00:00:00`).toISOString();
const recentIso = new Date(Date.now() - config.recentDays * DAY).toISOString();
const commitHashes = new Set();
const commitsByRepo = {};
for (const [path, p] of Object.entries(config.projects)) {
    if (!existsSync(join(path, ".git"))) continue;
    const args = ["-C", path, "log", "--all", `--since=${sinceIso}`, "--format=%H"];
    for (const e of config.authorEmails) args.push(`--author=${e}`);
    const hashes = sh("git", args).split("\n").filter(Boolean);
    hashes.forEach((h) => commitHashes.add(h));
    commitsByRepo[path] = hashes.length;
}

let prsMerged = null;
try {
    const prs = JSON.parse(
        sh("gh", [
            "search", "prs", "--author", config.githubUser, "--merged",
            "--merged-at", `>=${first}`, "--json", "number", "--limit", "1000",
        ]),
    );
    prsMerged = prs.length;
} catch (e) {
    console.warn("⚠ Could not count merged PRs via gh (is it logged in?). Leaving it out.");
}

// Public repos only: their commit subjects are already public, so they are
// safe to show. Private repos contribute counts, never text.
const publicRepos = new Set();
try {
    const repos = JSON.parse(sh("gh", ["repo", "list", config.githubUser, "--limit", "500", "--json", "name,visibility"]));
    for (const r of repos) if (r.visibility === "PUBLIC") publicRepos.add(r.name);
} catch { /* no gh: treat everything as private */ }

// ---------- aggregates ----------
const hours = Array(24).fill(0);
for (const [, d] of ledger) d.hours.forEach((c, h) => (hours[h] += c));
const heatmap = [];
for (let t = new Date(`${first}T12:00:00`).getTime(); localDate(t) <= last; t += DAY) {
    heatmap.push({ date: localDate(t), count: days[localDate(t)]?.active || 0 });
}

const tally = (counts, labels) =>
    Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([k, count]) => ({ label: labels[k], count }));

const metrics = {
    sessions: { value: sum((d) => d.sessions), label: "sessions" },
    hours: { value: Math.round(sum((d) => d.minutes) / 60), label: "hours paired with Claude" },
    commits: { value: commitHashes.size, label: "commits" },
    ...(prsMerged !== null && { prs: { value: prsMerged, label: "pull requests merged" } }),
    prompts: { value: sum((d) => d.prompts), label: "prompts written" },
    shell: { value: tools.shell || 0, label: "shell commands run by agents" },
    browser: { value: tools.browser || 0, label: "browser actions automated" },
    edits: { value: tools.edits || 0, label: "file edits" },
    linesAdded: { value: sum((d) => d.linesAdded), label: "lines added" },
    agentSessions: { value: sum((d) => d.agentSessions), label: "sessions coordinating multiple agents" },
    goalsMet: {
        value: analyzed ? Math.round((sum((d) => d.achieved) / analyzed) * 100) : 0,
        suffix: "%",
        label: "of session goals fully or mostly met",
    },
    questionsAsked: { value: tools.questions || 0, label: "decisions Claude handed back to me" },
};

const toolMix = [
    { label: "Shell", count: tools.shell || 0 },
    { label: "Browser", count: tools.browser || 0 },
    { label: "Edits", count: tools.edits || 0 },
    { label: "Reading & search", count: tools.read || 0 },
    { label: "Agents", count: tools.agents || 0 },
].filter((t) => t.count > 0);

const lastActive = {};
for (const [date, d] of ledger) for (const label of Object.keys(d.projects || {})) lastActive[label] = date;
// Repos that share a label (an app's API and mobile client, say) show as one
// project; the first one's blurb is used.
const byLabel = new Map();
for (const [path, p] of Object.entries(config.projects)) {
    if (p.hidden) continue;
    const entry = byLabel.get(p.label) ?? { label: p.label, blurb: p.blurb, commits: 0, recent: [] };
    entry.commits += commitsByRepo[path] || 0;
    if (publicRepos.has(p.repo) && existsSync(join(path, ".git"))) {
        entry.recent.push(
            ...sh("git", ["-C", path, "log", "-5", "--no-merges", "--format=%s", `--since=${recentIso}`])
                .split("\n").filter(Boolean),
        );
    }
    byLabel.set(p.label, entry);
}
const projects = [...byLabel.values()]
    .map((e) => ({
        label: e.label,
        blurb: e.blurb,
        sessions: sessionsByLabel[e.label] || 0,
        commits: e.commits,
        lastActive: lastActive[e.label] || null,
        recent: e.recent.slice(0, 5),
    }))
    .filter((p) => p.sessions || p.commits)


// ---------- prose from Claude ----------
const denyRes = config.denyPatterns.map((p) => new RegExp(p));
const violations = (text) => [
    ...config.denylist.filter((w) => text.toLowerCase().includes(w.toLowerCase())),
    ...denyRes.filter((re) => re.test(text)).map((re) => re.source),
];

function askClaude(feedback) {
    const metaById = new Map(meta.map((m) => [m.session_id, m]));
    const summaries = [...facetById.values()]
        .filter((f) => metaById.has(f.session_id) && !isHidden(metaById.get(f.session_id).project_path))
        .map((f) => `- ${f.brief_summary}`)
        .filter((s) => !violations(s).length);
    const metricList = Object.entries(metrics)
        .map(([k, m]) => `${k}: ${m.value}${m.suffix || ""} ${m.label}`)
        .join("\n");
    const prompt = `You are writing a short public section for a software engineer's portfolio site titled
"How I build with AI". Audience: hiring managers and engineers. Voice: first person, plain, confident,
specific, never boastful or salesy. Base everything on the evidence below.

Measured metrics since ${first}:
${metricList}

Session mix: ${JSON.stringify(tally(types, SESSION_TYPES))}
Where the AI helped most: ${JSON.stringify(tally(strengths, STRENGTHS))}
Public projects: ${projects.map((p) => `${p.label} (${p.blurb})`).join("; ")}

Session summaries (private context, do not quote or name anything from them directly):
${summaries.join("\n")}

Return ONLY a JSON object, no code fences, no tool use:
{
  "persona": "1-2 sentences, max 40 words, describing how I work with AI agents",
  "principles": [
    { "title": "max 5 words", "body": "1-2 sentences, max 35 words", "metric": "<one metric key from the list above>" }
  ]
}
Exactly 4 principles, each with a different metric key that genuinely backs it up.
Themes to consider if the evidence supports them: orchestrating parallel agents, verifying against real data
before trusting a result, keeping irreversible actions human-approved, high standards on quality and style.

Hard rules: no digits anywhere (numbers are displayed separately from the metric key). No company names,
repo names, ticket IDs, file paths, people, or clients. Do not mention job searching, applications,
cover letters or resumes. Do not criticise any AI model or tool.${feedback ? `\n\nYour previous answer was rejected: ${feedback}. Fix that.` : ""}`;

    const raw = JSON.parse(sh("claude", ["-p", "--output-format", "json"], { input: prompt })).result;
    const text = raw.replace(/^```(?:json)?\s*|\s*```$/g, "").trim();
    const out = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));

    const problems = [];
    if (typeof out.persona !== "string") problems.push("persona missing");
    if (!Array.isArray(out.principles) || out.principles.length !== 4) problems.push("need exactly 4 principles");
    const keys = new Set();
    for (const p of out.principles || []) {
        if (!metrics[p.metric]) problems.push(`unknown metric key "${p.metric}"`);
        if (keys.has(p.metric)) problems.push(`metric "${p.metric}" used twice`);
        keys.add(p.metric);
    }
    const prose = JSON.stringify(out);
    if (/\d/.test(prose.replace(/"metric":"[^"]*"/g, ""))) problems.push("contains digits");
    problems.push(...violations(prose).map((v) => `contains forbidden term ${v}`));
    return { out, problems };
}

let prose;
if (noLlm) {
    if (!previous) throw new Error("--no-llm needs an existing ai/insights.json to reuse prose from.");
    prose = { persona: previous.persona, principles: previous.principles };
} else {
    console.log("Asking Claude to write the persona and principles…");
    let { out, problems } = askClaude();
    if (problems.length) {
        console.warn(`Retrying: ${problems.join("; ")}`);
        ({ out, problems } = askClaude(problems.join("; ")));
    }
    if (problems.length) throw new Error(`Claude's text failed checks twice: ${problems.join("; ")}`);
    prose = { persona: out.persona.trim(), principles: out.principles.map(({ title, body, metric }) => ({ title, body, metric })) };
}

// ---------- write (allowlisted shape only) ----------
const insights = {
    generatedAt: new Date().toISOString(),
    window: { start: first, end: last, days: heatmap.length },
    persona: prose.persona,
    principles: prose.principles,
    headline: ["sessions", "hours", "commits", metrics.prs ? "prs" : "linesAdded"],
    metrics,
    heatmap,
    hours,
    sessionMix: tally(types, SESSION_TYPES),
    strengths: tally(strengths, STRENGTHS),
    analyzedSessions: analyzed,
    toolMix,
    languages: Object.entries(merge("languages")).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([name]) => name),
    projects,
    days: "@@DAYS@@",
};

// One line per day keeps the ledger reviewable in `git diff`.
const dayLines = ledger.map(([d, v]) => `    ${JSON.stringify(d)}: ${JSON.stringify(v)}`).join(",\n");
const final = JSON.stringify(insights, null, 2).replace('"@@DAYS@@"', `{\n${dayLines}\n  }`) + "\n";
const leaks = violations(final);
if (leaks.length) throw new Error(`Refusing to write: output contains ${leaks.join(", ")}`);
writeFileSync(outPath, final);

const m = insights.metrics;
console.log(`\nWrote ai/insights.json (${insights.window.start} → ${insights.window.end})`);
console.log(`  ${m.sessions.value} sessions · ${m.hours.value} h · ${m.commits.value} commits${m.prs ? ` · ${m.prs.value} PRs` : ""}`);
console.log(`  persona: ${insights.persona}`);
console.log("\nReview with `git diff ai/insights.json`, then commit and push to publish.");
