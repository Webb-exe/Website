<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import Subteam from "./subteam.svelte";
  import SubteamTouch from "./subteamTouch.svelte";
  import Hero from "./Hero.svelte";
  import CTA from "./cta.svelte";
  import { teams } from "../../data/team";
  import { isMobile } from "../../lib/isMobile";

  let originalWheelMultiplier: number;
  let mobile = false;
  let handleResize: (() => void) | null = null;

  // Initialize mobile detection immediately if window is available
  if (typeof window !== "undefined") {
    mobile = isMobile();
  }

  onMount(async () => {
    if (typeof window === "undefined") return;
    
    // Re-detect mobile on mount
    mobile = isMobile();
    
    // Slow down scroll speed for this page (only on desktop)
    if (!mobile) {
      const lenis = (window as any).lenis;
      if (lenis) {
        originalWheelMultiplier = lenis.options.wheelMultiplier;
        lenis.options.wheelMultiplier = 0.5; // Slower scroll (was 0.8)
      }
    }
    
    // Wait for all components to mount and set up their ScrollTriggers
    await tick();
    
    // Wait for layout to stabilize - important for Firefox
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Ensure ScrollTrigger is available and refresh
    if (typeof window !== "undefined" && (window as any).ScrollTrigger) {
      (window as any).ScrollTrigger.refresh();
    }
    
    // Listen for resize to update mobile state
    handleResize = () => {
      const wasMobile = mobile;
      mobile = isMobile();
      if (wasMobile !== mobile) {
        // Mobile state changed, might need to refresh
        if (typeof window !== "undefined" && (window as any).ScrollTrigger) {
          (window as any).ScrollTrigger.refresh();
        }
      }
    };
    
    window.addEventListener("resize", handleResize, { passive: true });
    
    // Also refresh on window load (for Firefox compatibility)
    const handleLoad = () => {
      if (typeof window !== "undefined" && (window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.refresh();
      }
    };
    window.addEventListener("load", handleLoad, { once: true });
  });

  onDestroy(() => {
    if (typeof window === "undefined") return;
    
    // Remove resize listener
    if (handleResize) {
      window.removeEventListener("resize", handleResize);
    }
    
    // Restore original scroll speed when leaving page (only if it was changed)
    if (!mobile && originalWheelMultiplier !== undefined) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.options.wheelMultiplier = originalWheelMultiplier;
      }
    }
  });
</script>

<Hero />

{#each teams as team}
  {#if mobile}
    <SubteamTouch title={team.name} description={team.description} members={team.members} />
  {:else}
    <Subteam title={team.name} description={team.description} members={team.members} />
  {/if}
{/each}
<CTA />
