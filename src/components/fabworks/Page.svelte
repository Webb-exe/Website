<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import gsap from "gsap";
  import ScrollProgress from "../shared/ScrollProgress.svelte";

  let section: HTMLElement;
  let decorativeGlow1: HTMLDivElement;
  let decorativeGlow2: HTMLDivElement;
  let cornerDecors: HTMLDivElement[] = [];
  let copied = false;
  let ctx: gsap.Context;
  const promoCode = "ftc359";

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(promoCode);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  onMount(async () => {
    if (typeof window === "undefined") return;
    await tick();

    ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ delay: 0.3 });

      // Glows pulse in
      if (decorativeGlow1 && decorativeGlow2) {
        loadTl.fromTo(
          [decorativeGlow1, decorativeGlow2],
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 1, ease: "power2.out", stagger: 0.2 },
          0
        );
      }

      // Corner decorations
      const validCornerDecors = cornerDecors.filter((d) => d);
      if (validCornerDecors.length > 0) {
        loadTl.fromTo(
          validCornerDecors,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          0.3
        );
      }

      // Animate content in
      loadTl.fromTo(
        ".fabworks-animate",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
        },
        0.4
      );

      // Animate cards
      loadTl.fromTo(
        ".info-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        },
        0.7
      );
    }, section);
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<ScrollProgress />

<section
  bind:this={section}
  class="relative min-h-svh bg-dark pt-28 sm:pt-32 md:pt-36 pb-20 overflow-hidden"
>
  <!-- Decorative glows -->
  <div
    bind:this={decorativeGlow1}
    class="absolute top-1/4 left-1/4 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] bg-accent/8 rounded-full blur-[120px] sm:blur-[150px] md:blur-[180px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    style="opacity: 0;"
  ></div>
  <div
    bind:this={decorativeGlow2}
    class="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-accent/6 rounded-full blur-[100px] sm:blur-[120px] md:blur-[150px] translate-x-1/2 translate-y-1/2 pointer-events-none"
    style="opacity: 0;"
  ></div>

  <!-- Decorative corner elements -->
  <div
    bind:this={cornerDecors[0]}
    class="hidden sm:block absolute top-20 left-8 w-12 md:w-16 h-12 md:h-16 border-l-2 border-t-2 border-accent/20 z-10"
    style="opacity: 0;"
  ></div>
  <div
    bind:this={cornerDecors[1]}
    class="hidden sm:block absolute top-20 right-8 w-12 md:w-16 h-12 md:h-16 border-r-2 border-t-2 border-accent/20 z-10"
    style="opacity: 0;"
  ></div>

  <div class="section-wrapper relative z-10">
    <div class="section-content max-w-4xl">
      <!-- Fabworks Logo -->
      <div class="fabworks-animate mb-8 sm:mb-10" style="opacity: 0;">
        <img 
          src="/fabworks-logo.svg" 
          alt="Fabworks" 
          class="h-6 sm:h-8 md:h-10 w-auto"
        />
      </div>

      <!-- Main Headline -->
      <h1 class="fabworks-animate font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 leading-tight" style="opacity: 0;">
        Fabworks Promo Code — <span class="text-accent-light">5% Off</span><br class="hidden sm:block" /> Laser Cutting Orders
      </h1>

      <!-- Description -->
      <p class="fabworks-animate text-gray-300 text-base sm:text-lg leading-relaxed mb-12 sm:mb-16 max-w-2xl" style="opacity: 0;">
        Use promo code <span class="font-bold text-accent-light">{promoCode.toUpperCase()}</span> at{" "}
        <a
          href="https://www.fabworks.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-white underline decoration-accent/50 hover:decoration-accent-light hover:text-accent-light transition-colors"
        >
          fabworks.com
        </a>{" "}
        to receive <span class="font-bold text-white">5% off</span> your laser cutting order
        (up to $250). You'll save on precision fabrication while supporting the{" "}
        <span class="font-bold text-accent-light">359 Webb.exe</span> program.
      </p>

      <!-- Info Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card 1: What is your code? -->
        <div
          class="info-card bg-dark-secondary border border-accent/20 hover:border-accent/40 rounded-xl p-6 sm:p-8 transition-colors"
          style="opacity: 0;"
        >
          <h3 class="font-display text-lg sm:text-xl font-semibold text-white mb-4">
            What is your code?
          </h3>
          <button
            on:click={copyCode}
            class="flex items-center gap-3 group cursor-pointer"
          >
            <span class="text-accent-light font-mono text-base sm:text-lg font-semibold">{promoCode.toUpperCase()}</span>
            <span
              class="p-2 rounded-lg border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all"
            >
              {#if copied}
                <svg
                  class="w-4 h-4 text-green-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              {:else}
                <svg
                  class="w-4 h-4 text-accent group-hover:text-accent-light transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              {/if}
            </span>
          </button>
        </div>

        <!-- Card 2: Do you get a kickback? -->
        <div
          class="info-card bg-dark-secondary border border-accent/20 hover:border-accent/40 rounded-xl p-6 sm:p-8 transition-colors"
          style="opacity: 0;"
        >
          <h3 class="font-display text-lg sm:text-xl font-semibold text-white mb-4">
            Do you get a kickback?
          </h3>
          <p class="text-gray-400 text-sm sm:text-base leading-relaxed">
            Yes. When you use our code, <span class="font-bold text-accent-light">359 Webb.exe receives a small kickback</span> that helps fund our engineering and competition programs.
          </p>
        </div>

        <!-- Card 3: What is Fabworks? -->
        <div
          class="info-card bg-dark-secondary border border-accent/20 hover:border-accent/40 rounded-xl p-6 sm:p-8 transition-colors"
          style="opacity: 0;"
        >
          <h3 class="font-display text-lg sm:text-xl font-semibold text-white mb-4">
            What is Fabworks?
          </h3>
          <p class="text-gray-400 text-sm sm:text-base leading-relaxed">
            Fabworks is a U.S.-based laser cutting and manufacturing service for makers, engineers, and businesses. They specialize in precision cutting of sheet metal and aluminum tubing, along with finishing services such as powder coating.
          </p>
        </div>
      </div>

      <!-- Back link -->
      <div class="mt-16 sm:mt-20">
        <a
          href="/sponsors"
          class="inline-flex items-center gap-2 text-gray-400 hover:text-accent-light transition-colors group"
        >
          <svg
            class="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Sponsors
        </a>
      </div>
    </div>
  </div>
</section>
