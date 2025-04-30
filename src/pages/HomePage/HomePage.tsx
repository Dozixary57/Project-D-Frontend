import { Helmet } from "react-helmet-async";
import { Navbar } from "@components/Navbar/Navbar";
import "./HomePage.scss"
import { Footer } from "@components/Footer/Footer";
import MainShowcase from "./components/MainShowcase/MainShowcase";
import FAGSection from "./sections/FAGSection/FAGSection";
import AboutTheProjectSection from "./sections/AboutTheProjectSection/AboutTheProjectSection";
import { useRef } from "react";
import CrowdfundingSection from "./sections/CrowdfundingSection/CrowdfundingSection";

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home | Project D</title>
      </Helmet>
      <Navbar />
      <main className="HOME_PAGE">
        <MainShowcase scrollToFAG={() => scrollToElement(FAGSectionRef)} scrollToCrowdfunding={() => scrollToElement(CrowdfundingSectionRef)} />
        <AboutTheProjectSection />
        <CrowdfundingSection targetOfScroll={CrowdfundingSectionRef} />
        <FAGSection targetOfScroll={FAGSectionRef} />
      </main>
      <Footer />
    </>
  )
}

export { HomePage };