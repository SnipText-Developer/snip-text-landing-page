import { motion } from "framer-motion";
import useReveal from "../useReveal";
import { Arrow, Chrome } from "pages/shared/Brand";
import MailDemo from "./MailDemo";

export default function HeroSection({ onTryDemo, expanded, setExpanded }: {
  onTryDemo: () => void;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}) {
  const reveal = useReveal();
  return (
    <section className="hero section-wrap">
      <motion.div {...reveal} className="hero-content">
        <div className="eyebrow">
          <span className="live-dot" /> 반복은 짧게, 당신의 시간은 길게
        </div>
        <h1>
          자주 쓰는 문장,
          <br />
          이제{" "}
          <span className="hero-highlight">
            단축어 하나<span className="highlight-spark">✳</span>
          </span>
          로.
        </h1>
        <p className="hero-description">
          매번 쓰던 그 문장, 또 쓰고 있나요?
          <br />
          어디서든 단축어 + Enter. 당신의 말이 바로 펼쳐집니다.
        </p>
        <button className="button button-dark" onClick={onTryDemo}>
          <Chrome /> SnipText 먼저 써보기 <Arrow />
        </button>
        <div className="cta-note">
          설치 없이 체험하기 <span>·</span> 반복을 줄이는 첫 3초
        </div>
      </motion.div>
      <MailDemo expanded={expanded} setExpanded={setExpanded} />
    </section>
  );
}
