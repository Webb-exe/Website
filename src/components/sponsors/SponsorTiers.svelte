<script lang="ts">
  import type { SponsorsDataComponent, SponsorComponent, SponsorTier } from "../../data/sponsors";
  import { reveal } from "../../lib/reveal";

  let { sponsors }: { sponsors: SponsorsDataComponent } = $props();

  // Tiles get smaller as tiers descend.
  const tiers: { key: SponsorTier; label: string; grid: string }[] = [
    { key: "platinum", label: "Platinum", grid: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" },
    { key: "gold", label: "Gold", grid: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" },
    { key: "silver", label: "Silver", grid: "grid-cols-2 sm:grid-cols-4 lg:grid-cols-5" },
    { key: "bronze", label: "Bronze", grid: "grid-cols-3 sm:grid-cols-5 lg:grid-cols-6" },
  ];

  const visible = tiers.filter((t) => sponsors[t.key].length > 0);
</script>

{#snippet tile(sponsor: SponsorComponent, i: number)}
  <div class="polaroid {i % 2 === 0 ? 'tilt-l' : 'tilt-r'}">
    {#if i % 3 === 0}<span class="tape"></span>{/if}
    <div class="photo aspect-[4/3]! flex items-center justify-center bg-white! p-5">
      {#if sponsor.img}
        <img
          src={sponsor.img.src}
          srcset={sponsor.img.srcSet?.attribute}
          {...sponsor.img.attributes}
          alt={`${sponsor.name} logo`}
          loading="lazy"
          class="max-h-full max-w-full object-contain"
        />
      {:else}
        <span class="display text-2xl text-center text-ink">{sponsor.name}</span>
      {/if}
    </div>
    <p class="caption text-center">{sponsor.name}</p>
  </div>
{/snippet}

<section class="bg-dark relative section-wrapper py-20 sm:py-28">
  <div class="section-content flex flex-col gap-20 sm:gap-24">
    {#each visible as tier}
      <div id={tier.key} class="scroll-mt-24" use:reveal data-reveal>
        <div class="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-dashed line pb-5">
          <h2 class="display text-5xl sm:text-6xl">{tier.label}</h2>
          <span class="hand text-2xl">{sponsors[tier.key].length} {sponsors[tier.key].length === 1 ? "partner" : "partners"}</span>
        </div>

        <ul class="mt-10 grid gap-8 {tier.grid}">
          {#each sponsors[tier.key] as sponsor, i}
            <li class="pt-3">
              {#if sponsor.url}
                <a
                  href={sponsor.url}
                  target={sponsor.openNewTab ? "_blank" : undefined}
                  rel={sponsor.openNewTab ? "noopener noreferrer" : undefined}
                  class="block"
                  aria-label={sponsor.name}
                >
                  {@render tile(sponsor, i)}
                </a>
              {:else}
                {@render tile(sponsor, i)}
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</section>
