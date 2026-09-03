import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  course: {
    code: string;
    startDate: string;
    endDate: string;
  };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const sessions = api.nodes.filter((node) => node.type === "sessions");
const lectures = api.nodes.filter((node) => node.type === "lectures");
const assessments = api.nodes.filter((node) => node.type === "assessments");

describe("assignment 2 spec", () => {
  it("keeps the three digits the repo arrived with in the course code", () => {
    // The repo was provisioned with SLOP1416 — only the level digit is ours
    // to change (course-config.ts), the other three identify this repo.
    expect(api.course.code).toMatch(/^SLOP\d416$/);
  });

  it("runs across all twelve dated teaching weeks", () => {
    for (let week = 1; week <= 12; week++) {
      const inWeek = sessions.filter((node) => node.meta?.week === week);
      expect(inWeek.length, `no session scheduled for week ${week}`).toBeGreaterThan(0);
      for (const node of inWeek) {
        expect(node.meta?.date, `${node.id} has no date`).toBeTruthy();
      }
    }
  });

  it("has at least one lecture with a real, built deck linked from its page", () => {
    const withDeck = lectures.filter(
      (node) => typeof node.meta?.slides === "string" && node.meta.slides.length > 0,
    );
    expect(withDeck.length, "no lecture links a deck via `slides`").toBeGreaterThan(0);
    for (const node of withDeck) {
      const slides = node.meta?.slides as string;
      const deckPage = resolve("dist", slides.replace(/^\//, ""), "index.html");
      expect(existsSync(deckPage), `${node.id} links ${slides}, which the build never emitted`).toBe(
        true,
      );
    }
  });

  it("weights every assessment so they add up to 100%", () => {
    const total = assessments.reduce((sum, node) => sum + (Number(node.meta?.weight) || 0), 0);
    expect(total).toBe(100);
  });
});
