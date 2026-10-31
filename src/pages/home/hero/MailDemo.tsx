import "./MailDemo.css";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { examples } from "./demoExamples";
import useReveal from "../useReveal";

export default function MailDemo({ expanded, setExpanded }: {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}) {
  const reducedMotion = useReducedMotion();
  const reveal = useReveal();
  const [active, setActive] = useState(0);
  const example = examples[active];
  const demoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: demoProgress } = useScroll({
    target: demoRef,
    offset: ["start start", "end end"],
  });
  const templateY = useTransform(demoProgress, [0, 0.25, 0.7], [0, -8, -52]);
  const templateScale = useTransform(demoProgress, [0, 0.25, 0.7], [1, 1, 0.04]);
  const templateOpacity = useTransform(demoProgress, [0, 0.55, 0.7], [1, 1, 0]);
  const shortcutOpacity = useTransform(demoProgress, [0.5, 0.7], [1, 0]);
  const bodyOpacity = useTransform(demoProgress, [0.6, 0.75], [0, 1]);
  const bodyClip = useTransform(demoProgress, [0.65, 1], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]);
  return (
    <div className={`demo-scroll-track${reducedMotion ? " reduced-motion" : ""}`} ref={demoRef}>
      <div className="demo-sticky-viewport">
        <motion.div
          {...reveal}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          className="demo-scene"
          id="demo">
          <div className="floating-note note-left">
            <span>✦</span> 생각은 멈추지 않도록.
          </div>
          <div className="floating-note note-right">
            <span className="live-dot" /> 방금, 30초를 아꼈어요
          </div>
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
                  <small>12</small>
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
                  <small>3</small>
                </div>
                <div className="sidebar-bottom">
                  <span className="logo-mark">s·</span> with sniptext
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
                      김민지 <small>×</small>
                    </span>
                  </div>
                  <div className="mail-field subject">
                    좋은 시작을 함께해요
                  </div>
                  <div className="mail-body">
                    <p>마음은 그대로, 타이핑은 짧게.</p>
                    <div className="insertion-stage">
                      <motion.div
                        key={active}
                        style={{
                          opacity: expanded || reducedMotion ? 1 : bodyOpacity,
                          clipPath: expanded || reducedMotion ? "none" : bodyClip,
                        }}
                        className="expanded-text scroll-inserted-text">
                        {example.text}
                        <span className="typing-caret" />
                        <div className="insert-success">
                          ✓ 템플릿이 입력되었어요
                        </div>
                      </motion.div>
                      <motion.div
                        className="shortcut-origin"
                        style={{
                          opacity: expanded || reducedMotion ? 0 : shortcutOpacity,
                          pointerEvents: expanded || reducedMotion ? "none" : "auto"
                        }}>
                        <button
                          className="inline-shortcut"
                          onClick={() => setExpanded(true)}>
                          {example.shortcut}
                          <span className="typing-caret" />
                          <span className="space-hint">Enter ↵</span>
                        </button>
                      </motion.div>
                      <motion.div className="suggestion" style={{
                        y: reducedMotion ? 0 : templateY,
                        scale: reducedMotion ? 1 : templateScale,
                        opacity: expanded || reducedMotion ? 0 : templateOpacity,
                        pointerEvents: expanded || reducedMotion ? "none" : "auto",
                      }}>
                        <div className="suggestion-brand">
                          <span className="logo-mark">s·</span> 템플릿{" "}
                          <span>↵</span>
                        </div>
                        {examples.map((item, index) => (
                          <button
                            key={item.shortcut}
                            className={
                              active === index
                                ? "suggestion-item active"
                                : "suggestion-item"
                            }
                            onClick={() => {
                              setActive(index);
                              setExpanded(false);
                            }}>
                            <span>{item.title}</span>
                            <kbd>{item.shortcut}</kbd>
                          </button>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                  <div className="compose-footer">
                    <button onClick={() => setExpanded(true)}>
                      문장 넣기 <span>↵</span>
                    </button>
                    <span>A　♧　↗　☺</span>
                    <span>♲</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="demo-caption">
            <span className="caption-line" /> 스크롤을 내려보세요. 템플릿이 내 메일이 되는 순간.
            <span className="caption-line" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
