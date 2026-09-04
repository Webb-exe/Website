import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once; every component imports gsap from here.
gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger };
