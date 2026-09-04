import { gsap, prefersReducedMotion } from "./gsap";

export interface RevealOptions {
  /** Selector for children to stagger; defaults to the node itself. */
  children?: string;
  /** Vertical offset in px the element rises from. */
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  /** ScrollTrigger start position. */
  start?: string;
}

/**
 * Svelte action: fade + rise an element (or its children) into view once,
 * the first time it scrolls into the viewport.
 *
 *   <div use:reveal data-reveal>…</div>
 *   <ul use:reveal={{ children: "li", stagger: 0.08 }}>…</ul>
 *
 * Add `data-reveal` to whatever is animated so CSS hides it before hydration
 * (see global.css) and there is no flash of un-animated content.
 */
export function reveal(node: HTMLElement, opts: RevealOptions = {}) {
  const targets = opts.children ? node.querySelectorAll(opts.children) : node;

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return {};
  }

  const tween = gsap.fromTo(
    targets,
    { opacity: 0, y: opts.y ?? 20 },
    {
      opacity: 1,
      y: 0,
      duration: opts.duration ?? 0.7,
      delay: opts.delay ?? 0,
      stagger: opts.stagger ?? 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: node,
        start: opts.start ?? "top 85%",
        once: true,
      },
    }
  );

  return {
    destroy() {
      tween.scrollTrigger?.kill();
      tween.kill();
    },
  };
}
