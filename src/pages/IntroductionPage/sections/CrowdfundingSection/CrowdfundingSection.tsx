import { CrowdfundingProgressBar, CrowdfundingRoadmap, CrowdfundingStage, CrowdfundingStageGoal } from "@components/CrowdfundingProgressBar/CrowdfundingProgressBar";
import { Link } from "react-router-dom";
import "./CrowdfundingSection.scss";

const CrowdfundingSection = ({ targetOfScroll }: { targetOfScroll: React.RefObject<HTMLDivElement> }) => {
  return (
    <div ref={targetOfScroll} className="CrowdfundingSection">
      <div className="CrowdfundingElement">
        <h3 className="CrowdfundingHeader">Support the project</h3>
        <div className="CrowdfundingDescription">
          <h5>
            <CrowdfundingStageGoal.Title />
          </h5>
          <CrowdfundingStageGoal.Description />
        </div>

        <CrowdfundingProgressBar
          currentValue={12345}
          finalValue={1000000}
          stagesValue={[
            100000,
            150000,
            200000,
            500000
          ]}
          stageGoalValue={[
            {
              title: 'Stage I — Prototyping',
              description: 'The goal of this funding phase is to create a technical prototype. This includes building out the core gameplay mechanics, outlining basic interaction logic, and forming a foundational version of the project for initial testing and concept validation.',
            },
            {
              title: 'Stage II — Pre-Production',
              description: 'Funds raised during this stage will support preparations for full-scale development: producing documented design decisions, developing an initial visual style, and building essential tools such as a basic level editor to streamline future production.',
            },
            {
              title: 'Stage III — Playable Demo',
              description: 'This phase aims to deliver a playable demo. Funding will be used to develop a vertical slice — a limited yet functional segment of the game including visuals, audio, and a basic UI — to showcase the atmosphere and core gameplay elements.',
            },
            {
              title: 'Stage IV — Content Expansion',
              description: 'The objective here is to expand the game’s content. The funding will help add new levels and characters, enhance graphics, enrich the soundtrack and interface, and implement more complex gameplay systems and interactions.',
            },
            {
              title: 'Stage V — Full Release Version',
              description: 'The final milestone is the completion and release of the full version of the game. The budget will cover polishing the game, bug fixing, integrating all components, performance optimization, and preparing for distribution on target platforms.',
            },
          ]}
        />
        <CrowdfundingRoadmap />
        <CrowdfundingStage />
        <div className="NavButtons">
          <Link to="/Home">
            <button>Home page</button>
          </Link>
          <Link to="/Support">
            <button>Make a donation</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CrowdfundingSection;