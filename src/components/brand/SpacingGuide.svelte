<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { requestScrollTriggerRefresh } from "../../lib/requestScrollTriggerRefresh";

  gsap.registerPlugin(ScrollTrigger);

  export let spacing: {
    unit: string;
    scale: number[];
  };

  let section: HTMLElement;
  let sectionLabel: HTMLSpanElement;
  let sectionTitle: HTMLHeadingElement;
  let sectionSubtitle: HTMLParagraphElement;

  let ctx: gsap.Context;

  onMount(async () => {
    await tick();

    ctx = gsap.context(() => {
      const sectionTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      sectionTl.fromTo(
        sectionLabel,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3 }
      );

      sectionTl.fromTo(
        sectionTitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2"
      );

      sectionTl.fromTo(
        sectionSubtitle,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.3"
      );

      gsap.from(".spacing-item", {
        opacity: 0,
        x: -30,
        duration: 0.4,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        stagger: 0.05,
      });
    }, section);

    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<section
  bind:this={section}
  class="relative min-h-svh py-10 sm:py-16 md:py-20 bg-dark-secondary"
  id="spacing"
>
  <div class="section-wrapper">
    <div class="section-content-narrow">
      <!-- Header -->
      <div class="mb-6 sm:mb-10 md:mb-12">
        <div class="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-6">
          <div class="w-8 sm:w-12 md:w-16 h-px bg-linear-to-r from-accent to-transparent"></div>
          <span
            bind:this={sectionLabel}
            class="font-display text-[10px] sm:text-xs text-accent uppercase tracking-[0.2em] sm:tracking-[0.3em]"
          >
            Spacing System
          </span>
        </div>
        <h2
          bind:this={sectionTitle}
          class="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white"
        >
          Spacing
        </h2>
        <p
          bind:this={sectionSubtitle}
          class="font-serif-custom text-base sm:text-lg md:text-xl text-gray-400"
        >
          Spacing scale and guidelines
        </p>
      </div>

      <!-- Spacing Guide -->
      <div class="bg-white/2 border border-white/5 rounded-lg sm:rounded-xl p-6 sm:p-8">
        <div class="mb-6">
          <p class="text-xs sm:text-sm text-gray-500 mb-2 uppercase tracking-wider">Unit:</p>
          <p class="text-base sm:text-lg font-mono text-gray-300">{spacing.unit}</p>
        </div>

        <div class="space-y-3 sm:space-y-4">
          <p class="text-xs sm:text-sm text-gray-500 mb-4 uppercase tracking-wider">Scale:</p>
          {#each spacing.scale as value}
            <div class="spacing-item flex items-center gap-4 sm:gap-6">
              <div class="w-20 sm:w-24 text-right">
                <span class="font-mono text-xs sm:text-sm text-gray-300">{value}{spacing.unit}</span>
              </div>
              <div class="flex-1">
                <div
                  class="bg-accent h-6 sm:h-8 rounded"
                  style="width: {value * 2}rem; max-width: 100%;"
                ></div>
              </div>
              <div class="w-24 sm:w-32 text-left">
                <span class="text-xs text-gray-500">
                  {value * 16}px
                </span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

