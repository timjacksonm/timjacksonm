#!/usr/bin/env node
// Renders ai/insights.json into the /how-i-use-ai/ page, the "Currently
// building" teaser on the home page, and the README cards in dist/. Runs in the GitHub Action, or locally:
//
//   node ai/render.mjs

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "ai", "insights.json"), "utf8"));

const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const num = (n) => Number(n).toLocaleString("en-US");
const metric = (key) => {
    const m = data.metrics[key];
    return { value: `${num(m.value)}${m.suffix || ""}`, label: m.label };
};
const day = (iso, opts) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", ...opts });
const range = `${day(data.window.start, { month: "short", day: "numeric" })} – ${day(data.window.end, { month: "short", day: "numeric", year: "numeric" })}`;
const max = (xs) => Math.max(1, ...xs);
const hourLabel = (h) => `${h % 12 || 12}${h < 12 ? "am" : "pm"}`;

// ---------- page section ----------

const stats = data.headline
    .map((k) => {
        const m = metric(k);
        return `<div class="ai-stat"><dt class="label">${esc(m.label)}</dt><dd>${m.value}</dd></div>`;
    })
    .join("\n                        ");

// The ledger only grows, so past ~3 months one bar per day gets too thin to
// read on a phone; switch to weekly bars from then on.
const activeDays = data.heatmap.filter((d) => d.count > 0).length;
const weekly = data.heatmap.length > 90;
const unit = weekly ? "week" : "day";
const buckets = weekly
    ? Array.from({ length: Math.ceil(data.heatmap.length / 7) }, (_, i) => {
        const wk = data.heatmap.slice(i * 7, i * 7 + 7);
        return { date: wk[0].date, count: wk.reduce((a, d) => a + d.count, 0) };
    })
    : data.heatmap;
const dailyMax = max(buckets.map((d) => d.count));
const daily = buckets
    .map((d) => {
        const tip = `${weekly ? "Week of " : ""}${day(d.date, { month: "short", day: "numeric" })}: ${num(d.count)} prompts`;
        return `<span class="ai-bars__bar" style="--v:${(d.count / dailyMax).toFixed(3)}" title="${tip}"></span>`;
    })
    .join("");

const hourMax = max(data.hours);
const peak = data.hours.indexOf(hourMax);
const hourly = data.hours
    .map((c, h) => `<span class="ai-bars__bar" style="--v:${(c / hourMax).toFixed(3)}" title="${hourLabel(h)}: ${num(c)} messages"></span>`)
    .join("");

const principles = data.principles
    .map((p) => {
        const m = metric(p.metric);
        return `<li class="ai-principle">
                            <p class="ai-principle__stat"><strong>${m.value}</strong> <span class="label">${esc(m.label)}</span></p>
                            <h4 class="ai-principle__title">${esc(p.title)}</h4>
                            <p>${esc(p.body)}</p>
                        </li>`;
    })
    .join("\n                        ");

const mixTotal = data.sessionMix.reduce((a, s) => a + s.count, 0);
const shades = [1, 0.7, 0.48, 0.3, 0.18];
const mixBar = data.sessionMix
    .map((s, i) => `<span class="ai-mix__seg" style="--w:${((s.count / mixTotal) * 100).toFixed(2)}%;--s:${shades[i] ?? 0.12}" title="${esc(s.label)}: ${s.count}"></span>`)
    .join("");
const mixLegend = data.sessionMix
    .map((s, i) => `<li><span class="ai-mix__swatch" style="--s:${shades[i] ?? 0.12}"></span>${esc(s.label)} <span class="ai-muted">${Math.round((s.count / mixTotal) * 100)}%</span></li>`)
    .join("");
const strengthMax = max(data.strengths.map((s) => s.count));
const strengths = data.strengths
    .slice(0, 4)
    .map((s) => `<li><span>${esc(s.label)}</span><span class="ai-meter" style="--v:${(s.count / strengthMax).toFixed(3)}"></span></li>`)
    .join("");

const projectList = (h) => data.projects
    .map((p) => {
        const meta = [
            p.sessions && `${num(p.sessions)} sessions`,
            p.commits && `${num(p.commits)} commits`,
            p.lastActive && `active ${day(p.lastActive, { month: "short", day: "numeric" })}`,
        ].filter(Boolean).join(" · ");
        const recent = p.recent.length
            ? `<ul class="ai-recent">${p.recent.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>`
            : "";
        return `<li class="ai-project">
                            <h${h} class="ai-project__title">${esc(p.label)} <span class="project__meta">${meta}</span></h${h}>
                            <p>${esc(p.blurb)}</p>${recent}
                        </li>`;
    })
    .join("\n                        ");

const since = day(data.window.start, { month: "long", year: "numeric" });
const hero = `<section class="hero">
                <p class="hero__back">
                    <a class="link-out" href="/">
                        <svg class="icon icon--back" viewBox="0 0 24 24" width="1em" height="1em" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            aria-hidden="true" focusable="false">
                            <path d="M19 12H5M11 6l-6 6 6 6" />
                        </svg>
                        Home
                    </a>
                </p>
                <h1>How I Build with AI</h1>
                <p class="label role">Claude Code · ${range}</p>
                <p class="lede">${esc(data.persona)}</p>
            </section>`;

const page = `${hero}

            <section class="band ai" aria-labelledby="ai">
                <h2 class="label eyebrow" id="ai">Since ${since}</h2>
                <div class="band__body">
                    <dl class="ai-stats">
                        ${stats}
                    </dl>

                    <div class="ai-block">
                        <h3 class="label ai-block__title">Rhythm</h3>
                        <div class="ai-rhythm">
                            <figure class="ai-chart">
                                <div class="ai-bars" role="img" aria-label="Prompts per ${unit}: active on ${activeDays} of ${data.heatmap.length} days, busiest ${unit} ${num(dailyMax)} prompts">${daily}</div>
                                <figcaption class="ai-chart__axis"><span>${day(data.window.start, { month: "short", day: "numeric" })}</span><span>Prompts per ${unit}</span><span>${day(data.window.end, { month: "short", day: "numeric" })}</span></figcaption>
                            </figure>
                            <figure class="ai-chart">
                                <div class="ai-bars" role="img" aria-label="Activity by hour of day, peaking at ${hourLabel(peak)}">${hourly}</div>
                                <figcaption class="ai-chart__axis"><span>12am</span><span>Time of day</span><span>11pm</span></figcaption>
                            </figure>
                        </div>
                        <p class="ai-muted ai-rhythm__note">${num(data.metrics.prompts.value)} prompts on the ${activeDays} days I used Claude in this snapshot.</p>
                    </div>

                    <div class="ai-block">
                        <h3 class="label ai-block__title">How I work</h3>
                        <ol class="ai-principles">
                        ${principles}
                        </ol>
                    </div>

                    <div class="ai-block">
                        <h3 class="label ai-block__title">What the sessions look like</h3>
                        <div class="ai-split">
                            <div>
                                <p class="ai-muted ai-split__lead">Kinds of sessions</p>
                                <div class="ai-mix" role="img" aria-label="Session mix: ${data.sessionMix.map((s) => `${s.label} ${Math.round((s.count / mixTotal) * 100)}%`).join(", ")}">${mixBar}</div>
                                <ul class="ai-mix__legend">${mixLegend}</ul>
                            </div>
                            <div>
                                <p class="ai-muted ai-split__lead">Where agents helped most</p>
                                <ul class="ai-strengths">${strengths}</ul>
                            </div>
                        </div>
                    </div>

                    <div class="ai-block">
                        <h3 class="label ai-block__title">Currently building</h3>
                        <ul class="ai-projects">
                        ${projectList(4)}
                        </ul>
                    </div>

                    <p class="ai__footnote">
                        Generated from my own Claude Code session data by a small script
                        that runs locally and publishes only aggregate numbers. Updated
                        ${day(data.generatedAt.slice(0, 10), { month: "long", day: "numeric", year: "numeric" })}.
                    </p>
                </div>
            </section>`;

// The home page's "Currently Building" copy is hand-written in index.html;
// only this link and its numbers are generated.
const teaser = `<p class="ai__more">
                        <a class="link-out" href="/how-i-use-ai/">
                            How I build with AI
                            <svg class="icon icon--next" viewBox="0 0 24 24" width="1em" height="1em" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                aria-hidden="true" focusable="false">
                                <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                        </a>
                        <span class="ai-muted">${num(data.metrics.sessions.value)} sessions and ${num(data.metrics.commits.value)} commits since ${since}.</span>
                    </p>`;

const START = "<!-- ai-insights:start -->";
const END = "<!-- ai-insights:end -->";
function fill(file, content, indent) {
    const path = join(root, file);
    const html = readFileSync(path, "utf8");
    if (!html.includes(START) || !html.includes(END)) throw new Error(`${file} is missing the ${START} / ${END} markers`);
    const before = html.slice(0, html.indexOf(START) + START.length);
    const after = html.slice(html.indexOf(END));
    writeFileSync(path, `${before}\n${indent}${content}\n${indent}${after}`);
}
fill("index.html", teaser, " ".repeat(20));
fill("how-i-use-ai/index.html", page, " ".repeat(12));

// ---------- README cards ----------

const palettes = {
    light: { bg: "#f6f8f7", text: "#161a18", muted: "#565d59", rule: "#dfe3e0", accent: "#0f6157" },
    dark: { bg: "#101413", text: "#e8ebe9", muted: "#9aa39f", rule: "#282e2c", accent: "#5fd3bd" },
};

function wrap(text, width) {
    const lines = [""];
    for (const word of text.split(/\s+/)) {
        const cur = lines[lines.length - 1];
        if (cur && (cur + " " + word).length > width) lines.push(word);
        else lines[lines.length - 1] = cur ? `${cur} ${word}` : word;
    }
    return lines;
}

function card(c) {
    const W = 495;
    const pad = 22;
    const sans = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
    const mono = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    const persona = wrap(data.persona, 72);
    const personaY = 58;
    const statsY = personaY + persona.length * 18 + 22;
    const colW = (W - pad * 2) / data.headline.length;
    const barsTop = statsY + 34;
    const barsH = 34;
    const barGap = 2;
    const barW = (W - pad * 2 - barGap * (buckets.length - 1)) / buckets.length;
    const H = barsTop + barsH + 34;

    const statSvg = data.headline
        .map((k, i) => {
            const m = metric(k);
            const x = pad + i * colW;
            const short = { sessions: "SESSIONS", hours: "HOURS", commits: "COMMITS", prs: "PRS MERGED", linesAdded: "LINES ADDED" }[k] ?? k.toUpperCase();
            return `<text x="${x}" y="${statsY}" font-family="${sans}" font-size="24" font-weight="800" fill="${c.text}">${m.value}</text>
  <text x="${x}" y="${statsY + 16}" font-family="${mono}" font-size="9.5" letter-spacing="1.2" fill="${c.muted}">${short}</text>`;
        })
        .join("\n  ");

    const bars = buckets
        .map((d, i) => {
            const v = d.count / dailyMax;
            const h = Math.max(2, v * barsH);
            const x = pad + i * (barW + barGap);
            return `<rect x="${x.toFixed(1)}" y="${(barsTop + barsH - h).toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" rx="1.5" fill="${c.accent}" fill-opacity="${d.count ? (0.35 + 0.65 * v).toFixed(2) : 0.15}"/>`;
        })
        .join("\n  ");

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d">
  <title id="t">How I build with AI</title>
  <desc id="d">${esc(data.persona)}</desc>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="8" fill="${c.bg}" stroke="${c.rule}"/>
  <text x="${pad}" y="32" font-family="${mono}" font-size="11" font-weight="600" letter-spacing="1.8" fill="${c.accent}">HOW I BUILD WITH AI</text>
  <text x="${W - pad}" y="32" text-anchor="end" font-family="${mono}" font-size="10" letter-spacing="0.6" fill="${c.muted}">Claude Code · ${esc(range)}</text>
  ${persona.map((l, i) => `<text x="${pad}" y="${personaY + i * 18}" font-family="${sans}" font-size="13" fill="${c.text}">${esc(l)}</text>`).join("\n  ")}
  ${statSvg}
  ${bars}
  <text x="${pad}" y="${H - 14}" font-family="${mono}" font-size="9.5" fill="${c.muted}">Prompts per ${unit} · since ${esc(day(data.window.start, { month: "short", year: "numeric" }))}</text>
  <text x="${W - pad}" y="${H - 14}" text-anchor="end" font-family="${mono}" font-size="9.5" fill="${c.muted}">timjacksonm.com</text>
</svg>
`;
}

mkdirSync(join(root, "dist"), { recursive: true });
writeFileSync(join(root, "dist", "ai-card.svg"), card(palettes.light));
writeFileSync(join(root, "dist", "ai-card-dark.svg"), card(palettes.dark));
console.log("Rendered how-i-use-ai/, the home page teaser and dist/ai-card{,-dark}.svg");
