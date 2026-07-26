#!/usr/bin/env python3
"""Rewrite the contributions timeline in index.html from live GitHub data.

Fetches the public contribution calendar, buckets it into weeks, and renders the
markup between the <!-- contributions:start --> / <!-- contributions:end -->
markers. The data is baked into the page so visitors never make a third-party
request and the timeline still renders with JavaScript disabled.

Run by .github/workflows/contributions.yml on a daily schedule.
Usage: python3 scripts/build_contributions.py [username]
"""

import json
import re
import sys
import urllib.request
from collections import defaultdict
from datetime import date, datetime, timedelta
from pathlib import Path

API = "https://github-contributions-api.jogruber.de/v4/{user}?y=all"
WEEKS_PER_YEAR = 53
START = "<!-- contributions:start -->"
END = "<!-- contributions:end -->"


def fetch(user):
    req = urllib.request.Request(
        API.format(user=user), headers={"User-Agent": f"{user}.com build script"}
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.load(resp)


def week_start(d):
    """The Sunday beginning the week containing d, matching GitHub's calendar."""
    return d - timedelta(days=(d.weekday() + 1) % 7)


def bucket(data):
    """-> {year: [(week_start, total), ...]} in chronological order."""
    weeks = defaultdict(lambda: defaultdict(int))
    for day in data["contributions"]:
        d = datetime.strptime(day["date"], "%Y-%m-%d").date()
        weeks[d.year][week_start(d)] += day["count"]
    return {y: sorted(w.items()) for y, w in sorted(weeks.items())}


def thresholds(years):
    """Quartiles of non-zero weekly totals, so the ramp fits the actual data."""
    counts = sorted(c for w in years.values() for _, c in w if c > 0)
    if not counts:
        return [1, 2, 3]
    return [counts[len(counts) * n // 4] for n in (1, 2, 3)]


def level(count, cuts):
    if count == 0:
        return 0
    return 1 + sum(count >= c for c in cuts)


def render(user, years, today):
    cuts = thresholds(years)
    total = sum(c for w in years.values() for _, c in w)
    first = min(years)

    # The first column of a year's calendar can start in the previous December;
    # clamp so the summary doesn't claim a year that isn't shown.
    started = date(first, 1, 1)
    for w, c in years[first]:
        if c:
            started = max(w, started)
            break

    rows = []
    for year, weeks in years.items():
        year_total = sum(c for _, c in weeks)
        cells = []
        for start, count in weeks[:WEEKS_PER_YEAR]:
            if start > today:
                # Don't imply zero activity in weeks that haven't happened yet.
                cells.append('<span class="week week--future" aria-hidden="true"></span>')
                continue
            plural = "contribution" if count == 1 else "contributions"
            cells.append(
                f'<span class="week" data-level="{level(count, cuts)}"'
                f' title="Week of {start:%b %-d, %Y} — {count} {plural}"></span>'
            )
        cells += ['<span class="week week--future" aria-hidden="true"></span>'] * (
            WEEKS_PER_YEAR - len(cells)
        )

        rows.append(
            f'''<li class="year">
    <p class="label year__label">{year}</p>
    <p class="label year__total">{year_total:,}</p>
    <div class="year__weeks" role="img" aria-label="{year}: {year_total:,} contributions">
        {"".join(cells)}
    </div>
</li>'''
        )

    legend = "".join(f'<span class="week" data-level="{n}"></span>' for n in range(5))

    block = f'''{START}
<p class="contrib__summary">
    <strong>{total:,}</strong> contributions on GitHub since {started:%B %Y}.
</p>
<ol class="years">
{indent(chr(10).join(rows), 1)}
</ol>
<p class="label contrib__legend" aria-hidden="true">
    Less {legend} More
</p>
{END}'''
    return block


def indent(text, levels):
    pad = "    " * levels
    return "\n".join(pad + line if line else line for line in text.splitlines())


def main():
    user = sys.argv[1] if len(sys.argv) > 1 else "timjacksonm"
    page = Path(__file__).resolve().parent.parent / "index.html"
    html = page.read_text(encoding="utf-8")

    if START not in html or END not in html:
        sys.exit(f"error: markers {START} / {END} not found in {page}")

    years = bucket(fetch(user))
    if not years:
        sys.exit("error: no contribution data returned; leaving index.html alone")

    # Re-indent the generated block to sit at the markers' existing depth.
    depth = len(re.search(r"([ \t]*)" + re.escape(START), html).group(1)) // 4
    block = indent(render(user, years, date.today()), depth).lstrip()

    updated = re.sub(
        re.escape(START) + ".*?" + re.escape(END),
        lambda _: block,
        html,
        flags=re.S,
    )

    if updated == html:
        print("contributions: no change")
        return
    page.write_text(updated, encoding="utf-8")
    print(f"contributions: updated {len(years)} years")


if __name__ == "__main__":
    main()
