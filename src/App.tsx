import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "pages/home/HomePage";
import useCrossBrowsingPoliyfill from "customHooks/useCrossBrowsingPoliyfill";
import useDesktopSafariBackFix from "customHooks/useDesktopSafariBackFix";
import useSmoothScroll from "pages/shared/useSmoothScroll";
import "App.css";

function App() {
  useCrossBrowsingPoliyfill();
  useDesktopSafariBackFix();
  useSmoothScroll();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default App;
