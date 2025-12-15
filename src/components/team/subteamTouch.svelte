<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import MemberProfile from "./memberProfile.svelte";
  import { isMobile } from "../../lib/isMobile";
  import { requestScrollTriggerRefresh } from "../../lib/requestScrollTriggerRefresh";

  gsap.registerPlugin(ScrollTrigger);

  export let title: string = "Software";
  export let description: string =
    "Building the brains of our robot through code, control systems, and autonomous programming.";
  export let members: Array<{
    name: string;
    role?: string;
    bio?: string;
    imageSrc?: string;
  }> = [];

  let sectionEl: HTMLElement;
  let titleEl: HTMLElement;
  let descriptionEl: HTMLElement;
  let membersContainerEl: HTMLElement;
  let ctx: gsap.Context;
  let mobile = false;

  // Initialize mobile detection
  if (typeof window !== "undefined") {
    mobile = isMobile();
  }

  onMount(async () => {
    if (typeof window === 'undefined') return;
    
    await tick();
    
    // Ensure element is bound
    if (!sectionEl) {
      await new Promise(resolve => setTimeout(resolve, 100));
      await tick();
    }
    
    if (!sectionEl) {
      console.warn('SubteamTouch: sectionEl not found');
      return;
    }
    
    // Re-check mobile status on mount
    mobile = isMobile();
    
    // Set initial state immediately to prevent flash
    if (titleEl) gsap.set(titleEl, { opacity: 0, y: 20 });
    if (descriptionEl) gsap.set(descriptionEl, { opacity: 0, y: 20 });
    if (membersContainerEl) gsap.set(membersContainerEl, { opacity: 0, y: 20 });
    
    // Wait for layout - longer delay for Firefox
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    // Ensure ScrollTrigger is available
    if (typeof ScrollTrigger === 'undefined') {
      console.warn('SubteamTouch: ScrollTrigger not available');
      return;
    }

    ctx = gsap.context(() => {
      // Simple fade-in animation on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 85%",
          end: "top 60%",
          scrub: false,
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      // Animate in - check elements exist
      if (titleEl) tl.to(titleEl, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0);
      if (descriptionEl) tl.to(descriptionEl, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.1);
      if (membersContainerEl) tl.to(membersContainerEl, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.2);
    }, sectionEl);

    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<div bind:this={sectionEl} class="relative bg-dark py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
  <!-- Title Section -->
  <div class="max-w-4xl mx-auto mb-8 sm:mb-12">
    <div class="flex flex-col items-center text-center mb-6">
      <!-- Decorative dot -->
      <div class="w-2 h-2 rounded-full bg-accent mb-4 shadow-[0_0_15px_rgba(159,96,121,0.5)]"></div>
      
      <h2
        bind:this={titleEl}
        class="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
        style="opacity: 0;"
      >
        <span
          class="bg-linear-to-br from-white via-white to-accent-light bg-clip-text text-transparent"
        >
          {title}
        </span>
      </h2>

      <!-- Accent line -->
      <div
        class="h-0.5 w-24 sm:w-32 bg-linear-to-r from-transparent via-accent to-transparent mb-4"
      ></div>

      <p
        class="text-xs uppercase tracking-[0.3em] text-accent-light/70 font-medium"
      >
        Team Members
      </p>
    </div>

    <!-- Description -->
    <div
      bind:this={descriptionEl}
      class="mt-8 sm:mt-10 px-4"
      style="opacity: 0;"
    >
      <div class="relative">
        <div
          class="absolute -left-2 top-0 bottom-0 w-0.5 bg-linear-to-b from-accent via-accent/50 to-transparent"
        ></div>

        <div class="pl-4">
          <p
            class="text-xs uppercase tracking-[0.2em] text-accent mb-3 font-medium"
          >
            About the Team
          </p>
          <p
            class="text-base sm:text-lg md:text-xl text-white/90 font-display font-medium leading-relaxed"
          >
            {description}
          </p>

          <div class="mt-6 flex items-center gap-6">
            <div>
              <p
                class="text-3xl sm:text-4xl font-display font-bold text-accent-light"
              >
                {members.length}
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

  <!-- Members Grid - Touch Optimized -->
  <div
    bind:this={membersContainerEl}
    class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pb-8 sm:pb-12"
    style="opacity: 0;"
  >
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6 members-grid">
      {#each members as member}
        <div class="w-full min-w-0 flex justify-center items-start">
          <MemberProfile
            name={member.name}
            role={member.role ?? ""}
            imageSrc={member.imageSrc}
          />
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  /* Touch-friendly spacing and interactions */
  :global(.touch-device) {
    -webkit-tap-highlight-color: transparent;
  }

  /* Make MemberProfile responsive in grid */
  :global(.members-grid article) {
    width: 100% !important;
    max-width: 100%;
    min-width: 0;
  }

  /* Ensure proper spacing and prevent content collision */
  :global(.members-grid) {
    padding: 0;
    width: 100%;
  }

  /* Prevent grid items from overflowing */
  :global(.members-grid > div) {
    min-width: 0;
    overflow: hidden;
  }

  /* Responsive text sizing for grid items */
  :global(.members-grid article h3) {
    font-size: clamp(0.875rem, 2vw, 1rem);
    line-height: 1.4;
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  :global(.members-grid article .text-xs) {
    font-size: clamp(0.625rem, 1.5vw, 0.75rem);
    line-height: 1.3;
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  /* Ensure content inside cards doesn't overflow */
  :global(.members-grid article > *) {
    max-width: 100%;
  }
</style>

