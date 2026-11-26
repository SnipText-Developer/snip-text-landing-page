import "./HeroSection.css";
import ExternalLink from "components/ExternalLink";
import { snipTextUrl } from "config";
import type { DemoPreview } from "./demoExamples";
import MailDemo from "./MailDemo";
import MailScrollPreview from "./MailScrollPreview";

export default function HeroSection({ preview, onPreviewChange }: {
  preview: DemoPreview | null;
  onPreviewChange: (preview: DemoPreview | null) => void;
}) {
  return (
    <section className="hero section-wrap" aria-labelledby="hero-title">
      <div className="hero-content">
        <h1 id="hero-title">
          비슷한 메일,
          <br />
          <span>매번 다시 쓰고 있나요?</span>
        </h1>
        <p className="hero-description">
          견적 안내나 회의 공지는 같은 양식을 쓰는데도 보낼 때마다 다시 쓰기 번거롭죠.
          자주 쓰는 메일을 템플릿으로 저장하고 단축어로 불러오세요. 고객명, 금액, 날짜만 바꾸면 새 메일이 완성됩니다.
        </p>
        <ExternalLink className="button hero-cta" href={snipTextUrl}>
          무료로 시작하기
        </ExternalLink>
      </div>
      <MailDemo onPreviewChange={onPreviewChange} />
      <MailScrollPreview preview={preview} />
    </section>
  );
}
