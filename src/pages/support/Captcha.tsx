import { useEffect, useRef, useState } from "react";

type Turnstile = {
  ready: (callback: () => void) => void;
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: Turnstile; } }

export default function Captcha({ onVerify }: { onVerify: (token: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const sitekey = process.env.REACT_APP_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!sitekey) return;
    let disposed = false;
    let widget: string | undefined;
    const render = () => window.turnstile?.ready(() => {
      if (disposed || !container.current) return;
      widget = window.turnstile?.render(container.current, {
        sitekey, theme: "light", language: "ko", size: "flexible", action: "support",
        callback: (token: string) => { setError(false); onVerify(token); },
        "expired-callback": () => onVerify(""),
        "error-callback": () => { onVerify(""); setError(true); },
      });
    });
    let script = document.querySelector<HTMLScriptElement>("script[data-support-captcha]");
    const failed = () => setError(true);
    if (window.turnstile) render();
    else {
      if (!script) {
        script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.dataset.supportCaptcha = "true";
        document.head.appendChild(script);
      }
      script.addEventListener("load", render);
      script.addEventListener("error", failed);
    }
    return () => {
      disposed = true;
      script?.removeEventListener("load", render);
      script?.removeEventListener("error", failed);
      if (widget !== undefined) window.turnstile?.remove(widget);
    };
  }, [sitekey, onVerify]);

  return <div className="support-captcha">
    <div ref={container} />
    {!sitekey && <p>자동 입력 방지 인증을 준비 중입니다. 잠시 후 다시 방문해 주세요.</p>}
    {error && <p role="alert">인증을 불러오지 못했습니다. 네트워크를 확인한 뒤 페이지를 새로고침해 주세요.</p>}
  </div>;
}
