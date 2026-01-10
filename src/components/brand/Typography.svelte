<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { requestScrollTriggerRefresh } from "../../lib/requestScrollTriggerRefresh";
  import type { BrandFont } from "../../data/brand";

  gsap.registerPlugin(ScrollTrigger);

  export let fonts: BrandFont[];

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

      gsap.from(".font-card", {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.6,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        stagger: 0.2,
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
  id="typography"
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
            Typography
          </span>
        </div>
        <h2
          bind:this={sectionTitle}
          class="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white"
        >
          Font Families
        </h2>
        <p
          bind:this={sectionSubtitle}
          class="font-serif-custom text-base sm:text-lg md:text-xl text-gray-400"
        >
          Font families and weights
        </p>
      </div>

      <!-- Font Cards -->
      <div class="space-y-6 sm:space-y-8 md:space-y-12">
        {#each fonts as font}
          <div class="font-card bg-white/2 border border-white/5 rounded-lg sm:rounded-xl p-6 sm:p-8 hover:border-accent/30 transition-colors">
            <h3 class="font-display text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4 text-white">{font.name}</h3>
            {#if font.usage}
              <p class="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">{font.usage}</p>
            {/if}
            <div class="space-y-4">
              <div>
                <p class="text-xs sm:text-sm text-gray-500 mb-2 uppercase tracking-wider">Family:</p>
                <p class="font-mono text-sm sm:text-lg text-gray-300">{font.family}</p>
              </div>
              <div>
                <p class="text-xs sm:text-sm text-gray-500 mb-2 uppercase tracking-wider">Available Weights:</p>
                <div class="flex gap-2 flex-wrap">
                  {#each font.weights as weight}
                    <span
                      class="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs sm:text-sm text-gray-300"
                      style="font-weight: {weight}; font-family: {font.family};"
                    >
                      {weight}
                    </span>
                  {/each}
                </div>
              </div>
              <div class="mt-6 space-y-3 sm:space-y-4">
                <p class="text-xs sm:text-sm text-gray-500 mb-2 uppercase tracking-wider">Example:</p>
                <p
                  class="text-3xl sm:text-4xl text-white"
                  style="font-family: {font.family};"
                >
                  The quick brown fox jumps over the lazy dog
                </p>
                <p
                  class="text-xl sm:text-2xl text-gray-300"
                  style="font-family: {font.family};"
                >
                  The quick brown fox jumps over the lazy dog
                </p>
                <p
                  class="text-base sm:text-lg text-gray-400"
                  style="font-family: {font.family};"
                >
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

