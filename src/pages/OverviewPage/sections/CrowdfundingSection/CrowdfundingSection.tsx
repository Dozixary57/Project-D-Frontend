import { CrowdfundingProgressBar, CrowdfundingRoadmap, CrowdfundingStage, CrowdfundingStageGoal } from "@components/CrowdfundingProgressBar/CrowdfundingProgressBar";
import { Link } from "react-router-dom";
import style from "./CrowdfundingSection.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@ReduxStore/store";
import { useTranslation } from "react-i18next";

const CrowdfundingSection = ({ targetOfScroll }: { targetOfScroll: React.RefObject<HTMLDivElement> }) => {
  const { t } = useTranslation();
  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);

  return (
    <div ref={targetOfScroll} className={style.CrowdfundingSection}>
      <div className={style.CrowdfundingElement}>
        <h3 className={style.CrowdfundingHeader}>{t("overviewPage.buttons.support")}</h3>
        <div className={style.CrowdfundingDescription}>
          <h5>
            <CrowdfundingStageGoal.Title />
          </h5>
          <CrowdfundingStageGoal.Description />
        </div>

        <CrowdfundingProgressBar />
        <CrowdfundingRoadmap />
        <CrowdfundingStage />
        <div className={style.NavButtons}>
          <Link to="/Home">
            <button>{t("overviewPage.buttons.home")}</button>
          </Link>
          <Link to={isAuthorized ? "/Receive" : "/Login"}>
            <button>{t("overviewPage.buttons.donate")}</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CrowdfundingSection;