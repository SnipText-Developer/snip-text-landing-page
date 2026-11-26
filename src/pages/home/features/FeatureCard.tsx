import "./FeatureCard.css";
import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionStyle } from "framer-motion";

export function FeatureCard({ children, className, smooth = false }: {
  children: ReactNode;
  className: string;
  smooth?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  const smoothedProgress = useSpring(scrollYProgress, { stiffness: 165, damping: 26, mass: 0.35 });
  const progress = smooth ? smoothedProgress : scrollYProgress;
  const scale = useTransform(progress, [0, 0.5, 1], [0.985, 1, 0.985]);
  const shadow = useTransform(progress, [0, 0.5, 1], [
    "0px 4px 12px rgba(20,39,71,0)",
    "0px 18px 36px rgba(20,39,71,0.16)",
    "0px 4px 12px rgba(20,39,71,0)",
  ]);
  const style = {
    "--feature-progress": reducedMotion ? 1 : progress,
    ...(reducedMotion ? {} : { scale, boxShadow: shadow }),
  } as MotionStyle;

  return (
    <div ref={track} className="feature-track">
      <div className="feature-viewport">
        <motion.article className={className} style={style}>
          {children}
        </motion.article>
      </div>
    </div>
  );
}
