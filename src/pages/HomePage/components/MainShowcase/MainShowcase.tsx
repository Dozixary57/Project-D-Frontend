import { CrowdfundingProgressBar, CrowdfundingStageCurrentValue, CrowdfundingStageFinalValue, CrowdfundingStageProgress, CrowdfundingStageTitle } from "@components/CrowdfundingProgressBar/CrowdfundingProgressBar";
import CellContent from "./elements/CellContent";
import "./MainShowcase.scss";
import { useEffect, useState } from "react";
import { INews } from "@interfaces/INews";
import NewsService from "@services/newsService";

const MainShowcase = ({ scrollToFAG, scrollToCrowdfunding }: { scrollToFAG: () => void, scrollToCrowdfunding: () => void }) => {

  const [newsData, setNewsData] = useState<INews[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await NewsService.getAllNews();
      setNewsData(res);
    }

    fetchData();
  }, [])

  return (
    <div className="MainShowcase">
      <CrowdfundingProgressBar />
      <CellContent
        title="News"
        data={(newsData || []).map((news: INews) => ({
          title: news.Title,
          image: news.CoverURL ? news.CoverURL : news.Type ? require(`@images/${news.Type}Cover.png`) : null,
          link: `/News/${news._id}`
        }))}
        withControl={true}
        className="NewsCell"
      />
      <CellContent
        title="Game progress"
        data={[
          {
            title: "Prototype",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUCJljYAACAAAFAAFiVTKIAAAAAElFTkSuQmCC",
            style: {
              width: "1%",
              outline: "none",
              backgroundColor: "#000000",
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
        title="Social media"
        // data={[
        //   {
        //     title: "Telegram",
        //     image: "https://imgs.search.brave.com/MDmwwD61VwG8Ng9r2BROfR5JBV9zUpZAGlOrY98MlsU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/LzgyL1RlbGVncmFt/X2xvZ28uc3Zn",
        //     style: {
        //       padding: "0.5em"
        //     }
        //   }
        // ]}
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