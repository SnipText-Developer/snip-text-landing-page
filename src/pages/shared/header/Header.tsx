import "./Header.css";
import { NavLink } from "react-router-dom";
import { Arrow, Logo } from "../Brand";
import ExternalLink from "components/ExternalLink";
import { snipTextUrl } from "config";

export default function Header() {
  return (
    <header className="header">
      <div className="nav-wrap">
        <Logo />
        <nav className="nav-menu" aria-label="메인 메뉴">
          <NavLink to="/" end>
            홈
          </NavLink>
          <NavLink to="/pricing">요금제</NavLink>
          <NavLink to="/support">고객지원</NavLink>
        </nav>
        <ExternalLink className="nav-cta" href={snipTextUrl}>
          무료로 시작하기 <Arrow />
        </ExternalLink>
      </div>
    </header>
  );
}
