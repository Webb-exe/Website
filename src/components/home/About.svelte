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
  let aboutLine: HTMLDivElement;
  let aboutLabel: HTMLSpanElement;
  let aboutTitle1: HTMLSpanElement;
  let aboutTitle2: HTMLSpanElement;
  let aboutText: HTMLDivElement;
  let statCards: HTMLDivElement[] = [];

  let ctx: gsap.Context;

  onMount(async () => {
    await tick();
    
    ctx = gsap.context(() => {
      // About section timeline - scrub pinned
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 0.5,
        }
      });

      // Line draws in
      aboutTl.fromTo(aboutLine, 
        { width: 0, opacity: 0 },
        { width: '4rem', opacity: 1, duration: 0.3 }
      );
      
      // Label fades in
      aboutTl.fromTo(aboutLabel,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.2 },
        '-=0.1'
      );

      // Title words slide up
      aboutTl.fromTo(aboutTitle1,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 },
        '-=0.1'
      );
      aboutTl.fromTo(aboutTitle2,
        { y: 80, opacity: 0, scale: 1.2 },
        { y: 0, opacity: 1, scale: 1, duration: 0.3 },
        '-=0.2'
      );

      // Text content fades in
      aboutTl.fromTo(aboutText,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.3 },
        '-=0.1'
      );

      // Stats cards
      aboutTl.fromTo(statCards,
        { opacity: 0, y: 40, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.3, 
          stagger: 0.1,
        },
        '-=0.1'
      );
      
      // Hold at end
      aboutTl.to({}, { duration: 0.5 });

      // Counter animation for stats (only once)
      statCards.forEach((card) => {
        const countEl = card.querySelector('[data-count]') as HTMLElement;
        if (countEl) {
          const target = parseInt(countEl.dataset.count || '0');
          let hasAnimated = false;
          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
              if (!hasAnimated) {
                hasAnimated = true;
                gsap.to({ val: 0 }, {
                  val: target,
                  duration: 2,
                  ease: 'power2.out',
                  onUpdate: function() {
                    countEl.textContent = Math.round(this.targets()[0].val) + '+';
                  }
                });
              }
            }
          });
        }
      });
    }, section);

    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<!-- SECTION 3: About - Slides up over the robot -->
<section bind:this={section} class="relative min-h-svh scroll-mt-20 sm:scroll-mt-28" id="about">
  <!-- Curved top edge -->
  <div class="absolute -top-16 sm:-top-24 left-0 right-0 h-24 sm:h-32 bg-linear-to-b from-transparent via-dark/50 to-dark"></div>
  
  <div class="bg-dark py-10 sm:py-16 md:py-20 section-wrapper min-h-svh flex items-center">
    <div class="section-content-narrow w-full">
      <!-- Main grid: stats aligned with header on lg+ -->
      <div class="lg:grid lg:grid-cols-5 lg:gap-10 xl:gap-16 lg:items-start">
        <!-- Left column: Header + Text -->
        <div class="lg:col-span-3">
          <!-- Header -->
          <div class="mb-6 sm:mb-10 md:mb-12">
            <div class="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-6">
              <div bind:this={aboutLine} class="w-8 sm:w-12 md:w-16 h-px bg-linear-to-r from-accent to-transparent"></div>
              <span bind:this={aboutLabel} class="font-display text-[10px] sm:text-xs text-accent uppercase tracking-[0.2em] sm:tracking-[0.3em]">About Us</span>
            </div>
            <h2 class="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight overflow-hidden">
              <span bind:this={aboutTitle1} class="inline-block title-text">Who We</span> <span bind:this={aboutTitle2} class="text-accent-light inline-block title-text">Are</span>
            </h2>
          </div>
          
          <!-- Text content -->
          <div bind:this={aboutText}>
            <p class="font-serif-custom text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-3 sm:mb-5 md:mb-6 text-gray-200">
              We are <em class="text-accent-light italic">359 Webb.exe</em>, a competitive FIRST Robotics team dedicated to engineering excellence.
            </p>
            <p class="text-gray-500 leading-relaxed text-sm sm:text-base md:text-lg">
              Founded with the mission to create, innovate, and solve complex engineering challenges, our team brings together diverse talents united by a passion for robotics and technology.
            </p>
          </div>
        </div>
        
        <!-- Right column: Stats - starts at same level as header on lg+ -->
        <div class="mt-8 sm:mt-10 lg:mt-0 lg:col-span-2">
          <div class="grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3 md:gap-4">
            <div bind:this={statCards[0]} class="stat-card p-3 sm:p-5 md:p-6 lg:p-5 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/2 border border-white/5 hover:border-accent/30 transition-colors text-center">
              <span class="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-accent-light block" data-count="15">0</span>
              <span class="text-[9px] sm:text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mt-1 sm:mt-2 block">Years</span>
            </div>
            <div bind:this={statCards[1]} class="stat-card p-3 sm:p-5 md:p-6 lg:p-5 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/2 border border-white/5 hover:border-accent/30 transition-colors text-center">
              <span class="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-accent-light block" data-count="50">0</span>
              <span class="text-[9px] sm:text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mt-1 sm:mt-2 block">Members</span>
            </div>
            <div bind:this={statCards[2]} class="stat-card p-3 sm:p-5 md:p-6 lg:p-5 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/2 border border-white/5 hover:border-accent/30 transition-colors text-center">
              <span class="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-accent-light block" data-count="20">0</span>
              <span class="text-[9px] sm:text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mt-1 sm:mt-2 block">Awards</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .stat-card {
    perspective: 1000px;
    transform-style: preserve-3d;
  }

  .title-text {
    transform-style: preserve-3d;
    will-change: transform, opacity;
  }
</style>
