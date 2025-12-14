<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { requestScrollTriggerRefresh } from "../../lib/requestScrollTriggerRefresh";
  import { cn } from "../../lib/cn";

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

    teardown();

    const trackWidth = trackEl.scrollWidth;
    const viewportWidth = window.innerWidth;

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
    const offsetPortion = startOffsetPx / totalScrollDistance;

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
  }

  function scheduleRebuild() {
    if (!isBrowser) return;
    window.cancelAnimationFrame(rafId);
    rafId = window.requestAnimationFrame(rebuild);
  }

  onMount(async () => {
    await tick();

    ro = new ResizeObserver(scheduleRebuild);
    ro.observe(sectionEl);
    ro.observe(trackEl);

    scheduleRebuild();
    window.addEventListener("resize", scheduleRebuild, { passive: true });
    window.addEventListener("load", scheduleRebuild, { once: true });
  });

  onDestroy(() => {
    if (!isBrowser) return;

    window.cancelAnimationFrame(rafId);
    window.removeEventListener("resize", scheduleRebuild);
    ro?.disconnect();
    teardown();
  });
</script>

<section
  bind:this={sectionEl}
  class={cn(
    "relative w-full h-screen overflow-hidden flex flex-col",
    sectionClass,
  )}
>
  <slot name="non-scroll-content-above" />

  <!-- Scroll track positioned below title, ve-rtically centered together -->
  <div
    bind:this={trackEl}
    class={cn("w-max will-change-transform", trackClass)}
  >
    <slot name="scroll-content" />
  </div>
  <slot name="non-scroll-content-below" />
</section>
