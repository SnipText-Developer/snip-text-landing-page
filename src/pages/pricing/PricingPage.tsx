import { useState } from "react";
import Header from "pages/shared/header/Header";
import Footer from "pages/shared/footer/Footer";
import "./pricing.css";

const freeFeatures = [
  "템플릿 5개",
  "Gmail·네이버 메일 자동 삽입",
  "확장 팝업 원클릭 복사",
  "변수 강제 채움",
];
const proFeatures = [
  "템플릿 50개",
  "AI 톤 교정 하루 10회",
  "여러 기기 실시간 동기화",
  "Free의 모든 기능",
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="pricing-page" id="home">
      <Header />
      <main className="pricing-main">
        <section aria-labelledby="pricing-title">
          <div className="pricing-intro">
            <p className="pricing-label">PRICING</p>
            <h1 id="pricing-title">무료로 시작하고,<br />필요할 때 Pro로</h1>
            <p className="pricing-description">
              카드 등록 없이 써보고, 템플릿이 더 필요해지면 업그레이드하세요.
            </p>
            <div className="billing-toggle" role="group" aria-label="결제 주기">
              <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>
                월간 결제
              </button>
              <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>
                연간 결제 <span>15% 할인</span>
              </button>
            </div>
          </div>
          <div className="pricing-plans">
            <article className="pricing-plan pricing-free" aria-labelledby="free-title">
              <h2 id="free-title">FREE</h2>
              <p className="plan-description">자주 쓰는 문장을 처음 정리하는 분께</p>
              <div className="plan-price"><strong>0원</strong><span>계속 무료</span></div>
              <ul>{freeFeatures.map(feature => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul>
            </article>
            <article className="pricing-plan pricing-pro" aria-labelledby="pro-title">
              <h2 id="pro-title">PRO</h2>
              <p className="plan-description">템플릿을 업무 전반에 쓰는 분께</p>
              <div className="plan-price" aria-live="polite">
                <strong>{annual ? "5,015원" : "5,900원"}</strong><span>/ 월</span>
              </div>
              {annual && <p className="annual-total">연 60,180원 결제 · 월 환산 금액</p>}
              <ul>{proFeatures.map(feature => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul>
            </article>
          </div>
        </section>
      </main>
      <div className="pricing-footer"><Footer /></div>
    </div>
  );
}
