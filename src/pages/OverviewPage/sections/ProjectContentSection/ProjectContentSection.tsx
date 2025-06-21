import { Link } from "react-router-dom";
import "./ProjectContentSection.scss"
import { useTranslation } from "react-i18next";

const ProjectContentSection = () => {
  const { t } = useTranslation();

  return (
    <div className="ProjectContentSection">
      <div className="ContentDescription">
        <div>
          <img src={require('@images/static/ExploreTheWorldAndAdapt.png')} />
          <div>
            <h4>{t('overviewPage.aspects.a1.title')}</h4>
            <p>{t('overviewPage.aspects.a1.description')}</p>
          </div>
        </div>
        <div>
          <img src={require('@images/static/GatherResourcesForSurvival.png')} />
          <div>
            <h4>{t('overviewPage.aspects.a2.title')}</h4>
            <p>{t('overviewPage.aspects.a2.description')}</p>
          </div>
        </div>
        <div>
          <img src={require('@images/static/DevelopAndUtilizeTechnologies.png')} />
          <div>
            <h4>{t('overviewPage.aspects.a3.title')}</h4>
            <p>{t('overviewPage.aspects.a3.description')}</p>
          </div>
        </div>
        <div>
          <img src={require('@images/static/ExperimentWithSuitModules.png')} />
          <div>
            <h4>{t('overviewPage.aspects.a4.title')}</h4>
            <p>{t('overviewPage.aspects.a4.description')}</p>
          </div>
        </div>
        <div>
          <img src={require('@images/static/UncoverAbandonedStructures.png')} />
          <div>
            <h4>{t('overviewPage.aspects.a5.title')}</h4>
            <p>{t('overviewPage.aspects.a5.description')}</p>
          </div>
        </div>
        <div>
          <img src={require('@images/static/BuildWithoutBoundaries.png')} />
          <div>
            <h4>{t('overviewPage.aspects.a6.title')}</h4>
            <p>{t('overviewPage.aspects.a6.description')}</p>
          </div>
        </div>
        <div>
          <img src={require('@images/static/SurviveAndFindYourWayHome.png')} />
          <div>
            <h4>{t('overviewPage.aspects.a7.title')}</h4>
            <p>{t('overviewPage.aspects.a7.description')}</p>
          </div>
        </div>
        <div>
          <Link to="/Content">
            <div>
              <h4>{t('overviewPage.aspects.a8.title')}</h4>
              <p>{t('overviewPage.aspects.a8.description')}</p>
            </div>
            <button>
              <img src={require('@images/NextIcon.png')} />
            </button>
          </Link>
        </div>
      </div>

      {/* Background */}
      <div className="MountainElement" />
    </div>
  )
}

export default ProjectContentSection;