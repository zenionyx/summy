import { useState, useEffect } from "react";

// Define your breakpoints (in pixels)
const BREAKPOINTS = {
  phone: 0, // up to 767px
  tablet: 768, // 768px up to 1023px
  laptop: 1024, // 1024px up to 1439px
  desktop: 1440, // 1440px and above
};

// Helper to get the device category based on width
function getDeviceCategory(width) {
  if (width >= BREAKPOINTS.desktop) return "desktop";
  if (width >= BREAKPOINTS.laptop) return "laptop";
  if (width >= BREAKPOINTS.tablet) return "tablet";
  return "phone";
}

/**
 * Custom hook: useScreenSize
 * Returns one of: 'phone', 'tablet', 'laptop', 'desktop'
 */
export default function useScreenSize() {
  // Initialize state (fallback to phone if window is undefined)
  const [screenSize, setScreenSize] = useState(
    typeof window !== "undefined"
      ? getDeviceCategory(window.innerWidth)
      : "phone"
  );

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      const newCategory = getDeviceCategory(window.innerWidth);
      setScreenSize(newCategory);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler once to set initial value
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}
