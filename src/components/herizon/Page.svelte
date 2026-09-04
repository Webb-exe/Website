<script lang="ts">
  import { herizon as ev } from "../../data/herizon";
  import { contact } from "../../data/contact";
  import { socials } from "../../data/socials";
  import { reveal } from "../../lib/reveal";
  import Doodle from "../shared/Doodle.svelte";

  const program = [
    { time: "12:30 pm", title: "Check-in and welcome", note: "Doors open" },
    { time: "Afternoon", title: "Talks and panels", note: "Women working and studying in STEM share their paths" },
    { time: "Afternoon", title: "Hands-on workshops", note: "Small group sessions led by students and engineers" },
    { time: "6:00 pm", title: "Closing", note: "Wrap up and goodbyes" },
  ];
</script>

<!-- Hero -->
<section class="bg-dark relative section-wrapper pt-40 pb-16 sm:pt-52 sm:pb-24 overflow-hidden">
  <div class="section-content relative">
    <span class="enter label" style="--i: 0">A conference for women in STEM · Claremont, CA</span>
    <h1 class="enter display mt-6 text-[3.6rem] leading-[0.92] xs:text-7xl sm:text-8xl lg:text-9xl" style="--i: 1">
      {ev.name} <span class="text-pink">{ev.year}</span>
    </h1>
    <p class="enter mt-8 max-w-2xl font-serif-custom text-2xl leading-snug sm:text-3xl" style="--i: 2">
      {ev.tagline}
    </p>

    <div class="enter mt-12 grid gap-8 border-t border-dashed line pt-8 sm:grid-cols-3" style="--i: 3">
      <div>
        <span class="label">Date</span>
        <p class="display mt-3 text-3xl sm:text-4xl">{ev.dateLabel}</p>
      </div>
      <div>
        <span class="label">Time</span>
        <p class="display mt-3 text-3xl sm:text-4xl">{ev.timeLabel}</p>
      </div>
      <div>
        <span class="label">Venue</span>
        <p class="display mt-3 text-3xl sm:text-4xl">{ev.venue}</p>
        <p class="mt-1 text-sm t-muted">{ev.addressLines.join(", ")}</p>
      </div>
    </div>

    <div class="enter mt-10 flex flex-wrap items-center gap-4" style="--i: 4">
      <a href={ev.calendarUrl} target="_blank" rel="noopener noreferrer" class="btn">Add to calendar</a>
      <a href="#program" class="link text-sm">See the program</a>
    </div>

    <a href="#about" class="enter scroll-cue mt-20 inline-flex items-center gap-3 sm:mt-28" style="--i: 5" aria-label="Scroll to learn more">
      <Doodle kind="arrow-right" class="h-8 w-5 rotate-90 t-accent" />
      <span class="hand text-2xl">scroll for more</span>
    </a>
  </div>
</section>

<style>
  .scroll-cue svg { animation: bob 1.8s ease-in-out infinite; }
  @keyframes bob {
    0%, 100% { transform: rotate(90deg) translateX(0); }
    50% { transform: rotate(90deg) translateX(6px); }
  }
  @media (prefers-reduced-motion: reduce) { .scroll-cue svg { animation: none; } }
</style>

<!-- About -->
<section class="bg-dark relative section-wrapper py-20 sm:py-28">
  <div class="section-content grid gap-12 lg:grid-cols-12">
    <div class="lg:col-span-5" use:reveal data-reveal>
      <span class="label">About</span>
      <h2 class="display mt-5 text-4xl sm:text-5xl">An afternoon at Harvey Mudd</h2>
      <p class="mt-5 max-w-prose leading-relaxed t-muted">
        Herizon STEM brings students together with women who study and work in science, technology, engineering,
        and math. Hear how they got where they are, try things hands-on, and meet people on the same path.
      </p>
      <p class="mt-4 max-w-prose leading-relaxed t-muted">
        Hosted on the Harvey Mudd College campus by the Harvey Mudd Society of Women Engineers and FTC 359 Webb.exe.
      </p>
    </div>

    <ul class="lg:col-span-7 lg:pl-12 grid gap-10 sm:grid-cols-3" use:reveal={{ children: "li", stagger: 0.1 }}>
      <li data-reveal>
        <span class="display block text-5xl text-pink">01</span>
        <h3 class="display mt-3 text-2xl">Talks</h3>
        <p class="mt-2 text-sm leading-relaxed t-muted">Speakers and panels from across STEM fields.</p>
      </li>
      <li data-reveal>
        <span class="display block text-5xl text-pink">02</span>
        <h3 class="display mt-3 text-2xl">Workshops</h3>
        <p class="mt-2 text-sm leading-relaxed t-muted">Hands-on sessions you can join, no experience needed.</p>
      </li>
      <li data-reveal>
        <span class="display block text-5xl text-pink">03</span>
        <h3 class="display mt-3 text-2xl">Community</h3>
        <p class="mt-2 text-sm leading-relaxed t-muted">Meet students, mentors, and engineers from around Claremont.</p>
      </li>
    </ul>
  </div>
</section>

<!-- Program -->
<section id="program" class="bg-dark relative section-wrapper py-20 sm:py-28 scroll-mt-16">
  <div class="section-content">
    <div class="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-dashed line pb-5" use:reveal data-reveal>
      <h2 class="display text-5xl sm:text-6xl">Program</h2>
      <span class="hand text-2xl">{ev.dateLabel} · {ev.timeLabel}</span>
    </div>

    <ol class="mt-10 divide-y divide-dashed divide-white/12" use:reveal={{ children: "li", stagger: 0.08, y: 10 }}>
      {#each program as item}
        <li data-reveal class="grid gap-3 py-8 sm:grid-cols-12 sm:items-baseline sm:gap-10 sm:py-10">
          <span class="label sm:col-span-2">{item.time}</span>
          <span class="display text-3xl sm:col-span-5 sm:text-4xl">{item.title}</span>
          <span class="leading-relaxed t-muted sm:col-span-5 sm:pt-1">{item.note}</span>
        </li>
      {/each}
    </ol>
    <p class="mt-10 text-sm t-faint" use:reveal data-reveal>Speakers, session times, and rooms will be posted here as they are confirmed.</p>
  </div>
</section>

<!-- Venue -->
<section class="bg-dark relative section-wrapper py-20 sm:py-28">
  <div class="section-content grid gap-14 lg:grid-cols-12">
    <div class="lg:col-span-5" use:reveal data-reveal>
      <span class="label">Venue</span>
      <h2 class="display mt-5 text-4xl sm:text-5xl">{ev.venue}</h2>
      <address class="mt-5 not-italic leading-relaxed t-muted">
        {#each ev.addressLines as line}<span class="block">{line}</span>{/each}
      </address>
      <p class="mt-6 max-w-prose leading-relaxed t-muted">
        Harvey Mudd is one of the Claremont Colleges, a short drive from The Webb Schools. Building names, room
        numbers, and parking information will be shared before the event.
      </p>
      <a href={ev.mapsUrl} target="_blank" rel="noopener noreferrer" class="link mt-6 inline-block">Open in Google Maps</a>
    </div>

    <div class="lg:col-span-7" use:reveal={{ y: 30 }} data-reveal>
      <figure class="polaroid tilt-r mx-auto w-full max-w-xl lg:ml-auto lg:mr-0">
        <span class="tape"></span>
        <div class="photo aspect-[4/3]! overflow-hidden" data-lenis-prevent>
          <iframe
            title="Map to Harvey Mudd College"
            src={ev.mapsEmbedUrl}
            class="h-full w-full border-0 grayscale-[0.4] contrast-[0.95]"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
        </div>
        <figcaption class="caption">{ev.addressLines.join(", ")}</figcaption>
      </figure>
    </div>
  </div>
</section>

<!-- Organizers -->
<section class="bg-dark relative section-wrapper py-20 sm:py-28">
  <div class="section-content grid gap-14 lg:grid-cols-12 lg:items-center">
    <div class="lg:col-span-5" use:reveal data-reveal>
      <span class="label">Organizers</span>
      <h2 class="display mt-5 text-4xl sm:text-5xl">Harvey Mudd SWE and 359 Webb.exe</h2>
      <p class="mt-5 max-w-prose leading-relaxed t-muted">
        The Harvey Mudd College chapter of the Society of Women Engineers and FTC 359 Webb.exe, the robotics team at
        The Webb Schools.
      </p>
    </div>

    <ul class="lg:col-span-7 grid grid-cols-2 items-center gap-10 sm:gap-16 lg:pl-8" use:reveal={{ children: "li", stagger: 0.12, y: 16 }}>
      {#each ev.presenters as p}
        <li data-reveal class="flex flex-col items-center text-center">
          <a href={p.url} target={p.url.startsWith("http") ? "_blank" : undefined} rel={p.url.startsWith("http") ? "noopener noreferrer" : undefined} class="block transition-transform hover:-rotate-2 hover:-translate-y-1 duration-300">
            <img src={p.logo} alt={`${p.name} logo`} class="h-40 w-40 object-contain sm:h-52 sm:w-52" loading="lazy" />
          </a>
          <span class="hand mt-4 text-xl">{p.short}</span>
        </li>
      {/each}
    </ul>
  </div>
</section>

<!-- Contact -->
<section class="bg-dark relative section-wrapper py-24 sm:py-32">
  <div class="section-content grid gap-12 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-dashed divide-white/12">
    <div class="lg:pr-16" use:reveal data-reveal>
      <span class="label">Contact</span>
      <h2 class="display mt-5 text-4xl sm:text-5xl">Speak, volunteer, or bring a group</h2>
      <p class="mt-5 max-w-prose leading-relaxed t-muted">
        Teachers, mentors, and anyone interested in speaking or helping out on the day, email the organizers.
      </p>
      <a href={`mailto:${contact.email}?subject=Herizon STEM 2026`} class="link mt-8 inline-block">{contact.email}</a>
    </div>

    <div class="lg:pl-16" use:reveal={{ delay: 0.1 }} data-reveal>
      <span class="label">Updates</span>
      <h2 class="display mt-5 text-4xl sm:text-5xl">Follow along</h2>
      <p class="mt-5 max-w-prose leading-relaxed t-muted">
        Speaker announcements and event updates go out on the 359 Webb.exe Instagram.
      </p>
      <a href={socials.instagram} target="_blank" rel="noopener noreferrer" class="link mt-8 inline-block">@359webb.exe</a>
    </div>
  </div>
</section>
