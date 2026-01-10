<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { requestScrollTriggerRefresh } from "../../lib/requestScrollTriggerRefresh";
  import type { BrandLogo } from "../../data/brand";

  gsap.registerPlugin(ScrollTrigger);

  export let logos: BrandLogo[];

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

      gsap.from(".logo-card", {
        opacity: 0,
        scale: 0.9,
        y: 30,
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

<section bind:this={section} class="relative min-h-svh py-10 sm:py-16 md:py-20 bg-dark" id="logos">
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
            Brand Assets
          </span>
        </div>
        <h2
          bind:this={sectionTitle}
          class="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white"
        >
          Logos
        </h2>
        <p
          bind:this={sectionSubtitle}
          class="font-serif-custom text-base sm:text-lg md:text-xl text-gray-400"
        >
          Brand logo assets and variations
        </p>
      </div>

      <!-- Logo Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
        {#each logos as logo}
          <div class="logo-card bg-white/2 border border-white/5 rounded-lg sm:rounded-xl p-6 sm:p-8 hover:border-accent/30 transition-colors">
            <h3 class="font-display text-2xl sm:text-3xl font-semibold mb-2 text-white">{logo.name}</h3>
            <p class="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">{logo.description}</p>

            <div class="flex items-center justify-center bg-white/5 rounded-lg p-6 sm:p-8 mb-4 sm:mb-6 min-h-[150px] sm:min-h-[200px]">
              <img
                src={logo.filePath}
                alt={logo.name}
                class="max-w-full max-h-24 sm:max-h-32 object-contain"
              />
            </div>

            {#if logo.variants && logo.variants.length > 0}
              <div class="mt-4">
                <p class="text-xs sm:text-sm text-gray-500 mb-2 uppercase tracking-wider">Variants:</p>
                <div class="flex gap-2 flex-wrap">
                  {#each logo.variants as variant}
                    <span class="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs sm:text-sm text-gray-300">
                      {variant}
                    </span>
                  {/each}
                </div>
              </div>
            {/if}

            <div class="mt-4">
              <p class="text-xs sm:text-sm text-gray-500 mb-2 uppercase tracking-wider">File Path:</p>
              <code class="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded block break-all text-gray-300">
                {logo.filePath}
              </code>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

