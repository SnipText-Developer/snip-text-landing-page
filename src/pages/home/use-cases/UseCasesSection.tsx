import "./UseCasesSection.css";
import { motion } from "framer-motion";
import useReveal from "../useReveal";

export default function UseCasesSection() {
  const reveal = useReveal();
  return (
    <section className="use-cases section-wrap" id="use-cases">
      <motion.div {...reveal} className="section-heading">
        <div className="section-label">YOUR WORDS, YOUR WORKFLOW.</div>
        <h2>
          누가 써도, 어디서 써도
          <br />잘 맞는 이유.
        </h2>
      </motion.div>
      <div className="use-grid">
        {[
          {
            icon: "↗",
            role: "프리랜서 · 1인 기업",
            title: (
              <>
                하루 5건의 견적 메일,
                <br />
                단축어 하나로.
              </>
            ),
            text: "매번 비슷한 제안서와 견적 안내. 반복되는 설명 대신, 더 좋은 결과물에 집중하세요.",
            tags: ["/견적", "/계약"],
            color: "mint",
          },
          {
            icon: "♡",
            role: "CS 담당자",
            title: (
              <>
                반품·교환 안내는 빠르게,
                <br />
                고객에게는 다정하게.
              </>
            ),
            text: "배송, 환불, 자주 묻는 질문까지. 한결같은 안내에 고객의 이름만 더해보세요.",
            tags: ["/교환", "/문의"],
            color: "lilac",
          },
          {
            icon: "✳",
            role: "일잘러의 일상",
            title: (
              <>
                매번 찾던 메일 양식,
                <br />
                이제 외우지 마세요.
              </>
            ),
            text: "회사 주소부터 회의 안내까지. 머릿속에 담아둘 필요 없이 가볍게 꺼내 쓰세요.",
            tags: ["/주소", "/회의"],
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
