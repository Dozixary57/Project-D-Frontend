import { CrowdfundingProgressBar, CrowdfundingRoadmap, CrowdfundingStage, CrowdfundingStageGoal } from "@components/CrowdfundingProgressBar/CrowdfundingProgressBar";
import { Link } from "react-router-dom";
import style from "./CrowdfundingSection.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@ReduxStore/store";

const CrowdfundingSection = ({ targetOfScroll }: { targetOfScroll: React.RefObject<HTMLDivElement> }) => {
  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);

  return (
    <div ref={targetOfScroll} className={style.CrowdfundingSection}>
      <div className={style.CrowdfundingElement}>
        <h3 className={style.CrowdfundingHeader}>Support the project</h3>
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
            <button>Home page</button>
          </Link>
          <Link to={isAuthorized ? "/Donation" : "/Login"}>
            <button>Make a donation</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CrowdfundingSection;