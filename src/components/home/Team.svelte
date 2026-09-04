<script lang="ts">
  import { teams } from "../../data/team";
  import { reveal } from "../../lib/reveal";

  // Team page is unlinked for now; rows are display-only.
  const rows = teams.map((t) => ({ name: t.name, count: t.members.length }));
</script>

<section id="team" class="bg-dark relative section-wrapper py-24 sm:py-32 scroll-mt-16">
  <div class="section-content grid gap-14 lg:grid-cols-12">
    <div class="lg:col-span-6" use:reveal data-reveal>
      <span class="label">Team</span>
      <h2 class="display mt-6 text-5xl sm:text-6xl lg:text-7xl">The people behind the bot</h2>
      <p class="mt-6 max-w-prose leading-relaxed t-muted">
        Students, mentors, and alumni across {rows.length} subteams. Everyone builds, everyone learns, and everyone
        has a hand in what ends up on the field.
      </p>
    </div>

    <ul class="lg:col-span-6 lg:pl-8 divide-y divide-dashed divide-white/12 self-end" use:reveal={{ children: "li", stagger: 0.05, y: 10 }}>
      {#each rows as row}
        <li data-reveal>
          <div class="flex items-baseline justify-between gap-6 py-3.5">
            <span class="display text-2xl sm:text-3xl">{row.name}</span>
            <span class="hand text-xl t-muted">{row.count} {row.count === 1 ? "member" : "members"}</span>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</section>
