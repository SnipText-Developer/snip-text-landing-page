import { Arrow, Logo } from "../shared/Brand";
export default function Header({ onTryDemo }: { onTryDemo: () => void }) {

  return (
    <header className="header">
      <div className="nav-wrap">
        <Logo />
        <nav aria-label="메인 메뉴">
          <a href="#features">기능 소개</a>
          <a href="#use-cases">이렇게 써보세요</a>
          <a href="#faq">자주 묻는 질문</a>
        </nav>
        <button className="nav-cta" onClick={onTryDemo}>
          무료로 시작하기 <Arrow />
        </button>
      </div>
    </header>
  );
}
