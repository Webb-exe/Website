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
    { name: "Platinum Sponsor", imageKey: "placeholder.png", url: "https://example.com" },
  ],
  gold: [
    { name: "Gold Sponsor 1", imageKey: "placeholder.png", url: "https://example.com" },
    { name: "Gold Sponsor 2", imageKey: "placeholder.png", url: "https://example.com" },
  ],
  silver: [
    { name: "Silver Sponsor 1", imageKey: "placeholder.png", url: "https://example.com" },
    { name: "Silver Sponsor 2", imageKey: "placeholder.png", url: "https://example.com" },
    { name: "Silver Sponsor 3", imageKey: "placeholder.png", url: "https://example.com" },
  ],
  bronze: [
    { name: "Bronze Sponsor 1", imageKey: "placeholder.png", url: "https://example.com" },
    { name: "Bronze Sponsor 2", imageKey: "placeholder.png", url: "https://example.com" },
    { name: "Bronze Sponsor 3", imageKey: "placeholder.png", url: "https://example.com" },
    { name: "Bronze Sponsor 4", imageKey: "placeholder.png", url: "https://example.com" },
  ],
};
