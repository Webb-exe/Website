<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';

  let progressBar: HTMLElement;
  let progress = 0;
  let visible = false;
  let handleScroll: (() => void) | null = null;
  let handleResize: (() => void) | null = null;

  onMount(() => {
    if (typeof window === 'undefined') return;

    const updateProgress = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight > 0) {
        progress = Math.min(scrollY / docHeight, 1);
        visible = scrollY > 100;
      } else {
        progress = 0;
        visible = false;
      }

      if (progressBar) {
        gsap.set(progressBar, { scaleX: progress });
      }
    };

    handleScroll = updateProgress;
    handleResize = updateProgress;

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Initial update
    updateProgress();
  });

  onDestroy(() => {
    if (handleScroll) {
      window.removeEventListener('scroll', handleScroll);
    }
    if (handleResize) {
      window.removeEventListener('resize', handleResize);
    }
  });
</script>

<!-- At very top of page, above everything including nav -->
<div 
  class="fixed top-0 left-0 right-0 z-[10000] h-[3px] pointer-events-none transition-opacity duration-300"
  class:opacity-0={!visible}
>
  <div 
    bind:this={progressBar}
    class="h-full bg-gradient-to-r from-accent via-accent-light to-accent origin-left"
    style="transform: scaleX(0); box-shadow: 0 2px 10px rgba(159, 96, 121, 0.6);"
  ></div>
</div>
