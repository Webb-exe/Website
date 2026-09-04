<script lang="ts">
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

<button onclick={copy} class="group inline-flex items-center gap-3 font-mono text-sm" title="Copy to clipboard">
  <span>{label}</span>
  <span class="hand text-base t-faint transition-colors group-hover:text-pink">{copied ? "copied!" : "copy"}</span>
</button>
