<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';

  export let text: string = "Scroll to explore";
  export let show: boolean = true;

  let element: HTMLElement;
  let visible = true;
  let ctx: gsap.Context;
  let handleScroll: (() => void) | null = null;

  onMount(() => {
    if (!element) return;

    ctx = gsap.context(() => {
      // Bounce animation
      gsap.to(element.querySelector('.scroll-arrow'), {
        y: 6,
        duration: 0.8,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true
      });
    }, element);

    // Fade out on scroll - handle separately for proper cleanup
    handleScroll = () => {
      const scrollY = window.scrollY;
      visible = scrollY <= 100;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  });

  onDestroy(() => {
    ctx?.revert();
    if (handleScroll) {
      window.removeEventListener('scroll', handleScroll);
    }
  });
</script>

{#if show}
  <div 
    bind:this={element}
    class="scroll-hint fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 transition-opacity duration-500"
    class:opacity-0={!visible}
    class:pointer-events-none={!visible}
  >
    <span class="text-[10px] uppercase tracking-[0.25em] text-white/40">{text}</span>
    <div class="scroll-arrow flex flex-col items-center gap-1">
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="1.5"
        class="text-accent/60"
      >
        <path d="M7 13l5 5 5-5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 7l5 5 5-5" stroke-linecap="round" stroke-linejoin="round" class="opacity-40"/>
      </svg>
    </div>
  </div>
{/if}

<style>
  .scroll-hint {
    animation: fadeIn 1s ease-out 1.5s both;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
</style>
