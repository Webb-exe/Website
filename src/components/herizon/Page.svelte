<script lang="ts">
  import { herizon as ev } from "../../data/herizon";
  import { contact } from "../../data/contact";
  import { socials } from "../../data/socials";
  import { reveal } from "../../lib/reveal";

  type Workshop = { title: string; host: string; room: string };
  type Item = { time: string; title: string; place: string; note: string; workshops?: Workshop[] };

  const program: Item[] = [
    {
      time: "12:00 – 12:30 pm",
      title: "Check-in",
      place: "Outside The Cafe, Thomas-Garrett Plaza",
      note: "Get your wristband. Check-in stays open the whole afternoon, so come when you can.",
    },
    {
      time: "12:30 – 12:40 pm",
      title: "Reception",
      place: "B480 Drinkward Recital Hall",
      note: "Opening address: meet Webb Robotics and HMC SWE and get ready for the day.",
    },
    {
      time: "12:40 – 1:10 pm",
      title: "Women in STEM panel",
      place: "B480 Drinkward Recital Hall",
      note: "Women working in STEM share real projects, the problems they ran into, and how they got there.",
    },
    {
      time: "1:20 – 2:10 pm",
      title: "Workshops A",
      place: "Various rooms",
      note: "Each group attends one hands-on workshop.",
      workshops: [
        { title: "Paper Airplane Showdown", host: "Webb.exe · FTC 359", room: "B460" },
        { title: "Drive It Your Way", host: "Gaulbots · FTC 358", room: "B450" },
        { title: "Ctrl Your Robot", host: "TechATTACK Robotics · FTC 22471", room: "B470" },
        { title: "Bridge Building Competition", host: "Marlbots · FTC 3526", room: "B442" },
      ],
    },
    {
      time: "2:20 – 2:50 pm",
      title: "Students in STEM panel",
      place: "Shakespeare Theater",
      note: "Students share what studying and building in STEM looks like.",
    },
    {
      time: "2:50 – 3:20 pm",
      title: "Networking social",
      place: "Outside patio",
      note: "Meet other students, relax, and grab some snacks.",
    },
    {
      time: "3:20 – 4:10 pm",
      title: "Workshops B",
      place: "Various rooms",
      note: "Your second hands-on workshop of the day.",
      workshops: [
        { title: "Rocketry with Bluebird", host: "Bluebird Aerospace", room: "B442" },
        { title: "Ask SWE Anything", host: "Society of Women Engineers @ HMC", room: "B460" },
        { title: "Code, CAD & Control", host: "Blueprints · FTC 7767", room: "B450" },
      ],
    },
    {
      time: "4:20 – 4:50 pm",
      title: "Main speaker and Q&A",
      place: "B480 Drinkward Recital Hall",
      note: "Closing talk, then your questions.",
    },
  ];

  const expect = [
    { title: "Opening address", body: "Learn about Webb Robotics and HMC SWE, and get excited for the busy day ahead." },
    { title: "Workshops", body: "Split into groups for hands-on workshops, each teaching a new engineering skill." },
    { title: "Panels", body: "A professional and a student panel on real engineering projects and the problems people solved." },
    { title: "Networking", body: "Meet like-minded students, take a breather, and enjoy snacks." },
  ];
</script>

<!-- Hero -->
<section class="bg-dark relative section-wrapper pt-40 pb-16 sm:pt-52 sm:pb-24 overflow-hidden">
  <div class="section-content relative">
    <span class="enter label" style="--i: 0">A conference for women in STEM · Claremont, CA</span>
    <h1 class="enter display mt-6 text-[3.6rem] leading-[1.02] xs:text-7xl sm:text-8xl lg:text-9xl" style="--i: 1">
      {ev.name} <span class="text-pink">{ev.year}</span>
    </h1>
    <p class="enter mt-8 max-w-2xl font-serif-custom text-2xl leading-snug sm:text-3xl" style="--i: 2">
      {ev.tagline}
    </p>

    <div class="enter mt-12 grid gap-8 border-t border-dashed line pt-8 sm:grid-cols-3" style="--i: 3">
      <div>
        <span class="label">Date</span>
        <p class="title mt-3 text-2xl sm:text-3xl">{ev.dateLabel}</p>
      </div>
      <div>
        <span class="label">Time</span>
        <p class="title mt-3 text-2xl sm:text-3xl">{ev.timeLabel}</p>
      </div>
      <div>
        <span class="label">Venue</span>
        <p class="title mt-3 text-2xl sm:text-3xl">{ev.venue}</p>
        <p class="mt-1 text-sm t-muted">{ev.building}, {ev.addressLines.join(", ")}</p>
      </div>
    </div>

    <div class="enter mt-10 flex flex-wrap items-center gap-4" style="--i: 4">
      <a href={ev.ticketsPath} target="_blank" rel="noopener noreferrer" class="btn">Register</a>
      <a href={ev.calendarUrl} target="_blank" rel="noopener noreferrer" class="link text-sm">Add to calendar</a>
      <a href={ev.packetPath} target="_blank" rel="noopener noreferrer" class="link text-sm">Student packet</a>
      <a href="#program" class="link text-sm">See the program</a>
    </div>

    <a href="#about" class="enter scroll-cue mt-20 inline-flex items-center gap-3 sm:mt-28" style="--i: 5" aria-label="Scroll to learn more">
      <svg class="h-5 w-5 t-accent" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M10 3v14M4 11l6 6 6-6" /></svg>
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
<section id="about" class="bg-dark relative section-wrapper py-20 sm:py-28 scroll-mt-16">
  <div class="section-content grid gap-12 lg:grid-cols-12">
    <div class="lg:col-span-5" use:reveal data-reveal>
      <span class="label">About</span>
      <h2 class="display mt-5 text-4xl sm:text-5xl">An afternoon at Harvey Mudd</h2>
      <p class="mt-5 max-w-prose leading-relaxed t-muted">
        Organized by The Webb Schools' robotics team with Harvey Mudd College's Society of Women Engineers, Herizon
        brings middle and high school girls together for an afternoon of hands-on learning and connection.
      </p>
      <p class="mt-4 max-w-prose leading-relaxed t-muted">
        Everything for the day, including maps and parking, is in the
        <a href={ev.packetPath} target="_blank" rel="noopener noreferrer" class="link">student packet</a>.
      </p>
    </div>

    <div class="lg:col-span-7 lg:pl-12">
      <span class="hand text-2xl" use:reveal data-reveal>what to expect</span>
      <ul class="mt-6 grid gap-10 sm:grid-cols-2" use:reveal={{ children: "li", stagger: 0.1 }}>
        {#each expect as item, i}
          <li data-reveal>
            <span class="title block text-5xl text-pink">{String(i + 1).padStart(2, "0")}</span>
            <h3 class="title mt-3 text-xl">{item.title}</h3>
            <p class="mt-2 text-sm leading-relaxed t-muted">{item.body}</p>
          </li>
        {/each}
      </ul>
    </div>
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
          <span class="label sm:col-span-3">{item.time}</span>
          <span class="title text-2xl sm:col-span-5 sm:text-3xl">{item.title}</span>
          <div class="sm:col-span-4 sm:pt-1">
            <span class="label t-accent">{item.place}</span>
            <p class="mt-2 leading-relaxed t-muted">{item.note}</p>
            {#if item.workshops}
              <ul class="mt-4 grid gap-3 text-sm">
                {#each item.workshops as w}
                  <li class="flex items-baseline justify-between gap-4">
                    <span>
                      <span class="block font-semibold">{w.title}</span>
                      <span class="block t-faint">{w.host}</span>
                    </span>
                    <span class="label shrink-0">{w.room}</span>
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        </li>
      {/each}
    </ol>
    <p class="mt-10 text-sm t-faint" use:reveal data-reveal>All rooms are in the Shanahan Center basement. Workshop groups are assigned on the day.</p>
  </div>
</section>

<!-- Venue -->
<section id="venue" class="bg-dark relative section-wrapper py-20 sm:py-28 scroll-mt-16">
  <div class="section-content grid gap-14 lg:grid-cols-12">
    <div class="lg:col-span-5" use:reveal data-reveal>
      <span class="label">Venue</span>
      <h2 class="display mt-5 text-4xl sm:text-5xl">The Shanahan Center</h2>
      <p class="mt-5 leading-relaxed">R. Michael Shanahan Center for Teaching and Learning, {ev.venue}</p>
      <address class="mt-1 not-italic leading-relaxed t-muted">
        {#each ev.addressLines as line}<span class="block">{line}</span>{/each}
      </address>
      <a href={ev.mapsUrl} target="_blank" rel="noopener noreferrer" class="link mt-4 inline-block">Open in Google Maps</a>

      <dl class="mt-10 grid gap-8 border-t border-dashed line pt-8">
        <div>
          <dt class="label">Parking</dt>
          <dd class="mt-2 max-w-prose leading-relaxed t-muted">
            Park in the Harvey Mudd lots along Foothill Blvd, on Foothill Blvd itself, or in the surrounding
            neighborhoods. The Shanahan Center is Building 8 on the campus map.
          </dd>
        </div>
        <div>
          <dt class="label">Check-in</dt>
          <dd class="mt-2 max-w-prose leading-relaxed t-muted">
            Look for us outside The Cafe, the coffee shop built into the Shanahan Center, to get your wristband.
          </dd>
        </div>
        <div>
          <dt class="label">Finding your room</dt>
          <dd class="mt-2 max-w-prose leading-relaxed t-muted">
            Every room is in the basement (the B in B450). Take the large steps down from the center of the courtyard,
            through the Shakespeare Theater.
          </dd>
        </div>
      </dl>
    </div>

    <div class="lg:col-span-7 grid gap-12">
      <figure class="polaroid tilt-r mx-auto w-full max-w-xl lg:ml-auto lg:mr-0" use:reveal={{ y: 30 }} data-reveal>
        <span class="tape"></span>
        <div class="photo aspect-[4/3]! overflow-hidden" data-lenis-prevent>
          <iframe
            title="Map to the Shanahan Center at Harvey Mudd College"
            src={ev.mapsEmbedUrl}
            class="h-full w-full border-0 grayscale-[0.4] contrast-[0.95]"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
        </div>
        <figcaption class="caption">{ev.addressLines.join(", ")}</figcaption>
      </figure>

      <figure class="polaroid tilt-l mx-auto w-full max-w-md lg:mr-auto lg:ml-8" use:reveal={{ y: 30 }} data-reveal>
        <span class="tape"></span>
        <div class="photo aspect-auto! overflow-hidden bg-white">
          <img
            src="/herizon-shan-basement.png"
            alt="Floor plan of the Shanahan Center basement showing Recital Hall B480, rooms B442, B450, B460 and B470, the outdoor Shakespeare Theater steps, elevator, and restrooms"
            class="h-auto w-full"
            loading="lazy"
          />
        </div>
        <figcaption class="caption">Shanahan basement, where every session happens</figcaption>
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
      <h2 class="display mt-5 text-4xl sm:text-5xl">Questions? We're here to help</h2>
      <p class="mt-5 max-w-prose leading-relaxed t-muted">
        Text {ev.dayOf.name} or send an email, before the event or on the day.
      </p>
      <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href={ev.dayOf.phoneHref} class="link">Text {ev.dayOf.phoneLabel}</a>
        <a href={`mailto:${ev.dayOf.email}?subject=Herizon STEM 2026`} class="link">{ev.dayOf.email}</a>
      </div>
      <p class="mt-6 text-sm t-faint">
        Want to speak or volunteer at a future Herizon? Email
        <a href={`mailto:${contact.email}?subject=Herizon STEM`} class="link">{contact.email}</a>.
      </p>
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
