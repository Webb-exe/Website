<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { requestScrollTriggerRefresh } from '../../lib/requestScrollTriggerRefresh';

  gsap.registerPlugin(ScrollTrigger);

  let section: HTMLElement;
  let heading: HTMLHeadingElement;
  let webbSection: HTMLDivElement;
  let nonWebbSection: HTMLDivElement;
  let sponsorBtn: HTMLAnchorElement;
  let contactBtn: HTMLAnchorElement;

  let ctx: gsap.Context;

  onMount(async () => {
    await tick();
    
    ctx = gsap.context(() => {
      // Fade in animation on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.fromTo(heading,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
      tl.fromTo(webbSection,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );
      tl.fromTo(nonWebbSection,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );
    }, section);

    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<section bind:this={section} class="relative section-wrapper py-16 sm:py-20 md:py-24 overflow-hidden">
  <div class="section-content-cta relative z-10 w-full">
    <!-- Heading -->
    <h2 
      bind:this={heading}
      class="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-center mb-12 sm:mb-16 md:mb-20"
      style="opacity: 0;"
    >
      Get Involved
    </h2>

    <!-- Two Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
      <!-- For Webb Students -->
      <div 
        bind:this={webbSection}
        class="group relative rounded-xl bg-white/2 border border-white/6 p-6 sm:p-8 md:p-10 hover:bg-white/4 hover:border-accent/20 transition-all duration-500"
        style="opacity: 0;"
      >
        <!-- Accent corner decoration -->
        <div class="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/40 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div class="mb-4">
          <span class="font-display text-xs sm:text-sm text-accent uppercase tracking-[0.2em] font-semibold">
            For Webb Students
          </span>
        </div>
        
        <h3 class="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
          Interested in robotics?
        </h3>
        
        <p class="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
          Join the Webb robotics program and build something amazing. We're always looking for new members to join our team. To join, please select Robotics for your afternoon activity for either your Fall or Winter season.
        </p>
    
      </div>

      <!-- Non-Webb Students -->
      <div 
        bind:this={nonWebbSection}
        class="group relative rounded-xl bg-white/2 border border-white/6 p-6 sm:p-8 md:p-10 hover:bg-white/4 hover:border-accent/20 transition-all duration-500"
        style="opacity: 0;"
      >
        <!-- Accent corner decoration -->
        <div class="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/40 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div class="mb-4">
          <span class="font-display text-xs sm:text-sm text-accent uppercase tracking-[0.2em] font-semibold">
            Not at Webb?
          </span>
        </div>
        
        <h3 class="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
          Support Our Mission
        </h3>
        
        <p class="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
            You can still be part of our journey. Partner with us on 
            collaboration events, sponsor our team, or just say hi — 
            we love connecting with the robotics community.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a 
            bind:this={sponsorBtn}
            href="mailto:team@359webb.exe?subject=Sponsorship Inquiry" 
            class="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-wider bg-accent text-white rounded-full hover:bg-accent-light hover:text-dark transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Sponsor Us
            <svg class="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          
          <a 
            bind:this={contactBtn}
            href="mailto:team@359webb.exe?subject=Collaboration Inquiry" 
            class="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-wider border-2 border-accent/40 text-accent-light rounded-full hover:border-accent hover:bg-accent/10 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Contact Us
            <svg class="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  a {
    box-shadow: 0 0 0 rgba(159, 96, 121, 0);
    transition: box-shadow 0.3s ease;
  }
  
  a:hover {
    box-shadow: 0 0 20px rgba(159, 96, 121, 0.3);
  }
</style>

