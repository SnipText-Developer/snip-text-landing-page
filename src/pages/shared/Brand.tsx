import "./Brand.css";
import { Link } from "react-router-dom";

export const Arrow = () => <span aria-hidden="true">↗</span>;
export const LogoMark = ({ size = 32 }: { size?: number }) => (
  <img
    className="logo-mark"
    src={`${process.env.PUBLIC_URL}/logo/logo-192.png`}
    width={size}
    height={size}
    alt=""
  />
);

export const Logo = () => (
  <Link to="/" className="logo" aria-label="SnipText 홈">
    <LogoMark />
    SnipText
  </Link>
);

export const Chrome = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M12 8h9M8.6 14 4 6M14 15.5 9 22"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);
