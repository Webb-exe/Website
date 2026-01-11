import type { GetImageResult } from "astro";

// Sponsor tier types
export type SponsorTier = "platinum" | "gold" | "silver" | "bronze";

// Raw sponsor data (for data file)
export interface Sponsor {
  name: string;
  imageKey: string; // filename in src/assets/sponsors/
  url?: string; // optional link to sponsor website
}

// Processed sponsor with optimized image (for components)
export interface SponsorComponent extends Omit<Sponsor, "imageKey"> {
  img: GetImageResult | null;
}

export interface SponsorsData {
  platinum: Sponsor[];
  gold: Sponsor[];
  silver: Sponsor[];
  bronze: Sponsor[];
}

export interface SponsorsDataComponent {
  platinum: SponsorComponent[];
  gold: SponsorComponent[];
  silver: SponsorComponent[];
  bronze: SponsorComponent[];
}

// Define your sponsors here
// Add sponsor logos to src/assets/sponsors/ folder
// Each sponsor can have an optional 'url' field to link to their website
export const sponsors: SponsorsData = {
  platinum: [
    { name: "The Webb Schools", imageKey: "webb.png", url: "https://www.webb.org" },
  ],
  gold: [
    { name: "Vision Express Optometry", imageKey: "visionexpress.png", url: "https://visionsource-visionexpress.com/" },
  ],
  silver: [
    { name: "Gobilda", imageKey: "goBILDA.svg", url: "https://www.gobilda.com/" },
    { name: "Fabworks", imageKey: "fabworks.svg", url: "https://www.fabworks.com/" },
  ],
  bronze: [],
};
