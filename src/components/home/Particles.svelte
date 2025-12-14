<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import gsap from 'gsap';
  import { requestScrollTriggerRefresh } from '../../lib/requestScrollTriggerRefresh';

  let particlesContainer: HTMLDivElement;

  let ctx: gsap.Context;

  onMount(async () => {
    await tick();
    
    ctx = gsap.context(() => {
      const particles = particlesContainer.querySelectorAll('.particle');
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: `random(-100, 100)`,
          x: `random(-50, 50)`,
          opacity: `random(0.1, 0.5)`,
          duration: `random(3, 6)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3
        });
      });
    }, particlesContainer);

    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<!-- Floating Particles -->
<!-- Keep particles above the robot background, but below all content/nav/progress -->
<div bind:this={particlesContainer} class="fixed inset-0 pointer-events-none z-0 overflow-hidden" id="particles">
  <div class="particle absolute w-1 h-1 bg-accent/30 rounded-full" style="left: 10%; top: 20%;"></div>
  <div class="particle absolute w-2 h-2 bg-accent/20 rounded-full" style="left: 80%; top: 30%;"></div>
  <div class="particle absolute w-1.5 h-1.5 bg-accent-light/20 rounded-full" style="left: 20%; top: 70%;"></div>
  <div class="particle absolute w-1 h-1 bg-accent/40 rounded-full" style="left: 70%; top: 80%;"></div>
  <div class="particle absolute w-2 h-2 bg-accent-light/15 rounded-full" style="left: 50%; top: 50%;"></div>
  <div class="particle absolute w-1 h-1 bg-accent/25 rounded-full" style="left: 30%; top: 40%;"></div>
</div>

<style>
  .particle {
    will-change: transform, opacity;
  }
</style>
