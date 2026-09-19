// Minimal iCalendar (RFC 5545) reader for Airbnb's calendar export. Dependency-free.
// Only date ranges are kept; summaries and descriptions (which can hold guest
// details) are discarded on purpose.

export type DateRange = { start: string; end: string }; // [start, end) as YYYY-MM-DD

const toISO = (v: string) => `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`;

export function parseIcsRanges(ics: string): DateRange[] {
  // Unfold continuation lines (a line starting with space/tab continues the previous one).
  const lines = ics.replace(/\r?\n[ \t]/g, "").split(/\r?\n/);
  const ranges: DateRange[] = [];
  let cur: Partial<DateRange> | null = null;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") cur = {};
    else if (line === "END:VEVENT") {
      if (cur?.start && cur.end && cur.end > cur.start) ranges.push(cur as DateRange);
      cur = null;
    } else if (cur) {
      const m = line.match(/^(DTSTART|DTEND)[^:]*:(\d{8})/);
      if (m) cur[m[1] === "DTSTART" ? "start" : "end"] = toISO(m[2]);
    }
  }
  return ranges.sort((a, b) => a.start.localeCompare(b.start));
}

// Every booked night (the checkout day is not a booked night).
export function bookedNights(ranges: DateRange[]): Set<string> {
  const nights = new Set<string>();
  for (const r of ranges) {
    const d = new Date(`${r.start}T00:00:00Z`);
    const end = new Date(`${r.end}T00:00:00Z`);
    while (d < end) {
      nights.add(d.toISOString().slice(0, 10));
      d.setUTCDate(d.getUTCDate() + 1);
    }
  }
  return nights;
}
