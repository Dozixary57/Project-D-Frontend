import "./OverviewPage.scss";
import { Helmet } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";
import { ToTopArrow } from "@components/ToUpArrow/ToTopArrow";
import WelcomeSection from "./sections/WelcomeSection/WelcomeSection";
import ProjectContentSection from "./sections/ProjectContentSection/ProjectContentSection";
import CrowdfundingSection from "./sections/CrowdfundingSection/CrowdfundingSection";

const OverviewPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentSectionIndexRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(container.children) as HTMLElement[];
    const totalSections = sections.length;

    currentSectionIndexRef.current = 0;

    const scrollToSection = (index: number) => {
      currentSectionIndexRef.current = index;

      scrollingRef.current = true;

      sections[index].scrollIntoView({ behavior: 'smooth' });

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        scrollingRef.current = false;
      }, 100);
    };

    const handleScroll = (e: WheelEvent) => {
      if (e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      e.preventDefault();

      if (scrollingRef.current) {
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;

      const newIndex = Math.max(0, Math.min(totalSections - 1, currentSectionIndexRef.current + direction));

      if (newIndex === currentSectionIndexRef.current) {
        return;
      }

      scrollToSection(newIndex);
    };

    container.addEventListener("wheel", handleScroll, { passive: false });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (scrollingRef.current) return;

      let direction = 0;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        direction = 1;
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        direction = -1;
      } else {
        return;
      }

      e.preventDefault();

      const newIndex = Math.max(0, Math.min(totalSections - 1, currentSectionIndexRef.current + direction));

      if (newIndex === currentSectionIndexRef.current) {
        return;
      }

      scrollToSection(newIndex);
    };

    window.addEventListener('keydown', handleKeyDown);

    const handleScrollEnd = () => {
      if (!scrollingRef.current) {
        const scrollPosition = container.scrollTop;
        const sectionHeight = window.innerHeight;

        const nearestIndex = Math.round(scrollPosition / sectionHeight);

        if (nearestIndex !== currentSectionIndexRef.current &&
          nearestIndex >= 0 &&
          nearestIndex < totalSections) {

          scrollToSection(nearestIndex);
        }
      }
    };

    try {
      container.addEventListener('scrollend', handleScrollEnd);
    } catch (error) {
      container.addEventListener('scroll', () => {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          if (!scrollingRef.current) {
            handleScrollEnd();
          }
        }, 150);
      });
    }

    return () => {
      container.removeEventListener("wheel", handleScroll);
      window.removeEventListener('keydown', handleKeyDown);

      try {
        container.removeEventListener('scrollend', handleScrollEnd);
      } catch (error) {
        container.removeEventListener('scroll', () => { });
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const crowdfundingSectionRef = useRef<HTMLDivElement>(null);

  function scrollToElement(ref: React.RefObject<HTMLElement>) {
    if (ref.current) {
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
        <title>Introduction | Project D</title>
      </Helmet>
      <main ref={containerRef} className="INTRODUCTION_PAGE">
        <WelcomeSection scrollToTarget={() => scrollToElement(crowdfundingSectionRef)} />

        <ProjectContentSection />

        <CrowdfundingSection targetOfScroll={crowdfundingSectionRef} />
      </main>
    </>
  )
}

export default OverviewPage;