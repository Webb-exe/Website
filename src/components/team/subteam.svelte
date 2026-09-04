<script lang="ts">
  import type { TeamSubteamComponent } from "../../data/team";
  import MemberProfile from "./MemberProfile.svelte";
  import { reveal } from "../../lib/reveal";

  let { team }: { team: TeamSubteamComponent } = $props();

  const id = team.name.toLowerCase().replace(/\s+/g, "-");
  const count = team.members.length;
</script>

<section {id} class="relative bg-dark section-wrapper py-20 sm:py-24 scroll-mt-16 border-t border-dashed line">
  <div class="section-content grid gap-12 lg:grid-cols-12">
    <header class="lg:col-span-4 lg:sticky lg:top-28 lg:self-start" use:reveal data-reveal>
      <span class="hand text-2xl">{count} {count === 1 ? "member" : "members"}</span>
      <h2 class="display mt-2 text-5xl sm:text-6xl">{team.name}</h2>
      <p class="mt-5 leading-relaxed t-muted">{team.description}</p>
    </header>

    <ul
      class="lg:col-span-8 grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4"
      use:reveal={{ children: "li", stagger: 0.06, y: 24 }}
    >
      {#each team.members as member, i}
        <li data-reveal class="pt-3">
          <MemberProfile {member} tilt={i % 2 === 0 ? "l" : "r"} taped={i % 3 === 0} />
        </li>
      {/each}
    </ul>
  </div>
</section>
