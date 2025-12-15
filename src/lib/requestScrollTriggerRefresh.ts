import { ScrollTrigger } from "gsap/ScrollTrigger";

let rafId = 0;
let timeoutId: ReturnType<typeof setTimeout> | null = null;

/**
 * Request a debounced ScrollTrigger refresh.
 * Multiple calls within the same frame will coalesce into a single refresh.
 * This prevents jank when many components mount at once.
 * Also includes a small delay to ensure DOM is ready, especially for Firefox.
 */
export function requestScrollTriggerRefresh() {
  if (typeof window === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }
  
  // Cancel any pending refresh
  cancelAnimationFrame(rafId);
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  
  // Use a small delay to ensure DOM is ready (important for Firefox)
  timeoutId = setTimeout(() => {
    rafId = requestAnimationFrame(() => {
      try {
        ScrollTrigger.refresh();
      } catch (error) {
        console.warn('ScrollTrigger refresh failed:', error);
      }
      timeoutId = null;
    });
  }, 50);
}

