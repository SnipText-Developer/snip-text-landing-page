import { useReducedMotion } from "framer-motion";

export default function useReveal() {
  const reducedMotion = useReducedMotion();
  const reveal = {
    initial: {
      opacity: reducedMotion ? 1 : 0,
      y: reducedMotion ? 0 : 28,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.15,
    },
    transition: {
      duration: 0.65,
    },
  };
  return reveal;
}
