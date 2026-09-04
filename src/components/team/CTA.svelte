<script lang="ts">
  import { reveal } from "../../lib/reveal";
  import { contact } from "../../data/contact";
</script>

<section class="bg-dark relative section-wrapper py-24 sm:py-32">
  <div class="section-content grid gap-12 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-dashed divide-white/12">
    <div class="lg:pr-16" use:reveal data-reveal>
      <span class="label">Webb students</span>
      <h2 class="display mt-5 text-4xl sm:text-5xl">Want to join?</h2>
      <p class="mt-5 max-w-prose leading-relaxed t-muted">
        We are always looking for new members. Pick Robotics as your afternoon activity for the Fall or Winter season
        and come find us in the robotics room.
      </p>
    </div>

    <div class="lg:pl-16" use:reveal={{ delay: 0.1 }} data-reveal>
      <span class="label">Everyone else</span>
      <h2 class="display mt-5 text-4xl sm:text-5xl">Support the team</h2>
      <p class="mt-5 max-w-prose leading-relaxed t-muted">
        Partner with us on outreach events, sponsor the team, or just say hello. We enjoy connecting with the wider
        robotics community.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href={`mailto:${contact.email}?subject=Sponsorship Inquiry`} class="btn">Sponsor us</a>
        <a href="/contact" class="link self-center text-sm">Contact page</a>
      </div>
    </div>
  </div>
</section>
