import { useEffect, useState } from "react";
import newsService from "@services/newsService";
import { RootState, store } from "@ReduxStore/store";
import { useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import "./NewsPage.scss"
import PageHelmet from "@components/PageHelmet/PageHelmet";
import { DateTimeFormatter } from "@tools/DataFormatters";
import { INews } from "@interfaces/INews";

const NewsPage = () => {
  const objectsListData = useSelector((state: RootState) => state.objectsListData);

  const [searchLineValue, setSearchLineValue] = useState<string>('');

  const [newsTitleId, setNewsTitleId] = useState<string | null>(null);

  const [showNewsCover, setShowNewsCover] = useState<boolean>(true);

  useEffect(() => {
    store.dispatch({ type: 'OBJECTS_LIST_DATA', payload: null })

    const fetchData = async () => {
      store.dispatch({
        type: 'OBJECTS_LIST_DATA',
        payload: await newsService.getAllNews()
      });
    }

    fetchData();
  }, [])

  const params = useParams();

  useEffect(() => {
    if (window.location.pathname === "/News") setNewsTitleId(null);
  }, [params])

  return (
    <>
      <PageHelmet title="News" />
      <Outlet />
      <div className="NEWS_PAGE" >
        {objectsListData && objectsListData.map((news: INews) => (
          <Link to={`/News/${news._id}`} state={{ objectData: news }} key={news._id}>
            <article className={`Article${news.Type}`}>
              <div className="NewsTitle">
                <label>{news?.Type?.charAt(0)}</label>
                <h3>{news.Title}</h3>
                <button onClick={(e) => e.preventDefault()}>
                  <img src={require(`@images/FavoriteInactive.png`)} alt="FavoriteIcon" />
                </button>
              </div>
              {(news?.CoverURL || news?.Type) && <img src={news?.CoverURL || require(`@images/${news?.Type}Cover.png`)} alt="News Cover" />}
              <p>{news.Annotation}</p>
              <div className="AuthorNewsPublication">
                <p>by {news.Author}</p>
                <p>{DateTimeFormatter(news?.PublicationDate as string)}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  )
}

export default NewsPage;