<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { requestScrollTriggerRefresh } from '../../lib/requestScrollTriggerRefresh';

  gsap.registerPlugin(ScrollTrigger);

  // Export section ref for parent components
  export let sectionRef: HTMLElement | undefined = undefined;
  let section: HTMLElement;
  
  // Sync internal ref to exported ref
  $: sectionRef = section;
  let valuesGrid: HTMLDivElement;
  let valuesGlows: HTMLDivElement[] = [];
  let valuesHeader: HTMLDivElement;
  let valueCards: HTMLDivElement[] = [];
  let cardIcons: HTMLDivElement[] = [];

  let ctx: gsap.Context;

  onMount(async () => {
    await tick();
    
    ctx = gsap.context(() => {
      // Values section timeline - scrub pinned
      const valuesTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 0.5,
        }
      });

      // Grid pattern fades in
      valuesTl.fromTo(valuesGrid,
        { opacity: 0 },
        { opacity: 0.02, duration: 0.2 }
      );

      // Glows pulse in
      valuesTl.fromTo(valuesGlows,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.1 },
        '-=0.1'
      );

      // Header scales in
      valuesTl.fromTo(valuesHeader,
        { opacity: 0, scale: 0.8, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3 },
        '-=0.1'
      );

      // Cards fan in from different directions
      valueCards.forEach((card, i) => {
        const xOffset = i === 0 ? -100 : i === 2 ? 100 : 0;
        const yOffset = i === 1 ? 60 : 50;
        
        valuesTl.fromTo(card,
          { opacity: 0, x: xOffset, y: yOffset, scale: 0.8 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.3 },
          i === 0 ? '-=0.1' : '-=0.2'
        );
      });

      // Icons spin in
      valuesTl.fromTo(cardIcons,
        { rotation: -180, scale: 0, opacity: 0 },
        { rotation: 0, scale: 1, opacity: 1, duration: 0.3, stagger: 0.08 },
        '-=0.2'
      );
      
      // Hold at end
      valuesTl.to({}, { duration: 0.5 });
    }, section);

    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<!-- SECTION 4: Values - Creative Cards -->
<section bind:this={section} class="relative min-h-svh section-wrapper overflow-hidden flex items-center scroll-mt-20 sm:scroll-mt-28" id="values">
  <div class="absolute inset-0 bg-linear-to-b from-dark via-[#0d0d0d] to-dark"></div>
  
  <!-- Decorative elements - scaled for different screens -->
  <div bind:this={valuesGlows[0]} class="absolute top-1/2 left-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-accent/5 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] -translate-x-1/2 -translate-y-1/2 values-glow"></div>
  <div bind:this={valuesGlows[1]} class="absolute top-1/3 right-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-accent/5 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] translate-x-1/2 values-glow"></div>
  
  <!-- Grid pattern overlay -->
  <div bind:this={valuesGrid} class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(159,96,121,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(159,96,121,0.5) 1px, transparent 1px); background-size: 30px 30px;"></div>
  
  <div class="section-content relative z-10 w-full py-16 sm:py-24 md:py-32 lg:py-38">
    <div bind:this={valuesHeader} class="text-center mb-8 sm:mb-10 md:mb-12">
      <h2 class="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
        What Drives Us
      </h2>
    </div>
    
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      <div bind:this={valueCards[0]} class="value-card group">
        <div class="card-inner relative p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/3 to-transparent border border-white/5 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-accent via-accent-light to-transparent rounded-t-2xl sm:rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div bind:this={cardIcons[0]} class="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 mb-4 sm:mb-6 md:mb-8 rounded-xl sm:rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
            <svg class="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h3 class="font-display text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4">Create</h3>
          <p class="text-gray-500 leading-relaxed text-sm sm:text-base">Transform ideas into reality through innovative engineering and design.</p>
        </div>
      </div>
      
      <div bind:this={valueCards[1]} class="value-card group">
        <div class="card-inner relative p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/3 to-transparent border border-white/5 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-accent via-accent-light to-transparent rounded-t-2xl sm:rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div bind:this={cardIcons[1]} class="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 mb-4 sm:mb-6 md:mb-8 rounded-xl sm:rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
            <svg class="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <h3 class="font-display text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4">Innovate</h3>
          <p class="text-gray-500 leading-relaxed text-sm sm:text-base">Push boundaries and explore new technologies to stay ahead.</p>
        </div>
      </div>
      
      <div bind:this={valueCards[2]} class="value-card group sm:col-span-2 md:col-span-1">
        <div class="card-inner relative p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/3 to-transparent border border-white/5 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-accent via-accent-light to-transparent rounded-t-2xl sm:rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div bind:this={cardIcons[2]} class="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 mb-4 sm:mb-6 md:mb-8 rounded-xl sm:rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
            <svg class="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <h3 class="font-display text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4">Solve</h3>
          <p class="text-gray-500 leading-relaxed text-sm sm:text-base">Every challenge is an opportunity to learn and overcome obstacles.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .value-card {
    perspective: 1000px;
    transform-style: preserve-3d;
  }

  .card-inner {
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  .values-glow {
    will-change: transform, opacity;
  }
</style>
