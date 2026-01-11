<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { requestScrollTriggerRefresh } from '../../lib/requestScrollTriggerRefresh';

  gsap.registerPlugin(ScrollTrigger);

  let section: HTMLElement;
  let content: HTMLDivElement;
  let decorativeGlow: HTMLDivElement;

  let ctx: gsap.Context;

  function initAnimations() {
    if (!section || !content) return;
    if (typeof ScrollTrigger === 'undefined') return;
    
    if (ctx) ctx.revert();

    ctx = gsap.context(() => {
      // Content fade in
      gsap.fromTo(content,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          }
        }
      );

      // Glow pulse animation
      if (decorativeGlow) {
        gsap.to(decorativeGlow, {
          scale: 1.2,
          opacity: 0.15,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    }, section);

    requestScrollTriggerRefresh();
  }

  let handlePageLoad: (() => void) | null = null;

  onMount(async () => {
    if (typeof window === 'undefined') return;
    
    await tick();
    await new Promise(resolve => setTimeout(resolve, 100));
    
    initAnimations();

    if (typeof document !== 'undefined') {
      handlePageLoad = async () => {
        await tick();
        setTimeout(() => initAnimations(), 100);
      };
      document.addEventListener('astro:page-load', handlePageLoad);
    }
  });

  onDestroy(() => {
    ctx?.revert();
    if (typeof document !== 'undefined' && handlePageLoad) {
      document.removeEventListener('astro:page-load', handlePageLoad);
    }
  });
</script>

<section bind:this={section} class="relative section-wrapper py-20 sm:py-28 md:py-36 overflow-hidden">
  <div class="absolute inset-0 bg-linear-to-b from-dark via-[#0f0a0c] to-dark"></div>
  
  <!-- Decorative glow -->
  <div bind:this={decorativeGlow} class="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[400px] sm:w-[500px] md:w-[700px] h-[300px] sm:h-[400px] md:h-[500px] bg-accent/10 rounded-full blur-[120px] sm:blur-[150px] md:blur-[180px]"></div>
  
  <div bind:this={content} class="section-content-cta text-center relative z-10 w-full" style="opacity: 0;">
    <span class="font-display text-[10px] sm:text-xs text-accent uppercase tracking-[0.2em] sm:tracking-[0.3em] block mb-4 sm:mb-6">Partner With Us</span>
    
    <h2 class="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 sm:mb-8">
      <span class="text-white">Become a</span> <span class="text-accent-light">Sponsor</span>
    </h2>
    
    <p class="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed">
      Your support helps us compete at the highest level, develop cutting-edge technology, and inspire the next generation of engineers. Join our mission to build the future.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="mailto:359webb.exe@gmail.com?subject=Sponsorship Inquiry" class="sponsor-btn group inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-medium uppercase tracking-wider sm:tracking-widest bg-accent text-white rounded-full hover:bg-accent-light hover:text-dark transition-all duration-300 hover:scale-105 active:scale-95">
        Contact Us
        <svg class="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
      
      <a href="/" class="back-btn group inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-medium uppercase tracking-wider border border-white/20 text-gray-400 rounded-full hover:border-white/40 hover:text-white transition-all duration-300">
        <svg class="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back Home
      </a>
    </div>
  </div>
</section>

<style>
  .sponsor-btn {
    box-shadow: 0 0 0 rgba(159, 96, 121, 0);
    transition: box-shadow 0.3s ease;
  }
  
  .sponsor-btn:hover {
    box-shadow: 0 0 40px rgba(159, 96, 121, 0.4);
  }
</style>
