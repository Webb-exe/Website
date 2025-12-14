<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { requestScrollTriggerRefresh } from "../../lib/requestScrollTriggerRefresh";

  gsap.registerPlugin(ScrollTrigger);

  let nav: HTMLElement;
  let logo: HTMLAnchorElement;
  let links: HTMLDivElement;
  let mobileMenuBtn: HTMLButtonElement;
  let mobileMenu: HTMLDivElement;
  let isMenuOpen = false;

  let ctx: gsap.Context;
  let lastScrollY = 0;
  let scrollDirection: "up" | "down" = "up";
  let navTween: gsap.core.Tween | null = null;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      // Add dark background when menu opens and ensure nav is visible
      nav.classList.add("nav-scrolled", "nav-menu-open");
      if (navTween) navTween.kill();
      gsap.to(nav, { y: 0, duration: 0.05, ease: "power1.inOut" });
      gsap.to(mobileMenu, {
        height: "auto",
        opacity: 1,
        duration: 0.05,
        ease: "power1.out",
      });
      gsap.to(mobileMenuBtn.querySelectorAll(".menu-line"), {
        rotation: (i) => (i === 0 ? 45 : i === 2 ? -45 : 0),
        y: (i) => (i === 0 ? 6 : i === 2 ? -6 : 0),
        opacity: (i) => (i === 1 ? 0 : 1),
        duration: 0.05,
      });
    } else {
      // Remove menu-open class, but keep nav-scrolled if scrolled
      nav.classList.remove("nav-menu-open");
      updateNavBackground();
      gsap.to(mobileMenu, {
        height: 0,
        opacity: 0,
        duration: 0.05,
        ease: "power1.in",
      });
      gsap.to(mobileMenuBtn.querySelectorAll(".menu-line"), {
        rotation: 0,
        y: 0,
        opacity: 1,
        duration: 0.05,
      });
    }
  }

  function closeMenu() {
    if (isMenuOpen) {
      isMenuOpen = false;
      nav.classList.remove("nav-menu-open");
      updateNavBackground();
      gsap.to(mobileMenu, { height: 0, opacity: 0, duration: 0.05 });
      gsap.to(mobileMenuBtn.querySelectorAll(".menu-line"), {
        rotation: 0,
        y: 0,
        opacity: 1,
        duration: 0.05,
      });
    }
  }

  function updateNavBackground() {
    const scrollY = window && typeof window.scrollY === "number" ? window.scrollY : 0;
    if (scrollY > 50) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }
  }

  function handleScroll() {
    const currentScrollY = window.scrollY;

    // Determine scroll direction immediately
    if (currentScrollY > lastScrollY) {
      scrollDirection = "down";
    } else if (currentScrollY < lastScrollY) {
      scrollDirection = "up";
    }

    lastScrollY = currentScrollY;

    // Update background based on scroll position
    updateNavBackground();

    // Animate nav position based on scroll direction (only if menu is closed)
    if (!isMenuOpen) {
      if (navTween) navTween.kill();

      if (scrollDirection === "down") {
        // Slide up immediately when scrolling down
        navTween = gsap.to(nav, {
          y: -100,
          duration: 0.05,
          ease: "power1.inOut",
          overwrite: true,
        });
      } else {
        // Slide back down immediately when scrolling up
        navTween = gsap.to(nav, {
          y: 0,
          duration: 0.05,
          ease: "power1.inOut",
          overwrite: true,
        });
      }
    }
  }

  onMount(async () => {
    await tick();

    ctx = gsap.context(() => {
      // Set initial position
      gsap.set(nav, { y: 0 });

      // Animate nav in on load
      gsap.fromTo(
        logo,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }
      );

      if (links) {
        gsap.fromTo(
          links.querySelectorAll("a"),
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.15,
          }
        );
      }

      // Mobile menu button animation
      gsap.fromTo(
        mobileMenuBtn,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: "back.out(1.7)",
          delay: 0.15,
        }
      );

      if (typeof window !== "undefined" && typeof window.scrollY === "number") {
        // Handle scroll events
        window.addEventListener("scroll", handleScroll, { passive: true });
        lastScrollY = window.scrollY;
      }

      updateNavBackground();
    }, nav);

    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("scroll", handleScroll);
    }
    ctx?.revert();
    if (navTween) navTween.kill();
  });
</script>

<!-- Navigation -->
<nav
  bind:this={nav}
  class="fixed top-0 left-0 right-0 z-1000 section-wrapper py-4 sm:py-5"
  id="main-nav"
>
  <div class="section-content flex justify-between items-center">
    <a bind:this={logo} href="/" class="no-underline">
      <img src="/logo-icon.svg" alt="359 Webb.exe Logo" class="w-12 h-12" />
    </a>

    <!-- Desktop Links -->
    <div bind:this={links} class="desktop-links hidden md:flex items-center gap-6 lg:gap-10">
      <a
        href="#about"
        class="flex items-center text-gray-400 no-underline text-sm uppercase tracking-widest hover:text-white transition-colors"
        >About</a
      >
      <a
        href="/team"
        class="flex items-center text-gray-400 no-underline text-sm uppercase tracking-widest hover:text-white transition-colors"
        >Team</a
      >
      <a
        href="#contact"
        class="flex items-center text-gray-400 no-underline text-sm uppercase tracking-widest hover:text-white transition-colors"
        >Contact</a
      >
    </div>

    <!-- Mobile Menu Button -->
    <button
      bind:this={mobileMenuBtn}
      on:click={toggleMenu}
      class="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
      aria-label="Toggle menu"
      aria-expanded={isMenuOpen}
    >
      <span class="menu-line w-5 h-0.5 bg-gray-400 rounded-full origin-center"
      ></span>
      <span class="menu-line w-5 h-0.5 bg-gray-400 rounded-full origin-center"
      ></span>
      <span class="menu-line w-5 h-0.5 bg-gray-400 rounded-full origin-center"
      ></span>
    </button>
  </div>

  <!-- Mobile Menu Dropdown -->
  <div bind:this={mobileMenu} class="md:hidden overflow-hidden h-0 opacity-0">
    <div class="flex flex-col gap-1 pt-4 pb-2">
      <a
        href="#about"
        on:click={closeMenu}
        class="text-gray-400 no-underline text-sm uppercase tracking-widest hover:text-white hover:bg-white/5 transition-colors px-4 py-3 rounded-lg"
        >About</a
      >
      <a
        href="#team"
        on:click={closeMenu}
        class="text-gray-400 no-underline text-sm uppercase tracking-widest hover:text-white hover:bg-white/5 transition-colors px-4 py-3 rounded-lg"
        >Team</a
      >
      <a
        href="#contact"
        on:click={closeMenu}
        class="text-gray-400 no-underline text-sm uppercase tracking-widest hover:text-white hover:bg-white/5 transition-colors px-4 py-3 rounded-lg"
        >Contact</a
      >
    </div>
  </div>
</nav>

<style>
  #main-nav {
    transition:
      background-color 0.3s ease,
      backdrop-filter 0.3s ease,
      box-shadow 0.3s ease;
    background-color: rgba(10, 10, 10, 0);
    backdrop-filter: blur(0px);
  }

  :global(#main-nav.nav-scrolled) {
    background-color: rgba(10, 10, 10, 0.9);
    backdrop-filter: blur(20px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  }

  :global(#main-nav.nav-menu-open) {
    background-color: rgba(10, 10, 10, 0.9);
    backdrop-filter: blur(20px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  }

  .menu-line {
    transition:
      transform 0.05s ease,
      opacity 0.3s ease;
  }

  :global(.desktop-links a) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
