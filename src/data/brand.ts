// Brand Kit Data - Editable brand information

export interface BrandColor {
  name: string;
  hex: string;
  rgb?: string;
  usage?: string;
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
    {
      name: "Accent",
      hex: "#9f6079",
      rgb: "rgb(159, 96, 121)",
      usage: "Main brand accent color for primary actions and key elements",
    },
    {
      name: "Accent Light",
      hex: "#FFD5E0",
      rgb: "rgb(255, 213, 224)",
      usage: "Light accent variant for highlights and hover states",
    },
    {
      name: "Accent Medium",
      hex: "#cf8c9d",
      rgb: "rgb(207, 140, 157)",
      usage: "Medium accent variant for secondary elements",
    },
    {
      name: "Dark",
      hex: "#0a0a0a",
      rgb: "rgb(10, 10, 10)",
      usage: "Primary background color",
    },
    {
      name: "Dark Secondary",
      hex: "#111111",
      rgb: "rgb(17, 17, 17)",
      usage: "Secondary background color for sections",
    },
  ],
  fonts: [
    {
      name: "Display Font",
      family: "var(--font-display)",
      weights: ["400", "500", "600", "700"],
      usage: "Headings and display text",
    },
    {
      name: "Body Font",
      family: "var(--font-serif-custom)",
      weights: ["400", "500"],
      usage: "Body text and paragraphs",
    },
  ],
  logos: [
    {
      name: "Stacked lockup",
      description: "WEBB, the mark, and ROBOTICS. The primary logo for posters and profile images.",
      filePath: "/logo-stacked.svg",
    },
    {
      name: "Mark",
      description: "The standalone mark, for favicons and small spaces.",
      filePath: "/logo-mark.svg",
    },
    {
      name: "Wordmark",
      description: "WEBB.EXE set in the display face, for headers and captions.",
      filePath: "/logo-wordmark.svg",
    },
    {
      name: "Wordmark with sparkles",
      description: "The wordmark with the orbit and sparkle flourish, for hero moments.",
      filePath: "/logo-wordmark-sparkle.svg",
    },
  ],
  spacing: {
    unit: "rem",
    scale: [0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8],
  },
  borderRadius: {
    small: "0.25rem",
    medium: "0.5rem",
    large: "1rem",
  },
};

