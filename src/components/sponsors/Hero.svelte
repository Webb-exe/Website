<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { requestScrollTriggerRefresh } from "../../lib/requestScrollTriggerRefresh";

  gsap.registerPlugin(ScrollTrigger);

  let section: HTMLElement;
  let heroContent: HTMLDivElement;
  let backgroundOverlay: HTMLDivElement;
  let heroTitle: HTMLHeadingElement;
  let heroSubtitle: HTMLParagraphElement;
  let decorativeGlow1: HTMLDivElement;
  let decorativeGlow2: HTMLDivElement;
  let cornerDecors: HTMLDivElement[] = [];

  let ctx: gsap.Context;

  onMount(async () => {
    if (typeof window === "undefined") return;

    await tick();

    if (!section || !heroTitle || !heroSubtitle || !heroContent) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      await tick();
    }

    if (!section || !heroTitle || !heroSubtitle || !heroContent) {
      console.warn("Sponsors Hero: Some elements not found, skipping animation");
      return;
    }

    if (typeof ScrollTrigger === "undefined") {
      console.warn("Sponsors Hero: ScrollTrigger not available");
      return;
    }

    ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ delay: 0.3 });

      // Glows pulse in
      if (decorativeGlow1 && decorativeGlow2) {
        loadTl.fromTo(
          [decorativeGlow1, decorativeGlow2],
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 1, ease: "power2.out", stagger: 0.2 },
          0
        );
      }

      // Overlay fades in
      if (backgroundOverlay) {
        loadTl.fromTo(
          backgroundOverlay,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" },
          0.1
        );
      }

      // Corner decorations
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

      // Hero parallax on scroll
      if (heroContent && section) {
        setTimeout(() => {
          if (!ctx) return;

          const heroTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          if (heroContent) {
            heroTl.fromTo(
              heroContent,
              { y: 0, opacity: 1, scale: 1 },
              { y: -150, opacity: 0, scale: 0.85, duration: 1 },
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

          requestScrollTriggerRefresh();
        }, 200);
      }
    }, section);

    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<section
  bind:this={section}
  class="relative min-h-svh flex items-center justify-center overflow-hidden"
  id="sponsors-hero"
>
  <!-- Abstract background with glows -->
  <div class="absolute inset-0 bg-dark"></div>
  
  <!-- Decorative glows -->
  <div
    bind:this={decorativeGlow1}
    class="absolute top-1/4 left-1/4 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] bg-accent/10 rounded-full blur-[120px] sm:blur-[150px] md:blur-[180px] -translate-x-1/2 -translate-y-1/2"
    style="opacity: 0;"
  ></div>
  <div
    bind:this={decorativeGlow2}
    class="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-accent/8 rounded-full blur-[100px] sm:blur-[120px] md:blur-[150px] translate-x-1/2 translate-y-1/2"
    style="opacity: 0;"
  ></div>

  <!-- Grid pattern overlay -->
  <div
    bind:this={backgroundOverlay}
    class="absolute inset-0 opacity-[0.02]"
    style="background-image: linear-gradient(rgba(159,96,121,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(159,96,121,0.5) 1px, transparent 1px); background-size: 50px 50px; opacity: 0;"
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
      Our <span class="text-accent-light">Sponsors</span>
    </h1>
    <p
      bind:this={heroSubtitle}
      class="font-serif-custom italic text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto drop-shadow-lg"
      style="opacity: 0;"
    >
      The partners who power our mission and help shape the future of robotics
    </p>
  </div>

  <!-- Decorative corner elements -->
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
    perspective: 1000px;
  }
</style>
