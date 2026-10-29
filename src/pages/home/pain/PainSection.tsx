import { motion } from "framer-motion";
import useReveal from "../useReveal";

export default function PainSection() {
  const reveal = useReveal();
  return (
    <section className="pain-section" id="why">
      <div className="section-wrap pain-layout">
        <motion.div {...reveal}>
          <div className="section-label">LESS TYPING. MORE LIVING.</div>
          <h2>
            익숙한 반복에
            <br />
            익숙해지지 마세요<span className="green-period">.</span>
          </h2>
          <p className="section-description">
            작은 번거로움이 쌓이면, 큰 시간이 되니까.
            <br />
            이제 당신의 일에만 집중하세요.
          </p>
          <div className="pain-doodle">
            copy. paste. repeat.<span>이제 그만! ↗</span>
          </div>
        </motion.div>
        <div className="pain-list">
          {[
            {
              title: "“그 문구, 메모장 어디에 적어놨더라?”",
              text: "메모장도, 노션도 뒤지지 마세요. 필요한 순간 바로 꺼내 쓰세요.",
              icon: "⌕",
            },
            {
              title: "“지난번 고객사 이름을 그대로 보냈어요.”",
              text: "이름, 금액, 날짜. 바꿔야 할 부분만 빈칸으로 남겨두세요.",
              icon: "↺",
            },
            {
              title: "“해외 툴은 한글만 치면 꼬여요.”",
              text: "한글 조합 중에도 자연스럽게. 한국어를 위해 만들었어요.",
              icon: "가",
            },
          ].map((item, i) => (
            <motion.div {...reveal} className="pain-item" key={item.title}>
              <span className="pain-number">0{i + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <span className="pain-icon">{item.icon}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
