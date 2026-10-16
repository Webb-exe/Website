// Brand Kit Data - Editable brand information

export interface BrandColor {
  name: string;
  hex: string;
  rgb?: string;
  group: "Core" | "Supporting" | "Accents" | "Neutrals";
}

export interface BrandPalette {
  name: string;
  use: string;
  colors: string[]; // color names from brandKit.colors
}

export interface BrandFont {
  name: string;
  family: string;
  weights: string[];
  usage?: string;
}

export interface BrandLogo {
  name: string;
  description: string;
  filePath: string;
  variants?: string[];
}

export interface BrandGuidelines {
  colors: BrandColor[];
  palettes: BrandPalette[];
  fonts: BrandFont[];
  logos: BrandLogo[];
  spacing?: {
    unit: string;
    scale: number[];
  };
  borderRadius?: {
    small: string;
    medium: string;
    large: string;
  };
}

export const brandKit: BrandGuidelines = {
  colors: [
    { name: "Rose", hex: "#FDB4B9", rgb: "rgb(253, 180, 185)", group: "Core" },
    { name: "Blush", hex: "#FED5E0", rgb: "rgb(254, 213, 224)", group: "Core" },
    { name: "Black", hex: "#000000", rgb: "rgb(0, 0, 0)", group: "Core" },
    { name: "Night", hex: "#0A0A0A", rgb: "rgb(10, 10, 10)", group: "Core" },
    { name: "White", hex: "#FFFFFF", rgb: "rgb(255, 255, 255)", group: "Core" },
    { name: "Midnight", hex: "#140C11", rgb: "rgb(20, 12, 17)", group: "Supporting" },
    { name: "Berry", hex: "#B13F68", rgb: "rgb(177, 63, 104)", group: "Supporting" },
    { name: "Mauve", hex: "#9F6079", rgb: "rgb(159, 96, 121)", group: "Supporting" },
    { name: "Chrome", hex: "#A6A6A6", rgb: "rgb(166, 166, 166)", group: "Supporting" },
    { name: "Lilac", hex: "#C9B8FF", rgb: "rgb(201, 184, 255)", group: "Accents" },
    { name: "Mint", hex: "#A8E8CC", rgb: "rgb(168, 232, 204)", group: "Accents" },
    { name: "Butter", hex: "#FFE2A0", rgb: "rgb(255, 226, 160)", group: "Accents" },
    { name: "Sky", hex: "#A6D4FF", rgb: "rgb(166, 212, 255)", group: "Accents" },
    { name: "Peach", hex: "#FFC2A1", rgb: "rgb(255, 194, 161)", group: "Accents" },
    { name: "Orchid", hex: "#F3B0E8", rgb: "rgb(243, 176, 232)", group: "Accents" },
    { name: "Aqua", hex: "#9EE6E8", rgb: "rgb(158, 230, 232)", group: "Accents" },
    { name: "Ink", hex: "#151012", rgb: "rgb(21, 16, 18)", group: "Neutrals" },
    { name: "Graphite", hex: "#2A2326", rgb: "rgb(42, 35, 38)", group: "Neutrals" },
    { name: "Ash 600", hex: "#6F6468", rgb: "rgb(111, 100, 104)", group: "Neutrals" },
    { name: "Ash 400", hex: "#9C8E93", rgb: "rgb(156, 142, 147)", group: "Neutrals" },
    { name: "Ash 200", hex: "#D9D0D3", rgb: "rgb(217, 208, 211)", group: "Neutrals" },
    { name: "Mist", hex: "#EFEAEC", rgb: "rgb(239, 234, 236)", group: "Neutrals" },
    { name: "Paper", hex: "#F8F5F6", rgb: "rgb(248, 245, 246)", group: "Neutrals" },
  ],
  palettes: [
    { name: "Core", use: "Website, slides, most posts.", colors: ["Black", "Rose", "White", "Blush"] },
    { name: "Night", use: "Robot panels, video, quiet layouts.", colors: ["Night", "Midnight", "Rose", "Chrome"] },
    { name: "Official", use: "Portfolio, letters, reports.", colors: ["White", "Paper", "Ink", "Berry"] },
  ],
  fonts: [
    { name: "Brasika Display", family: "var(--font-accent)", weights: ["400"], usage: "Headlines and statements on the website, social, slides and covers." },
    { name: "Instrument Sans", family: "var(--font-body)", weights: ["400", "500", "600", "700"], usage: "Labels, body text, buttons and forms. In formal documents it also sets the headings." },
    { name: "Caveat", family: "var(--font-hand)", weights: ["500"], usage: "Handwritten notes: photo captions, asides and little cues. Never headlines or body text." },
  ],
  logos: [
    { name: "Primary mark", description: "EXE symbol and team name. Covers, banners, profile photos, sponsor materials.", filePath: "/logo-stacked.svg" },
    { name: "Secondary mark", description: "The EXE symbol on its own. Post corners, favicons, stickers, robot panels.", filePath: "/logo-mark.svg" },
    { name: "Primary wordmark", description: "WEBB.EXE with the star in the X. Most places the team name appears.", filePath: "/logo-wordmark-sparkle.svg" },
    { name: "Secondary wordmark", description: "WEBB.EXE, text only. Footers, small print and formal uses.", filePath: "/logo-wordmark.svg" },
  ],
  spacing: {
    unit: "px",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
  },
  borderRadius: {
    small: "6px",
    medium: "8px",
    large: "8px",
  },
};
