export function isNonComputer(): boolean {
    if(window.matchMedia("(any-hover:none)").matches) {
        return true;
      } 
    if (!isMobile() && !isTablet()) return true;
    return false;
}

/**
 * Detects if the current device is a mobile device
 * Uses multiple detection methods for better accuracy
 */
export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  // Primary check: screen width (mobile is typically < 768px)
  // Also check aspect ratio to avoid false positives on narrow desktop windows
  const isSmallScreen = width < 768;
  const isPortrait = height > width;
  
  // Check for touch capability
  const hasTouch = 
    "ontouchstart" in window || 
    navigator.maxTouchPoints > 0 || 
    (navigator as any).msMaxTouchPoints > 0;
  
  // Check user agent for mobile devices (more comprehensive)
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || "";
  const ua = userAgent.toLowerCase();
  const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet|kindle|silk|fennec/i.test(ua);
  
  // Check for mobile-specific features
  const hasMobileFeatures = 
    "orientation" in window ||
    "ondeviceorientation" in window ||
    "ondevicemotion" in window;
  
  // Exclude tablets from mobile (they get their own handling)
  const isTabletUA = /ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(ua);
  
  // Consider it mobile if:
  // 1. Small screen (< 768px) AND (has touch OR mobile UA OR mobile features)
  // 2. OR mobile UA AND small screen (regardless of touch)
  // 3. BUT exclude tablets
  if (isTabletUA && width >= 768) {
    return false; // Tablets are handled separately
  }
  
  if (isSmallScreen) {
    return hasTouch || isMobileUA || hasMobileFeatures;
  }
  
  // For larger screens, only trust user agent
  return isMobileUA && !isTabletUA;
}

/**
 * Detects if the current device is a tablet
 */
export function isTablet(): boolean {
  if (typeof window === "undefined") return false;
  
  const width = window.innerWidth;
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || "";
  const ua = userAgent.toLowerCase();
  
  // Check for tablet-specific user agents
  const isTabletUA = /ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(ua);
  
  // Consider it a tablet if it matches UA or size (but not phone size)
  return isTabletUA && width >= 768;
}

/**
 * Detects if the current device is a touch device (mobile or tablet)
 */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}

