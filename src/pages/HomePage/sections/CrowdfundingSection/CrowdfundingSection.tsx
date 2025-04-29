import { CrowdfundingProgressBar, CrowdfundingRoadmap, CrowdfundingStage, CrowdfundingStageGoal } from "@components/CrowdfundingProgressBar/CrowdfundingProgressBar";
import { Link } from "react-router-dom";
import style from "./CrowdfundingSection.module.scss";

const CrowdfundingSection = ({ targetOfScroll }: { targetOfScroll: React.RefObject<HTMLDivElement> }) => {

  return (
    <div className={style.CrowdfundingSection} ref={targetOfScroll}>
      <h3 className={style.CrowdfundingHeader}>Support the project</h3>
      <div className={style.CrowdfundingContent}>
        <div className={style.CrowdfundingDescription}>
          <h5>
            <CrowdfundingStageGoal.Title />
          </h5>
          <CrowdfundingStageGoal.Description />
        </div>

        <CrowdfundingProgressBar />
        <CrowdfundingRoadmap />
        <CrowdfundingStage />
        <Link to="/Support">
          <button>Make a donation</button>
        </Link>
      </div>
    </div>
  )
}

export default CrowdfundingSection;