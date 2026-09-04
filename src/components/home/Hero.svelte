<script module lang="ts">
  import type { GetImageResult } from "astro";
  export interface HeroPhoto {
    img: GetImageResult;
    caption: string;
    note?: string;
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { gsap, prefersReducedMotion } from "../../lib/gsap";

  let { image, photos }: { image: GetImageResult; photos: HeroPhoto[] } = $props();

  // Each print gets its own tilt and offset so the pile reads as dropped on a table, not laid out on a grid.
  const layout = [
    { rotate: -7, x: "0%", y: "5%", z: 1 },
    { rotate: 4, x: "40%", y: "0%", z: 3 },
    { rotate: -2, x: "20%", y: "27%", z: 2 },
  ];

  let section: HTMLElement;
  let content: HTMLDivElement;
  let robot: HTMLImageElement;
  let overlay: HTMLDivElement;
  let pile: HTMLDivElement;

  onMount(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true } })
        .to(robot, { scale: 1.08, ease: "none" }, 0)
        .to(overlay, { opacity: 1, ease: "none" }, 0)
        .to(content, { y: -50, opacity: 0, ease: "none" }, 0)
        .to(pile, { y: -120, opacity: 0, ease: "none" }, 0);
    }, section);
    return () => ctx.revert();
  });
</script>

<section bind:this={section} id="hero" class="relative min-h-svh overflow-hidden">
  <div class="fixed inset-0 -z-10">
    <img
      bind:this={robot}
      srcset={image.srcSet.attribute}
      {...image.attributes}
      alt=""
      loading="eager"
      fetchpriority="high"
      class="w-full h-full object-cover object-center"
    />
    <div class="absolute inset-0 bg-linear-to-t from-dark via-dark/60 to-dark/40"></div>
    <div bind:this={overlay} class="absolute inset-0 bg-dark opacity-0"></div>
  </div>

  <div class="section-wrapper relative flex min-h-svh flex-col pt-28 pb-12 sm:pt-32 sm:pb-16">
    <div class="section-content mt-auto grid gap-14 pt-16 lg:grid-cols-12 lg:items-end lg:gap-8">
      <!-- big text -->
      <div bind:this={content} class="lg:col-span-6">
        <h1 class="display text-[3.4rem] leading-[0.92] xs:text-6xl sm:text-7xl lg:text-8xl xl:text-[7.5rem]">
          <span class="enter block" style="--i: 1">Creators.</span>
          <span class="enter block" style="--i: 2">Innovators.</span>
          <span class="enter block text-pink" style="--i: 3">Solvers.</span>
        </h1>
        <p class="enter mt-6 max-w-sm text-gray-400" style="--i: 4">
          A student-run robotics team that designs, builds, and programs a new robot every season.
        </p>
      </div>

      <!-- polaroid pile -->
      <div bind:this={pile} class="enter relative h-[24rem] xs:h-[27rem] sm:h-[30rem] lg:col-span-6 lg:h-[34rem]" style="--i: 2">
        {#each photos as photo, i}
          {@const l = layout[i % layout.length]}
          <figure
            class="print absolute w-[56%] max-w-[15rem] sm:max-w-[17rem] lg:max-w-[18rem]"
            style="left: {l.x}; top: {l.y}; z-index: {l.z}; --r: {l.rotate}deg;"
          >
            {#if i !== 1}<span class="tape"></span>{/if}
            <div class="photo">
              <img src={photo.img.src} srcset={photo.img.srcSet.attribute} {...photo.img.attributes} loading={i === 0 ? "eager" : "lazy"} />
              <span class="lift" aria-hidden="true"></span>
              <span class="tint" aria-hidden="true"></span>
              <span class="grain" aria-hidden="true"></span>
            </div>
            <figcaption class="flex items-baseline justify-between gap-3">
              <span class="hand text-ink text-xl">{photo.caption}</span>
              {#if photo.note}<span class="hand text-ink/45 text-base">{photo.note}</span>{/if}
            </figcaption>
          </figure>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  /* An instant print: white stock, thick bottom border, slightly warm photo, a soft paper edge. */
  .print {
    background: linear-gradient(180deg, #fdfcfb 0%, #f6f3f1 100%);
    padding: 0.7rem 0.7rem 0.85rem;
    border-radius: 3px;
    transform: rotate(var(--r));
    box-shadow:
      0 0 0 1px rgb(0 0 0 / 0.06),
      0 2px 4px rgb(0 0 0 / 0.35),
      0 22px 45px -18px rgb(0 0 0 / 0.85);
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), z-index 0s;
  }
  .print:hover {
    transform: rotate(0deg) translateY(-8px) scale(1.03);
    z-index: 10 !important;
  }
  .print .photo {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    background: #cfc6bd;
  }
  .print .photo > * {
    position: absolute;
    inset: 0;
  }
  /* Instant-film grade, kept subtle: slightly flat, a touch desaturated, skin tones intact. */
  .print .photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: contrast(0.9) brightness(1.03) saturate(0.86) sepia(0.08);
  }
  /* `lighten` with a dark colour only touches the shadows: lifts the blacks and cools them green. */
  .print .lift {
    background: rgb(44 58 46);
    mix-blend-mode: lighten;
    opacity: 0.7;
    pointer-events: none;
  }
  /* Soft-light warms the highlights from one corner, like light hitting the print. */
  .print .tint {
    background:
      radial-gradient(85% 70% at 88% 8%, rgb(236 200 150 / 0.4), transparent 62%),
      linear-gradient(160deg, rgb(200 176 140 / 0.22) 0%, rgb(120 148 118 / 0.2) 100%);
    mix-blend-mode: soft-light;
    pointer-events: none;
  }
  .print .grain {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 160px 160px;
    mix-blend-mode: overlay;
    opacity: 0.28;
    pointer-events: none;
  }
  .print .photo::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(125% 100% at 50% 45%, transparent 58%, rgb(30 26 22 / 0.22) 100%),
      linear-gradient(115deg, rgb(255 255 255 / 0.1) 0%, transparent 35%);
    pointer-events: none;
  }
  .print figcaption {
    margin-top: 0.75rem;
    padding: 0 0.15rem 0.35rem;
  }
</style>
