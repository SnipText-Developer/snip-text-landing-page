import "./FaqSection.css";
import { useState } from "react";
import { motion } from "framer-motion";
import useReveal from "../useReveal";

export default function FaqSection() {
  const reveal = useReveal();
  const [faq, setFaq] = useState<number | null>(null);
  return (
    <section className="faq-section section-wrap" id="faq">
      <motion.div {...reveal} className="faq-heading">
        <div className="section-label">A LITTLE MORE ABOUT US</div>
        <h2>
          궁금한 게<br />
          있으신가요?
        </h2>
        <span className="faq-star">{"✳\uFE0E"}</span>
      </motion.div>
      <div className="faq-list">
        {[
          {
            q: "SnipText는 어떻게 사용하나요?",
            a: "Chrome 확장 프로그램에 자주 쓰는 메일을 템플릿으로 저장하고 단축어를 지정하세요. 메일 본문 입력창에 역슬래시(\\)를 입력한 뒤 단축어를 이어서 입력하세요. 표시된 목록에서 원하는 템플릿을 선택하고 Enter를 누르면 저장한 템플릿을 불러올 수 있어요.",
          },
          {
            q: "어떤 곳에서 사용할 수 있나요?",
            a: "Gmail과 Naver 메일의 텍스트 입력창에서 사용할 수 있어요.",
          },
          {
            q: "매번 달라지는 이름이나 날짜도 넣을 수 있나요?",
            a: "네. 템플릿에 {{고객명}}, {{날짜}}처럼 변수를 넣어두세요. 템플릿을 선택한 뒤 각 변수의 값을 채우고 Enter를 누르면 메일 본문에 들어갑니다.",
          },
        ].map((item, i) => (
          <div className="faq-item" key={item.q}>
            <button
              aria-expanded={faq === i}
              aria-controls={`answer-${i}`}
              onClick={() => setFaq(faq === i ? null : i)}>
              {item.q}
              <span>{faq === i ? "−" : "+"}</span>
            </button>
            <div id={`answer-${i}`} hidden={faq !== i}>
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
