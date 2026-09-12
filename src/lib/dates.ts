const longDate = new Intl.DateTimeFormat("en-AU", {
  dateStyle: "long",
  timeZone: "UTC",
});

const longDateTime = new Intl.DateTimeFormat("en-AU", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Australia/Canberra",
});

/** Format a date-only value without letting the viewer's timezone move it. */
export function formatCourseDate(value: Date | string): string {
  const date = typeof value === "string" ? new Date(`${value}T00:00:00Z`) : value;
  return longDate.format(date);
}

/** Format a deadline with its course-local time and timezone. */
export function formatCourseDateTime(value: Date | string): string {
  return `${longDateTime.format(typeof value === "string" ? new Date(value) : value)} (Canberra time)`;
}
