import { FormEvent, useState } from "react";
import Header from "pages/shared/header/Header";
import Footer from "pages/shared/footer/Footer";
import Captcha from "./Captcha";
import "./support.css";

export default function SupportPage() {
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [token, setToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  const endpoint = process.env.REACT_APP_SUPPORT_ENDPOINT;
  const ready = !!(
    email.trim() &&
    category &&
    message.trim() &&
    consent &&
    token &&
    endpoint
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || sending) return;
    setSending(true);
    setNotice("");
    const data = new FormData();
    data.set("email", email.trim());
    data.set("category", category);
    data.set("message", message.trim());
    data.set("consent", "true");
    data.set("cf-turnstile-response", token);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(endpoint!, {
        method: "POST",
        body: data,
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || result.success !== true)
        throw new Error("submission failed");
      setNotice("문의가 접수되었습니다. 입력하신 이메일로 답변드릴게요.");
      setEmail("");
      setCategory("");
      setMessage("");
      setConsent(false);
    } catch {
      setNotice(
        "문의를 접수하지 못했습니다. 잠시 후 인증을 다시 진행하고 접수해 주세요.",
      );
    } finally {
      window.clearTimeout(timeout);
      setToken("");
      setCaptchaKey((value) => value + 1);
      setSending(false);
    }
  }

  return (
    <div className="support-page" id="home">
      <Header />
      <main className="support-main">
        <section aria-labelledby="support-title">
          <div className="support-intro">
            <p className="support-eyebrow">HELP CENTER</p>
            <h1 id="support-title">무엇을 도와드릴까요?</h1>
            <p className="support-description">
              영업일 기준 7일 이내에 이메일로 답변드려요.
            </p>
          </div>
          <form className="support-form" onSubmit={submit} aria-busy={sending}>
            <fieldset disabled={sending}>
              <label className="support-field">
                답변 받을 이메일 <span aria-hidden="true">*</span>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <label className="support-field">
                문의 유형 <span aria-hidden="true">*</span>
                <select
                  required
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}>
                  <option value="" disabled>
                    문의 유형을 선택해 주세요
                  </option>
                  <option value="usage">서비스 이용</option>
                  <option value="billing">요금 및 결제</option>
                  <option value="bug">오류 신고</option>
                  <option value="suggestion">기능 제안</option>
                  <option value="other">기타 문의</option>
                </select>
              </label>
              <label className="support-field">
                내용 <span aria-hidden="true">*</span>
                <div className="support-message">
                  <textarea
                    required
                    maxLength={2000}
                    placeholder="문의 내용을 입력해 주세요"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    data-lenis-prevent
                  />
                  <span className="support-count">{message.length} / 2000</span>
                </div>
              </label>
              <div className="support-consent">
                <label>
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                  />
                  [필수] 개인정보 수집·이용 동의
                </label>
                <details>
                  <summary>보기</summary>
                  <p>
                    문의 답변을 위해 이메일 주소, 문의 내용과 첨부파일을
                    수집합니다. 문의 처리 완료 후 30일 이내에 삭제합니다. 동의를
                    거부할 수 있으며, 동의하지 않으면 문의를 접수할 수 없습니다.
                  </p>
                </details>
              </div>
              <Captcha key={captchaKey} onVerify={setToken} />
              <button
                className="support-submit"
                type="submit"
                disabled={!ready || sending}>
                {sending ? "접수 중…" : "문의 접수하기"}
              </button>
            </fieldset>
            {!endpoint && (
              <p className="support-status">
                현재 온라인 문의 접수를 준비 중입니다.
              </p>
            )}
            {notice && (
              <p className="support-status" role="status">
                {notice}
              </p>
            )}
          </form>
        </section>
      </main>
      <div className="support-footer">
        <Footer />
      </div>
    </div>
  );
}
