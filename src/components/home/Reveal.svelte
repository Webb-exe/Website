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
  let revealText: HTMLDivElement;

  let ctx: gsap.Context;

  onMount(async () => {
    await tick();
    
    ctx = gsap.context(() => {
      // Reveal section - scrub pinned
      const revealTextTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 0.5,
        }
      });

      revealTextTl
        .fromTo(revealText,
          { opacity: 0, scale: 0.5, y: 100, filter: 'blur(20px)' },
          { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1 }
        )
        .to(revealText, { duration: 0.5 }) // Hold
        .to(revealText,
          { opacity: 0, scale: 1.5, y: -100, filter: 'blur(20px)', duration: 1 }
        );
    }, section);

    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<!-- SECTION 2: Reveal Moment - Robot Gets Revealed -->
<section bind:this={section} class="relative min-h-svh flex items-center justify-center overflow-hidden" id="reveal">
  <!-- Floating text that appears during reveal - full width for dramatic effect -->
  <div bind:this={revealText} class="text-center reveal-text w-full px-4">
    <span class="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white/5 tracking-tight">EXCELLENCE</span>
  </div>
</section>

<!-- Transition Section - Spacer -->
<section class="relative h-[15svh] sm:h-[20svh]" id="transition-section">
  <div class="absolute inset-0 bg-linear-to-b from-transparent to-dark"></div>
</section>

<style>
  .reveal-text {
    will-change: transform, opacity;
    text-shadow: 0 0 100px rgba(159, 96, 121, 0.3);
  }
</style>
