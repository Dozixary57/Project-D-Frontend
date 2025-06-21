import { ToRoman } from "@tools/TextFormatter";
import "./CrowdfundingProgressBar.scss";
import { useState, useEffect } from "react";
import StyledMarkdown from "@components/StyledMarkdown";
import axios from "axios";
import { t } from "i18next";
import { useTranslation } from "react-i18next";


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
      title: t('crowdfunding.stages.stage1.title'),
      description: t('crowdfunding.stages.stage1.description'),
    },
    {
      title: t('crowdfunding.stages.stage2.title'),
      description: t('crowdfunding.stages.stage2.description'),
    },
    {
      title: t('crowdfunding.stages.stage3.title'),
      description: t('crowdfunding.stages.stage3.description'),
    },
    {
      title: t('crowdfunding.stages.stage4.title'),
      description: t('crowdfunding.stages.stage4.description'),
    },
    {
      title: t('crowdfunding.stages.stage5.title'),
      description: t('crowdfunding.stages.stage5.description'),
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
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/Crowdfunding");
        setCrowdfundingCurrentValue(response.data);
      } catch (error) {
        console.error("Error fetching crowdfunding data:", error);
        setCrowdfundingCurrentValue(undefined);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const translatedStageGoals = [
      {
        title: t('crowdfunding.stages.stage1.title'),
        description: t('crowdfunding.stages.stage1.description'),
      },
      {
        title: t('crowdfunding.stages.stage2.title'),
        description: t('crowdfunding.stages.stage2.description'),
      },
      {
        title: t('crowdfunding.stages.stage3.title'),
        description: t('crowdfunding.stages.stage3.description'),
      },
      {
        title: t('crowdfunding.stages.stage4.title'),
        description: t('crowdfunding.stages.stage4.description'),
      },
      {
        title: t('crowdfunding.stages.stage5.title'),
        description: t('crowdfunding.stages.stage5.description'),
      }
    ];

    updateGlobalState({
      current: currentValue ?? crowdfundingCurrentValue ?? globalState.current,
      final: finalValue ?? globalState.final,
      stages: stagesValue ?? globalState.stages,
      stageGoal: stageGoalValue ?? translatedStageGoals
    });
  }, [currentValue, finalValue, stagesValue, stageGoalValue, crowdfundingCurrentValue, i18n.language, t]);

  return null;
};

export const CrowdfundingStageTitle = () => {
  const { activeIndex } = useSyncedState(getActiveSegmentInfo, 1000);
  return globalState.stageGoal[activeIndex]?.title ?? "The current stage of development";
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
  const title = globalState.stageGoal[activeIndex]?.title ?? "The current stage of development";
  return <StyledMarkdown>{title}</StyledMarkdown>;
};

const CrowdfundingStageGoalDescription: React.FC = () => {
  const { activeIndex } = useSyncedState(getActiveSegmentInfo, 1000);
  const description = globalState.stageGoal[activeIndex]?.description ??
    "The description of the current stage of development";
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
  const { t } = useTranslation();

  const state = useSyncedState(() => globalState);
  const { activeIndex, relativeProgress, progressPercent, segmentLength } = getActiveSegmentInfo(state);

  return (
    <div className="CrowdfundingStage">
      <div className="StageProgress">
        <div className="ProgressTrack">
          <div className="ProgressValue" style={{ width: `${progressPercent}%` }}>
            <div className="Floater">
              <p>{relativeProgress.toLocaleString("ru")} rub.</p>
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
        <h4>{t("crowdfunding.totalFundsRaised")}</h4>
        <p>{state.current.toLocaleString("ru")} p.</p>
      </div>
    </div>
  );
};