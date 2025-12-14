<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import Subteam from "./subteam.svelte";
  import Hero from "./Hero.svelte";
  import CTA from "./cta.svelte";
  import { teams } from "../../data/team";

  let originalWheelMultiplier: number;

  onMount(async () => {
    if (typeof window === "undefined") return;
    // Slow down scroll speed for this page
    const lenis = (window as any).lenis;
    if (lenis) {
      originalWheelMultiplier = lenis.options.wheelMultiplier;
      lenis.options.wheelMultiplier = 0.5; // Slower scroll (was 0.8)
    }
    
    // Wait for all components to mount and set up their ScrollTriggers
    await tick();
    // setTimeout(() => {
    //   ScrollTrigger.refresh();
    // }, 500);
  });

  onDestroy(() => {
    if (typeof window === "undefined") return;
    // Restore original scroll speed when leaving page
    const lenis = (window as any).lenis;
    if (lenis && originalWheelMultiplier !== undefined) {
      lenis.options.wheelMultiplier = originalWheelMultiplier;
    }
  });

  const softwareMembers = [
    {
      name: "John Doe",
      role: "Team Lead",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageSrc: "/jerry.png",
    },
    {
      name: "Jane Smith",
      role: "Software Engineer",
      bio: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageSrc: "/jerry.png",
    },
    {
      name: "Alex Johnson",
      role: "Mechanical Engineer",
      bio: "Ut enim ad minim veniam, quis nostrud exercitation.",
      imageSrc: "/jerry.png",
    },
    {
      name: "Sarah Williams",
      role: "Electrical Engineer",
      bio: "Duis aute irure dolor in reprehenderit in voluptate.",
      imageSrc: "/jerry.png",
    },
    {
      name: "Mike Brown",
      role: "Designer",
      bio: "Excepteur sint occaecat cupidatat non proident.",
      imageSrc: "/jerry.png",
    },
    {
      name: "Emily Davis",
      role: "Programmer",
      bio: "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
      imageSrc: "/jerry.png",
    },
    {
      name: "Chris Wilson",
      role: "Build Lead",
      bio: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur.",
      imageSrc: "/jerry.png",
    },
    {
      name: "Amanda Lee",
      role: "Strategy",
      bio: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.",
      imageSrc: "/jerry.png",
    },
  ];
</script>

<Hero />

{#each teams as team}
    <Subteam title={team.name} description={team.description} members={team.members} />
{/each}
<CTA />
