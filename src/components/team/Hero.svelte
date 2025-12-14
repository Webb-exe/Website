<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { requestScrollTriggerRefresh } from '../../lib/requestScrollTriggerRefresh';

  gsap.registerPlugin(ScrollTrigger);

  let section: HTMLElement;
  let heroContent: HTMLDivElement;
  let backgroundImage: HTMLDivElement;
  let backgroundOverlay: HTMLDivElement;
  let heroTitle: HTMLHeadingElement;
  let heroSubtitle: HTMLParagraphElement;
  let cornerDecors: HTMLDivElement[] = [];

  let ctx: gsap.Context;

  onMount(async () => {
    await tick();
    
    ctx = gsap.context(() => {
      // Hero content entrance animation
      const loadTl = gsap.timeline({ delay: 0.3 });
      
      // Background fade in
      loadTl.fromTo(backgroundImage,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        0
      );
      loadTl.fromTo(backgroundOverlay,
        { opacity: 0 },
        { opacity: 0.6, duration: 1, ease: 'power2.out' },
        0.2
      );

      // Corner decorations
      loadTl.fromTo(cornerDecors,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
        0.4
      );

      // Title and subtitle
      loadTl.fromTo(heroTitle,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
        0.5
      );
      loadTl.fromTo(heroSubtitle,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.7
      );

      // Ensure background is visible after initial animation
      loadTl.set(backgroundImage, { opacity: 1, scale: 1 }, '>');
      loadTl.set(backgroundOverlay, { opacity: 0.6 }, '>');

      // Hero parallax timeline - scrub means it plays both ways
      // Set up scroll animation after initial load animation completes
      if (heroContent) {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        });

        // Use 'fromTo' to animate from current visible state to faded state
        heroTl
          .fromTo(heroContent, 
            { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' },
            { y: -150, opacity: 0, scale: 0.85, filter: 'blur(10px)', duration: 1 }, 0)
          .fromTo(backgroundImage,
            { scale: 1, opacity: 1 },
            { scale: 1.1, opacity: 0, duration: 1 },
            0
          )
          .fromTo(backgroundOverlay,
            { opacity: 0.6 },
            { opacity: 1, duration: 1 },
            0
          )
          .fromTo(cornerDecors, 
            { opacity: 1, scale: 1 },
            { opacity: 0, scale: 0.5, duration: 0.5, stagger: 0.05 }, 0);
      }
    }, section);

    // Request debounced refresh
    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<section bind:this={section} class="relative min-h-svh flex items-center justify-center overflow-hidden" id="team-hero">
  <!-- Background Image with transition -->
  <div 
    bind:this={backgroundImage}
    class="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
    style="background-image: url('/teambackground.png'); opacity: 0;"
  >
    <!-- Dark overlay for text readability and brand consistency - fades to full black on scroll -->
    <div 
      bind:this={backgroundOverlay}
      class="absolute inset-0 bg-dark backdrop-blur-sm"
      style="opacity: 0;"
    ></div>
    <!-- Accent gradient overlay for brand touch -->
    <div class="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-dark/60"></div>
  </div>

  <!-- Content -->
  <div bind:this={heroContent} class="relative z-10 text-center hero-content w-full max-w-4xl mx-auto px-4 sm:px-6">
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
  <div bind:this={cornerDecors[0]} class="hidden sm:block absolute top-16 sm:top-20 left-4 sm:left-8 w-10 sm:w-16 h-10 sm:h-16 border-l-2 border-t-2 border-accent/20 z-10" style="opacity: 0;"></div>
  <div bind:this={cornerDecors[1]} class="hidden sm:block absolute top-16 sm:top-20 right-4 sm:right-8 w-10 sm:w-16 h-10 sm:h-16 border-r-2 border-t-2 border-accent/20 z-10" style="opacity: 0;"></div>
  <div bind:this={cornerDecors[2]} class="hidden sm:block absolute bottom-24 sm:bottom-32 left-4 sm:left-8 w-10 sm:w-16 h-10 sm:h-16 border-l-2 border-b-2 border-accent/20 z-10" style="opacity: 0;"></div>
  <div bind:this={cornerDecors[3]} class="hidden sm:block absolute bottom-24 sm:bottom-32 right-4 sm:right-8 w-10 sm:w-16 h-10 sm:h-16 border-r-2 border-b-2 border-accent/20 z-10" style="opacity: 0;"></div>
</section>

<style>
  .hero-content {
    will-change: transform, opacity, filter;
    perspective: 1000px;
  }
</style>

