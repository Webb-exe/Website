<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { requestScrollTriggerRefresh } from '../../lib/requestScrollTriggerRefresh';

  gsap.registerPlugin(ScrollTrigger);

  /**
   * Configuration for each progress node
   */
  interface NodeConfig {
    /** Reference to the trigger element */
    trigger: HTMLElement;
    /** Label to display (optional) */
    label?: string;
    /** percentage of the scroll trigger to activate the node e.g. (150%)*/
    pinDuration: number;
    /** percentage of the scroll trigger to activate the node e.g. (100%)*/
    activateAt: number;
  }

  /**
   * Configuration for showing/hiding the indicator
   */
  interface VisibilityConfig {
    /** Reference to the trigger element */
    trigger: HTMLElement;
    /** ScrollTrigger start position (e.g., "top 90%") */
    start: string;
  }

  // Props
  export let nodes: NodeConfig[] = [];
  export let showWhen: VisibilityConfig | null | VisibilityConfig[] = null;
  export let hideWhen: VisibilityConfig | null | VisibilityConfig[] = null;

  // Internal refs
  let progressIndicator: HTMLDivElement;
  let progressLine: HTMLDivElement;
  let nodeElements: HTMLDivElement[] = [];

  let ctx: gsap.Context;

  // Calculate node positions based on number of nodes
  // Nodes are evenly distributed from start to end
  function getNodePositions(count: number): number[] {
    if (count <= 1) return [0];
    const positions: number[] = [];
    for (let i = 0; i < count; i++) {
      // Distribute evenly from 0 to 1: positions at i/(n-1) for i = 0 to n-1, last at 1
      positions.push(i / (count - 1));
    }
    return positions;
  }

  onMount(async () => {
    await tick();

    if (!progressIndicator || !progressLine || nodes.length === 0) return;

    // We render an extra visual "start" node at 0% (no label).
    // So the progress line starts at 0 and reaches the first real node.
    const nodePositions = getNodePositions(nodes.length + 1);

    ctx = gsap.context(() => {
      const setLineScaleY = gsap.quickSetter(progressLine, 'scaleY');

      const resetIndicator = () => {
        gsap.killTweensOf(progressLine);
        gsap.set(progressLine, { scaleY: 0 });
        nodeElements.forEach((el) => el?.classList.remove('active', 'passed'));
      };

      // Show indicator
      if (showWhen) {
        if (Array.isArray(showWhen)) {
          showWhen.forEach(showWhenItem => {
            ScrollTrigger.create({
              trigger: showWhenItem.trigger,
              start: showWhenItem.start,
              onEnter: () => progressIndicator.classList.add('visible'),
              onLeaveBack: () => {
                // When leaving the visible range, also clear any "faded" state.
                // (We keep visibility purely class-driven to avoid inline opacity sticking.)
                progressIndicator.classList.remove('visible');
                progressIndicator.classList.remove('faded');
                resetIndicator();
              },
            });
          });
        } else {
          ScrollTrigger.create({
            trigger: showWhen.trigger,
            start: showWhen.start,
            onEnter: () => progressIndicator.classList.add('visible'),
            onLeaveBack: () => {
              progressIndicator.classList.remove('visible');
              progressIndicator.classList.remove('faded');
              resetIndicator();
            },
          });
        }
      }

      // Hide indicator
      if (hideWhen) {
        if (Array.isArray(hideWhen)) {
          hideWhen.forEach(hideWhenItem => {
            ScrollTrigger.create({
              trigger: hideWhenItem.trigger,
              start: hideWhenItem.start,
              onEnter: () => progressIndicator.classList.add('faded'),
              onLeaveBack: () => progressIndicator.classList.remove('faded'),
            });
          });
        } else {
          ScrollTrigger.create({
            trigger: hideWhen.trigger,
            start: hideWhen.start,
            onEnter: () => progressIndicator.classList.add('faded'),
            onLeaveBack: () => progressIndicator.classList.remove('faded'),
          });
        }
      }

      // Hard reset when scrolling back above the first node's start.
      // Without this, the last "passed" state can stick visually after reaching the end.
      if (nodes[0]?.trigger) {
        ScrollTrigger.create({
          trigger: nodes[0].trigger,
          start: 'top top',
          onLeaveBack: resetIndicator,
        });
      }

      // Set up progress tracking for each node
      nodes.forEach((node, i) => {
        if (!node.trigger) return;

        const currentPos = nodePositions[i];
        const nextPos = nodePositions[i + 1] ?? 1;

        // Progress line animation for this section
        ScrollTrigger.create({
          trigger: node.trigger,
          start: 'top top',
          end: `+=${node.pinDuration}%`,
          scrub: 0.3,
          onUpdate: (self) => {
            // If we were previously animating (e.g. onLeaveBack), stop it so scroll owns the value.
            gsap.killTweensOf(progressLine);

            // Calculate line progress
            // Line should go from currentPos to nextPos based on scroll progress
            const range = nextPos - currentPos;
            // Scale progress so it reaches nextPos at activateAt
            const scaledProgress = self.progress * (range / (node.activateAt/node.pinDuration));
            const lineProgress = currentPos + Math.min(scaledProgress, range);
            setLineScaleY(Math.min(lineProgress, nextPos));
          },
          onLeaveBack: () => {
            // Reset to previous position
            gsap.killTweensOf(progressLine);
            gsap.to(progressLine, { 
              scaleY: currentPos, 
              duration: 0.3, 
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        });

        // Node activation
        ScrollTrigger.create({
          trigger: node.trigger,
          start: 'top top',
          end: `+=${node.pinDuration}%`,
          onUpdate: (self) => {
            const nodeEl = nodeElements[i];
            if (!nodeEl) return;

            if (self.progress >= node.activateAt/node.pinDuration && self.progress < 1) {
              nodeEl.classList.add('active');
            } else {
              nodeEl.classList.remove('active', 'passed');
            }
          },
          onLeave: () => {
            const nodeEl = nodeElements[i];
            if (nodeEl) {
              nodeEl.classList.remove('active');
              nodeEl.classList.add('passed');
            }
          },
          onEnterBack: () => {
            const nodeEl = nodeElements[i];
            if (nodeEl) {
              nodeEl.classList.remove('passed');
            }
          },
          onLeaveBack: () => {
            // When scrolling above the section's start, ensure we clear any sticky state.
            const nodeEl = nodeElements[i];
            if (nodeEl) {
              nodeEl.classList.remove('active', 'passed');
            }
          }
        });
      });
    }, progressIndicator);

    requestScrollTriggerRefresh();
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<!-- Progress Indicator -->
<!-- Mobile: horizontal bar at top (rotated), Desktop: vertical bar on left side -->
<div 
  bind:this={progressIndicator} 
  class="fixed z-40 pointer-events-none progress-indicator
         top-[72px] sm:top-[76px] left-1/2 -translate-x-1/2 -rotate-90
         lg:rotate-0 lg:top-1/2 lg:left-6 xl:left-8 2xl:left-12 lg:-translate-y-1/2 lg:translate-x-0"
>
  <div class="relative h-[120px] sm:h-[140px] lg:h-[180px] xl:h-[200px] w-8 lg:w-10">
    <!-- Background track -->
    <div class="absolute top-0 bottom-0 left-[4px] lg:left-[5px] w-px bg-white/10"></div>
    
    <!-- Progress fill line -->
    <div 
      bind:this={progressLine} 
      class="absolute top-0 left-[4px] lg:left-[5px] w-px bg-accent origin-top progress-line" 
      style="height: 100%; transform: scaleY(0);"
    ></div>
    
    <!-- Nodes -->
    <!-- Start node (visual only) -->
    <div
      class="progress-node absolute left-0 passed"
      style="top: 0%;"
      data-section="start"
    >
      <div class="w-2 h-2 lg:w-[10px] lg:h-[10px] rounded-full bg-dark border border-white/20 transition-all duration-300 node-dot"></div>
    </div>

    {#each nodes as node, i}
      {@const position = ((i + 1) / nodes.length) * 100}
      <div 
        bind:this={nodeElements[i]} 
        class="progress-node absolute left-0" 
        style="top: {position}%;"
        data-section={node.label?.toLowerCase() ?? `section-${i}`}
      >
        <div class="w-2 h-2 lg:w-[10px] lg:h-[10px] rounded-full bg-dark border border-white/20 transition-all duration-300 node-dot"></div>
        {#if node.label}
          <!-- Mobile: Label below the dot (bar is -90deg rotated) -->
          <!-- Desktop: Label to the right of the dot -->
          <span class="node-label absolute text-[9px] lg:text-[10px] uppercase tracking-widest text-white/0 transition-all duration-300 whitespace-nowrap">
            {node.label}
          </span>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .progress-indicator {
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  :global(.progress-indicator.visible) {
    opacity: 1;
  }

  /* Fade out within hideWhen range (class-driven; avoids sticky inline opacity) */
  :global(.progress-indicator.faded) {
    opacity: 0;
  }

  .progress-line {
    box-shadow: 0 0 6px rgba(159, 96, 121, 0.6);
  }

  .progress-node .node-dot {
    position: relative;
  }

  :global(.progress-node.active) .node-dot {
    background-color: #9f6079;
    border-color: #c4899e;
    box-shadow: 0 0 12px rgba(159, 96, 121, 0.9);
    transform: scale(1.4);
  }

  :global(.progress-node.passed) .node-dot {
    background-color: #9f6079;
    border-color: #9f6079;
  }

  :global(.progress-node.active) .node-label {
    color: rgba(255, 255, 255, 0.6);
  }

  /* Mobile label positioning: appears BELOW the node when bar is rotated -90deg */
  /* Bar is rotated -90deg: left in container coords → down on screen */
  /* Position label to the LEFT of node, then rotate 90deg to make text horizontal */
  .node-label {
    transform: rotate(90deg);
    transform-origin: right center;
    right: 22px;
    top: 10px;
    /* translate: 0 -50%; */
  }

  /* Desktop label positioning: appears to the right of the node */
  @media (min-width: 1024px) {
    .node-label {
      transform: rotate(0deg);
      transform-origin: center;
      left: 20px;
      top: 50%;
      padding-top: 0;
      padding-left: 8px;
      translate: 0 -50%;
    }
  }
</style>
