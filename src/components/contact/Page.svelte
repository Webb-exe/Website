<script lang="ts">
  import { contact } from "../../data/contact";
  import { socials } from "../../data/socials";
  import { reveal } from "../../lib/reveal";
  import Doodle from "../shared/Doodle.svelte";

  const channels = [
    { label: "Instagram", handle: "@359webb.exe", href: socials.instagram },
    { label: "YouTube", handle: "@ftc359", href: socials.youtube },
    { label: "GitHub", handle: "Webb-exe", href: socials.github },
    { label: "FTC Scout", handle: "Team 359", href: socials.ftcscout },
  ];
</script>

<section class="bg-dark relative section-wrapper flex min-h-svh flex-col pt-40 pb-10 sm:pt-52 sm:pb-14 overflow-hidden">
  <div class="section-content relative flex flex-1 flex-col">
    <span class="enter label" style="--i: 0">Contact</span>
    <h1 class="enter display mt-6 text-6xl sm:text-8xl lg:text-9xl" style="--i: 1">Get in touch</h1>
    <p class="enter mt-6 max-w-xl text-lg leading-relaxed t-muted" style="--i: 2">
      Sponsorships, collaborations, questions about joining, or anything else. Email is the fastest way to reach us.
    </p>
    <a href={`mailto:${contact.email}`} class="enter display mt-8 inline-block text-3xl sm:text-5xl text-pink hover:text-blush transition-colors" style="--i: 3">
      {contact.email}
    </a>

    <a href="#where" class="enter scroll-cue mt-auto flex w-fit items-center gap-3 pt-16" style="--i: 4" aria-label="Scroll to location and socials">
      <span class="scroll-cue-arrow">
        <Doodle kind="arrow-right" class="h-8 w-5 rotate-90 t-accent" />
      </span>
      <span class="hand text-2xl">scroll for more</span>
    </a>
  </div>
</section>

<style>
  .scroll-cue-arrow { animation: bob 1.8s ease-in-out infinite; }
  @keyframes bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
  }
  @media (prefers-reduced-motion: reduce) { .scroll-cue-arrow { animation: none; } }
</style>

<section id="where" class="bg-dark relative section-wrapper py-20 sm:py-28 scroll-mt-16">
  <div class="section-content grid gap-14 lg:grid-cols-12">
    <!-- Where -->
    <div class="lg:col-span-5" use:reveal data-reveal>
      <span class="label">Where we are</span>
      <h2 class="display mt-5 text-4xl sm:text-5xl">{contact.school}</h2>
      <address class="mt-5 not-italic leading-relaxed t-muted">
        {#each contact.addressLines as line}<span class="block">{line}</span>{/each}
      </address>
      <p class="hand mt-4 text-2xl">the robotics room, most afternoons</p>
      <p class="mt-6 max-w-prose leading-relaxed t-muted">
        During the season we also compete at FTC meets across {contact.region}. Follow along on Instagram for
        where we will be next.
      </p>
      <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" class="link mt-6 inline-block">Open in Google Maps</a>
    </div>

    <div class="lg:col-span-7" use:reveal={{ y: 30 }} data-reveal>
      <figure class="polaroid tilt-r mx-auto w-full max-w-xl lg:ml-auto lg:mr-0">
        <span class="tape"></span>
        <div class="photo aspect-[4/3]! overflow-hidden" data-lenis-prevent>
          <iframe
            title="Map to The Webb Schools"
            src={contact.mapsEmbedUrl}
            class="h-full w-full border-0 grayscale-[0.4] contrast-[0.95]"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
        </div>
        <figcaption class="caption">{contact.addressLines.join(", ")}</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="bg-dark relative section-wrapper py-20 sm:py-28">
  <div class="section-content grid gap-14 lg:grid-cols-12">
    <!-- Follow -->
    <div class="lg:col-span-5" use:reveal data-reveal>
      <span class="label">Follow along</span>
      <h2 class="display mt-5 text-4xl sm:text-5xl">Find us online</h2>
      <ul class="mt-8 divide-y divide-dashed divide-white/12" use:reveal={{ children: "li", stagger: 0.06, y: 10 }}>
        {#each channels as c}
          <li data-reveal>
            <a href={c.href} target="_blank" rel="noopener noreferrer" class="group flex items-baseline justify-between gap-6 py-3.5">
              <span class="display text-2xl transition-colors group-hover:text-pink">{c.label}</span>
              <span class="hand text-xl t-muted">{c.handle}</span>
            </a>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Reasons to write -->
    <div class="lg:col-span-7 lg:pl-12 grid gap-10 sm:grid-cols-2" use:reveal={{ children: ".reason", stagger: 0.08 }}>
      <div class="reason" data-reveal>
        <span class="label">Sponsoring</span>
        <h3 class="display mt-4 text-3xl">Support the team</h3>
        <p class="mt-3 leading-relaxed t-muted">
          Sponsorship covers parts, tools, competition fees, and travel. We are glad to talk through what a partnership
          could look like.
        </p>
        <div class="mt-5 flex flex-wrap gap-3">
          <a href={`mailto:${contact.email}?subject=Sponsorship Inquiry`} class="btn">Sponsorship inquiry</a>
          <a href="/sponsors" class="link self-center text-sm">Our sponsors</a>
        </div>
      </div>
      <div class="reason" data-reveal>
        <span class="label">Joining</span>
        <h3 class="display mt-4 text-3xl">Webb students</h3>
        <p class="mt-3 leading-relaxed t-muted">
          Pick Robotics as your afternoon activity for the Fall or Winter season. No experience needed, everyone starts
          somewhere.
        </p>
      </div>
      <div class="reason" data-reveal>
        <span class="label">Outreach</span>
        <h3 class="display mt-4 text-3xl">Collaborate</h3>
        <p class="mt-3 leading-relaxed t-muted">
          Other teams, schools, and community groups: we are up for demos, workshops, and shared events.
        </p>
        <a href={`mailto:${contact.email}?subject=Collaboration Inquiry`} class="link mt-5 inline-block">Collaboration inquiry</a>
      </div>
      <div class="reason" data-reveal>
        <span class="label">Press and media</span>
        <h3 class="display mt-4 text-3xl">Logos and photos</h3>
        <p class="mt-3 leading-relaxed t-muted">Brand assets are on the brand kit page. For anything else, email us.</p>
        <a href="/brand" class="link mt-5 inline-block">Brand kit</a>
      </div>
    </div>
  </div>
</section>
