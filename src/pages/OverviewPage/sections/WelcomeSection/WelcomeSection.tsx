import StyledMarkdown from "@components/StyledMarkdown";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ParallaxWrapper from "utilities/ParallaxWrapper";
import "./WelcomeSection.scss";
import { useTranslation } from "react-i18next";
import i18n from "i18n";

const WelcomeSection = ({ scrollToTarget }: { scrollToTarget: () => void }) => {
  const { t } = useTranslation();

  const [projectDescription, setProjectDescription] = useState(
    t('overviewPage.mainDescription')
  );

  useEffect(() => {
    setProjectDescription(t('overviewPage.mainDescription'));
  }, [i18n.language]);

  return (
    <div className="WelcomeSection">
      <div className="ProjectDescription">
        <h1>Project D</h1>
        <StyledMarkdown>
          {projectDescription}
        </StyledMarkdown>
        <div className="NavButtons">
          <Link to="/Home">
            <button>
              {t('overviewPage.buttons.home')}
            </button>
          </Link>
          <Link to="">
            <button onClick={scrollToTarget}>
              {t('overviewPage.buttons.support')}
            </button>
          </Link>
        </div>
      </div>

      <div className="DetailsElement">
        <img src={require('@images/decorations/ArrowDown.png')} />
        <p>{t('overviewPage.moreDetails')}</p>
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