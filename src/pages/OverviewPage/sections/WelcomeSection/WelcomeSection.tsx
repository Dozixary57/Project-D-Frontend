import StyledMarkdown from "@components/StyledMarkdown";
import { useState } from "react";
import { Link } from "react-router-dom";
import ParallaxWrapper from "utilities/ParallaxWrapper";
import "./WelcomeSection.scss";

const WelcomeSection = ({ scrollToTarget }: { scrollToTarget: () => void }) => {
  const [projectDescription, setProjectDescription] = useState(
    `After an unexpected failure and a resonance jump caused by a malfunction in your experimental suit, you find yourself stranded on an uncharted planet—lost far beyond the known universe. You are an engineer of the future, a specialist in advanced technologies. Now, you're alone in a hostile, unpredictable world. All you have left is the modular suit you spent years developing. It is now your only hope for survival.
        
  But this suit is more than just armor. It's an adaptive system designed to evolve alongside your needs and environment. Upgrade its core systems, install new modules, and unlock powerful abilities—ranging from thermal protection in frozen biomes to advanced sensors, manipulators, and tools capable of reshaping the world around you. Every upgrade is a step forward: toward survival, exploration, and uncovering the secrets of this strange planet.
        
  Gather resources, build shelters, craft tools, and interact with a world teeming with unknown lifeforms. This planet reacts to your presence, adapts to your actions, and challenges you in ever-changing ways. Each zone is a distinct ecosystem with its own rules and threats. Every discovery is a key to understanding where you are… and how to get back home.
  ⠀ 
  >Here, science becomes your shield, and creativity your means of survival. Your mind, your suit, and your ingenuity are all that stand between you—and oblivion.`
  );

  return (
    <div className="WelcomeSection">
      <div className="ProjectDescription">
        <h1>Project D</h1>
        <StyledMarkdown>
          {projectDescription}
        </StyledMarkdown>
        <div className="NavButtons">
          <Link to="/Home">
            <button>Home page</button>
          </Link>
          <Link to="">
            <button onClick={scrollToTarget}>Support the project</button>
          </Link>
        </div>
      </div>

      <div className="DetailsElement">
        <img src={require('@images/decorations/ArrowDown.png')} />
        <p>More details</p>
      </div>

      {/* Background */}
      <div className="CloudsAndStarsElement">
        <ParallaxWrapper strength={0.2}>
          <div className="Stars" />
        </ParallaxWrapper>
        <ParallaxWrapper strength={0.6} tiltStrength={0.5}>
          <div className="Front" />
        </ParallaxWrapper>
        <ParallaxWrapper strength={0.8} tiltStrength={0.7}>
          <div className="Middle" />
        </ParallaxWrapper>
        <ParallaxWrapper strength={0.9} tiltStrength={0.9}>
          <div className="Back" />
        </ParallaxWrapper>
      </div>
    </div>
  );
}

export default WelcomeSection;