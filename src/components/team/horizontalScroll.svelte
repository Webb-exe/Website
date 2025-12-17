<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import gsap from "gsap";
  import { cn } from "../../lib/cn";
  import { isNonComputer } from "../../lib/isMobile";

  /** Progress from parent timeline (0-1) - directly controls horizontal scroll amount */
  export let progress: number = 0;
  /** "content" = scroll distance matches overflow, "full" = scroll until end of page */
  export let mode: "full" | "content" = "content";
  /** Additional classes for the section element */
  export let sectionClass: string = "";
  /** Additional classes for the track element */
  export let trackClass: string = "";

  const isBrowser = typeof window !== "undefined";
  let mobile = false;
  
  // Initialize mobile detection immediately
  if (isBrowser) {
    mobile = isNonComputer();
  }

  let sectionEl: HTMLElement;
  let trackEl: HTMLElement;

  let maxTranslate = 0;
  let ro: ResizeObserver | null = null;

  // Calculate max translate based on track width
  function calculateMaxTranslate() {
    if (!trackEl || mobile) {
      maxTranslate = 0;
      return;
    }

    const trackWidth = trackEl.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    if (trackWidth === 0) {
      maxTranslate = 0;
      return;
    }

    // "content" mode: scroll until right edge of content hits right edge of viewport
    // "full" mode: scroll until right edge of content hits LEFT edge of viewport (fully scrolled off)
    maxTranslate = mode === "full" ? trackWidth : trackWidth - viewportWidth;
  }

  // Update horizontal scroll position based on progress
  $: if (trackEl && !mobile && maxTranslate > 0) {
    // Progress is already calculated by parent (0-1), directly use it
    const scrollProgress = Math.min(1, Math.max(0, progress));
    gsap.set(trackEl, { x: -maxTranslate * scrollProgress });
  }

  function setupMobile() {
    if (!sectionEl || !trackEl) return;
    
    // Enable native horizontal scrolling on mobile
    gsap.set(trackEl, { x: 0 });
    sectionEl.style.overflowX = "auto";
    sectionEl.style.overflowY = "hidden";
    trackEl.style.display = "flex";
    trackEl.style.flexDirection = "row";
    trackEl.style.width = "max-content";
  }

  function scheduleRecalculate() {
    if (!isBrowser) return;
    // Use requestAnimationFrame for smooth recalculation
    requestAnimationFrame(() => {
      calculateMaxTranslate();
    });
  }

  onMount(async () => {
    if (!isBrowser) return;
    
    await tick();
    
    // Ensure elements are bound
    if (!sectionEl || !trackEl) {
      await new Promise(resolve => setTimeout(resolve, 100));
      await tick();
    }
    
    if (!sectionEl || !trackEl) {
      console.warn('HorizontalScroll: Elements not found');
      return;
    }
    
    // Detect mobile on mount
    mobile = isNonComputer();
    
    if (mobile) {
      setupMobile();
      return;
    }

    // Wait for layout to stabilize
    await new Promise(resolve => setTimeout(resolve, 200));
    
    calculateMaxTranslate();

    ro = new ResizeObserver(() => {
      // Re-check mobile status on resize
      const wasMobile = mobile;
      mobile = isNonComputer();
      if (wasMobile !== mobile) {
        if (mobile) {
          setupMobile();
        } else {
          calculateMaxTranslate();
        }
      } else if (!mobile) {
        scheduleRecalculate();
      }
    });
    ro.observe(sectionEl);
    ro.observe(trackEl);
    
    const handleResize = () => {
      const wasMobile = mobile;
      mobile = isNonComputer();
      if (wasMobile !== mobile) {
        if (mobile) {
          setupMobile();
        } else {
          scheduleRecalculate();
        }
      } else if (!mobile) {
        scheduleRecalculate();
      }
    };
    
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("load", scheduleRecalculate, { once: true });
    
    // Store handler for cleanup
    (window as any).__horizontalScrollResizeHandler = handleResize;
  });

  onDestroy(() => {
    if (!isBrowser) return;

    const handler = (window as any).__horizontalScrollResizeHandler;
    if (handler) {
      window.removeEventListener("resize", handler);
      delete (window as any).__horizontalScrollResizeHandler;
    }
    ro?.disconnect();
    if (trackEl) gsap.set(trackEl, { x: 0 });
  });

  // Expose section element and maxTranslate for parent component
  export function getSectionElement(): HTMLElement | null {
    return sectionEl || null;
  }

  export function getTrackElement(): HTMLElement | null {
    return trackEl || null;
  }

  export function getMaxTranslate(): number {
    return maxTranslate;
  }
</script>

<section
  bind:this={sectionEl}
  class={cn(
    "relative w-full",
    mobile ? "min-h-screen" : "h-screen",
    mobile ? "overflow-x-auto overflow-y-visible" : "overflow-hidden",
    "flex flex-col",
    sectionClass,
  )}
>
  <slot name="non-scroll-content-above" />

  <!-- Scroll track positioned below title, ve-rtically centered together -->
  <div
    bind:this={trackEl}
    class={cn(
      mobile ? "flex flex-row gap-6 px-4 pb-8" : "w-max",
      trackClass
    )}
  >
    <slot name="scroll-content" />
  </div>
  <slot name="non-scroll-content-below" />
</section>
