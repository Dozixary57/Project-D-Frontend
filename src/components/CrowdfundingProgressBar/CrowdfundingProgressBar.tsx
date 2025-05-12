import { ToRoman } from "@tools/TextFormatter";
import "./CrowdfundingProgressBar.scss";
import { useState, useEffect } from "react";
import StyledMarkdown from "@components/StyledMarkdown";
import axios from "axios";

interface CrowdfundingState {
  current: number;
  final: number;
  stages: number[];
  stageGoal: { title: string; description: string }[];
}

interface Segment {
  start: number;
  end: number;
}

let globalState: CrowdfundingState = {
  current: 0,
  final: 1000000,
  stages: [100000, 150000, 200000, 500000],
  stageGoal: [
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
    }
  ]

};

const updateGlobalState = (newState: Partial<CrowdfundingState>) => {
  globalState = { ...globalState, ...newState };
};

const computeSegments = (stages: number[], final: number): Segment[] => {
  const allPoints = [0, ...stages, final];
  return allPoints.slice(0, -1).map((start, i) => ({
    start,
    end: allPoints[i + 1]
  }));
};

const getActiveSegmentInfo = (state = globalState) => {
  const { current, final, stages } = state;
  const segments = computeSegments(stages, final);

  let activeIndex = segments.findIndex(({ end }) => current < end);
  if (activeIndex === -1) activeIndex = segments.length - 1;

  const { start, end } = segments[activeIndex];
  const segmentLength = end - start;
  const relativeProgress = Math.max(0, Math.min(current - start, segmentLength));
  const progressPercent = (relativeProgress / segmentLength) * 100;

  return { activeIndex, start, end, segmentLength, relativeProgress, progressPercent, segments };
};

const useSyncedState = <T,>(selector: (state: CrowdfundingState) => T, interval = 100): T => {
  const [value, setValue] = useState<T>(selector(globalState));

  useEffect(() => {
    const intervalId = setInterval(() => setValue(selector(globalState)), interval);
    return () => clearInterval(intervalId);
  }, []);

  return value;
};

interface CrowdfundingProgressBarProps {
  currentValue?: number;
  finalValue?: number;
  stagesValue?: number[];
  stageGoalValue?: { title: string; description: string }[];
}

export const CrowdfundingProgressBar: React.FC<CrowdfundingProgressBarProps> = ({
  currentValue,
  finalValue,
  stagesValue,
  stageGoalValue
}) => {
  const [crowdfundingCurrentValue, setCrowdfundingCurrentValue] = useState<number | undefined>(currentValue);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/Crowdfunding");
      setCrowdfundingCurrentValue(response.data);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    updateGlobalState({
      current: currentValue ?? crowdfundingCurrentValue ?? globalState.current,
      final: finalValue ?? globalState.final,
      stages: stagesValue ?? globalState.stages,
      stageGoal: stageGoalValue ?? globalState.stageGoal
    });
  }, [currentValue, finalValue, stagesValue, stageGoalValue, crowdfundingCurrentValue]);

  return null;
};

export const CrowdfundingStageTitle = () => {
  const { activeIndex } = useSyncedState(getActiveSegmentInfo, 1000);
  return globalState.stageGoal[activeIndex]?.title ?? "Текущая стадия разработки";
};

export const CrowdfundingStageProgress = () => {
  const { progressPercent } = useSyncedState(getActiveSegmentInfo);
  return progressPercent.toString();
};

export const CrowdfundingStageCurrentValue = () => {
  const { relativeProgress } = useSyncedState(getActiveSegmentInfo);
  return relativeProgress;
};

export const CrowdfundingStageFinalValue = () => {
  const { segmentLength } = useSyncedState(getActiveSegmentInfo);
  return segmentLength.toLocaleString("ru");
};

const CrowdfundingStageGoalTitle: React.FC = () => {
  const { activeIndex } = useSyncedState(getActiveSegmentInfo, 1000);
  const title = globalState.stageGoal[activeIndex]?.title ?? "Текущая стадия разработки";
  return <StyledMarkdown>{title}</StyledMarkdown>;
};

const CrowdfundingStageGoalDescription: React.FC = () => {
  const { activeIndex } = useSyncedState(getActiveSegmentInfo, 1000);
  const description = globalState.stageGoal[activeIndex]?.description ??
    "Сбор средств на поддержку разработки игры и ее продвижение: покрытие затрат на производство, улучшение игрового процесса, тестирование, а также техническую и художественную составляющие. Независимо от текущего этапа разработки, ваше участие приближает к завершению создания проекта и выпуску качественного игрового продукта.";
  return <StyledMarkdown>{description}</StyledMarkdown>;
};

export const CrowdfundingStageGoal: React.FC & {
  Title: React.FC;
  Description: React.FC;
} = () => null;

CrowdfundingStageGoal.Title = CrowdfundingStageGoalTitle;
CrowdfundingStageGoal.Description = CrowdfundingStageGoalDescription;

export const CrowdfundingRoadmap: React.FC = () => {
  const state = useSyncedState(() => globalState);
  const { segments } = getActiveSegmentInfo(state);
  const { current } = state;

  return (
    <div className="CrowdfundingRoadmap">
      {segments.map(({ start, end }, index) => {
        const segmentLength = end - start;
        const relativeProgress = Math.max(0, Math.min(current - start, segmentLength));
        const width = (relativeProgress / segmentLength) * 100;

        return (
          <div key={index} className="RoadmapStage">
            <div className="ProgressTrack">
              <div className="ProgressValue" style={{ width: `${width}%` }} />
              <p className="StageNumber">{ToRoman(index + 1)}</p>
            </div>
            <p className="StageFinalValue">{end.toLocaleString("ru")}</p>
          </div>
        );
      })}
    </div>
  );
};

export const CrowdfundingStage: React.FC = () => {
  const state = useSyncedState(() => globalState);
  const { activeIndex, relativeProgress, progressPercent, segmentLength } = getActiveSegmentInfo(state);

  return (
    <div className="CrowdfundingStage">
      <div className="StageProgress">
        <div className="ProgressTrack">
          <div className="ProgressValue" style={{ width: `${progressPercent}%` }}>
            <div className="Floater">
              <p>{relativeProgress.toLocaleString("ru")} р.</p>
            </div>
          </div>
          <p>stage {ToRoman(activeIndex + 1)}</p>
        </div>
        <div className="ProgressBarSubtitles">
          <p className="Left">0</p>
          <p className="Right">{segmentLength.toLocaleString("ru")}</p>
        </div>
      </div>
      <div className="CurrentValue">
        <h4>Total funds raised:</h4>
        <p>{state.current.toLocaleString("ru")} p.</p>
      </div>
    </div>
  );
};