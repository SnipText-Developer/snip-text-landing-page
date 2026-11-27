import "./MailScrollPreview.css";
import { LogoMark } from "pages/shared/Brand";
import { useRef, type CSSProperties } from "react";
import { easeInOut, motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { demoTemplates, fillDemoTemplate, quoteExample, sampleQuoteValues, shortenPreviewValue, type DemoPreview } from "./demoExamples";
import useReveal from "../useReveal";

const easing = { ease: easeInOut };

function stretchFadeRanges(animationRange: number[]) {
  // Alternate normal-distance and triple-distance segments between the boundaries.
  let distance = 0;
  const scrollRange = animationRange.map((boundary, index) => {
    const previous = animationRange[index - 1] ?? 0;
    distance += (boundary - previous) * (index % 2 === 0 ? 3 : 1);
    return distance;
  });
  return {
    animationRange,
    scrollRange: scrollRange.map((boundary) => boundary / distance),
    trackStyle: { "--demo-scroll-scale": distance } as CSSProperties,
  };
}

// Overlapping fades share a segment so both retain the same transition timing.
const variableTimeline = stretchFadeRanges([0, 0.29, 0.37, 0.83, 0.96, 1]);
const quickTimeline = stretchFadeRanges([0, 0.29, 0.43, 1]);

function PreviewVariable({ name, value, index, progress }: {
  name: string;
  value: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const characters = Array.from(value);
  const start = index === 0 ? 0.44 : 0.62;
  const end = index === 0 ? 0.56 : 0.75;
  const length = useTransform(progress, [start, end], [0, characters.length]);
  const text = useTransform(length, (count) =>
    characters.slice(0, Math.round(count)).join("") || name + " 입력",
  );
  const backgroundColor = useTransform(progress, [0.56, 0.62],
    index === 0 ? ["#eaf3ff", "#ffffff"] : ["#ffffff", "#eaf3ff"],
    easing,
  );
  const color = useTransform(length, (count) => Math.round(count) ? "#18212c" : "#4b586a");

  return (
    <div>
      <strong>{name}</strong>
      <motion.div className="scroll-variable-input" style={{ backgroundColor }}>
        <motion.span className="scroll-live-value" style={{ color }}>{text}</motion.span>
        <span className="scroll-static-value">{value || name + " 입력"}</span>
      </motion.div>
    </div>
  );
}

export default function MailScrollPreview({ preview }: { preview: DemoPreview | null }) {
  const template = preview?.template ?? quoteExample;
  const before = preview?.before ?? "";
  const after = preview?.after ?? "";
  const hasVariables = template.variables.length > 0;
  const sourceValues = preview && Object.keys(preview.values).length > 0 ? preview.values : sampleQuoteValues;
  const values = Object.fromEntries(
    Object.entries(sourceValues).map(([name, value]) => [name, shortenPreviewValue(value)]),
  );
  const insertedText = before + fillDemoTemplate(template, values) + after;
  const reveal = useReveal();
  const demoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: demoRef,
    offset: ["start start", "end end"],
  });
  const timeline = hasVariables ? variableTimeline : quickTimeline;
  const animationProgress = useTransform(scrollYProgress, timeline.scrollRange, timeline.animationRange);
  const progress = useSpring(animationProgress, { stiffness: 180, damping: 28, mass: 0.32 });
  const listOpacity = useTransform(progress, [0, 0.08, 0.29, 0.37], [0, 1, 1, 0], easing);
  const listY = useTransform(progress, [0, 0.08, 0.29, 0.37], [-4, 0, 0, -3], easing);
  const insertionRange = hasVariables ? [0.87, 0.96] : [0.32, 0.43];
  const commandOpacity = useTransform(progress, insertionRange, [1, 0], easing);
  const variablesOpacity = useTransform(progress, [0.31, 0.4, 0.83, 0.91], [0, 1, 1, 0], easing);
  const variablesY = useTransform(progress, [0.31, 0.4, 0.83, 0.91], [4, 0, 0, -4], easing);
  const bodyOpacity = useTransform(progress, insertionRange, [0, 1], easing);
  const bodyY = useTransform(progress, insertionRange, [3, 0], easing);
  const insertLabel = useTransform(progress, (value): string =>
    value >= 0.82 ? "삽입 중…" : "Enter 삽입",
  );

  return (
    <div className={hasVariables ? "demo-scroll-track" : "demo-scroll-track demo-scroll-quick"} ref={demoRef} style={timeline.trackStyle}>
      <div className="demo-sticky-viewport">
        <motion.div
          {...reveal}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          className="demo-scene">
          <div className="browser">
            <div className="browser-bar">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>
              <div className="address-bar">
                <span>♧</span> mail.google.com <span>☆</span>
              </div>
              <span className="browser-menu">···</span>
            </div>
            <div className="demo-app">
              <aside className="demo-sidebar">
                <div className="mail-logo">
                  <span>✉</span> Mail
                </div>
                <div className="compose-pill">
                  ＋ <span>편지쓰기</span>
                </div>
                <div className="mail-nav selected">
                  ▣ <span>받은편지함</span>
                </div>
                <div className="mail-nav">
                  ☆ <span>별표편지함</span>
                </div>
                <div className="mail-nav">
                  ◷ <span>다시 알림</span>
                </div>
                <div className="mail-nav">
                  ➤ <span>보낸편지함</span>
                </div>
                <div className="mail-nav">
                  ▤ <span>임시보관함</span>
                </div>
                <div className="sidebar-bottom">
                  <LogoMark size={20} /> SnipText
                </div>
              </aside>
              <div className="mail-workspace">
                <div className="workspace-top">
                  받은편지함 <span>⌕　⋮</span>
                </div>
                <div className="mail-compose">
                  <div className="compose-heading">
                    새 메시지 <span>−　⤢　×</span>
                  </div>
                  <div className="mail-field">
                    <span>받는 사람</span>{" "}
                    <span className="recipient">
                      {hasVariables ? values.고객명 || "고객" : "팀원"} <small>×</small>
                    </span>
                  </div>
                  <div className="mail-field subject">
                    {hasVariables ? "견적 안내" : "회의 일정 안내"}
                  </div>
                  <div className="mail-body">
                    <div className="insertion-stage" aria-hidden="true">
                      <motion.div className="scroll-preview-command" style={{ opacity: commandOpacity }}>
                        {before}<span>\</span>
                        <span className="scroll-command-caret" />{after}
                      </motion.div>

                      <motion.div className="scroll-mini-popup scroll-mini-list" style={{ opacity: listOpacity, y: listY }}>
                        <div className="scroll-popup-heading">최근 사용</div>
                        {demoTemplates.map((item) => (
                          <div
                            key={item.shortcut}
                            className={item === template ? "scroll-popup-option selected" : "scroll-popup-option"}>
                            <strong>{item.shortcut}</strong>
                            <span>{item.template.replace(/\s+/g, " ")}</span>
                            {item === template && <i />}
                          </div>
                        ))}
                        <div className="scroll-popup-footer">↑↓ 이동 · Enter 선택</div>
                      </motion.div>

                      {hasVariables && <motion.div className="scroll-mini-popup scroll-mini-variables" style={{ opacity: variablesOpacity, y: variablesY }}>
                        <div className="scroll-popup-heading">변수 입력</div>
                        <div className="scroll-variable-fields">
                          {template.variables.map(({ name }, index) => (
                            <PreviewVariable
                              key={name}
                              name={name}
                              value={values[name] ?? ""}
                              index={index}
                              progress={progress}
                            />
                          ))}
                          <p>모든 입력칸을 채워 주세요.</p>
                        </div>
                        <div className="scroll-popup-footer">
                          <motion.span className="scroll-live-value">{insertLabel}</motion.span>
                          <span className="scroll-static-value">Enter 삽입</span>
                          <span> · Tab 다음 항목 · Esc 닫기</span>
                        </div>
                      </motion.div>}

                      <motion.p className="scroll-template-result" style={{ opacity: bodyOpacity, y: bodyY }}>
                        {insertedText}
                      </motion.p>
                    </div>
                  </div>
                  <div className="compose-footer">
                    <span className="compose-send" aria-hidden="true">보내기</span>
                    <span>A　♧　↗　☺</span>
                    <span>♲</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="demo-caption">
            <span className="caption-line" />
            {hasVariables
              ? "최근 사용 목록에서 견적 안내를 선택하고 변수를 채우면, 값을 채운 템플릿이 본문에 들어갑니다."
              : "최근 사용 목록에서 회의 안내를 선택하면 템플릿이 바로 본문에 들어갑니다."}
            <span className="caption-line" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
