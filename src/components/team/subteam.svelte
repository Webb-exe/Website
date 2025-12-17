<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import HorizontalScroll from "./horizontalScroll.svelte";
  import MemberProfile from "./memberProfile.svelte";
  import { isNonComputer } from "../../lib/isMobile";
  import { requestScrollTriggerRefresh } from "../../lib/requestScrollTriggerRefresh";
  import type { TeamSubteamComponent } from "../../data/team";

  gsap.registerPlugin(ScrollTrigger);

  export let team: TeamSubteamComponent;

  // ===========================================
  // SCROLL DISTANCE MULTIPLIERS (in viewport heights)
  // These control how much scroll distance each phase takes
  // ===========================================

  /** Multiplier for intro phase scroll distance (in vh). Controls title fade in, decorations appear */
  export let introScrollMultiplier: number = 1.0;

  /** Multiplier for fade phase scroll distance (in vh). Controls decorations fading out */
  export let fadeScrollMultiplier: number = 0.6;

  /** Multiplier for title move phase scroll distance (in vh). Controls title moving to corner */
  export let titleMoveScrollMultiplier: number = 0.8;

  /** Multiplier for exit phase scroll distance (in vh). Controls content fade out and title exit */
  export let exitScrollMultiplier: number = 1.2;

  /** Multiplier for hold phase before horizontal scroll (in vh). Pause after intro completes */
  export let holdBeforeScrollMultiplier: number = 0.4;

  /** Multiplier for horizontal scroll speed. Higher = faster scroll relative to vertical scroll */
  export let horizontalScrollSpeedMultiplier: number = 1.0;

  /** Pixels remaining in horizontal scroll when exit animation starts. 0 = exit after full scroll */
  export let exitStartOffsetPx: number = 0;

  // Generate unique ID for this instance
  const instanceId = Math.random().toString(36).slice(2, 9);

  let wrapperEl: HTMLElement;
  let blackOverlayEl: HTMLElement;
  let titleWrapperEl: HTMLElement;
  let titleEl: HTMLElement;
  let accentLineEl: HTMLElement;
  let decorDotEl: HTMLElement;
  let subtitleEl: HTMLElement;
  let scrollContentEl: HTMLElement;
  let horizontalScrollComponent: HorizontalScroll;

  let ctx: gsap.Context;
  let mobile = false;
  let horizontalScrollProgress = 0;

  // Initialize mobile detection immediately
  if (typeof window !== "undefined") {
    mobile = isNonComputer();
  }

  /**
   * Calculate scroll distances and timeline positions dynamically
   *
   * The key insight: intro, fade, titleMove, and exit phases have FIXED scroll distances
   * (controlled by multipliers), while horizontal scroll distance varies based on content.
   * This means longer member lists = longer horizontal scroll = smaller percentage for fixed phases.
   *
   * @param horizontalScrollDistance - Scroll distance needed for horizontal scroll (pixels)
   * @param viewportHeight - Current viewport height (pixels)
   * @returns Object with scroll distances and timeline positions
   */
  function calculateDynamicTimeline(
    horizontalScrollDistance: number,
    viewportHeight: number
  ) {
    // Calculate fixed phase scroll distances (in pixels)
    const introScrollDistance = introScrollMultiplier * viewportHeight;
    const fadeScrollDistance = fadeScrollMultiplier * viewportHeight;
    const titleMoveScrollDistance = titleMoveScrollMultiplier * viewportHeight;
    const holdBeforeScrollDistance =
      holdBeforeScrollMultiplier * viewportHeight;
    const exitScrollDistance = exitScrollMultiplier * viewportHeight;

    // Adjust horizontal scroll distance by speed multiplier
    // Higher multiplier = less scroll needed = faster horizontal movement
    const adjustedHorizontalDistance =
      horizontalScrollDistance / horizontalScrollSpeedMultiplier;

    // Total scroll distance = all fixed phases + hold + horizontal scroll
    // Timeline phases: intro -> fade -> titleMove -> hold -> horizontalScroll -> exit
    const totalScrollDistance =
      introScrollDistance +
      fadeScrollDistance +
      titleMoveScrollDistance +
      holdBeforeScrollDistance +
      adjustedHorizontalDistance +
      exitScrollDistance;

    // Calculate where each phase starts/ends as a percentage of total scroll
    // These are cumulative percentages
    const introEnd = introScrollDistance / totalScrollDistance;
    const fadeEnd =
      (introScrollDistance + fadeScrollDistance) / totalScrollDistance;
    const titleMoveEnd =
      (introScrollDistance + fadeScrollDistance + titleMoveScrollDistance) /
      totalScrollDistance;
    const holdEnd =
      (introScrollDistance +
        fadeScrollDistance +
        titleMoveScrollDistance +
        holdBeforeScrollDistance) /
      totalScrollDistance;
    const horizontalScrollEnd =
      (introScrollDistance +
        fadeScrollDistance +
        titleMoveScrollDistance +
        holdBeforeScrollDistance +
        adjustedHorizontalDistance) /
      totalScrollDistance;
    // exitEnd is implicitly 1.0

    // Content appears during title move phase
    const contentAppears =
      (introScrollDistance +
        fadeScrollDistance +
        titleMoveScrollDistance * 0.5) /
      totalScrollDistance;

    // Horizontal scroll starts after hold phase ends
    const horizontalScrollStart = holdEnd;

    // Calculate exit start position based on exitStartOffsetPx
    // This allows exit animation to start before horizontal scroll fully completes
    // exitStartOffsetPx is in actual scroll pixels, need to convert to timeline percentage
    const exitOffsetInTimeline =
      Math.min(exitStartOffsetPx, adjustedHorizontalDistance) /
      totalScrollDistance;
    const exitStart = horizontalScrollEnd - exitOffsetInTimeline;

    return {
      totalScrollDistance,
      scrollDistances: {
        intro: introScrollDistance,
        fade: fadeScrollDistance,
        titleMove: titleMoveScrollDistance,
        holdBeforeScroll: holdBeforeScrollDistance,
        horizontalScroll: adjustedHorizontalDistance,
        exit: exitScrollDistance,
      },
      timelinePositions: {
        introEnd,
        fadeEnd,
        titleMoveEnd,
        holdEnd,
        contentAppears,
        horizontalScrollStart,
        horizontalScrollEnd,
        exitStart, // Exit starts exitStartOffsetPx before horizontal scroll ends
      },
    };
  }

  /**
   * Helper function to calculate horizontal scroll progress from ScrollTrigger progress
   * @param scrollTriggerProgress - ScrollTrigger progress (0-1)
   * @param horizontalScrollStart - Timeline position when horizontal scroll starts (0-1)
   * @param horizontalScrollEnd - Timeline position when horizontal scroll ends (0-1)
   * @returns Horizontal scroll progress (0-1)
   */
  function calculateHorizontalScrollProgress(
    scrollTriggerProgress: number,
    horizontalScrollStart: number,
    horizontalScrollEnd: number
  ): number {
    // Before horizontal scroll starts
    if (scrollTriggerProgress < horizontalScrollStart) {
      return 0;
    }
    // After horizontal scroll ends
    if (scrollTriggerProgress >= horizontalScrollEnd) {
      return 1;
    }

    // Map progress to horizontal scroll progress
    const scrollRange = horizontalScrollEnd - horizontalScrollStart;
    const scrollProgress =
      (scrollTriggerProgress - horizontalScrollStart) / scrollRange;
    return Math.min(1, Math.max(0, scrollProgress));
  }

  onMount(async () => {
    if (typeof window === "undefined") return;

    await tick();

    // Ensure all elements are bound
    if (!wrapperEl) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      await tick();
    }

    if (!wrapperEl) {
      console.warn("Subteam: wrapperEl not found");
      return;
    }

    // Re-check mobile status on mount
    mobile = isNonComputer();

    // Wait for layout - longer delay for Firefox stability
    await new Promise((resolve) => setTimeout(resolve, 250));

    // Ensure ScrollTrigger is available
    if (typeof ScrollTrigger === "undefined") {
      console.warn("Subteam: ScrollTrigger not available");
      return;
    }

    ctx = gsap.context(() => {
      // On mobile, use simpler animations
      if (mobile) {
        // On mobile, immediately hide overlay and show content
        if (blackOverlayEl) {
          gsap.set(blackOverlayEl, {
            opacity: 0,
            display: "none",
            visibility: "hidden",
          });
        }
        // Ensure all content is visible on mobile from the start
        if (titleEl)
          gsap.set(titleEl, { opacity: 1, scale: 1, clearProps: "all" });
        if (decorDotEl)
          gsap.set(decorDotEl, { opacity: 1, scale: 1, clearProps: "all" });
        if (accentLineEl)
          gsap.set(accentLineEl, { opacity: 1, scaleX: 1, clearProps: "all" });
        if (subtitleEl)
          gsap.set(subtitleEl, { opacity: 1, y: 0, clearProps: "all" });
        if (scrollContentEl)
          gsap.set(scrollContentEl, { opacity: 1, clearProps: "all" });

        // Optional: Simple scroll-triggered enhancement (subtle fade-in)
        if (titleEl && scrollContentEl) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapperEl,
              start: "top 90%",
              end: "top 70%",
              scrub: false,
              toggleActions: "play none none none",
              once: true,
            },
          });

          // Start from slightly faded for a subtle entrance effect
          gsap.set([titleEl, scrollContentEl], { opacity: 0.9 });
          tl.to(
            [titleEl, scrollContentEl],
            { opacity: 1, duration: 0.6, ease: "power1.out" },
            0
          );
        }
        return;
      }

      // Desktop animations (original complex animations)
      // Set initial states - removed blur for Safari compatibility
      if (blackOverlayEl) gsap.set(blackOverlayEl, { opacity: 1 });
      if (titleEl) gsap.set(titleEl, { opacity: 0, scale: 1.15 });
      if (decorDotEl) gsap.set(decorDotEl, { opacity: 0, scale: 0 });
      if (accentLineEl) gsap.set(accentLineEl, { opacity: 0, scaleX: 0 });
      if (subtitleEl) gsap.set(subtitleEl, { opacity: 0, y: 10 });
      if (scrollContentEl) gsap.set(scrollContentEl, { opacity: 0 });

      // Wait a bit more for layout to stabilize before creating ScrollTrigger
      // Also wait for HorizontalScroll component to be ready (it has 200ms delay)
      setTimeout(() => {
        if (!ctx || !wrapperEl) return; // Component might have been destroyed

        // Get section element from HorizontalScroll component
        const sectionEl = horizontalScrollComponent?.getSectionElement();
        const trackEl = horizontalScrollComponent?.getTrackElement();

        if (!sectionEl || !trackEl) {
          console.warn("Subteam: HorizontalScroll elements not found");
          return;
        }

        // Calculate horizontal scroll distance based on content width
        const trackWidth = trackEl.scrollWidth;
        const horizontalScrollDistance = Math.max(1, Math.ceil(trackWidth)); // "full" mode

        // Get viewport height for calculating fixed phase distances
        const viewportHeight = window.innerHeight;

        // Calculate dynamic timeline based on content and multipliers
        const { totalScrollDistance, timelinePositions } =
          calculateDynamicTimeline(horizontalScrollDistance, viewportHeight);

        // Extract timeline positions
        const {
          introEnd,
          fadeEnd,
          titleMoveEnd,
          contentAppears,
          horizontalScrollStart,
          horizontalScrollEnd,
          exitStart,
        } = timelinePositions;

        // Simple scroll-based animation using the wrapper as trigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperEl,
            start: "top top",
            end: `+=${totalScrollDistance}`,
            scrub: 1,
            pin: sectionEl,
            pinSpacing: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            id: `subteam-${instanceId}`,
            onUpdate: (self) => {
              // Use helper function to calculate horizontal scroll progress
              horizontalScrollProgress = calculateHorizontalScrollProgress(
                self.progress,
                horizontalScrollStart,
                horizontalScrollEnd
              );
            },
          },
        });

        // Calculate animation durations based on phase lengths
        // These durations are relative to the timeline (0-1)
        const introDuration = introEnd;
        const fadeDuration = fadeEnd - introEnd;
        const titleMoveDuration = titleMoveEnd - fadeEnd;
        const exitDuration = 1 - exitStart;

        // Intro phase: 0 -> introEnd
        // Black overlay fades out, title fades in with scale, decorations appear
        if (blackOverlayEl) {
          tl.to(
            blackOverlayEl,
            {
              opacity: 0,
              duration: introDuration * 0.4,
            },
            0
          );
        }
        if (titleEl) {
          tl.to(
            titleEl,
            {
              opacity: 1,
              scale: 1,
              duration: introDuration * 0.6,
            },
            introDuration * 0.1
          );
        }
        if (decorDotEl) {
          tl.to(
            decorDotEl,
            {
              opacity: 1,
              scale: 1,
              duration: introDuration * 0.3,
            },
            introDuration * 0.4
          );
        }
        if (accentLineEl) {
          tl.to(
            accentLineEl,
            {
              opacity: 1,
              scaleX: 1,
              duration: introDuration * 0.3,
            },
            introDuration * 0.5
          );
        }
        if (subtitleEl) {
          tl.to(
            subtitleEl,
            {
              opacity: 1,
              y: 0,
              duration: introDuration * 0.3,
            },
            introDuration * 0.6
          );
        }

        // Fade phase: introEnd -> fadeEnd
        // Decorations fade out
        if (decorDotEl) {
          tl.to(
            decorDotEl,
            {
              opacity: 0,
              duration: fadeDuration * 0.5,
            },
            introEnd
          );
        }
        if (accentLineEl) {
          tl.to(
            accentLineEl,
            {
              opacity: 0,
              scaleX: 0,
              duration: fadeDuration * 0.5,
            },
            introEnd + fadeDuration * 0.1
          );
        }
        if (subtitleEl) {
          tl.to(
            subtitleEl,
            {
              opacity: 0,
              y: -20,
              duration: fadeDuration * 0.5,
            },
            introEnd + fadeDuration * 0.2
          );
        }

        // Title move phase: fadeEnd -> titleMoveEnd
        // Title shrinks and moves to corner, content appears
        if (titleEl && titleWrapperEl) {
          tl.to(
            titleEl,
            {
              scale: 0.5,
              x: () => {
                const rect = titleWrapperEl.getBoundingClientRect();
                const titleRect = titleEl.getBoundingClientRect();
                return -rect.width / 2 + (titleRect.width * 0.5) / 2 + 48;
              },
              y: () => {
                const titleRect = titleEl.getBoundingClientRect();
                const scaledHeight = titleRect.height * 0.5;
                return -window.innerHeight / 2 + scaledHeight / 2 + 80;
              },
              duration: titleMoveDuration,
            },
            fadeEnd
          );
        }
        if (scrollContentEl) {
          tl.to(
            scrollContentEl,
            {
              opacity: 1,
              duration: titleMoveDuration * 0.6,
            },
            contentAppears
          );
        }

        // Hold phase: titleMoveEnd -> exitStart
        // Horizontal scroll happens here via onUpdate (no animations needed)

        // Exit phase: exitStart -> 1.0
        // Content fades out, title returns to center, then fades out, black overlay returns
        if (scrollContentEl) {
          tl.to(
            scrollContentEl,
            {
              opacity: 0,
              duration: exitDuration * 0.25,
            },
            exitStart
          );
        }
        if (titleEl) {
          tl.to(
            titleEl,
            {
              scale: 1,
              x: 0,
              y: 0,
              duration: exitDuration * 0.4,
            },
            exitStart
          );
        }
        if (titleEl) {
          tl.to(
            titleEl,
            {
              opacity: 0,
              scale: 1.15,
              duration: exitDuration * 0.4,
            },
            exitStart + exitDuration * 0.4
          );
        }
        if (blackOverlayEl) {
          tl.to(
            blackOverlayEl,
            {
              opacity: 1,
              duration: exitDuration * 0.4,
            },
            exitStart + exitDuration * 0.6
          );
        }

        // Refresh after ScrollTrigger is set up
        requestScrollTriggerRefresh();
      }, 300); // Increased delay to ensure HorizontalScroll is ready (it has 200ms delay)
    }, wrapperEl);

    // Refresh after all components mount
    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<div bind:this={wrapperEl} class="relative bg-dark" data-subteam={instanceId}>
  <!-- Black overlay - always rendered but hidden on mobile -->
  <div
    bind:this={blackOverlayEl}
    class="absolute inset-0 bg-dark z-50 pointer-events-none mobile-overlay"
    class:hidden={mobile}
    style="opacity: {mobile ? 0 : 1}; display: {mobile
      ? 'none'
      : 'block'}; visibility: {mobile ? 'hidden' : 'visible'};"
  ></div>

  <HorizontalScroll
    bind:this={horizontalScrollComponent}
    mode="full"
    progress={mobile ? 0 : horizontalScrollProgress}
    sectionClass={mobile ? "justify-start" : "justify-center"}
    trackClass={mobile ? "min-h-[55vh] py-8" : "h-[55vh]"}
  >
    <div
      slot="non-scroll-content-above"
      class="w-full h-screen absolute inset-0 pointer-events-none z-20"
    >
      <div
        bind:this={titleWrapperEl}
        class="w-full h-full flex flex-col items-center justify-center"
      >
        <div
          bind:this={decorDotEl}
          class="w-3 h-3 rounded-full bg-accent mb-6 shadow-[0_0_20px_rgba(159,96,121,0.6)]"
          style="opacity: {mobile ? 1 : 0}; transform: {mobile
            ? 'scale(1)'
            : 'scale(0)'};"
        ></div>

        <h2
          bind:this={titleEl}
          class="title-text font-display text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-extrabold tracking-tight"
          style="opacity: {mobile ? 1 : 0};"
        >
          <span
            class="bg-linear-to-br from-white via-white to-accent-light bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(159,96,121,0.3)]"
          >
            {team.name}
          </span>
        </h2>

        <div
          bind:this={accentLineEl}
          class="mt-4 h-0.5 w-32 sm:w-48 md:w-64 bg-linear-to-r from-transparent via-accent to-transparent origin-center"
          style="opacity: {mobile ? 1 : 0}; transform: {mobile
            ? 'scaleX(1)'
            : 'scaleX(0)'};"
        ></div>

        <p
          bind:this={subtitleEl}
          class="mt-6 text-sm sm:text-base uppercase tracking-[0.3em] text-accent-light/70 font-medium"
          style="opacity: {mobile ? 1 : 0};"
        >
          Team Members
        </p>
      </div>
    </div>

    <div
      slot="scroll-content"
      bind:this={scrollContentEl}
      class="flex items-center gap-6 sm:gap-8 h-full pl-4 sm:pl-10 md:pl-16"
      style="opacity: {mobile ? 1 : 0};"
    >
      <div
        class="shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] xl:w-[28vw] h-full flex items-center"
      >
        <div class="max-w-lg">
          <div class="relative">
            <div
              class="absolute -left-4 top-0 bottom-0 w-0.5 bg-linear-to-b from-accent via-accent/50 to-transparent"
            ></div>

            <div class="pl-5">
              <p
                class="text-xs uppercase tracking-[0.2em] text-accent mb-3 font-medium"
              >
                About the Team
              </p>
              <p
                class="text-lg sm:text-xl md:text-2xl text-white/90 font-display font-medium leading-relaxed"
              >
                {team.description}
              </p>

              <div class="mt-6 flex gap-8">
                <div>
                  <p
                    class="text-3xl sm:text-4xl font-display font-bold text-accent-light"
                  >
                    {team.members.length}
                  </p>
                  <p
                    class="text-xs uppercase tracking-wider text-gray-500 mt-1"
                  >
                    Members
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {#each team.members as member}
        <MemberProfile {member} />
      {/each}

      <div class="shrink-0 w-[25vw]"></div>
    </div>
  </HorizontalScroll>
</div>

<style>
  .title-text {
    /* Removed will-change for better Safari compatibility */
    transform-origin: center center;
  }

  /* CSS fallback to hide overlay on mobile devices */
  @media (max-width: 767px) {
    .mobile-overlay {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
    }
  }
</style>
