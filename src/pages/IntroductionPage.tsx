import { Link } from "react-router-dom";
import "./IntroductionPage.scss";
import { Helmet } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";
import { ToTopArrow } from "../components/ToUpArrow/ToTopArrow";
import StyledMarkdown from "@components/StyledMarkdown";

const IntroductionPage = () => {
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
      }, 400);
    };

    const handleScroll = (e: WheelEvent) => {
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

  const [projectDescription, setProjectDescription] = useState(
    `After an unexpected failure and a resonance jump caused by a malfunction in your experimental suit, you find yourself stranded on an uncharted planet—lost far beyond the known universe. You are an engineer of the future, a specialist in advanced technologies. Now, you're alone in a hostile, unpredictable world. All you have left is the modular suit you spent years developing. It is now your only hope for survival.
      
But this suit is more than just armor. It's an adaptive system designed to evolve alongside your needs and environment. Upgrade its core systems, install new modules, and unlock powerful abilities—ranging from thermal protection in frozen biomes to advanced sensors, manipulators, and tools capable of reshaping the world around you. Every upgrade is a step forward: toward survival, exploration, and uncovering the secrets of this strange planet.
      
Gather resources, build shelters, craft tools, and interact with a world teeming with unknown lifeforms. This planet reacts to your presence, adapts to your actions, and challenges you in ever-changing ways. Each zone is a distinct ecosystem with its own rules and threats. Every discovery is a key to understanding where you are… and how to get back home.
      
Here, science becomes your shield, and creativity your means of survival. Your mind, your suit, and your ingenuity are all that stand between you—and oblivion.`
  );

  const frontRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const refs = [frontRef, middleRef, backRef];
    const factors = [60 * 2, 80 * 2, 100 * 2];

    refs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;

      const { clientX, clientY } = e;
      const { width, height, left, top } = el.getBoundingClientRect();

      const x = (clientX - left - width / 2) / factors[i];
      const y = (clientY - top - height / 2) / factors[i];

      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Introduction | Project D</title>
      </Helmet>
      <main ref={containerRef} onMouseMove={handleMouseMove} className="INTRODUCTION_PAGE">
        <div className="WelcomeSection">
          <div className="CloudsElement">
            <div ref={frontRef} className="Front" />
            <div ref={middleRef} className="Middle" />
            <div ref={backRef} className="Back" />
          </div>

          <div className="ProjectDescription">
            <StyledMarkdown>
              {projectDescription}
            </StyledMarkdown>
            <div className="NavButtons">
              <Link to="/Home">
                <button>Home page</button>
              </Link>
              <Link to="/Receive">
                <button>Support the project</button>
              </Link>
            </div>
          </div>

          <div className="DetailsElement">
            <img src={require('@images/decorations/ArrowDown.png')} />
            <p>More details</p>
          </div>

          {/* <div className="MountainsElement" /> */}
        </div>

        <div className="InGameContentSection">
          2
          <div className="MountainElement" />
        </div>

        <div className="CrowdfundingSection">
          3
        </div>
      </main>
    </>
  )
}

export { IntroductionPage };