import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "pages/shared/header/Header";
import Footer from "pages/shared/footer/Footer";
import HeroSection from "./hero/HeroSection";
import type { DemoPreview } from "./hero/demoExamples";
import Compatibility from "./compatibility/Compatibility";
import FeaturesSection from "./features/FeaturesSection";
import UseCasesSection from "./use-cases/UseCasesSection";
import FaqSection from "./faq/FaqSection";
import FinalCta from "./final-cta/FinalCta";
import ScrollProgress from "./ScrollProgress";

export default function HomePage() {
  const [preview, setPreview] = useState<DemoPreview | null>(null);
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <div className="App" id="home">
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection preview={preview} onPreviewChange={setPreview} />
        <Compatibility />
        <FeaturesSection preview={preview} />
        <UseCasesSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
