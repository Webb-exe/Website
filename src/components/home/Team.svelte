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
  let teamLine: HTMLDivElement;
  let teamLabel: HTMLSpanElement;
  let teamTitle1: HTMLSpanElement;
  let teamTitle2: HTMLSpanElement;
  let teamDesc: HTMLParagraphElement;
  let deptTags: HTMLDivElement[] = [];

  let ctx: gsap.Context;

  onMount(async () => {
    await tick();
    
    ctx = gsap.context(() => {
      // Team section timeline - scrub pinned
      const teamTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 0.5,
        }
      });

      // Line draws
      teamTl.fromTo(teamLine,
        { width: 0, opacity: 0 },
        { width: '4rem', opacity: 1, duration: 0.3 }
      );

      // Label
      teamTl.fromTo(teamLabel,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.2 },
        '-=0.1'
      );

      // Title words
      teamTl.fromTo(teamTitle1,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 },
        '-=0.1'
      );
      teamTl.fromTo(teamTitle2,
        { y: 60, opacity: 0, scale: 1.2 },
        { y: 0, opacity: 1, scale: 1, duration: 0.3 },
        '-=0.2'
      );

      // Description
      teamTl.fromTo(teamDesc,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.3 },
        '-=0.1'
      );

      // Department tags
      teamTl.fromTo(deptTags,
        { opacity: 0, scale: 0, y: 20 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.2, 
          stagger: 0.05,
        },
        '-=0.1'
      );
      
      // Hold at end
      teamTl.to({}, { duration: 0.5 });
    }, section);

    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<!-- SECTION 5: Team -->
<section bind:this={section} class="relative min-h-svh section-wrapper bg-dark flex items-center scroll-mt-20 sm:scroll-mt-28" id="team">
  <div class="section-content w-full py-12 sm:py-16 md:py-20">
    <div class="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
      <div>
        <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div bind:this={teamLine} class="w-10 sm:w-12 md:w-16 h-px bg-linear-to-r from-accent to-transparent"></div>
          <span bind:this={teamLabel} class="font-display text-[10px] sm:text-xs text-accent uppercase tracking-[0.2em] sm:tracking-[0.3em]">Our Team</span>
        </div>
        <h2 class="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 md:mb-8 overflow-hidden">
          <span bind:this={teamTitle1} class="inline-block title-text">The Teams Behind</span> <span bind:this={teamTitle2} class="text-accent-light inline-block title-text">the Bot</span>
        </h2>
        <p bind:this={teamDesc} class="font-serif-custom text-base sm:text-lg md:text-xl leading-relaxed text-gray-400 mb-6 sm:mb-8">
          A diverse group of students, mentors, and sponsors working together to build more than robots—we build futures.
        </p>
      </div>
      
      <div>
        <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3">
          <div bind:this={deptTags[0]} class="dept-tag group px-3 sm:px-4 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl bg-white/2 border border-white/5 hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 text-center">
            <span class="text-xs sm:text-sm font-medium text-gray-400 group-hover:text-white transition-colors">Mechanical</span>
          </div>
          <div bind:this={deptTags[2]} class="dept-tag group px-3 sm:px-4 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl bg-white/2 border border-white/5 hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 text-center">
            <span class="text-xs sm:text-sm font-medium text-gray-400 group-hover:text-white transition-colors">Programming</span>
          </div>
          <div bind:this={deptTags[3]} class="dept-tag group px-3 sm:px-4 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl bg-white/2 border border-white/5 hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 text-center">
            <span class="text-xs sm:text-sm font-medium text-gray-400 group-hover:text-white transition-colors">Design</span>
          </div>
          <div bind:this={deptTags[4]} class="dept-tag group px-3 sm:px-4 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl bg-white/2 border border-white/5 hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 text-center">
            <span class="text-xs sm:text-sm font-medium text-gray-400 group-hover:text-white transition-colors">Business</span>
          </div>
          <div bind:this={deptTags[5]} class="dept-tag group px-3 sm:px-4 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl bg-white/2 border border-white/5 hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 text-center col-span-2 xs:col-span-1 sm:col-span-1">
            <span class="text-xs sm:text-sm font-medium text-gray-400 group-hover:text-white transition-colors">Media</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .dept-tag {
    transform-style: preserve-3d;
  }

  .title-text {
    transform-style: preserve-3d;
    will-change: transform, opacity;
  }
</style>
