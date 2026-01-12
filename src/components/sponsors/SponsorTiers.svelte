<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { requestScrollTriggerRefresh } from '../../lib/requestScrollTriggerRefresh';
  import type { SponsorsDataComponent, SponsorComponent } from '../../data/sponsors';

  gsap.registerPlugin(ScrollTrigger);

  export let sponsors: SponsorsDataComponent;

  let section: HTMLElement;
  let tierSections: HTMLDivElement[] = [];
  let sponsorCards: HTMLDivElement[] = [];

  let ctx: gsap.Context;

  function initAnimations() {
    if (!section) return;
    if (typeof ScrollTrigger === 'undefined') return;
    
    if (ctx) ctx.revert();

    ctx = gsap.context(() => {
      // Animate each tier section
      tierSections.forEach((tierSection, i) => {
        if (!tierSection) return;
        
        gsap.fromTo(tierSection,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tierSection,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true,
            }
          }
        );
      });

      // Animate sponsor cards with stagger
      sponsorCards.forEach((card, i) => {
        if (!card) return;
        
        gsap.fromTo(card,
          { opacity: 0, scale: 0.9, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true,
            }
          }
        );
      });
    }, section);

    requestScrollTriggerRefresh();
  }

  let handlePageLoad: (() => void) | null = null;

  onMount(async () => {
    if (typeof window === 'undefined') return;
    
    await tick();
    await new Promise(resolve => setTimeout(resolve, 200));
    
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

  let cardIndex = 0;
  function getCardIndex() {
    return cardIndex++;
  }
</script>

{#snippet sponsorCard(sponsor: SponsorComponent, cardClass: string, textClass: string, roundedClass: string, borderHoverClass: string, gradientClass: string, showTopBar: boolean, topBarClass: string)}
  <div class="aspect-3/2 {roundedClass} bg-linear-to-br from-white/5 to-white/2 border border-white/10 {borderHoverClass} transition-all duration-500 flex items-center justify-center overflow-hidden hover:scale-[1.02] relative">
    <div class="absolute inset-0 bg-linear-to-br {gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    {#if showTopBar}
      <div class="absolute top-0 left-0 w-full h-1 bg-linear-to-r {topBarClass} {roundedClass.replace('rounded', 'rounded-t')} opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>
    {/if}
    {#if sponsor.img}
      <img 
        src={sponsor.img.src}
        srcset={sponsor.img.srcSet?.attribute} 
        {...sponsor.img.attributes} 
        alt={sponsor.name + " logo"} 
        class="w-full h-full object-cover relative z-10" 
      />
    {:else}
      <span class="{textClass} font-display relative z-10 text-center px-2">{sponsor.name}</span>
    {/if}
  </div>
{/snippet}

<section bind:this={section} class="relative section-wrapper py-16 sm:py-20 md:py-28 overflow-hidden">
  <div class="absolute inset-0 bg-linear-to-b from-dark via-[#0b0808] to-dark"></div>
  
  <!-- Subtle grid pattern -->
  <div class="absolute inset-0 opacity-[0.015]" style="background-image: linear-gradient(rgba(159,96,121,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(159,96,121,0.5) 1px, transparent 1px); background-size: 40px 40px;"></div>
  
  <div class="section-content relative z-10 w-full">
    <!-- Sponsor Tiers -->
    <div class="space-y-16 sm:space-y-20 md:space-y-24">
      
      <!-- Platinum Tier -->
      {#if sponsors.platinum.length > 0}
      <div bind:this={tierSections[0]} class="tier-section" style="opacity: 0;" id="platinum">
        <div class="flex items-center gap-4 mb-8 sm:mb-10">
          <div class="w-12 sm:w-16 h-px bg-linear-to-r from-accent-light to-transparent"></div>
          <h2 class="font-display text-xl sm:text-2xl md:text-3xl font-bold text-accent-light flex items-center gap-3">
            <svg class="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Platinum Partners
          </h2>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {#each sponsors.platinum as sponsor}
            <div bind:this={sponsorCards[getCardIndex()]} class="sponsor-card group" style="opacity: 0;">
              {#if sponsor.url}
                <a href={sponsor.url} target="_blank" rel="noopener noreferrer" class="block">
                  {@render sponsorCard(sponsor, "sponsor-card", "text-gray-400 text-lg sm:text-xl", "rounded-2xl sm:rounded-3xl", "hover:border-accent/40", "from-accent/5 to-transparent", true, "from-accent via-accent-light to-transparent")}
                </a>
              {:else}
                {@render sponsorCard(sponsor, "sponsor-card", "text-gray-400 text-lg sm:text-xl", "rounded-2xl sm:rounded-3xl", "hover:border-accent/40", "from-accent/5 to-transparent", true, "from-accent via-accent-light to-transparent")}
              {/if}
            </div>
          {/each}
        </div>
      </div>
      {/if}

      <!-- Gold Tier -->
      {#if sponsors.gold.length > 0}
      <div bind:this={tierSections[1]} class="tier-section" style="opacity: 0;" id="gold">
        <div class="flex items-center gap-4 mb-8 sm:mb-10">
          <div class="w-12 sm:w-16 h-px bg-linear-to-r from-amber-400 to-transparent"></div>
          <h2 class="font-display text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 flex items-center gap-3">
            <svg class="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Gold Partners
          </h2>
        </div>
        <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {#each sponsors.gold as sponsor}
            <div bind:this={sponsorCards[getCardIndex()]} class="sponsor-card group" style="opacity: 0;">
              {#if sponsor.url}
                <a href={sponsor.url} target="_blank" rel="noopener noreferrer" class="block">
                  {@render sponsorCard(sponsor, "sponsor-card", "text-gray-500 text-sm sm:text-base", "rounded-xl sm:rounded-2xl", "hover:border-amber-400/40", "from-amber-400/5 to-transparent", true, "from-amber-400 via-amber-300 to-transparent")}
                </a>
              {:else}
                {@render sponsorCard(sponsor, "sponsor-card", "text-gray-500 text-sm sm:text-base", "rounded-xl sm:rounded-2xl", "hover:border-amber-400/40", "from-amber-400/5 to-transparent", true, "from-amber-400 via-amber-300 to-transparent")}
              {/if}
            </div>
          {/each}
        </div>
      </div>
      {/if}

      <!-- Silver Tier -->
      {#if sponsors.silver.length > 0}
      <div bind:this={tierSections[2]} class="tier-section" style="opacity: 0;" id="silver">
        <div class="flex items-center gap-4 mb-8 sm:mb-10">
          <div class="w-12 sm:w-16 h-px bg-linear-to-r from-gray-400 to-transparent"></div>
          <h2 class="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gray-400 flex items-center gap-3">
            <svg class="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Silver Partners
          </h2>
        </div>
        <div class="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
          {#each sponsors.silver as sponsor}
            <div bind:this={sponsorCards[getCardIndex()]} class="sponsor-card group" style="opacity: 0;">
              {#if sponsor.url}
                <a href={sponsor.url} target="_blank" rel="noopener noreferrer" class="block">
                  {@render sponsorCard(sponsor, "sponsor-card", "text-gray-600 text-xs sm:text-sm", "rounded-lg sm:rounded-xl", "hover:border-gray-400/30", "from-gray-400/5 to-transparent", false, "")}
                </a>
              {:else}
                {@render sponsorCard(sponsor, "sponsor-card", "text-gray-600 text-xs sm:text-sm", "rounded-lg sm:rounded-xl", "hover:border-gray-400/30", "from-gray-400/5 to-transparent", false, "")}
              {/if}
            </div>
          {/each}
        </div>
      </div>
      {/if}

      <!-- Bronze Tier -->
      {#if sponsors.bronze.length > 0}
      <div bind:this={tierSections[3]} class="tier-section" style="opacity: 0;" id="bronze">
        <div class="flex items-center gap-4 mb-8 sm:mb-10">
          <div class="w-12 sm:w-16 h-px bg-linear-to-r from-amber-700 to-transparent"></div>
          <h2 class="font-display text-xl sm:text-2xl md:text-3xl font-bold text-amber-700 flex items-center gap-3">
            <svg class="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Bronze Partners
          </h2>
        </div>
        <div class="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
          {#each sponsors.bronze as sponsor}
            <div bind:this={sponsorCards[getCardIndex()]} class="sponsor-card group" style="opacity: 0;">
              {#if sponsor.url}
                <a href={sponsor.url} target="_blank" rel="noopener noreferrer" class="block">
                  {@render sponsorCard(sponsor, "sponsor-card", "text-gray-600 text-[10px] sm:text-xs", "rounded-lg", "hover:border-amber-700/30", "from-amber-700/5 to-transparent", false, "")}
                </a>
              {:else}
                {@render sponsorCard(sponsor, "sponsor-card", "text-gray-600 text-[10px] sm:text-xs", "rounded-lg", "hover:border-amber-700/30", "from-amber-700/5 to-transparent", false, "")}
              {/if}
            </div>
          {/each}
        </div>
      </div>
      {/if}

    </div>
  </div>
</section>

<style>
  .sponsor-card {
    perspective: 1000px;
    transform-style: preserve-3d;
  }

  .tier-section {
    will-change: transform, opacity;
  }
</style>
