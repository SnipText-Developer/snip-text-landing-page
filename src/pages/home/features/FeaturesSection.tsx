import { motion } from "framer-motion";
import useReveal from "../useReveal";
import { FeaturePair, FeatureCard } from "./FeaturePair";
import "./features-motion.css";
export default function FeaturesSection() {
  const reveal = useReveal();
  return (
    <section className="features section-wrap" id="features">
      <motion.div {...reveal} className="section-heading">
        <div className="section-label">SMALL SHORTCUT. BIG DIFFERENCE.</div>
        <h2>
          당신의 문장에,
          <br />
          작은 지름길을 더하다.
        </h2>
        <p className="section-description">
          단순한 복사와 붙여넣기를 넘어. 일하는 흐름이 달라집니다.
        </p>
      </motion.div>
      <FeaturePair>
        <FeatureCard index={0} className="feature-card feature-mint">
          <span className="feature-index">01 / INSTANT EXPANSION</span>
          <h3>
            긴 문장도,
            <br />
            짧은 단축어 하나로.
          </h3>
          <p>
            기억하기 쉬운 단축어 뒤에 Enter.
            <br />
            필요한 문장이 커서 자리에 바로 들어가요.
          </p>
          <div className="shortcut-visual">
            <div className="visual-shortcut">
              /인사 <kbd>Enter</kbd>
            </div>
            <div className="visual-arrow">↓</div>
            <div className="visual-message">
              <span className="tiny-avatar">지</span>
              <div>
                안녕하세요, 김민지님 👋
                <br />
                <span>좋은 협업으로 이어지길 기대합니다.</span>
              </div>
              <span className="check-circle">✓</span>
            </div>
          </div>
        </FeatureCard>
        <FeatureCard index={1} className="feature-card feature-lilac">
          <span className="feature-index">02 / EVERYWHERE YOU WORK</span>
          <h3>
            탭은 바뀌어도,
            <br />내 문장은 그대로.
          </h3>
          <p>
            Gmail과 Naver 메일에서.
            <br />
            붙여넣기 위해 다른 탭을 오갈 필요 없어요.
          </p>
          <div className="orbit-visual">
            <div className="orbit-ring" />
            <div className="orbit-center logo-mark">s·</div>
            <span className="orbit-app orbit-gmail">M</span>
            <span className="orbit-app orbit-naver">N</span>
          </div>
        </FeatureCard>
      </FeaturePair>
      <FeaturePair>
        <FeatureCard index={0} className="feature-card feature-peach">
          <span className="feature-index">03 / PERSONAL TOUCH</span>
          <h3>
            틀은 같아도,
            <br />
            마음은 다르게.
          </h3>
          <p>
            고객명, 금액처럼 매번 달라지는 부분은 변수로.
            <br />
            보내기 전 빈칸만 채우면 끝이에요.
          </p>
          <div className="variable-visual">
            <div className="variable-letter">
              안녕하세요 <span className="animated-variable" data-placeholder="{{고객명}}"><span>김민지</span></span>님,
              <br />
              문의하신 프로젝트 견적은
              <br />
              <span className="animated-variable" data-placeholder="{{금액}}"><span>1,500,000</span></span>원입니다.
            </div>
            <div className="variable-chips">
              <span>
                <i /> 고객명
              </span>
              <span>
                <i /> 금액
              </span>
              <b>✓ 빠짐없이 확인 완료</b>
            </div>
          </div>
        </FeatureCard>
        <FeatureCard index={1} className="feature-card feature-yellow">
          <span className="feature-index">04 / MADE FOR KOREAN</span>
          <h3>
            한글을 아니까,
            <br />
            흐름을 아니까.
          </h3>
          <p>
            한글 조합 중에도 단축어를 정확하게.
            <br />
            처음부터 한국어에 맞춰 설계했어요.
          </p>
          <div className="korean-visual">
            <span>ㅎ</span>
            <span>하</span>
            <span className="hangul-final">
              한<div>자연스럽게, 한 번에.</div>
            </span>
            <span className="korean-spark">✳</span>
          </div>
        </FeatureCard>
      </FeaturePair>
    </section>
  );
}
