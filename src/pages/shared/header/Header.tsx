import { NavLink } from "react-router-dom";
import { Arrow, Logo } from "../Brand";
export default function Header({ onTryDemo }: { onTryDemo: () => void }) {

  return (
    <header className="header">
      <div className="nav-wrap">
        <Logo />
        <nav aria-label="메인 메뉴">
          <NavLink to="/" end>홈</NavLink>
          <NavLink to="/pricing">요금제</NavLink>
          <NavLink to="/support">고객지원</NavLink>
        </nav>
        <button className="nav-cta" onClick={onTryDemo}>
          무료로 시작하기 <Arrow />
        </button>
      </div>
    </header>
  );
}
