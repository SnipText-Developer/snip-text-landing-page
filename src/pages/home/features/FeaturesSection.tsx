import "./FeaturesSection.css";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import useReveal from "../useReveal";
import { demoTemplates, meetingExample, quoteExample, sampleQuoteValues, shortenPreviewValue, type DemoPreview } from "../hero/demoExamples";
import { FeatureCard } from "./FeatureCard";
import "./features-motion.css";
export default function FeaturesSection({ preview }: { preview: DemoPreview | null }) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const contents = Array.from(section.querySelectorAll<HTMLElement>(".feature-content"));
    function matchCardHeights() {
      const heights = contents.map((content) => {
        const cardStyle = getComputedStyle(content.parentElement!);
        const contentHeight = parseFloat(getComputedStyle(content).height);
        return contentHeight + parseFloat(cardStyle.paddingTop) + parseFloat(cardStyle.paddingBottom);
      });
      section?.style.setProperty("--feature-card-height", `${Math.ceil(Math.max(...heights))}px`);
    }

    matchCardHeights();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(matchCardHeights);
    contents.forEach((content) => observer?.observe(content));
    window.addEventListener("resize", matchCardHeights);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", matchCardHeights);
    };
  }, []);

  const values: Record<string, string> = preview?.template === quoteExample && Object.keys(preview.values).length
    ? preview.values
    : sampleQuoteValues;
  const customer = shortenPreviewValue(values.고객명 ?? "{{고객명}}");
  const amount = shortenPreviewValue(values.금액 ?? "{{금액}}");

  const reveal = useReveal();
  return (
    <section ref={sectionRef} className="features section-wrap" id="features">
      <motion.div {...reveal} className="section-heading">
        <div className="section-label">단축어와 변수 치환</div>
        <h2>
          자주 쓰는 템플릿은 불러오고,
          <br />
          달라지는 부분만 채우세요.
        </h2>
        <p className="section-description">
          인사말과 안내 문구를 템플릿으로 저장해 두세요. 메일을 보낼 때는 단축어로 불러와 받는 사람이나 일정처럼 달라지는 값만 채우면 됩니다.
        </p>
      </motion.div>
      <FeatureCard className="feature-card feature-mint" trackClassName="shortcut-track" smooth>
        <span className="feature-index">단축어</span>
        <h3>
          긴 메일도,
          <br />
          짧은 단축어 하나로.
        </h3>
        <p>
          메일 본문에 <code>\</code>를 입력한 뒤, 최근 목록에서 <code>{meetingExample.shortcut}</code>를 선택하고 Enter를 눌러 템플릿을 불러오세요.
        </p>
        <div className="shortcut-visual shortcut-mail-example" aria-hidden="true">
          <div className="shortcut-mail-stage shortcut-mail-search">
            <div className="shortcut-mail-command"><code>\</code><span /></div>
            <div className="mini-popup-demo shortcut-mail-popup">
              <div className="mini-popup-heading">최근 사용</div>
              {demoTemplates.map((template) => (
                <div
                  key={template.shortcut}
                  className={template === meetingExample ? "mini-popup-option shortcut-mail-option-selected" : "mini-popup-option"}>
                  <strong>{template.shortcut}</strong>
                  <span>{template.template.replace(/\s+/g, " ")}</span>
                  {template === meetingExample && <i />}
                </div>
              ))}
              <div className="mini-popup-footer">↑↓ 이동 · Enter 선택</div>
            </div>
          </div>
          <div className="shortcut-mail-stage shortcut-mail-result">
            {meetingExample.template}
          </div>
        </div>
      </FeatureCard>
      <FeatureCard className="feature-card feature-peach">
        <span className="feature-index">변수 치환</span>
        <h3>
          고객명과 금액만
          <br />
          바꿔 넣으세요.
        </h3>
        <p>
          고객명, 금액처럼 매번 달라지는 부분은 변수로.
          <br />
          값을 입력하면 이번에 보낼 메일이 완성됩니다.
        </p>
        <div className="variable-visual">
          <div className="variable-letter">
            안녕하세요 <span className="animated-variable" data-placeholder="{{고객명}}"><span>{customer}</span></span>님,
            <br />
            문의하신 프로젝트 견적은
            <br />
            <span className="animated-variable" data-placeholder="{{금액}}"><span>{amount}</span></span>원입니다.
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
    </section>
  );
}
