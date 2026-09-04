<script lang="ts">
  import { reveal } from "../../lib/reveal";
  import SectionHeader from "./SectionHeader.svelte";

  let { spacing }: { spacing: { unit: string; scale: number[] } } = $props();
</script>

<section id="spacing" class="bg-dark relative section-wrapper py-20 sm:py-28">
  <div class="section-content">
    <SectionHeader eyebrow="spacing" title="Spacing scale" subtitle={`1${spacing.unit} = 16px`} />

    <ul class="mt-12 flex flex-col divide-y divide-dashed divide-white/10" use:reveal={{ children: "li", stagger: 0.04, y: 8 }}>
      {#each spacing.scale as value}
        <li class="flex items-center gap-6 py-3" data-reveal>
          <span class="w-16 shrink-0 font-mono text-sm">{value}{spacing.unit}</span>
          <div class="flex-1"><div class="h-4 rounded-sm bg-pink" style="width: min(100%, {value * 2}rem);"></div></div>
          <span class="w-14 shrink-0 text-right font-mono text-xs t-faint">{value * 16}px</span>
        </li>
      {/each}
    </ul>
  </div>
</section>
