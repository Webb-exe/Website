<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { requestScrollTriggerRefresh } from "../../lib/requestScrollTriggerRefresh";

  gsap.registerPlugin(ScrollTrigger);

  let section: HTMLElement;
  let heroContent: HTMLDivElement;
  let heroTitle: HTMLHeadingElement;
  let heroSubtitle: HTMLParagraphElement;
  let cornerDecors: HTMLDivElement[] = [];

  let ctx: gsap.Context;

  onMount(async () => {
    await tick();

    ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ delay: 0.5 });

      loadTl.fromTo(
        heroTitle,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      );

      loadTl.fromTo(
        heroSubtitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      loadTl.fromTo(
        cornerDecors,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.4"
      );

      // Hero parallax timeline
      if (heroContent) {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        heroTl.fromTo(
          heroContent,
          { y: 0, opacity: 1, scale: 1 },
          { y: -150, opacity: 0, scale: 0.85, duration: 1 },
          0
        );

        heroTl.fromTo(
          cornerDecors,
          { opacity: 1, scale: 1 },
          { opacity: 0, scale: 0.5, duration: 0.5, stagger: 0.05 },
          0
        );
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
  class="relative min-h-svh flex items-center justify-center overflow-hidden bg-dark"
  id="brand-hero"
>
  <div
    bind:this={heroContent}
    class="text-center z-10 hero-content w-full max-w-4xl mx-auto px-4 sm:px-6"
  >
    <h1
      bind:this={heroTitle}
      class="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 drop-shadow-2xl"
    >
      Brand Kit
    </h1>
    <p
      bind:this={heroSubtitle}
      class="font-serif-custom italic text-lg sm:text-xl md:text-2xl text-gray-400 drop-shadow-lg"
    >
      Complete brand guidelines and assets for 359 Webb.exe
    </p>
  </div>

  <!-- Decorative corner elements -->
  <div
    bind:this={cornerDecors[0]}
    class="hidden sm:block absolute top-16 sm:top-20 left-4 sm:left-8 w-10 sm:w-16 h-10 sm:h-16 border-l-2 border-t-2 border-accent/20"
  ></div>
  <div
    bind:this={cornerDecors[1]}
    class="hidden sm:block absolute top-16 sm:top-20 right-4 sm:right-8 w-10 sm:w-16 h-10 sm:h-16 border-r-2 border-t-2 border-accent/20"
  ></div>
  <div
    bind:this={cornerDecors[2]}
    class="hidden sm:block absolute bottom-24 sm:bottom-32 left-4 sm:left-8 w-10 sm:w-16 h-10 sm:h-16 border-l-2 border-b-2 border-accent/20"
  ></div>
  <div
    bind:this={cornerDecors[3]}
    class="hidden sm:block absolute bottom-24 sm:bottom-32 right-4 sm:right-8 w-10 sm:w-16 h-10 sm:h-16 border-r-2 border-b-2 border-accent/20"
  ></div>
</section>

<style>
  .hero-content {
    will-change: transform, opacity;
    perspective: 1000px;
  }
</style>

