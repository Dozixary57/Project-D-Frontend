import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import NewsService from "@services/newsService";
import { DateTimeFormatter } from "@tools/DataFormatters";
import { INews } from "@interfaces/INews";
import "./NewsModalComponent.scss"

const NewsModalComponent = () => {
  const location = useLocation();
  const { titleId } = useParams<{ titleId: string }>();

  const [newsData, setNewsData] = useState<INews | null>(location.state?.objectData || null);

  useEffect(() => {
    console.log(newsData)
    if (newsData) return;

    const fetchData = async () => {
      const res = await NewsService.getOneNews(titleId);
      setNewsData(res);
    };

    fetchData();
  }, [newsData])

  return (
    <div className="NEWS_DATA" onClick={(e) => e.stopPropagation()}>
      <h2 className="Header">{newsData?.Title}</h2>
      <div className="NewsContent">
        {(newsData?.CoverURL || newsData?.Type) && <img src={newsData?.CoverURL ? newsData.CoverURL : require(`@images/${newsData?.Type}Cover.png`)} alt="Cover" />}
        <div className="AuthorNewsPublication">
          <p>by {newsData?.Author}</p>
          <p>{DateTimeFormatter(newsData?.PublicationDate as string)}</p>
        </div>
        <p className="Annotation">{newsData?.Annotation}</p>
      </div>
    </div>
  )
}

export default NewsModalComponent;