export const webCourse = {
  code: "SLOP1512",
  title: "Web Design and Interactive Publishing",
  session: "Semester 1, 2027",
  convenor: "ZIMU LI",
  description:
    "A foundation course in designing and building accessible, responsive websites. Students move from content structure and visual hierarchy to HTML, CSS, interaction, testing and publication.",
  outcomes: [
    "Structure content with semantic HTML that makes sense without visual styling.",
    "Design clear layouts, type and colour systems for different screen sizes.",
    "Build responsive pages with CSS and test them with keyboard and screen-size checks.",
    "Document design decisions, feedback and sources through a small web project.",
  ],
};

export const webModules = [
  ["Week 1", "The web as a publishing medium", "Inspect how a page communicates before CSS. Build a one-page reading profile with headings, links and images."],
  ["Week 2", "HTML and semantic structure", "Use landmarks, heading hierarchy, lists, figures and meaningful link text to turn content into a readable document."],
  ["Week 3", "Typography and visual hierarchy", "Choose type scale, line length, spacing and contrast to establish what a reader notices first."],
  ["Week 4", "Layout with CSS", "Work with normal flow, flexbox and grid. Compare a narrow reading column with a multi-column information layout."],
  ["Week 5", "Colour, image and identity", "Create a restrained visual system and prepare images with useful alternative text and appropriate crops."],
  ["Week 6", "Responsive design", "Design for a small screen first, then add space and structure for larger screens without hiding essential information."],
  ["Week 7", "Interaction and forms", "Build clear navigation and an accessible form. Test focus order, labels, errors and keyboard access."],
  ["Week 8", "Accessibility review", "Use a practical audit to check headings, contrast, focus visibility, text alternatives and motion settings."],
  ["Week 9", "Content systems and multi-page sites", "Plan information architecture, shared navigation and reusable page patterns for a small site."],
  ["Week 10", "User testing and revision", "Observe a classmate completing a task, record what blocked them, then make and justify two revisions."],
  ["Week 11", "Publication and performance", "Check assets, metadata, source attribution and loading decisions before publishing a preview."],
  ["Week 12", "Portfolio review", "Present the final site, explain the design system and reflect on evidence from testing and revision."],
] as const;

export const webLectures = [
  {
    week: 1,
    title: "The Web as a Publishing Medium",
    slideCount: 36,
    file: "SLOP1512-week-01-web-as-publishing-v2.pptx",
    description:
      "introduces the course, its 12-week learning path, four assessment tasks, and the Week 1 foundations of document structure, semantic HTML, audiences, headings, landmarks, links, images and source records.",
  },
  {
    week: 2,
    title: "HTML and Semantic Structure",
    slideCount: 30,
    file: "SLOP1512-week-02-semantic-html-advanced.pptx",
    description:
      "works through landmarks, heading hierarchy, lists, figures and meaningful link text with real markup examples, showing how a page reads as a document before any CSS is applied.",
  },
  {
    week: 3,
    title: "Typography and Visual Hierarchy",
    slideCount: 28,
    file: "SLOP1512-week-03-typography-and-visual-hierarchy-deep.pptx",
    description:
      "covers letterform anatomy, serif vs sans-serif choice, type scale and line length, WCAG-referenced contrast, and the print-to-screen history from Gutenberg's press through Linotype to web fonts.",
  },
  {
    week: 4,
    title: "Layout with CSS",
    slideCount: 30,
    file: "SLOP1512-week-04-layout-with-css-advanced.pptx",
    description:
      "compares normal flow, flexbox and grid, works through container queries and a reading-column vs multi-column layout, and diagnoses three named layout bugs with DevTools.",
  },
  {
    week: 5,
    title: "Colour, Image and Identity",
    slideCount: 27,
    file: "SLOP1512-week-05-colour-image-and-identity-advanced.pptx",
    description:
      "builds a restrained colour system with the real WCAG luminance/contrast formula worked against brand tokens, then covers colour-blind-safe palettes, responsive images (srcset/picture) and an alt-text decision tree.",
  },
  {
    week: 6,
    title: "Responsive Design",
    slideCount: 29,
    file: "SLOP1512-week-06-responsive-design-advanced.pptx",
    description:
      "works mobile-first through media queries, content-driven breakpoints, fluid layout, flexbox/grid and container queries, clamp() typography, and small-screen navigation without hiding essential content.",
  },
  {
    week: 7,
    title: "Interaction and Forms",
    slideCount: 30,
    file: "SLOP1512-week-07-interaction-and-forms-advanced.pptx",
    description:
      "builds accessible forms and interactive widgets with real ARIA patterns — labels, fieldset/legend, focus order, :focus-visible, error handling, live regions, disclosure and modal focus-trap — plus a keyboard test protocol.",
  },
  {
    week: 8,
    title: "Accessibility Review",
    slideCount: 28,
    file: "SLOP1512-week-08-accessibility-review-advanced.pptx",
    description:
      "works through a practical, WCAG 2.2-referenced audit covering heading structure, colour contrast, focus visibility, text alternatives and motion settings, plus severity triage and a studio audit brief.",
  },
  {
    week: 9,
    title: "Content Systems and Multi-Page Sites",
    slideCount: 30,
    file: "SLOP1512-week-09-content-systems-and-multi-page-sites-advanced.pptx",
    description:
      "plans information architecture for a small multi-page site — navigation systems, breadcrumbs, sitemaps and reusable page templates — so structure holds together as content grows.",
  },
  {
    week: 10,
    title: "User Testing and Revision",
    slideCount: 27,
    file: "SLOP1512-week-10-user-testing-and-revision-advanced.pptx",
    description:
      "runs lightweight usability methods (five-second test, first-click test, think-aloud), an observation template and severity triage, then turns a specific observed moment into a justified revision.",
  },
  {
    week: 11,
    title: "Publication and Performance",
    slideCount: 30,
    file: "SLOP1512-week-11-publication-and-performance-advanced.pptx",
    description:
      "checks assets, image formats and compression, loading strategy, metadata and Open Graph tags, and Core Web Vitals (LCP/INP/CLS) via Lighthouse, against a consolidated pre-publish checklist.",
  },
  {
    week: 12,
    title: "Portfolio Review",
    slideCount: 30,
    file: "SLOP1512-week-12-portfolio-review-advanced.pptx",
    description:
      "presents the final site, explains the design system's decisions, and reflects on the testing and revision evidence gathered across the course.",
  },
] as const;

export const webAssignments = [
  {
    title: "Assignment 1: Structured reading page",
    due: "5:00 pm, Friday 26 March 2027",
    weight: "15%",
    brief: "Design and build a single-page reading experience for a real or imagined article, guide or event. Use semantic HTML, a logical heading hierarchy, meaningful links and images with useful alternative text.",
    submit: "A public or local preview URL, source files, a content outline and a 200-word reflection on structure and audience.",
    criteria: ["Content structure and semantic HTML", "Reading hierarchy and meaningful navigation", "Text alternatives and source record", "Reflection on audience"],
  },
  {
    title: "Assignment 2: Responsive visual system",
    due: "5:00 pm, Friday 9 April 2027",
    weight: "20%",
    brief: "Extend a content page into a responsive visual system. Define type, spacing, colour and image rules, then use CSS layout to make the page work at narrow and wide screen sizes.",
    submit: "A preview URL, source files, two viewport screenshots and a 2-page PDF visual-system sheet with a 250-word design rationale.",
    criteria: ["Typography, layout and visual hierarchy", "Responsive CSS implementation", "Colour and image decisions", "Design-system documentation"],
  },
  {
    title: "Assignment 3: Accessible interaction prototype",
    due: "5:00 pm, Friday 7 May 2027",
    weight: "25%",
    brief: "Build a focused interactive feature for a service, event or publication. It may be a sign-up flow, search interface, booking form or content filter. The interaction must work with keyboard input and clearly communicate labels, errors and outcomes.",
    submit: "A preview URL, source files, an interaction map, a completed keyboard test and a 300-word account of two revisions made after testing.",
    criteria: ["Task flow and interaction clarity", "Accessible forms and keyboard use", "Visual feedback and technical care", "Testing evidence and revision"],
  },
  {
    title: "Assignment 4: Interactive publishing site",
    due: "12:00 pm, Friday 28 May 2027",
    weight: "40%",
    brief: "Create a small multi-page site that helps an audience understand a topic, collection or story. The site must have a clear information architecture, shared navigation, a deliberate visual system and evidence of user testing.",
    submit: "A public or local preview URL, source files, and a 4-5 page process dossier containing an information map, design system, testing evidence, change log and a 500-word critical reflection.",
    criteria: ["Purpose, audience and information architecture", "Visual system and responsive implementation", "Accessibility, interaction and technical care", "Testing, revision and process documentation"],
  },
] as const;
