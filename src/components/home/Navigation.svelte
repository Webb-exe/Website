<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { requestScrollTriggerRefresh } from '../../lib/requestScrollTriggerRefresh';

  gsap.registerPlugin(ScrollTrigger);

  let nav: HTMLElement;
  let logo: HTMLAnchorElement;
  let links: HTMLDivElement;
  let mobileMenuBtn: HTMLButtonElement;
  let mobileMenu: HTMLDivElement;
  let isMenuOpen = false;

  let ctx: gsap.Context;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      gsap.to(mobileMenu, { 
        height: 'auto', 
        opacity: 1, 
        duration: 0.3, 
        ease: 'power2.out' 
      });
      gsap.to(mobileMenuBtn.querySelectorAll('.menu-line'), {
        rotation: (i) => i === 0 ? 45 : i === 2 ? -45 : 0,
        y: (i) => i === 0 ? 6 : i === 2 ? -6 : 0,
        opacity: (i) => i === 1 ? 0 : 1,
        duration: 0.3
      });
    } else {
      gsap.to(mobileMenu, { 
        height: 0, 
        opacity: 0, 
        duration: 0.3, 
        ease: 'power2.in' 
      });
      gsap.to(mobileMenuBtn.querySelectorAll('.menu-line'), {
        rotation: 0,
        y: 0,
        opacity: 1,
        duration: 0.3
      });
    }
  }

  function closeMenu() {
    if (isMenuOpen) {
      isMenuOpen = false;
      gsap.to(mobileMenu, { height: 0, opacity: 0, duration: 0.3 });
      gsap.to(mobileMenuBtn.querySelectorAll('.menu-line'), {
        rotation: 0, y: 0, opacity: 1, duration: 0.3
      });
    }
  }

  onMount(async () => {
    await tick();
    
    ctx = gsap.context(() => {
      // Animate nav in on load
      gsap.fromTo(logo, 
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      );
      
      if (links) {
        gsap.fromTo(links.querySelectorAll('a'),
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
        );
      }

      // Mobile menu button animation
      gsap.fromTo(mobileMenuBtn,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.3 }
      );

      // Navigation background on scroll
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        onEnter: () => nav.classList.add('nav-scrolled'),
        onLeaveBack: () => nav.classList.remove('nav-scrolled'),
      });
    }, nav);

    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<!-- Navigation -->
<nav bind:this={nav} class="fixed top-0 left-0 right-0 z-50 section-wrapper py-4 sm:py-5" id="main-nav">
  <div class="section-content flex justify-between items-center">
    <a bind:this={logo} href="/" class="flex items-baseline gap-1 no-underline">
      <span class="font-display text-xl sm:text-2xl font-extrabold text-accent">359</span>
      <span class="font-serif-custom italic text-lg sm:text-xl text-gray-500">.exe</span>
    </a>
    
    <!-- Desktop Links -->
    <div bind:this={links} class="hidden md:flex gap-6 lg:gap-10">
      <a href="#about" class="text-gray-400 no-underline text-sm uppercase tracking-widest hover:text-white transition-colors">About</a>
      <a href="#team" class="text-gray-400 no-underline text-sm uppercase tracking-widest hover:text-white transition-colors">Team</a>
      <a href="#contact" class="text-gray-400 no-underline text-sm uppercase tracking-widest hover:text-white transition-colors">Contact</a>
    </div>

    <!-- Mobile Menu Button -->
    <button 
      bind:this={mobileMenuBtn}
      on:click={toggleMenu}
      class="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
      aria-label="Toggle menu"
      aria-expanded={isMenuOpen}
    >
      <span class="menu-line w-5 h-0.5 bg-gray-400 rounded-full origin-center"></span>
      <span class="menu-line w-5 h-0.5 bg-gray-400 rounded-full origin-center"></span>
      <span class="menu-line w-5 h-0.5 bg-gray-400 rounded-full origin-center"></span>
    </button>
  </div>

  <!-- Mobile Menu Dropdown -->
  <div 
    bind:this={mobileMenu}
    class="md:hidden overflow-hidden h-0 opacity-0"
  >
    <div class="flex flex-col gap-1 pt-4 pb-2">
      <a href="#about" on:click={closeMenu} class="text-gray-400 no-underline text-sm uppercase tracking-widest hover:text-white hover:bg-white/5 transition-colors px-4 py-3 rounded-lg">About</a>
      <a href="#team" on:click={closeMenu} class="text-gray-400 no-underline text-sm uppercase tracking-widest hover:text-white hover:bg-white/5 transition-colors px-4 py-3 rounded-lg">Team</a>
      <a href="#contact" on:click={closeMenu} class="text-gray-400 no-underline text-sm uppercase tracking-widest hover:text-white hover:bg-white/5 transition-colors px-4 py-3 rounded-lg">Contact</a>
    </div>
  </div>
</nav>

<style>
  #main-nav {
    transition: background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease;
  }
  
  :global(#main-nav.nav-scrolled) {
    background-color: rgba(10, 10, 10, 0.9);
    backdrop-filter: blur(20px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  }

  .menu-line {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
</style>
