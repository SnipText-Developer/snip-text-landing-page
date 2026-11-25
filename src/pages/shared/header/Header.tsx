import "./Header.css";
import { Arrow, Logo } from "../Brand";
import ExternalLink from "components/ExternalLink";
import { snipTextUrl } from "config";

export default function Header() {
  return (
    <header className="header">
      <div className="nav-wrap">
        <Logo />
        <ExternalLink className="nav-cta" href={snipTextUrl}>
          무료로 시작하기 <Arrow />
        </ExternalLink>
      </div>
    </header>
  );
}
