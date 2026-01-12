<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { requestScrollTriggerRefresh } from '../../lib/requestScrollTriggerRefresh';
  import { socials } from '../../data/socials';

  gsap.registerPlugin(ScrollTrigger);

  let footer: HTMLElement;
  let footerContent: HTMLDivElement;
  let footerBottom: HTMLDivElement;

  let ctx: gsap.Context;

  onMount(async () => {
    await tick();
    
    // Ensure footer is always visible immediately - no animation dependency
    // This is critical for the team page where ScrollTriggers may not fire correctly
    if (footerContent) {
      gsap.set(footerContent, { opacity: 1, y: 0 });
    }
    if (footerBottom) {
      gsap.set(footerBottom, { opacity: 1, scaleX: 1 });
    }
    
    // Wait for all ScrollTriggers to be set up, then optionally add animation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!footer || !footerContent || !footerBottom) return;
    
    // Check if footer is already in viewport - if so, skip animation
    const footerRect = footer.getBoundingClientRect();
    const isAlreadyVisible = footerRect.top < window.innerHeight;
    
    if (!isAlreadyVisible) {
      ctx = gsap.context(() => {
        // Footer timeline - replayable animation (optional enhancement)
        const footerTl = gsap.timeline({
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
            invalidateOnRefresh: true,
          }
        });

        footerTl.fromTo(footerContent,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );

        footerTl.fromTo(footerBottom,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );
      }, footer);
    }

    requestScrollTriggerRefresh();
    
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<!-- Footer -->
<footer bind:this={footer} class="relative z-[60] py-10 sm:py-12 md:py-16 section-wrapper bg-[#080808] border-t border-white/5">
  <div class="section-content">
    <div bind:this={footerContent} class="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8" style="opacity: 1;">
      <div class="flex items-baseline gap-1">
        <img src="/logo-word.svg" alt="359 Webb.exe Logo" class="w-24 h-24" />
      </div>
      
      <p class="text-gray-600 text-xs sm:text-sm order-3 sm:order-2">Creators · Innovators · Solvers</p>
      
      <div class="flex gap-4 sm:gap-5 order-2 sm:order-3">
        <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="w-6 h-6 sm:w-5 sm:h-5 text-gray-600 hover:text-accent-light transition-colors p-0.5 sm:p-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="18" cy="6" r="1"/>
          </svg>
        </a>
        <a href={socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="w-6 h-6 sm:w-5 sm:h-5 text-gray-600 hover:text-accent-light transition-colors p-0.5 sm:p-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="5" width="20" height="14" rx="3" />
            <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none"/>
          </svg>
        </a>
        <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="w-6 h-6 sm:w-5 sm:h-5 text-gray-600 hover:text-accent-light transition-colors p-0.5 sm:p-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
        </a>
        <a href={socials.ftcscout} target="_blank" rel="noopener noreferrer" aria-label="FTC Scout" class="w-6 h-6 sm:w-5 sm:h-5 text-gray-600 hover:text-accent-light transition-colors p-0.5 sm:p-0">
          <svg viewBox="0 0 512 512" fill="currentColor">
            <path d="M128 32h32c17.7 0 32 14.3 32 32V96H96V64c0-17.7 14.3-32 32-32zm64 96V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V388.9c0-34.6 9.4-68.6 27.2-98.3C40.9 267.8 49.7 242.4 53 216L60.5 156c2-16 15.6-28 31.8-28H192zm227.8 0c16.1 0 29.8 12 31.8 28L459 216c3.3 26.4 12.1 51.8 25.8 74.6c17.8 29.7 27.2 63.7 27.2 98.3V448c0 17.7-14.3 32-32 32H352c-17.7 0-32-14.3-32-32V128h99.8zM320 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V96H320V64zm-32 64V288H224V128h64z"/>
          </svg>
        </a>
      </div>
    </div>
    
    <div bind:this={footerBottom} class="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-white/5 text-center" style="opacity: 1;">
      <p class="text-gray-700 text-[10px] sm:text-xs">© 2025 Team 359 Webb.exe. All rights reserved.</p>
    </div>
  </div>
</footer>
