import type { CollectionEntry } from "astro:content";

type Session = CollectionEntry<"sessions">;
type Lecture = CollectionEntry<"lectures">;
type Assessment = CollectionEntry<"assessments">;
type Person = CollectionEntry<"people">;

/** Sessions and lectures both sort week ascending, then date ascending. */
export function sortByWeekThenDate<T extends Session | Lecture>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    if (a.data.week !== b.data.week) return a.data.week - b.data.week;
    return a.data.date.getTime() - b.data.date.getTime();
  });
}

/** Assessments sort by due date ascending. */
export function sortByDue(entries: Assessment[]): Assessment[] {
  return [...entries].sort((a, b) => a.data.due.getTime() - b.data.due.getTime());
}

export const roleOrder: Record<string, number> = {
  convenor: 0,
  tutor: 1,
  guest: 2,
  other: 3,
};

// Map the role enum (convenor|tutor|guest|other) to display labels rather than
// rendering the raw lowercase value.
export const roleLabels: Record<string, string> = {
  convenor: "Convenor",
  tutor: "Tutor",
  guest: "Guest lecturer",
  other: "",
};

/** People sort by role order (convenor, tutor, guest, other), then by name. */
export function sortPeople(entries: Person[]): Person[] {
  return [...entries].sort((a, b) => {
    const ra = roleOrder[a.data.role ?? "other"] ?? 99;
    const rb = roleOrder[b.data.role ?? "other"] ?? 99;
    if (ra !== rb) return ra - rb;
    return a.data.title.localeCompare(b.data.title);
  });
}

/** Every distinct week number present across sessions/lectures/assessments, ascending. */
export function courseWeeks(
  sessions: Session[],
  lectures: Lecture[],
  assessments: Assessment[],
): number[] {
  const weeks = new Set<number>();
  for (const s of sessions) weeks.add(s.data.week);
  for (const l of lectures) weeks.add(l.data.week);
  for (const a of assessments) weeks.add(a.data.week);
  return [...weeks].sort((a, b) => a - b);
}
