import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "pages/home/HomePage";
import PricingPage from "pages/pricing/PricingPage";
import SupportPage from "pages/support/SupportPage";
import useCrossBrowsingPoliyfill from "customHooks/useCrossBrowsingPoliyfill";
import useDesktopSafariBackFix from "customHooks/useDesktopSafariBackFix";
import useSmoothScroll from "pages/shared/useSmoothScroll";
import "App.css";

function App() {
  useCrossBrowsingPoliyfill();
  useDesktopSafariBackFix();
  useSmoothScroll();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = pathname === "/pricing"
      ? "요금제 | SnipText"
      : pathname === "/support" ? "고객지원 | SnipText"
      : "SnipText";
  }, [pathname]);
  return (
    <Routes>
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
export default App;
