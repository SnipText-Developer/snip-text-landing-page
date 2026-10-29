import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import Header from "pages/shared/header/Header";
import Footer from "pages/shared/footer/Footer";
import HeroSection from "./hero/HeroSection";
import Compatibility from "./compatibility/Compatibility";
import PainSection from "./pain/PainSection";
import FeaturesSection from "./features/FeaturesSection";
import UseCasesSection from "./use-cases/UseCasesSection";
import FaqSection from "./faq/FaqSection";
import FinalCta from "./final-cta/FinalCta";
import ScrollProgress from "./ScrollProgress";

export default function HomePage() {
  const reducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const tryDemo = () => {
    setExpanded(true);
    document.getElementById("demo")?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };
  const location = useLocation();
  useEffect(() => {
    if (location.hash === "#demo") setExpanded(true);
    if (!location.hash) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({
        block: location.hash === "#demo" ? "center" : "start",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash]);
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
