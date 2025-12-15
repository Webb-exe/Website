import { ScrollTrigger } from "gsap/ScrollTrigger";

let rafId = 0;
let timeoutId: ReturnType<typeof setTimeout> | null = null;

/**
 * Clean up ScrollTrigger instances with invalid trigger elements.
 * This prevents errors when refresh() tries to access null elements.
 */
function cleanupInvalidScrollTriggers() {
  if (typeof ScrollTrigger === "undefined" || !ScrollTrigger.getAll) {
    return;
  }

  try {
    const allTriggers = ScrollTrigger.getAll();
    let cleanedCount = 0;

    for (const trigger of allTriggers) {
      try {
        // Check if trigger element exists
        const triggerElement = trigger.trigger;
        if (!triggerElement) {
          // Trigger element is null, kill this instance
          trigger.kill();
          cleanedCount++;
          continue;
        }

        // Check if element is still connected to the DOM
        // This is the most reliable way to check if an element is valid
        if (!triggerElement.isConnected) {
          // Element is detached from DOM, kill this instance
          trigger.kill();
          cleanedCount++;
          continue;
        }

        // Additional safety check: verify getBoundingClientRect exists
        // (though isConnected should catch most cases)
        if (typeof triggerElement.getBoundingClientRect !== "function") {
          trigger.kill();
          cleanedCount++;
          continue;
        }
      } catch (error) {
        // If we can't access the trigger or any property, kill it
        try {
          trigger.kill();
          cleanedCount++;
        } catch {
          // Ignore errors when killing
        }
      }
    }

    if (cleanedCount > 0) {
      console.debug(`Cleaned up ${cleanedCount} invalid ScrollTrigger instance(s)`);
    }
  } catch (error) {
    console.warn("Error during ScrollTrigger cleanup:", error);
  }
}

/**
 * Request a debounced ScrollTrigger refresh.
 * Multiple calls within the same frame will coalesce into a single refresh.
 * This prevents jank when many components mount at once.
 * Also includes a small delay to ensure DOM is ready, especially for Firefox.
 * Automatically cleans up invalid ScrollTrigger instances before refreshing.
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
        // Clean up any invalid ScrollTrigger instances first
        cleanupInvalidScrollTriggers();
        
        // Now safe to refresh
        ScrollTrigger.refresh();
      } catch (error) {
        console.warn('ScrollTrigger refresh failed:', error);
        // Try to clean up again in case refresh revealed more invalid instances
        try {
          cleanupInvalidScrollTriggers();
        } catch {
          // Ignore cleanup errors
        }
      }
      timeoutId = null;
    });
  }, 50);
}

