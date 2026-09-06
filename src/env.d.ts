/// <reference path="../node_modules/gsap/types/scroll-trigger.d.ts" />
import type Lenis from "lenis";

declare global {
  interface ImportMetaEnv {
    readonly PUBLIC_MIXPANEL_TOKEN?: string;
  }

  var lenis: Lenis | undefined;
  interface Window {
    lenis: Lenis | undefined;
  }
}

export {};
