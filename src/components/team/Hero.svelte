<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { requestScrollTriggerRefresh } from "../../lib/requestScrollTriggerRefresh";
  import type { GetImageResult } from "astro";

  gsap.registerPlugin(ScrollTrigger);

  export let image: GetImageResult;

  let section: HTMLElement;
  let heroContent: HTMLDivElement;
  let backgroundImage: HTMLImageElement;
  let backgroundOverlay: HTMLDivElement;
  let heroTitle: HTMLHeadingElement;
  let heroSubtitle: HTMLParagraphElement;
  let cornerDecors: HTMLDivElement[] = [];

  let ctx: gsap.Context;

  onMount(async () => {
    if (typeof window === "undefined") return;

    // Wait for DOM to be fully ready
    await tick();

    // Ensure all elements are bound
    if (
      !section ||
      !backgroundImage ||
      !backgroundOverlay ||
      !heroTitle ||
      !heroSubtitle ||
      !heroContent
    ) {
      // Retry after a short delay if elements aren't ready
      await new Promise((resolve) => setTimeout(resolve, 100));
      await tick();
    }

    // Double-check elements exist
    if (
      !section ||
      !backgroundImage ||
      !backgroundOverlay ||
      !heroTitle ||
      !heroSubtitle ||
      !heroContent
    ) {
      console.warn("Hero: Some elements not found, skipping animation");
      return;
    }

    // Ensure ScrollTrigger is available
    if (typeof ScrollTrigger === "undefined") {
      console.warn("Hero: ScrollTrigger not available");
      return;
    }

    ctx = gsap.context(() => {
      // Hero content entrance animation
      const loadTl = gsap.timeline({ delay: 0.3 });

      // Background fade in
      if (backgroundImage) {
        loadTl.fromTo(
          backgroundImage,
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
          0
        );
      }

      if (backgroundOverlay) {
        loadTl.fromTo(
          backgroundOverlay,
          { opacity: 0 },
          { opacity: 0.6, duration: 1, ease: "power2.out" },
          0.2
        );
      }

      // Corner decorations - filter out undefined
      const validCornerDecors = cornerDecors.filter((d) => d);
      if (validCornerDecors.length > 0) {
        loadTl.fromTo(
          validCornerDecors,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          0.4
        );
      }

      // Title and subtitle
      if (heroTitle) {
        loadTl.fromTo(
          heroTitle,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
          0.5
        );
      }

      if (heroSubtitle) {
        loadTl.fromTo(
          heroSubtitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0.7
        );
      }

      // Ensure background is visible after initial animation
      if (backgroundImage) {
        loadTl.set(backgroundImage, { opacity: 1, scale: 1 }, ">");
      }
      if (backgroundOverlay) {
        loadTl.set(backgroundOverlay, { opacity: 0.6 }, ">");
      }

      // Hero parallax timeline - wait for layout to be stable
      if (heroContent && section) {
        // Wait a bit for layout to stabilize, especially for Firefox
        setTimeout(() => {
          if (!ctx) return; // Component might have been destroyed

          const heroTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          // Use 'fromTo' to animate from current visible state to faded state
          if (heroContent) {
            heroTl.fromTo(
              heroContent,
              { y: 0, opacity: 1, scale: 1 },
              { y: -150, opacity: 0, scale: 0.85, duration: 1 },
              0
            );
          }

          if (backgroundImage) {
            heroTl.fromTo(
              backgroundImage,
              { scale: 1, opacity: 1 },
              { scale: 1.1, opacity: 0, duration: 1 },
              0
            );
          }

          if (backgroundOverlay) {
            heroTl.fromTo(
              backgroundOverlay,
              { opacity: 0.6 },
              { opacity: 1, duration: 1 },
              0
            );
          }

          const validCornerDecorsForScroll = cornerDecors.filter((d) => d);
          if (validCornerDecorsForScroll.length > 0) {
            heroTl.fromTo(
              validCornerDecorsForScroll,
              { opacity: 1, scale: 1 },
              { opacity: 0, scale: 0.5, duration: 0.5, stagger: 0.05 },
              0
            );
          }

          // Request refresh after ScrollTrigger is set up
          requestScrollTriggerRefresh();
        }, 200);
      }
    }, section);

    // Request debounced refresh
    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<section
  bind:this={section}
  class="relative min-h-svh flex items-center justify-center overflow-hidden"
  id="team-hero"
>
  <!-- Background Image with transition -->
  <img
    bind:this={backgroundImage}
    style="opacity: 0;"
    srcset={image.srcSet.attribute}
    {...image.attributes}
    alt="Team Background"
    class="absolute inset-0 w-full h-full object-cover object-center"
  />
    <!-- Dark overlay for text readability and brand consistency - fades to full black on scroll -->
    <div
      bind:this={backgroundOverlay}
      class="absolute inset-0 bg-dark backdrop-blur-sm"
      style="opacity: 0;"
    ></div>
    <!-- Accent gradient overlay for brand touch -->
    <div
      class="absolute inset-0 bg-linear-to-b from-accent/10 via-transparent to-dark/60"
    ></div>

  <!-- Content -->
  <div
    bind:this={heroContent}
    class="relative z-10 text-center hero-content w-full max-w-4xl mx-auto px-4 sm:px-6"
  >
    <h1
      bind:this={heroTitle}
      class="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 drop-shadow-2xl"
      style="opacity: 0;"
    >
      Meet the Team
    </h1>
    <p
      bind:this={heroSubtitle}
      class="font-serif-custom italic text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto drop-shadow-lg"
      style="opacity: 0;"
    >
      The talented individuals behind 359 Webb.exe
    </p>
  </div>

  <!-- Decorative corner elements - on-brand -->
  <div
    bind:this={cornerDecors[0]}
    class="hidden sm:block absolute top-16 sm:top-20 left-4 sm:left-8 w-10 sm:w-16 h-10 sm:h-16 border-l-2 border-t-2 border-accent/20 z-10"
    style="opacity: 0;"
  ></div>
  <div
    bind:this={cornerDecors[1]}
    class="hidden sm:block absolute top-16 sm:top-20 right-4 sm:right-8 w-10 sm:w-16 h-10 sm:h-16 border-r-2 border-t-2 border-accent/20 z-10"
    style="opacity: 0;"
  ></div>
  <div
    bind:this={cornerDecors[2]}
    class="hidden sm:block absolute bottom-24 sm:bottom-32 left-4 sm:left-8 w-10 sm:w-16 h-10 sm:h-16 border-l-2 border-b-2 border-accent/20 z-10"
    style="opacity: 0;"
  ></div>
  <div
    bind:this={cornerDecors[3]}
    class="hidden sm:block absolute bottom-24 sm:bottom-32 right-4 sm:right-8 w-10 sm:w-16 h-10 sm:h-16 border-r-2 border-b-2 border-accent/20 z-10"
    style="opacity: 0;"
  ></div>
</section>

<style>
  .hero-content {
    /* Removed will-change and filter for better Safari compatibility */
    perspective: 1000px;
  }
</style>
