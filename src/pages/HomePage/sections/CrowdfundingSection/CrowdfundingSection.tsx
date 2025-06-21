import { CrowdfundingProgressBar, CrowdfundingRoadmap, CrowdfundingStage, CrowdfundingStageGoal } from "@components/CrowdfundingProgressBar/CrowdfundingProgressBar";
import { Link } from "react-router-dom";
import style from "./CrowdfundingSection.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@ReduxStore/store";

const CrowdfundingSection = ({ targetOfScroll }: { targetOfScroll: React.RefObject<HTMLDivElement> }) => {
  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);

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
        <Link to={isAuthorized ? "/Receive" : "/Login"}>
          <button>Make a donation</button>
        </Link>
      </div>
    </div>
  )
}

export default CrowdfundingSection;