import { ToRoman } from "@tools/TextFormatter";
import "./CrowdfundingProgressBar.scss";
import { useState, useEffect } from "react";
import StyledMarkdown from "@components/StyledMarkdown";

interface CrowdfundingState {
  current: number;
  final: number;
  stages: number[];
  stageGoal: { title: string; description: string }[];
}

let globalState: CrowdfundingState = {
  current: 0,
  final: 100,
  stages: [],
  stageGoal: []
};

function updateGlobalState(newState: Partial<CrowdfundingState>) {
  globalState = { ...globalState, ...newState };
}

function computeSegments(stages: number[], final: number): { start: number; end: number }[] {
  const allPoints = [0, ...stages, final];
  const segments = [];

  for (let i = 0; i < allPoints.length - 1; i++) {
    segments.push({
      start: allPoints[i],
      end: allPoints[i + 1]
    });
  }

  return segments;
}

interface CrowdfundingProgressBarProps {
  currentValue?: number;
  finalValue?: number;
  stagesValue?: number[];
  stageGoalValue?: { title: string; description: string }[];
}

export const CrowdfundingProgressBar: React.FC<CrowdfundingProgressBarProps> = ({
  currentValue = 0,
  finalValue = 100,
  stagesValue = [],
  stageGoalValue = []
}) => {
  useEffect(() => {
    // const actualCurrent = currentValue > finalValue ? finalValue : currentValue;
    
    updateGlobalState({
      current: currentValue,
      final: finalValue,
      stages: stagesValue,
      stageGoal: stageGoalValue
    });
  }, [currentValue, finalValue, stagesValue, stageGoalValue]);
  
  return null;
};

function getTitleText(): string {
  const { current, final, stages, stageGoal } = globalState;
  const segments = computeSegments(stages, final);

  let activeIndex = segments.findIndex(({ start, end }) => current < end);
  if (activeIndex === -1) {
    activeIndex = segments.length - 1;
  }

  return stageGoal[activeIndex]?.title ?? "Текущая стадия разработки";
}

function getDescriptionText(): string {
  const { current, final, stages, stageGoal } = globalState;
  const segments = computeSegments(stages, final);

  let activeIndex = segments.findIndex(({ start, end }) => current < end);
  if (activeIndex === -1) {
    activeIndex = segments.length - 1;
  }

  return stageGoal[activeIndex]?.description ?? 
    "Сбор средств на поддержку разработки игры и ее продвижение: покрытие затрат на производство, улучшение игрового процесса, тестирование, а также техническую и художественную составляющие. Независимо от текущего этапа разработки, ваше участие приближает к завершению создания проекта и выпуску качественного игрового продукта.";
}

const CrowdfundingStageGoalTitle: React.FC = () => {
  const [title, setTitle] = useState<string>(getTitleText());
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitle(getTitleText());
    }, 100);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return <StyledMarkdown>{title}</StyledMarkdown>;
};

const CrowdfundingStageGoalDescription: React.FC = () => {
  const [description, setDescription] = useState<string>(getDescriptionText());
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDescription(getDescriptionText());
    }, 100);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return <StyledMarkdown>{description}</StyledMarkdown>;
};

export const CrowdfundingStageGoal: React.FC & {
  Title: React.FC;
  Description: React.FC;
  getTitleText: () => string;
  getDescriptionText: () => string;
} = () => {
  return null;
};

CrowdfundingStageGoal.Title = CrowdfundingStageGoalTitle;
CrowdfundingStageGoal.Description = CrowdfundingStageGoalDescription;
CrowdfundingStageGoal.getTitleText = getTitleText;
CrowdfundingStageGoal.getDescriptionText = getDescriptionText;

export const CrowdfundingRoadmap: React.FC = () => {
  const [state, setState] = useState<CrowdfundingState>(globalState);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setState({...globalState});
    }, 100);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const { current, final, stages } = state;
  const segments = computeSegments(stages, final);

  return (
    <div className="CrowdfundingRoadmap">
      {segments.map(({ start, end }, index) => {
        const segmentLength = end - start;
        const relativeProgress = Math.max(0, Math.min(current - start, segmentLength));
        const width = (relativeProgress / segmentLength) * 100;

        return (
          <div key={index} className="RoadmapStage">
            <div className="ProgressTrack">
              <div
                className="ProgressValue"
                style={{ width: `${width}%` }}
              />
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
  const [state, setState] = useState<CrowdfundingState>(globalState);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setState({...globalState});
    }, 100);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const { current, final, stages } = state;
  const segments = computeSegments(stages, final);

  let activeIndex = segments.findIndex(({ start, end }) => current < end);
  if (activeIndex === -1) {
    activeIndex = segments.length - 1;
  }

  const { start, end } = segments[activeIndex];
  const segmentLength = end - start;

  const relativeProgress = Math.max(0, Math.min(current - start, segmentLength));
  const progressPercent = (relativeProgress / segmentLength) * 100;

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
        <p>{current.toLocaleString("ru")} p.</p>
      </div>
    </div>
  );
};