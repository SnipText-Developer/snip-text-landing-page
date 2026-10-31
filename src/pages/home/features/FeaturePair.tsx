import "./FeaturePair.css";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue, type MotionStyle } from "framer-motion";
const FeatureProgress = createContext<MotionValue<number> | null>(null);
export function FeaturePair({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return (
    <div ref={ref} className={`feature-pair-track${reducedMotion ? " reduced-motion" : ""}`}>
      <div className="feature-pair-viewport">
        <FeatureProgress.Provider value={scrollYProgress}>
          <div className="feature-grid">{children}</div>
        </FeatureProgress.Provider>
      </div>
    </div>
  );
}
export function FeatureCard({ children, className, index }: {
  children: ReactNode;
  className: string;
  index: number;
}) {
  const reducedMotion = useReducedMotion();
  const progress = useContext(FeatureProgress)!;
  const start = index * 0.5;
  const peak = start + 0.25;
  const end = start + 0.5;
  const detailProgress = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, peak, end], [0.985, 1, 0.985]);
  const opacity = useTransform(progress, [start, peak, end], [0.72, 1, 0.72]);
  const shadow = useTransform(progress, [start, peak, end], [
    "0px 4px 12px rgba(38,60,23,0)",
    "0px 18px 36px rgba(38,60,23,0.16)",
    "0px 4px 12px rgba(38,60,23,0)",
  ]);
  const style = {
    "--feature-progress": reducedMotion ? 1 : detailProgress,
    ...(reducedMotion ? {} : { scale, opacity, boxShadow: shadow }),
  } as MotionStyle;
  return <motion.article className={className} style={style}>{children}</motion.article>;
}
