<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { requestScrollTriggerRefresh } from '../../lib/requestScrollTriggerRefresh';

  gsap.registerPlugin(ScrollTrigger);

  // Export section ref for parent components
  export let sectionRef: HTMLElement | undefined = undefined;

  const words = ['Creators', 'Innovators', 'Solvers', 'Engineers', 'Dreamers'];
  let currentIndex = 0;
  let rotateInterval: ReturnType<typeof setInterval>;

  let section: HTMLElement;
  
  // Sync internal ref to exported ref
  $: sectionRef = section;
  let heroContent: HTMLDivElement;
  let heroBadge: HTMLDivElement;
  let heroNumber: HTMLSpanElement;
  let rotatingText: HTMLSpanElement;
  let heroTagline: HTMLParagraphElement;
  let scrollIndicator: HTMLDivElement;
  let scrollLine: HTMLDivElement;
  let cornerDecors: HTMLDivElement[] = [];

  let ctx: gsap.Context;

  onMount(async () => {
    await tick();
    
    ctx = gsap.context(() => {
      // Hero content entrance animation
      const loadTl = gsap.timeline({ delay: 0.5 });
      
      loadTl.fromTo(heroBadge,
        { opacity: 0, y: 30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
      loadTl.fromTo(heroNumber,
        { opacity: 0, scale: 0.5, rotationX: -45 },
        { opacity: 1, scale: 1, rotationX: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );
      loadTl.fromTo(rotatingText,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.5'
      );
      loadTl.fromTo(heroTagline,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );
      
      // Corner decorations
      loadTl.fromTo(cornerDecors,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.4'
      );
      
      // Scroll indicator
      loadTl.fromTo(scrollIndicator,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );
      
      // Scroll line animation (continuous)
      gsap.fromTo(scrollLine,
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, duration: 1, ease: 'power2.out', repeat: -1, yoyo: true }
      );

      // Hero parallax timeline - scrub means it plays both ways
      if (heroContent) {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        });

        heroTl
          .fromTo(heroContent, 
            { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' },
            { y: -150, opacity: 0, scale: 0.85, filter: 'blur(10px)', duration: 1 }, 0)
          .fromTo(scrollIndicator, 
            { opacity: 1, y: 0 },
            { opacity: 0, y: 50, duration: 0.5 }, 0)
          .fromTo(cornerDecors, 
            { opacity: 1, scale: 1 },
            { opacity: 0, scale: 0.5, duration: 0.5, stagger: 0.05 }, 0);
      }
    }, section);

    // Rotating text animation (outside context since it uses setInterval)
    function rotateTextFn() {
      if (!rotatingText) return;
      
      gsap.to(rotatingText, {
        rotationX: -90,
        opacity: 0,
        y: -20,
        filter: 'blur(4px)',
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          currentIndex = (currentIndex + 1) % words.length;
          rotatingText.textContent = words[currentIndex];
          
          gsap.fromTo(rotatingText, 
            { rotationX: 90, opacity: 0, y: 20, filter: 'blur(4px)' },
            { rotationX: 0, opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' }
          );
        }
      });
    }
    rotateInterval = setInterval(rotateTextFn, 1500);

    // Request debounced refresh
    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
    if (rotateInterval) {
      clearInterval(rotateInterval);
    }
  });
</script>

<!-- SECTION 1: Hero - Full Robot View -->
<section bind:this={section} class="relative min-h-svh flex items-center justify-center overflow-hidden" id="hero">
  <div bind:this={heroContent} class="text-center z-10 hero-content w-full max-w-4xl mx-auto px-4 sm:px-6">
    <div bind:this={heroBadge} class="inline-block px-4 sm:px-6 py-2 sm:py-2.5 border border-accent/40 rounded-full text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.15em] text-accent-light mb-6 sm:mb-8 backdrop-blur-md bg-accent/20">
      <span class="text-accent-light">FTC Robotics Team</span> 
    </div>
    <h1 class="font-display font-extrabold leading-none flex flex-col items-center">
      <span bind:this={heroNumber} class="text-white text-[4rem] sm:text-7xl md:text-8xl lg:text-[10rem] drop-shadow-2xl">359</span>
      <span class="text-accent-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl mt-1 sm:mt-2 rotating-text-container">
        <span bind:this={rotatingText} class="inline-block rotating-text">Creators</span>
      </span>
    </h1>
    <p bind:this={heroTagline} class="font-serif-custom italic text-lg sm:text-2xl md:text-3xl text-gray-400 mt-3 sm:mt-4 drop-shadow-lg">Webb.exe</p>
  </div>

  <!-- Decorative corner elements - at viewport edges, hidden on very small screens -->
  <div bind:this={cornerDecors[0]} class="hidden sm:block absolute top-16 sm:top-20 left-4 sm:left-8 w-10 sm:w-16 h-10 sm:h-16 border-l-2 border-t-2 border-accent/20"></div>
  <div bind:this={cornerDecors[1]} class="hidden sm:block absolute top-16 sm:top-20 right-4 sm:right-8 w-10 sm:w-16 h-10 sm:h-16 border-r-2 border-t-2 border-accent/20"></div>
  <div bind:this={cornerDecors[2]} class="hidden sm:block absolute bottom-24 sm:bottom-32 left-4 sm:left-8 w-10 sm:w-16 h-10 sm:h-16 border-l-2 border-b-2 border-accent/20"></div>
  <div bind:this={cornerDecors[3]} class="hidden sm:block absolute bottom-24 sm:bottom-32 right-4 sm:right-8 w-10 sm:w-16 h-10 sm:h-16 border-r-2 border-b-2 border-accent/20"></div>

  <div bind:this={scrollIndicator} class="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-3">
    <span class="text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400">Scroll</span>
    <div bind:this={scrollLine} class="w-px h-10 sm:h-16 bg-linear-to-b from-accent to-transparent"></div>
  </div>
</section>

<style>
  .hero-content {
    will-change: transform, opacity, filter;
    perspective: 1000px;
  }

  .rotating-text {
    display: inline-block;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    will-change: transform, opacity, filter;
  }
  
  .rotating-text-container {
    perspective: 500px;
  }
</style>
