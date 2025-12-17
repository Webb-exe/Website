<script lang="ts">
  import type { TeamMemberComponent } from "../../data/team";

  export let member:TeamMemberComponent
</script>

<article
  class="group relative w-[240px] sm:w-[280px] rounded-xl bg-white/2 border border-white/6 overflow-hidden transition-all duration-500 hover:bg-white/4 hover:border-accent/20 hover:shadow-[0_8px_40px_-12px_rgba(159,96,121,0.3)] hover:-translate-y-1"
>
  <!-- Gradient overlay on hover -->
  <div
    class="absolute inset-0 bg-linear-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
  ></div>

  <!-- Image container -->
  <div
    class="relative aspect-square bg-linear-to-br from-white/4 to-transparent overflow-hidden"
  >
    {#if member.img}
      <img
      srcset={member.img.srcSet.attribute}
      {...member.img.attributes}
        class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <!-- Image overlay gradient -->
      <div
        class="absolute inset-0 bg-linear-to-t from-dark/60 via-transparent to-transparent"
      ></div>
    {:else}
      <div
        class="w-full h-full bg-linear-to-br from-accent/10 via-white/[0.03] to-transparent flex items-center justify-center"
      >
        <div
          class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center"
        >
          <span class="font-display text-xl font-bold text-accent-light/50">
            {member.name.charAt(0)}
          </span>
        </div>
      </div>
    {/if}

    <!-- Accent corner -->
    <div
      class="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-accent/40 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    ></div>
  </div>

  <!-- Content -->
  <div class="relative p-3 sm:p-4">
    <!-- Name with subtle accent line -->
    <div class="flex items-center gap-2">
      <div
        class="w-1 h-4 bg-linear-to-b from-accent to-accent/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
      <h3
        class="font-display text-base sm:text-lg font-semibold text-white tracking-tight group-hover:text-accent-light transition-colors duration-300"
      >
        {member.name}
      </h3>
    </div>

    {#if member.role}
      <div
        class="mt-1 ml-3 text-xs text-accent-light/80 font-medium tracking-wide"
      >
        {member.role}
      </div>
    {/if}


    <!-- Bottom accent line -->
    <div
      class="mt-3 h-px bg-linear-to-r from-accent/30 via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
    ></div>
  </div>
</article>
