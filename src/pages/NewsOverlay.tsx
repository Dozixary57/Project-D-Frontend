import "./NewsOverlay.scss"
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import NewsService from "../backend/services/newsService";
import { RootState, store } from "../ReduxStore/store";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import loadingIcon from "../images/DataLoadingSprite.webp";

interface INews {
   _id: string;
   Title: string;
   Type: string;
   Content: {
      Annotation: string;
   }
   CoverURL: string;
   Author: string;
   PublicationDate: string;
}

const NewsOverlay = () => {
   const navigate = useNavigate();
   const dataLoadingState = useSelector((state: RootState) => state.dataLoadingState);

   useEffect(()=> {
      store.dispatch({
         type: 'DATA_LOADING_STATE',
         payload: true
      })
      const fetchData = async () => {
         const _newsData = await NewsService.getOneNews(titleId);

         store.dispatch({
            type: 'ONE_NEWS_DATA',
            payload: _newsData
         })

      };
      fetchData();
      document.body.style.overflow = 'hidden';

      return () => {
         store.dispatch({
            type: 'DATA_LOADING_STATE',
            payload: false
         })   
         document.body.style.overflow = 'initial';
      };
   }, [])

   const { titleId } = useParams<{ titleId: string }>();
   // const [isLoading, setIsLoading] = useState(false);

   const newsData = useSelector((state: RootState) => state.oneNewsData) as INews;

   const overlayContentHeightRef = useRef<HTMLDivElement | null>(null);
   document.documentElement.style.setProperty('--overlay-content-height', `0px`);
   useEffect(() => {
      if (newsData && overlayContentHeightRef.current) {
         const height = overlayContentHeightRef.current.scrollHeight;
         document.documentElement.style.setProperty('--overlay-content-height', `${height}px`);
      }
      return () => {
         document.documentElement.style.setProperty('--overlay-content-height', `auto`);
      };
   }, [newsData, overlayContentHeightRef]);

   function formatDateTime(timestamp: string): string {
      const date = new Date(Number(timestamp));

      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');

      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
   
      return `${hours}:${minutes} ${month}/${day}/${year}`;
   }

   return(
      <div className="NEWS_OVERLAY_ROOT" onClick={() => navigate("/News")}>
         <div className="NEWS_OVERLAY_LAYOUT">
            <hr />
            <div className="NEWS_OVERLAY_CONTENT" onClick={(e) => e.stopPropagation()}>
               {dataLoadingState? (
                  <div className="LoadingWindow">
                     <img src={require('../images/DataLoadingSprite.webp')} alt="Loading icon" />
                     <p>LOADING...</p>
                  </div>
               ) : (
                  (newsData?._id ? (
                     <article ref={overlayContentHeightRef}>
                        <h2>{newsData.Title}</h2>
                        <img src={newsData.CoverURL? newsData.CoverURL : require(`../images/${newsData.Type}Cover.png`)} alt="Cover" />
                        <div className="AuthorNewsPublication">
                           <p>by {newsData.Author}</p>
                           <p>{formatDateTime(newsData.PublicationDate)}</p>
                        </div>
                        <p>{newsData.Content.Annotation}</p>
                     </article>
                  ) : (
                     <div className="NoDataWindow">
                        <p>No news found.</p>
                     </div>
                  ))                  
               )}
            </div>
            <hr />
         </div>
      </div>
   )
}

export { NewsOverlay };