// import "./HomePage.scss"
import MainShowcase from "./components/MainShowcase/MainShowcase";
import FAGSection from "./sections/FAGSection/FAGSection";
import AboutTheProjectSection from "./sections/AboutTheProjectSection/AboutTheProjectSection";
import { useRef } from "react";
import CrowdfundingSection from "./sections/CrowdfundingSection/CrowdfundingSection";
import PageHelmet from "@components/PageHelmet/PageHelmet";

const HomePage = () => {

  const FAGSectionRef = useRef<HTMLDivElement>(null);
  const CrowdfundingSectionRef = useRef<HTMLDivElement>(null);

  function scrollToElement(ref: React.RefObject<HTMLElement>) {
    if (ref.current) {
      ref.current.style.scrollMarginTop = '3em';
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  return (
    <>
      <PageHelmet title="Home" />
      <MainShowcase scrollToFAG={() => scrollToElement(FAGSectionRef)} scrollToCrowdfunding={() => scrollToElement(CrowdfundingSectionRef)} />
      <AboutTheProjectSection />
      <FAGSection targetOfScroll={FAGSectionRef} />
    </>
  )
}

export default HomePage;