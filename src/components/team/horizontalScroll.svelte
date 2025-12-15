<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { requestScrollTriggerRefresh } from "../../lib/requestScrollTriggerRefresh";
  import { cn } from "../../lib/cn";
  import { isComputer } from "../../lib/isMobile";

  gsap.registerPlugin(ScrollTrigger);

  export let startOffset: string = "0%";
  export let scrub: number | boolean = 1.5;
  /** "content" = scroll distance matches overflow, "full" = scroll until end of page */
  export let mode: "full" | "content" = "content";
  /** Additional classes for the section element */
  export let sectionClass: string = "";
  /** Additional classes for the track element */
  export let trackClass: string = "";

  export let isFinished: () => void = () => {};

  const isBrowser = typeof window !== "undefined";
  let mobile = false;
  
  // Initialize mobile detection immediately
  if (isBrowser) {
    mobile = isComputer();
  }

  let sectionEl: HTMLElement;
  let trackEl: HTMLElement;

  let st: ScrollTrigger | null = null;
  let ro: ResizeObserver | null = null;
  let rafId = 0;

  /** Parse startOffset string to pixels */
  function parseOffsetToPixels(offset: string): number {
    const value = parseFloat(offset);
    if (isNaN(value)) return 0;
    if (offset.endsWith("%")) {
      return (value / 100) * window.innerHeight;
    }
    // Assume pixels (with or without 'px' suffix)
    return value;
  }

  function teardown() {
    st?.kill();
    st = null;
    if (trackEl) gsap.set(trackEl, { x: 0 });
  }

  function rebuild() {
    if (!sectionEl || !trackEl) return;
    
    // Ensure ScrollTrigger is available
    if (typeof ScrollTrigger === 'undefined') {
      console.warn('HorizontalScroll: ScrollTrigger not available during rebuild');
      return;
    }

    teardown();

    // On mobile, use native horizontal scrolling instead of ScrollTrigger pinning
    if (mobile) {
      // Enable native horizontal scrolling on mobile
      gsap.set(trackEl, { x: 0 });
      sectionEl.style.overflowX = "auto";
      sectionEl.style.overflowY = "hidden";
      // Modern browsers handle smooth scrolling natively, no need for webkitOverflowScrolling
      trackEl.style.display = "flex";
      trackEl.style.flexDirection = "row";
      trackEl.style.width = "max-content";
      isFinished();
      return;
    }

    // Wait for layout to be calculated
    const trackWidth = trackEl.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    // If trackWidth is 0, layout might not be ready yet
    if (trackWidth === 0) {
      // Retry after a short delay
      setTimeout(() => {
        if (sectionEl && trackEl) {
          rebuild();
        }
      }, 50);
      return;
    }

    // "content" mode: scroll until right edge of content hits right edge of viewport
    // "full" mode: scroll until right edge of content hits LEFT edge of viewport (fully scrolled off)
    const maxTranslate =
      mode === "full" ? trackWidth : trackWidth - viewportWidth;

    // Parse the startOffset to pixels - this is the "pinned but not scrolling" phase
    const startOffsetPx = parseOffsetToPixels(startOffset);

    // Even if no horizontal scroll is needed, still pin the content
    const contentScrollDistance = Math.max(1, Math.ceil(maxTranslate));
    // Total scroll = initial pinned phase + horizontal scroll phase
    const totalScrollDistance = startOffsetPx + contentScrollDistance;

    // Calculate the portion of scroll reserved for offset (no horizontal movement)
    const offsetPortion = totalScrollDistance > 0 ? startOffsetPx / totalScrollDistance : 0;

    try {
      st = ScrollTrigger.create({
        trigger: sectionEl,
        start: `top top`,
        end: `+=${totalScrollDistance}`,
        pin: true,
        pinSpacing: true,
        scrub,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // During offset portion: progress 0 to offsetPortion = no horizontal scroll
          // After offset portion: progress offsetPortion to 1 = horizontal scroll 0 to 100%
          if (self.progress <= offsetPortion) {
            // Still in offset phase - keep track at start position
            gsap.set(trackEl, { x: 0 });
          } else if (maxTranslate > 0) {
            // Past offset phase - start horizontal scrolling
            const scrollProgress =
              (self.progress - offsetPortion) / (1 - offsetPortion);
            gsap.set(trackEl, { x: -maxTranslate * scrollProgress });
          }
        },
      });

      requestScrollTriggerRefresh();
      isFinished();
    } catch (error) {
      console.error('HorizontalScroll: Error creating ScrollTrigger', error);
    }
  }

  function scheduleRebuild() {
    if (!isBrowser) return;
    window.cancelAnimationFrame(rafId);
    rafId = window.requestAnimationFrame(() => {
      // Add small delay for Safari to ensure layout is stable
      setTimeout(rebuild, 0);
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
    mobile = isComputer();
    
    // Wait for layout to stabilize - longer delay for Firefox
    await new Promise(resolve => setTimeout(resolve, 200));

    // Ensure ScrollTrigger is available
    if (typeof ScrollTrigger === 'undefined') {
      console.warn('HorizontalScroll: ScrollTrigger not available');
      return;
    }

    ro = new ResizeObserver(() => {
      // Debounce ResizeObserver
      // Re-check mobile status on resize
      const wasMobile = mobile;
      mobile = isComputer();
      if (wasMobile !== mobile) {
        // Mobile status changed, rebuild
        scheduleRebuild();
      } else {
        scheduleRebuild();
      }
    });
    ro.observe(sectionEl);
    ro.observe(trackEl);

    scheduleRebuild();
    
    const handleResize = () => {
      const wasMobile = mobile;
      mobile = isComputer();
      if (wasMobile !== mobile) {
        scheduleRebuild();
      } else {
        scheduleRebuild();
      }
    };
    
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("load", scheduleRebuild, { once: true });
    
    // Store handler for cleanup
    (window as any).__horizontalScrollResizeHandler = handleResize;
  });

  onDestroy(() => {
    if (!isBrowser) return;

    window.cancelAnimationFrame(rafId);
    const handler = (window as any).__horizontalScrollResizeHandler;
    if (handler) {
      window.removeEventListener("resize", handler);
      delete (window as any).__horizontalScrollResizeHandler;
    }
    ro?.disconnect();
    teardown();
  });
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
