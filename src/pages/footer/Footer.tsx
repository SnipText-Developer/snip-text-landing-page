import { Logo } from "../shared/Brand";
export default function Footer() {

  return (
    <footer className="footer section-wrap">
      <div className="footer-top">
        <div>
          <Logo />
          <p>당신의 말은 그대로. 반복만 짧게.</p>
        </div>
        <a href="#home">
          맨 위로 <span>↑</span>
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} SnipText. All rights reserved.
        </span>
        <span>
          Made for your everyday flow. <span className="green-period">✳</span>
        </span>
      </div>
    </footer>
  );
}
