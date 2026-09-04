<script lang="ts">
  import { reveal } from "../../lib/reveal";
  import { contact } from "../../data/contact";
</script>

<!-- Compact band; the full details live on /contact. -->
<section id="contact" class="bg-dark relative section-wrapper py-20 sm:py-28 scroll-mt-16">
  <div class="section-content grid gap-8 lg:grid-cols-12 lg:items-end" use:reveal data-reveal>
    <div class="lg:col-span-7">
      <span class="label">Contact</span>
      <h2 class="display mt-5 text-6xl sm:text-7xl lg:text-8xl">Say hi.</h2>
    </div>
    <div class="lg:col-span-5 flex flex-col items-start gap-3 lg:items-end lg:text-right">
      <a href={`mailto:${contact.email}`} class="display text-2xl sm:text-3xl link">{contact.email}</a>
      <a href="/contact" class="text-sm t-muted hover:text-pink transition-colors">Address, map, socials, and more</a>
    </div>
  </div>
</section>
