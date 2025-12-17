import { ScrollTrigger } from "gsap/ScrollTrigger";

let rafId = 0;

/**
 * Request a debounced ScrollTrigger refresh.
 * Multiple calls within the same frame will coalesce into a single refresh.
 * This prevents jank when many components mount at once.
 */
export function requestScrollTriggerRefresh() {
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

