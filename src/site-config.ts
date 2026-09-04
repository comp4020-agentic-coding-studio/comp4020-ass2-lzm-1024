import { defineSiteConfig } from "astro-theme-university/types";
import { slopBranding } from "astro-theme-slop";

// The underlying collection and URL remain `sessions`; these labels are the
// language students see. Change them to Studios, Tutorials, Expeditions, etc.
export const sessionLabels = {
  singular: "Session",
  plural: "Sessions",
} as const;

export const graphCollections = ["sessions", "assessments", "lectures", "people"];

export const courseApiCollections = [
  ...graphCollections.map((key) => ({ key })),
  { key: "policies", dir: "pages/policies" },
];

// The course sidebar (CourseSidebar.astro) is the site's real navigation, so
// the theme's own top-bar links stay empty to avoid a second, redundant menu.
export const siteConfig = defineSiteConfig({
  ...slopBranding,
  name: "Slop University",
  links: [],
  licence: "CC-BY-NC-SA-4.0",
});
