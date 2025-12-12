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
  let contactLabel: HTMLSpanElement;
  let contactTitle1: HTMLSpanElement;
  let contactTitle2: HTMLSpanElement;
  let contactDesc: HTMLParagraphElement;
  let contactBtn: HTMLAnchorElement;
  let decorativeGlow: HTMLDivElement;

  let ctx: gsap.Context;

  onMount(async () => {
    await tick();
    
    ctx = gsap.context(() => {
      // Contact section timeline - scrub pinned
      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.5,
        }
      });

      // Label drops in
      contactTl.fromTo(contactLabel,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.3 }
      );

      // Title lines
      contactTl.fromTo(contactTitle1,
        { opacity: 0, scale: 0.5, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3 },
        '-=0.1'
      );
      contactTl.fromTo(contactTitle2,
        { opacity: 0, scale: 1.5, y: -30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3 },
        '-=0.2'
      );

      // Description
      contactTl.fromTo(contactDesc,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.3 },
        '-=0.1'
      );

      // Button
      contactTl.fromTo(contactBtn,
        { opacity: 0, scale: 0.5, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3 },
        '-=0.1'
      );
      
      // Hold at end
      contactTl.to({}, { duration: 0.5 });

      // Glow pulse animation (continuous)
      gsap.to(decorativeGlow, {
        scale: 1.2,
        opacity: 0.2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, section);

    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<!-- SECTION 6: Contact - Big CTA -->
<section bind:this={section} class="relative min-h-svh section-wrapper overflow-hidden flex items-center scroll-mt-20 sm:scroll-mt-28" id="contact">
  <div class="absolute inset-0 bg-linear-to-b from-dark via-[#0f0a0c] to-dark"></div>
  
  <!-- Decorative glow - scaled for different screens -->
  <div bind:this={decorativeGlow} class="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[450px] md:w-[600px] h-[200px] sm:h-[300px] md:h-[400px] bg-accent/10 rounded-full blur-[100px] sm:blur-[120px] md:blur-[150px]"></div>
  
  <div class="section-content-cta text-center relative z-10 w-full py-12 sm:py-16 md:py-20">
    <span bind:this={contactLabel} class="font-display text-[10px] sm:text-xs text-accent uppercase tracking-[0.2em] sm:tracking-[0.3em] block mb-4 sm:mb-6">Get Involved</span>
    <h2 class="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-4 sm:mb-6 overflow-hidden">
      <span bind:this={contactTitle1} class="inline-block title-text">Join the</span><br/><span bind:this={contactTitle2} class="text-accent-light inline-block title-text">Mission</span>
    </h2>
    <p bind:this={contactDesc} class="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl max-w-md sm:max-w-lg md:max-w-xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2">
      Interested in sponsoring, mentoring, or collaborating with our team? Let's build the future together.</p>
    
    <a bind:this={contactBtn} href="mailto:team@359webb.exe" class="contact-btn group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 text-sm sm:text-base font-medium uppercase tracking-wider sm:tracking-widest bg-accent text-white rounded-full hover:bg-accent-light hover:text-dark transition-all duration-300 hover:scale-105 active:scale-95">
      Get in Touch
      <svg class="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
  </div>
</section>

<style>
  .contact-btn {
    box-shadow: 0 0 0 rgba(159, 96, 121, 0);
    transition: box-shadow 0.3s ease;
  }
  
  .contact-btn:hover {
    box-shadow: 0 0 40px rgba(159, 96, 121, 0.4);
  }

  .title-text {
    transform-style: preserve-3d;
    will-change: transform, opacity;
  }
</style>
