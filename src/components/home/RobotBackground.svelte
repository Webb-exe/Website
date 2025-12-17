<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { requestScrollTriggerRefresh } from "../../lib/requestScrollTriggerRefresh";
  import type { GetImageResult } from "astro";

  gsap.registerPlugin(ScrollTrigger);

  // Props - refs passed from parent to avoid ID-based queries
  export let heroRef: HTMLElement | undefined = undefined;
  export let aboutRef: HTMLElement | undefined = undefined;

  export let image: GetImageResult;

  let container: HTMLDivElement;
  let heroRobot: HTMLImageElement;
  let bgOverlay: HTMLDivElement;

  let ctx: gsap.Context;

  onMount(async () => {
    await tick();

    // Wait for refs to be available
    if (!heroRef || !aboutRef) {
      console.warn("RobotBackground: heroRef or aboutRef not provided");
      return;
    }

    ctx = gsap.context(() => {
      // Robot cinematic reveal - smooth scrub (plays both ways)
      if (heroRobot && bgOverlay) {
        const robotTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef,
            start: "top top",
            endTrigger: aboutRef,
            end: "top 30%",
            scrub: 1.5,
          },
        });

        robotTl
          .to(heroRobot, { scale: 1.05, duration: 0.5, ease: "none" }, 0)
          .to(
            heroRobot,
            {
              scale: 1.12,
              filter: "blur(3px)",
              duration: 1,
              ease: "power1.in",
            },
            0.5
          )
          .to(bgOverlay, { opacity: 0.3, duration: 1 }, 0.5)
          .to(
            heroRobot,
            { scale: 1.2, filter: "blur(8px)", duration: 1, ease: "power1.in" },
            1.5
          )
          .to(bgOverlay, { opacity: 0.6, duration: 1 }, 1.5)
          .to(
            heroRobot,
            {
              scale: 1.35,
              filter: "blur(20px)",
              duration: 1.5,
              ease: "power2.in",
            },
            2.5
          )
          .to(bgOverlay, { opacity: 1, duration: 1.5 }, 2.5);
      }
    }, container);

    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<!-- Fixed Robot Background -->
<div bind:this={container} class="fixed inset-0 -z-10" id="robot-bg">
  <img
    bind:this={heroRobot}
    srcset={image.srcSet.attribute}
    {...image.attributes}
    alt="359 Robot"
    class="hero-robot w-full h-full object-cover object-center origin-center"
  />
  <!-- Dynamic overlay that changes with scroll -->
  <div
    bind:this={bgOverlay}
    class="absolute inset-0 bg-dark pointer-events-none"
    style="opacity: 0;"
  ></div>
  <!-- Vignette -->
  <div
    class="absolute inset-0 pointer-events-none"
    style="background: radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.5) 100%);"
  ></div>
</div>

<style>
  .hero-robot {
    will-change: transform, filter;
  }
</style>
