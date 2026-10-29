import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function useSmoothScroll() {
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      duration: 1.15,
    });
    return () => lenis.destroy();
  }, [reducedMotion]);
}
