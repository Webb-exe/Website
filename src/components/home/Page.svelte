<script lang="ts">
  // Page.svelte - Orchestrates refs between components
  // Each component manages its own animations via onMount/onDestroy + gsap.context
  // The debounced requestScrollTriggerRefresh() ensures only one refresh happens

  import RobotBackground from "./RobotBackground.svelte";
  import Particles from "./Particles.svelte";
  import Hero from "./Hero.svelte";
  import Reveal from "./Reveal.svelte";
  import About from "./About.svelte";
  import Values from "./Values.svelte";
  import Team from "./Team.svelte";
  import Contact from "./Contact.svelte";
  import type { GetImageResult } from "astro";

  // Section refs - collected from child components
  let heroRef: HTMLElement | undefined;
  let aboutRef: HTMLElement | undefined;
  let valuesRef: HTMLElement | undefined;
  let teamRef: HTMLElement | undefined;
  let contactRef: HTMLElement | undefined;

  export let RobotImage: GetImageResult;
</script>

<!-- Background needs hero and about refs for cross-section animation -->
<RobotBackground {heroRef} {aboutRef} image={RobotImage} />

<Particles />

<!-- Content layer - z-20 keeps it above particles (z-0) but below progress (z-40) and nav (z-50) -->
<main class="relative z-20">
  <!-- Sections export their refs -->
  <Hero bind:sectionRef={heroRef} />
  <Reveal />
  <About bind:sectionRef={aboutRef} />
  <Values bind:sectionRef={valuesRef} />
  <Team bind:sectionRef={teamRef} />
  <Contact bind:sectionRef={contactRef} />
</main>
