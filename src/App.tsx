import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import useCrossBrowsingPoliyfill from "customHooks/useCrossBrowsingPoliyfill";
import useDesktopSafariBackFix from "customHooks/useDesktopSafariBackFix";
import Header from "pages/header/Header";
import Footer from "pages/footer/Footer";
import HeroSection from "pages/hero/HeroSection";
import Compatibility from "pages/compatibility/Compatibility";
import PainSection from "pages/pain/PainSection";
import FeaturesSection from "pages/features/FeaturesSection";
import UseCasesSection from "pages/use-cases/UseCasesSection";
import FaqSection from "pages/faq/FaqSection";
import FinalCta from "pages/final-cta/FinalCta";
import ScrollProgress from "pages/shared/ScrollProgress";
import useSmoothScroll from "pages/shared/useSmoothScroll";
import "App.css";

function App() {
  useCrossBrowsingPoliyfill();
  useDesktopSafariBackFix();
  useSmoothScroll();
  const reducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const tryDemo = () => {
    setExpanded(true);
    document.getElementById("demo")?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };
  return (
    <div className="App" id="home">
      <ScrollProgress />
      <Header onTryDemo={tryDemo} />
      <main>
        <HeroSection
          onTryDemo={tryDemo}
          expanded={expanded}
          setExpanded={setExpanded}
        />
        <Compatibility />
        <PainSection />
        <FeaturesSection />
        <UseCasesSection />
        <FaqSection />
        <FinalCta onTryDemo={tryDemo} />
      </main>
      <Footer />
    </div>
  );
}
export default App;
