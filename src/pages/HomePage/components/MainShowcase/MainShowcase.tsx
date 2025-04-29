import { CrowdfundingProgressBar, CrowdfundingStageCurrentValue, CrowdfundingStageFinalValue, CrowdfundingStageProgress, CrowdfundingStageTitle } from "@components/CrowdfundingProgressBar/CrowdfundingProgressBar";
import CellContent from "./elements/CellContent";
import "./MainShowcase.scss";

const MainShowcase = ({ scrollToFAG, scrollToCrowdfunding }: { scrollToFAG: () => void, scrollToCrowdfunding: () => void }) => {

  return (
    <div className="MainShowcase">
      <CrowdfundingProgressBar />
      <CellContent
        title="News"
        data={[
          {
            title: "News 1",
            image: "https://placehold.co/10x10",
            link: "/News"
          },
          {
            title: "News 2",
            image: "https://placehold.co/20x20",
            link: "/News"
          },
          {
            title: "News 3",
            image: "https://placehold.co/30x30",
            link: "/News"
          },
          {
            title: "News 4",
            image: "https://placehold.co/40x40",
            link: "/News"
          },
          {
            title: "News 5",
            image: "https://placehold.co/50x50",
            link: "/News"
          }
        ]}
        withControl={true}
        className="NewsCell"
      />
      <CellContent
        title="Crowdfunding"
        data={[
          {
            title: CrowdfundingStageTitle(),
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUCJljYAACAAAFAAFiVTKIAAAAAElFTkSuQmCC",
            style: {
              width: `${CrowdfundingStageProgress() || 0}%`,
              outline: "none",
              backgroundColor: "#0081a1",
            }
          }
        ]}
        onClick={scrollToCrowdfunding}
        customCSSVariables={{ '--crowdfunding-value': `${CrowdfundingStageCurrentValue()} / ${CrowdfundingStageFinalValue()}` }}
        className="CrowdfundingCell"
      />
      <CellContent
        title="Content"
        data={[
          {
            image: require("@images/Sword of the departed.png"),
            link: "/Content",
            style: {
              padding: "0.5em",
            }
          }
        ]}
        className="ContentCell"
      />
      <CellContent
        title="Social Media"
        data={[
          {
            title: "Telegram",
            image: "https://imgs.search.brave.com/MDmwwD61VwG8Ng9r2BROfR5JBV9zUpZAGlOrY98MlsU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/LzgyL1RlbGVncmFt/X2xvZ28uc3Zn",
            style: {
              padding: "0.5em"
            }
          }
        ]}
        className="SocialMediaCell"
      />
      <CellContent
        title="FAQ"
        data={[
          {
            image: require("@images/main_showcase/FAG.png"),
          }
        ]}
        onClick={scrollToFAG}
        className="FAQCell"
      />
    </div>
  )
}

export default MainShowcase;