<script lang="ts">
  import type { TeamMemberComponent } from "../../data/team";

  let { member, tilt = "l", taped = false }: { member: TeamMemberComponent; tilt?: "l" | "r"; taped?: boolean } = $props();
</script>

<article class="polaroid {tilt === 'l' ? 'tilt-l' : 'tilt-r'}">
  {#if taped}<span class="tape"></span>{/if}
  {#if member.img}
    <img
      srcset={member.img.srcSet.attribute}
      {...member.img.attributes}
      alt={`Photo of ${member.name}`}
      loading="lazy"
    />
  {:else}
    <div class="photo flex items-center justify-center font-hand text-4xl text-pink">{member.name.charAt(0)}</div>
  {/if}
  <div class="caption">
    <p class="text-xl leading-none">{member.name}</p>
    {#if member.role}
      <p class="mt-1.5 font-display text-[11px] leading-snug text-ink/60">{member.role}</p>
    {/if}
  </div>
</article>
