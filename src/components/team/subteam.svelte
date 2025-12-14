<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import HorizontalScroll from "./horizontalScroll.svelte";
  import MemberProfile from "./memberProfile.svelte";

  gsap.registerPlugin(ScrollTrigger);

  export let title: string = "Software";
  export let description: string =
    "Building the brains of our robot through code, control systems, and autonomous programming.";
  export let members: Array<{
    name: string;
    role?: string;
    bio?: string;
    imageSrc?: string;
  }> = [];

  // Generate unique ID for this instance
  const instanceId = Math.random().toString(36).slice(2, 9);

  let wrapperEl: HTMLElement;
  let blackOverlayEl: HTMLElement;
  let titleWrapperEl: HTMLElement;
  let titleEl: HTMLElement;
  let accentLineEl: HTMLElement;
  let decorDotEl: HTMLElement;
  let subtitleEl: HTMLElement;
  let scrollContentEl: HTMLElement;

  let ctx: gsap.Context;

  onMount(async () => {
    await tick();

    // Wait for layout
    await new Promise((resolve) => setTimeout(resolve, 100));

    ctx = gsap.context(() => {
      // Set initial states
      gsap.set(blackOverlayEl, { opacity: 1 });
      gsap.set(titleEl, { opacity: 0, scale: 1.15, filter: "blur(12px)" });
      gsap.set(decorDotEl, { opacity: 0, scale: 0 });
      gsap.set(accentLineEl, { opacity: 0, scaleX: 0 });
      gsap.set(subtitleEl, { opacity: 0, y: 10 });
      gsap.set(scrollContentEl, { opacity: 0 });

      // Simple scroll-based animation using the wrapper as trigger
      // This doesn't depend on HorizontalScroll internals

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        //   markers: true, // Enable markers to debug
          id: `subteam-${instanceId}`,
        },
      });

      // Intro: 0% - 15%
      tl.to(blackOverlayEl, { opacity: 0, duration: 0.03 }, 0);
      tl.to(
        titleEl,
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.05 },
        0.01,
      );
      tl.to(decorDotEl, { opacity: 1, scale: 1, duration: 0.03 }, 0.03);
      tl.to(accentLineEl, { opacity: 1, scaleX: 1, duration: 0.03 }, 0.04);
      tl.to(subtitleEl, { opacity: 1, y: 0, duration: 0.03 }, 0.05);

      // Elements fade, title shrinks: 15% - 25%
      tl.to(decorDotEl, { opacity: 0, duration: 0.03 }, 0.15);
      tl.to(accentLineEl, { opacity: 0, scaleX: 0, duration: 0.03 }, 0.16);
      tl.to(subtitleEl, { opacity: 0, y: -20, duration: 0.03 }, 0.17);

      // Title to corner + content appears: 25% - 40%
      tl.to(
        titleEl,
        {
          scale: 0.5,
          x: () => {
            const rect = titleWrapperEl.getBoundingClientRect();
            const titleRect = titleEl.getBoundingClientRect();
            return -rect.width / 2 + (titleRect.width * 0.5) / 2 + 48;
          },
          y: () => {
            const titleRect = titleEl.getBoundingClientRect();
            const scaledHeight = titleRect.height * 0.5;
            return -window.innerHeight / 2 + scaledHeight / 2 + 80;
          },
          duration: 0.15,
        },
        0.25,
      );
      tl.to(scrollContentEl, { opacity: 1, duration: 0.08 }, 0.32);

      // Hold: 40% - 80%

      // Exit: 80% - 100%
      tl.to(scrollContentEl, { opacity: 0, duration: 0.05 }, 0.8);
      tl.to(titleEl, { scale: 1, x: 0, y: 0, duration: 0.08 }, 0.8);
      tl.to(
        titleEl,
        { opacity: 0, scale: 1.15, filter: "blur(10px)", duration: 0.08 },
        0.88,
      );
      tl.to(blackOverlayEl, { opacity: 1, duration: 0.08 }, 0.92);
    }, wrapperEl);

    // Refresh after all components mount
    ScrollTrigger.refresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<div bind:this={wrapperEl} class="relative" data-subteam={instanceId}>
  <!-- Black overlay -->
  <div
    bind:this={blackOverlayEl}
    class="absolute inset-0 bg-dark z-50 pointer-events-none"
    style="opacity: 1;"
  ></div>

  <HorizontalScroll
    mode="full"
    startOffset="380%"
    scrub={1.5}
    sectionClass="justify-center"
    trackClass="h-[55vh]"
  >
    <div
      slot="non-scroll-content-above"
      class="w-full h-screen absolute inset-0 pointer-events-none z-20"
    >
      <div
        bind:this={titleWrapperEl}
        class="w-full h-full flex flex-col items-center justify-center"
      >
        <div
          bind:this={decorDotEl}
          class="w-3 h-3 rounded-full bg-accent mb-6 shadow-[0_0_20px_rgba(159,96,121,0.6)]"
          style="opacity: 0; transform: scale(0);"
        ></div>

        <h2
          bind:this={titleEl}
          class="title-text font-display text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-extrabold tracking-tight"
          style="opacity: 0;"
        >
          <span
            class="bg-linear-to-br from-white via-white to-accent-light bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(159,96,121,0.3)]"
          >
            {title}
          </span>
        </h2>

        <div
          bind:this={accentLineEl}
          class="mt-4 h-0.5 w-32 sm:w-48 md:w-64 bg-linear-to-r from-transparent via-accent to-transparent origin-center"
          style="opacity: 0; transform: scaleX(0);"
        ></div>

        <p
          bind:this={subtitleEl}
          class="mt-6 text-sm sm:text-base uppercase tracking-[0.3em] text-accent-light/70 font-medium"
          style="opacity: 0;"
        >
          Team Members
        </p>
      </div>
    </div>

    <div
      slot="scroll-content"
      bind:this={scrollContentEl}
      class="flex items-center gap-6 sm:gap-8 h-full pl-10 sm:pl-16"
      style="opacity: 0;"
    >
      <div
        class="shrink-0 w-[60vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] h-full flex items-center"
      >
        <div class="max-w-lg">
          <div class="relative">
            <div
              class="absolute -left-4 top-0 bottom-0 w-0.5 bg-linear-to-b from-accent via-accent/50 to-transparent"
            ></div>

            <div class="pl-5">
              <p
                class="text-xs uppercase tracking-[0.2em] text-accent mb-3 font-medium"
              >
                About the Team
              </p>
              <p
                class="text-lg sm:text-xl md:text-2xl text-white/90 font-display font-medium leading-relaxed"
              >
                {description}
              </p>

              <div class="mt-6 flex gap-8">
                <div>
                  <p
                    class="text-3xl sm:text-4xl font-display font-bold text-accent-light"
                  >
                    {members.length}
                  </p>
                  <p
                    class="text-xs uppercase tracking-wider text-gray-500 mt-1"
                  >
                    Members
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {#each members as member}
        <MemberProfile
          name={member.name}
          role={member.role ?? ""}
          imageSrc={member.imageSrc}
        />
      {/each}

      <div class="shrink-0 w-[25vw]"></div>
    </div>
  </HorizontalScroll>
</div>

<style>
  .title-text {
    will-change: transform, filter, opacity;
    transform-origin: center center;
  }
</style>
