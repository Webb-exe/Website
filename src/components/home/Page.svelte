<script lang="ts">
  import type { GetImageResult } from "astro";
  import Hero, { type HeroPhoto } from "./Hero.svelte";
  import About from "./About.svelte";
  import Team from "./Team.svelte";
  import Contact from "./Contact.svelte";

  let { RobotImage, HeroPhotos }: { RobotImage: GetImageResult; HeroPhotos: HeroPhoto[] } = $props();
</script>

<Hero image={RobotImage} photos={HeroPhotos} />
<About />
<Team />
<Contact />
