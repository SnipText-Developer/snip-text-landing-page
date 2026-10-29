import { motion } from "framer-motion";
import useReveal from "../shared/useReveal";
import { Arrow, Chrome } from "../shared/Brand";
export default function FinalCta({ onTryDemo }: { onTryDemo: () => void }) {
  const reveal = useReveal();
  return (
    <section className="final-cta">
      <div className="cta-orbit cta-orbit-one" />
      <div className="cta-orbit cta-orbit-two" />
      <motion.div {...reveal}>
        <span className="final-spark">✳</span>
        <div className="section-label">MAKE ROOM FOR WHAT MATTERS.</div>
        <h2>
          반복되는 문장은 맡기고,
          <br />
          <span>당신의 시간을 되찾으세요.</span>
        </h2>
        <p>작은 단축어 하나가 만드는, 가벼운 하루.</p>
        <button className="button button-mint" onClick={onTryDemo}>
          <Chrome /> 지금, SnipText 체험하기 <Arrow />
        </button>
        <div className="final-note">
          당신의 다음 문장부터 달라질 거예요.
        </div>
      </motion.div>
    </section>
  );
}
