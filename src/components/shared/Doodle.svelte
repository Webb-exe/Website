<script lang="ts">
  // Hand-drawn accents. Colored via `currentColor`; size via class.
  type Kind = "sparkle" | "heart" | "squiggle" | "arrow" | "arrow-right" | "loop" | "circle";
  let { kind, class: className = "", style = "" }: { kind: Kind; class?: string; style?: string } = $props();
</script>

{#if kind === "sparkle"}
  <svg class={className} {style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 1.5c.6 6.3 4.2 9.9 10.5 10.5C16.2 12.6 12.6 16.2 12 22.5 11.4 16.2 7.8 12.6 1.5 12 7.8 11.4 11.4 7.8 12 1.5Z" />
  </svg>
{:else if kind === "heart"}
  <svg class={className} {style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 21.2C7.4 17.7 2.6 13.6 2.6 8.9 2.6 5.9 4.9 3.7 7.6 3.7c1.8 0 3.3 1 4.4 2.6 1.1-1.6 2.6-2.6 4.4-2.6 2.7 0 5 2.2 5 5.2 0 4.7-4.8 8.8-9.4 12.3Z" />
  </svg>
{:else if kind === "squiggle"}
  <svg class={className} {style} viewBox="0 0 120 14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true" preserveAspectRatio="none">
    <path d="M2 8c8-7 14 7 22 0s14 7 22 0 14 7 22 0 14 7 22 0 14 7 22 0" />
  </svg>
{:else if kind === "arrow"}
  <svg class={className} {style} viewBox="0 0 100 60" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 6c14 32 44 44 88 40" />
    <path d="M78 34l14 12-17 7" />
  </svg>
{:else if kind === "arrow-right"}
  <svg class={className} {style} viewBox="0 0 100 40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3 22c26-10 56 4 92-2" />
    <path d="M84 12l11 8-12 9" />
  </svg>
{:else if kind === "loop"}
  <svg class={className} {style} viewBox="0 0 220 90" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
    <path d="M4 66C28 14 66 4 78 42s-26 48-18 12 44-56 68-18 40 36 86-6" />
  </svg>
{:else if kind === "circle"}
  <svg class={className} {style} viewBox="0 0 200 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true" preserveAspectRatio="none">
    <path d="M118 8C60 2 8 18 8 42s58 36 116 30 72-24 68-40S166 6 118 8" />
  </svg>
{/if}
