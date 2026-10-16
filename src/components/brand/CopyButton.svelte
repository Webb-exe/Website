<script lang="ts">
  import * as Tooltip from "../../lib/components/ui/tooltip";
  import { Copy, Check } from "@lucide/svelte";

  let { value, label = value }: { value: string; label?: string } = $props();
  let copied = $state(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      copied = true;
      setTimeout(() => (copied = false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }
</script>

<Tooltip.Provider delayDuration={150}>
  <Tooltip.Root>
    <Tooltip.Trigger
      onclick={copy}
      class="group inline-flex cursor-pointer items-center gap-2 whitespace-nowrap font-mono text-xs transition-colors hover:text-pink sm:text-sm"
      aria-label={`Copy ${value}`}
    >
      <span>{label}</span>
      {#if copied}
        <Check class="size-3.5 text-pink" aria-hidden="true" />
      {:else}
        <Copy class="size-3.5 t-faint transition-colors group-hover:text-pink" aria-hidden="true" />
      {/if}
    </Tooltip.Trigger>
    <Tooltip.Content>{copied ? "Copied!" : "Copy"}</Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
