import "./UseCasesSection.css";
import { motion } from "framer-motion";
import useReveal from "../useReveal";

export default function UseCasesSection() {
  const reveal = useReveal();
  return (
    <section className="use-cases section-wrap" id="use-cases">
      <motion.div {...reveal} className="section-heading">
        <h2>반복해서 쓰는 메일에 써 보세요</h2>
      </motion.div>
      <div className="use-grid">
        {[
          {
            icon: "↗",
            role: "프리랜서 · 1인 기업",
            title: (
              <>
                고객마다 보내는
                <br />
                견적 안내 메일
              </>
            ),
            text: "매번 쓰는 견적 안내를 템플릿으로 저장하고, 고객명과 금액만 새로 입력하세요.",
            tags: ["\\견적", "{{금액}}"],
            color: "mint",
          },
          {
            icon: "♡",
            role: "CS 담당자",
            title: (
              <>
                문의가 올 때마다 보내는
                <br />
                교환 안내 메일
              </>
            ),
            text: "교환 절차는 템플릿으로 저장해 두고, 답장마다 고객명과 주문번호만 채우세요.",
            tags: ["\\교환", "{{주문번호}}"],
            color: "lilac",
          },
          {
            icon: "✳",
            role: "팀 일정 안내",
            title: (
              <>
                일정이 잡힐 때마다 보내는
                <br />
                회의 안내 메일
              </>
            ),
            text: "회의 안내 템플릿을 불러와 이번 회의의 날짜, 시간, 안건만 입력하세요.",
            tags: ["\\회의", "{{날짜}}"],
            color: "peach",
          },
        ].map((item) => (
          <motion.article {...reveal} className="use-card" key={item.role}>
            <span className={`use-icon ${item.color}`}>{item.icon}</span>
            <div className="use-role">{item.role}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <div className="use-tags">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
