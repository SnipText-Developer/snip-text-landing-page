import "./FinalCta.css";
import { motion } from "framer-motion";
import ExternalLink from "components/ExternalLink";
import { snipTextUrl } from "config";
import useReveal from "../useReveal";

export default function FinalCta() {
  const reveal = useReveal();

  return (
    <section className="final-cta">
      <div className="cta-orbit cta-orbit-one" />
      <div className="cta-orbit cta-orbit-two" />
      <motion.div {...reveal}>
        <h2>앞으로 작성할 메일은 저장한 템플릿으로 시작해 보세요</h2>
        <p>견적 안내 템플릿을 단축어로 불러와 고객명과 금액만 채워 보세요.</p>
        <ExternalLink className="button button-light" href={snipTextUrl}>
          무료로 시작하기
        </ExternalLink>
      </motion.div>
    </section>
  );
}
