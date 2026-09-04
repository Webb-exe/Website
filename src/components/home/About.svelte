<script lang="ts">
  import { onMount } from "svelte";
  import { gsap, ScrollTrigger, prefersReducedMotion } from "../../lib/gsap";
  import { reveal } from "../../lib/reveal";
  import Doodle from "../shared/Doodle.svelte";

  const stats = [
    { value: 15, label: "years running" },
    { value: 50, label: "members" },
    { value: 20, label: "awards" },
  ];

  let statsEl: HTMLUListElement;

  onMount(() => {
    if (prefersReducedMotion()) return;
    const trigger = ScrollTrigger.create({
      trigger: statsEl,
      start: "top 85%",
      once: true,
      onEnter: () => {
        statsEl.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          const counter = { value: 0 };
          gsap.to(counter, {
            value: Number(el.dataset.count),
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => (el.textContent = `${Math.round(counter.value)}+`),
          });
        });
      },
    });
    return () => trigger.kill();
  });
</script>

<section id="about" class="bg-dark relative section-wrapper py-24 sm:py-32 scroll-mt-16">
  <div class="section-content">
    <div class="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div class="lg:col-span-7" use:reveal data-reveal>
        <span class="label">About</span>
        <h2 class="display mt-5 text-5xl sm:text-6xl lg:text-7xl">
          Who <span class="relative inline-block">we are<Doodle kind="squiggle" class="absolute -bottom-2 left-0 h-3 w-full t-accent" /></span>
        </h2>
        <p class="mt-8 max-w-xl font-serif-custom text-2xl leading-snug sm:text-3xl">
          A student-run FIRST Tech Challenge team from The Webb Schools. Every season we design, build, and program a
          robot from scratch, then take it to meets across Southern California.
        </p>
      </div>
    </div>

    <ul bind:this={statsEl} class="mt-16 flex flex-wrap gap-x-14 gap-y-8 border-t border-dashed line pt-10" use:reveal={{ children: "li", stagger: 0.1 }}>
      {#each stats as stat}
        <li data-reveal>
          <span class="display block text-5xl tabular-nums sm:text-6xl" data-count={stat.value}>0+</span>
          <span class="hand mt-1 block text-xl">{stat.label}</span>
        </li>
      {/each}
    </ul>
  </div>
</section>
