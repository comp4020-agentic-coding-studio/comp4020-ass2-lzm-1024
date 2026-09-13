# Process overview

## What I built

I built **SLOP1416: Visual Storytelling for Short-Form Media**, a twelve-week Slop University course for students who want to turn ordinary observations into short, purposeful videos. The central curriculum decision was to make production choices inseparable from responsibility: framing, light, sound, editing, captions, consent and attribution are treated as decisions about what a viewer can understand and who a video affects. The site gives a prospective student a course home, weekly modules and lectures, an assessment pathway, production guidance, policies, people pages, downloadable briefs and a deck for every week.

## How I got here

I started by deciding that a useful course site should behave like a working student portal, not a brochure. I asked for a Canvas-like structure, then kept the course information in recognisable places: a persistent course menu, a concise home-page overview, a chronological modules page, separate lecture pages and an assessment schedule. The first substantial implementation is recorded in [`09cae2a`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lzm-1024/commit/09cae2a). It established the portal shell, replaced the starter navigation, and added a dated session for every teaching week rather than leaving the site as a Week 1 sample.

My first content direction was broad, so I used the semester sequence to give it a clearer learning arc: notice and frame a change; control camera, light and sound; plan a shoot; assemble and revise a cut; then make the work accessible and present it to an audience. I asked the agent to fill the initially empty course pages, but accepted the result only after checking that each week advanced the same production problem rather than repeating generic “watch, make, reflect” text:

> “My course website is still empty right now — I didn’t know what to write before, but now I have a direction, so please help me flesh it out completely.”

The resulting revision, including the course record, assessment criteria, policies, first deck and the first two detailed modules, is captured in [`c93470c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lzm-1024/commit/c93470c). I deliberately kept assessment to two substantial pieces worth 40% and 60%, rather than inventing many small tasks. The first portfolio checks separate craft decisions before the final 2–3 minute visual story asks students to combine them. Both briefs require captions, production records and consent or media attribution, so the ethical commitments on the site are assessed rather than merely advertised.

The most consequential revision came from rejecting shallow lecture material. I asked for the later weeks to contain operational knowledge that a student could use while shooting or editing, not one-line summaries:

> “I need a hardcore, in-depth PPT — one students can actually learn real knowledge from, not one that just talks in generalities.”

[`c7ae6cb`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lzm-1024/commit/c7ae6cb) adds the remaining advanced weekly materials, their rendered slide assets, downloadable assignment briefs and the dashboard/course-navigation work. I reviewed the weeks as a sequence: Week 6 translates a logline into a storyboard and shot list, Week 8 tests continuity, Week 9 connects captions and export choices to audience access, and Weeks 10–12 make feedback, revision, backup and presentation part of the final submission rather than an afterthought.

I encoded the non-negotiable course contracts in the harness and tests. `CLAUDE.md` requires semantic structure, shared components, real browser inspection at desktop and phone widths, accessible media and deliberate verification. `spec/assignment-2.test.ts` protects the allocated course code, all twelve dated weeks, generated lecture decks and assessment weights totalling 100%. I intentionally did not attempt to automate curriculum quality or the usefulness of a deck: those require reading the sequence, opening the material and judging whether a real student could act on it. Instead, I used the module progression, assessment briefs and external readings as visible evidence of those decisions.
