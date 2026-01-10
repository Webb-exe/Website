<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { requestScrollTriggerRefresh } from "../../lib/requestScrollTriggerRefresh";
  import type { BrandColor } from "../../data/brand";

  gsap.registerPlugin(ScrollTrigger);

  export let colors: BrandColor[];

  let section: HTMLElement;
  let sectionLabel: HTMLSpanElement;
  let sectionTitle: HTMLHeadingElement;
  let sectionSubtitle: HTMLParagraphElement;

  let ctx: gsap.Context;

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

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

      gsap.utils.toArray(".color-card").forEach((card: any, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          scale: 0.9,
          duration: 0.6,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: i * 0.1,
        });
      });
    }, section);

    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<section bind:this={section} class="relative min-h-svh py-10 sm:py-16 md:py-20 bg-dark" id="colors">
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
            Brand Colors
          </span>
        </div>
        <h2
          bind:this={sectionTitle}
          class="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
        >
          Color Palette
        </h2>
        <p
          bind:this={sectionSubtitle}
          class="font-serif-custom text-base sm:text-lg md:text-xl text-gray-400"
        >
          Our brand color palette
        </p>
      </div>

      <!-- Color Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {#each colors as color}
          <div class="color-card bg-white/2 border border-white/5 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:border-accent/30 transition-colors">
            <div
              class="w-full h-32 sm:h-40 md:h-48 rounded-lg mb-4 cursor-pointer transition-transform hover:scale-105"
              style="background-color: {color.hex};"
              onclick={() => copyToClipboard(color.hex)}
              title="Click to copy hex code"
            ></div>
            <h3 class="font-display text-xl sm:text-2xl font-semibold mb-3 text-white">{color.name}</h3>
            <div class="space-y-2 text-sm">
              <div class="flex items-center gap-2">
                <span class="font-mono bg-white/5 px-2 py-1 rounded text-gray-300">
                  {color.hex}
                </span>
                <button
                  onclick={() => copyToClipboard(color.hex)}
                  class="text-gray-400 hover:text-accent-light transition-colors"
                  title="Copy hex"
                >
                  📋
                </button>
              </div>
              {#if color.rgb}
                <div class="flex items-center gap-2">
                  <span class="font-mono bg-white/5 px-2 py-1 rounded text-gray-300">
                    {color.rgb}
                  </span>
                  <button
                    onclick={() => copyToClipboard(color.rgb)}
                    class="text-gray-400 hover:text-accent-light transition-colors"
                    title="Copy RGB"
                  >
                    📋
                  </button>
                </div>
              {/if}
              {#if color.usage}
                <p class="text-gray-400 mt-3 text-xs sm:text-sm">{color.usage}</p>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

