<script lang="ts">
  import { onMount } from "svelte";
  import type { GetImageResult } from "astro";
  import { gsap, prefersReducedMotion } from "../../lib/gsap";

  let { image }: { image: GetImageResult } = $props();

  let section: HTMLElement;
  let content: HTMLDivElement;
  let picture: HTMLImageElement;

  onMount(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true } })
        .to(picture, { scale: 1.06, ease: "none" }, 0)
        .to(content, { y: -40, opacity: 0, ease: "none" }, 0);
    }, section);
    return () => ctx.revert();
  });
</script>

<section bind:this={section} class="relative min-h-[88svh] flex items-end overflow-hidden bg-dark">
  <img
    bind:this={picture}
    srcset={image.srcSet.attribute}
    {...image.attributes}
    alt=""
    loading="eager"
    fetchpriority="high"
    class="absolute inset-0 w-full h-full object-cover object-center"
  />
  <div class="absolute inset-0 bg-linear-to-t from-dark via-dark/55 to-dark/25"></div>

  <div bind:this={content} class="relative section-wrapper w-full pb-16 sm:pb-24">
    <div class="section-content">
      <h1 class="enter display mt-6 text-6xl sm:text-8xl lg:text-9xl" style="--i: 1">Meet the team</h1>
      <p class="enter hand mt-4 text-3xl" style="--i: 2">Claremont, California</p>
    </div>
  </div>
</section>
