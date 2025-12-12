import type Lenis from "lenis";

declare global {
  var lenis: Lenis | undefined;
  interface Window {
    lenis: Lenis | undefined;
  }
}

export {};
