import type { APIRoute } from "astro";
import { getPublishedCollection } from "astro-course-university/content";
import { courseMeta } from "../course-config";
import { sortByDue, sortByWeekThenDate } from "../lib/course-content";

export const prerender = true;

function escapeIcs(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

function dateOnly(value: Date): string {
  return value.toISOString().slice(0, 10).replaceAll("-", "");
}

function nextDay(value: Date): string {
  const next = new Date(value.getTime());
  next.setUTCDate(next.getUTCDate() + 1);
  return dateOnly(next);
}

function utcDateTime(value: Date): string {
  return value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function event(lines: string[]): string[] {
  return ["BEGIN:VEVENT", ...lines, "END:VEVENT"];
}

export const GET: APIRoute = async () => {
  const [sessions, lectures, assessments] = await Promise.all([
    getPublishedCollection("sessions"),
    getPublishedCollection("lectures"),
    getPublishedCollection("assessments"),
  ]);
  const stamp = utcDateTime(new Date());
  const events = [
    ...sortByWeekThenDate(sessions).flatMap((session) =>
      event([
        `UID:${courseMeta.code}-session-${session.id}@slop.university`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${dateOnly(session.data.date)}`,
        `DTEND;VALUE=DATE:${nextDay(session.data.date)}`,
        `SUMMARY:${escapeIcs(`Week ${session.data.week} session: ${session.data.title}`)}`,
        `DESCRIPTION:${escapeIcs(session.data.description ?? "Course session")}`,
      ]),
    ),
    ...sortByWeekThenDate(lectures).flatMap((lecture) =>
      event([
        `UID:${courseMeta.code}-lecture-${lecture.id}@slop.university`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${dateOnly(lecture.data.date)}`,
        `DTEND;VALUE=DATE:${nextDay(lecture.data.date)}`,
        `SUMMARY:${escapeIcs(`Week ${lecture.data.week} lecture: ${lecture.data.title}`)}`,
        `DESCRIPTION:${escapeIcs(lecture.data.description ?? "Course lecture")}`,
      ]),
    ),
    ...sortByDue(assessments).flatMap((assessment) =>
      event([
        `UID:${courseMeta.code}-assessment-${assessment.id}@slop.university`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${utcDateTime(assessment.data.due)}`,
        `SUMMARY:${escapeIcs(`Due: ${assessment.data.title}`)}`,
        `DESCRIPTION:${escapeIcs(assessment.data.description ?? "Course assessment deadline")}`,
      ]),
    ),
  ];

  return new Response(["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Slop University//Course calendar//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", ...events, "END:VCALENDAR", ""].join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename=${courseMeta.code.toLowerCase()}-schedule.ics`,
    },
  });
};
