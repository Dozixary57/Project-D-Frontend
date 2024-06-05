import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/elements/navigation_bar/Navbar";
import "./NewsFeedPage.scss"
import { useEffect, useRef, useState } from "react";
import newsService from "../backend/services/newsService";
import { RootState, store } from "../ReduxStore/store";
import { useSelector } from "react-redux";
import React from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Link, Outlet, useParams } from "react-router-dom";
// import { NewsOverlay } from "./NewsOverlay";

interface INewsType {
   _id: string;
   Sequence: number;
   Title: string;
   Description: string;
}

interface INews {
   _id: string;
   Title: string;
   Annotation: string;
   Type: string;
   CoverURL: string;
   Author: string;
   PublicationDate: string;
}

const NewsFeedPage = () => {
   // const { titleId } = useParams();
   // const [isLoading, setIsLoading] = useState(false);
   const isLoadingState = useSelector((state: RootState) => state.isLoadingState);
   const [searchLineValue, setSearchLineValue] = useState<string>('');

   const [newsTitleId, setNewsTitleId] = useState<string | null>(null);

   const inputRef = React.useRef<HTMLInputElement>(null);
   const handleButtonClear = (event: React.MouseEvent) => {
      event.preventDefault();
      setSearchLineValue('');
      inputRef.current && inputRef.current.focus();
   };    

   const newsTypesData = useSelector((state: RootState) => state.newsTypesData) as INewsType[];
   const newsData = useSelector((state: RootState) => state.allNewsData) as INews[];

   const [filteredNewsData, setFilteredNewsData] = useState<INews[]>([]);

   const [selectedNewsType, setSelectedNewsType] = useState<string>("All");

   const [showNewsCover, setShowNewsCover] = useState<boolean>(true);
   // const NewsCoverHeightRef = useRef<HTMLImageElement | null>(null);
   // document.documentElement.style.setProperty('--news-cover-height', `0px`);
   // let singleUse = false;
   // useEffect(() => {
   //    let height;
   //    if (newsData && NewsCoverHeightRef.current) {
   //       height = NewsCoverHeightRef.current.scrollHeight;
   //       if (!singleUse && height === 0) {
   //          document.documentElement.style.setProperty('--news-cover-height', `${height}px`);
   //          singleUse = true;
   //       }
   //    }
   //    console.log(height)
   //    return () => {
   //       document.documentElement.style.setProperty('--news-cover-height', `auto`);
   //    };
   // }, [newsData, NewsCoverHeightRef, showNewsCover]);
   // useEffect(() => {
   //    // if (NewsCoverHeightRef.current) console.log(NewsCoverHeightRef.current.scrollHeight)
   // }, [NewsCoverHeightRef, showNewsCover])

   const [dateRange, setDateRange] = useState<{ startDate: number | null, endDate: number | null }>({ startDate: null, endDate: null });

   useEffect(() => {
      store.dispatch({
         type: 'IS_LOADING_STATE',
         payload: true
      })
      const fetchData = async () => {

         const _newsData = await newsService.getAllNews();
         const __newsData = _newsData.sort((a, b) => Number(b.PublicationDate) - Number(a.PublicationDate));

         store.dispatch({
            type: 'ALL_NEWS_DATA',
            payload: __newsData
         })

         const _newsTypesData = await newsService.getNewsTypes();
         const __newsTypesData = [..._newsTypesData].sort((a, b) => a.Sequence - b.Sequence);

         store.dispatch({
            type: 'NEWS_TYPES_DATA',
            payload: __newsTypesData
         })
      };
      fetchData();

      return () => {
         store.dispatch({
            type: 'IS_LOADING_STATE',
            payload: false
         })
      }
   }, [])

   useEffect(() => {
      if (newsData && newsTypesData) {
         let filteredData = newsData;
         if (selectedNewsType !== "All") {
               filteredData = filteredData.filter((document: INews) => document.Type === selectedNewsType);
         }
         if (searchLineValue && searchLineValue.length !== 0) {
               filteredData = filteredData.filter((document: INews) => document.Title.toLowerCase().includes(searchLineValue.toLowerCase()));
               // filteredData = filteredData.filter((document: INews) => document.Title === searchLineValue);
         }
         filteredData = filteredData.filter((document: INews) => {
               if (dateRange.startDate && dateRange.endDate) {
                  const endDateWithTime = dateRange.endDate + 86399999;
                  return Number(document.PublicationDate) >= dateRange.startDate && Number(document.PublicationDate) <= endDateWithTime;
               } else if (dateRange.startDate) {
                  return Number(document.PublicationDate) >= dateRange.startDate;
               } else if (dateRange.endDate) {
                  const endDateWithTime = dateRange.endDate + 86399999;
                  return Number(document.PublicationDate) <= endDateWithTime;
               }
               return true;
         });

         setFilteredNewsData(filteredData);
      }
   }, [newsData, newsTypesData, selectedNewsType, searchLineValue, dateRange])

   function formatDateTime(timestamp: string): string {
      const date = new Date(Number(timestamp));

      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');

      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
   
      return `${hours}:${minutes} ${month}/${day}/${year}`;
   } 

   const startDateRef = useRef<HTMLInputElement>(null);
   function handleStartDate(value: string) {
      const date = new Date(value);
      const timestamp = date.getTime();
      if (!isNaN(timestamp)) {
         setDateRange(prevState => ({ ...prevState, startDate: timestamp }));
      } else {
         setDateRange(prevState => ({ ...prevState, startDate: null }));
      }
   }
   const endDateRef = useRef<HTMLInputElement>(null);
   function handleEndDate(value: string) {
      const date = new Date(value);
      const timestamp = date.getTime();
      if (!isNaN(timestamp)) {
         setDateRange(prevState => ({ ...prevState, endDate: timestamp }));
      } else {
         setDateRange(prevState => ({ ...prevState, endDate: null }));
      }
   }
   const resetDate = () => {
      if (startDateRef.current) {
         startDateRef.current.value = '';
      }
      if (endDateRef.current) {
         endDateRef.current.value = '';
      }
   };

   const params = useParams();

   useEffect(() => {
      if (window.location.pathname === "/News") setNewsTitleId(null);
   }, [params])

   return (
      <>
         <Outlet />
         <Helmet>
            <meta charSet="utf-8" />
            <title>
               {newsTitleId ?
                  `${newsTitleId} | News`
                  :
                  "News Feed | Project D"
               }
            </title>
         </Helmet>
         <Navbar />
         <main className="NEWS_FEED_PAGE">
               <div className="NEWS_FEED_CONTENT" >
                  <h2>Feed News</h2>
                  <div className="FeedContent">
                     <div className="NewsSearchLine">
                        <img src={require('../images/SearchIcon.png')} alt="SearchIcon" />
                        <input type="text" disabled={!newsData || newsData.length === 0} ref={inputRef} value={searchLineValue} onChange={(event) => setSearchLineValue(event.target.value)} placeholder="News title..." />
                        {<button onMouseDown={handleButtonClear} style={{ transform: searchLineValue ? 'scale(1)' : 'scale(0)' }}>
                           <img src={require('../images/CloseIcon.png')} />
                        </button>}
                     </div>
                     {newsData && newsData.length !== 0 ? (
                           filteredNewsData && filteredNewsData.length !== 0? (
                                 filteredNewsData && filteredNewsData.map((News: INews) => (
                                    <div className="ArticleContentData">
                                       <Link to={`/News/${News.Title.replace(/ /g, '_')}`} key={News._id} onClick={() => {
                                          setNewsTitleId(News.Title)
                                          store.dispatch({
                                             type: 'SHOW_NEWS_OVERLAY',
                                             payload: true
                                          })
                                       }}>
                                          <article className={`Article${News.Type}`}>
                                                <div className="NewsTitle">
                                                   <label>{News.Type.charAt(0)}</label>
                                                   <h3>{News.Title}</h3>
                                                   <button onClick={(e) => e.preventDefault()}>
                                                      <img src={require(`../images/FavoriteInactive.png`)} alt="FavoriteIcon"/>
                                                   </button>
                                                </div>
                                                {/* ref={NewsCoverHeightRef} */}
                                                {showNewsCover && <img src={News.CoverURL? News.CoverURL : require(`../images/${News.Type}Cover.png`)} alt="Cover" className={showNewsCover? 'ShowCoverAnim' : 'HideCoverAnim'} />}
                                                <p>{News.Annotation}</p>
                                                <div className="AuthorNewsPublication">
                                                   <p>by {News.Author}</p>
                                                   <p>{formatDateTime(News.PublicationDate)}</p>
                                                </div>
                                          </article>
                                       </Link>
                                    </div>
                                 ))
                              ) : (
                              <div className="NoRelevantData">
                                 <p>No news with the selected criteria was found. Do you want to see all the available news?</p>
                                 <button onClick={() => {
                                    setSelectedNewsType("All");
                                    setDateRange({startDate: null, endDate: null});
                                    resetDate();
                                 }}>Back</button>
                              </div>
                           )
                        ) : (isLoadingState? (
                           <div className="ArticleContentLoading">
                              <img src={require('../images/DataLoadingSprite.webp')} alt="Loading icon" />
                              <p>LOADING...</p>
                           </div>
                        ) : (
                           <div className="ArticleContentAbsent">
                              <p>No news found :(</p>
                           </div>
                           )
                        )
                     }
                  </div>
                  <div className="FeedFilter">
                     {newsTypesData && newsTypesData.length !== 0 && newsData && newsData.length !== 0 ? (
                        <div className="ContentTypesData">
                           <div className="NewsTypesComponent">
                              <h3>Type</h3>
                              <div className="NewsTypesList">
                                 <button onClick={() => setSelectedNewsType("All")} className={selectedNewsType === "All"? "SelectedNewsTypeButton" : ""}>All</button>
                                 {newsTypesData && newsTypesData.map((newsType: INewsType) => (
                                    <button onClick={() => setSelectedNewsType(newsType.Title)} className={selectedNewsType === newsType.Title ? "SelectedNewsTypeButton" : ""} key={newsType.Sequence}>
                                          {newsType.Title}
                                    </button>
                                 ))}
                              </div>
                           </div>
                           <div className="NewsCoversDisplay">
                                 <h3>Display Covers</h3>
                                 <button onClick={() => setShowNewsCover(prev => !prev)}>
                                    <img src={showNewsCover? require('../images/ShowImageIcon.png') : require('../images/HideImageIcon.png')} alt="ShowOrHideCoverIcon"/>
                                 </button>
                           </div>
                           <div className="DatePicker">
                              <h3>Publication Date</h3>
                              <form>
                                 <div>
                                    <h4>From</h4>
                                    <input type="date" onChange={(event) => handleStartDate(event.target.value)} ref={startDateRef} />
                                 </div>
                                 <div>
                                    <h4>To</h4>
                                    <input type="date" onChange={(event) => handleEndDate(event.target.value)} ref={endDateRef} />
                                 </div>
                                 <button type="reset" onClick={() => {setDateRange({ startDate: null, endDate: null })}}>Reset</button>
                              </form>
                           </div>
                        </div>
                        ) : (isLoadingState? (
                              <div className="LoadingTypesData">
                                 <h3>Filters</h3>
                                 <p>LOADING...</p>
                              </div>
                           ) : (
                              <div className="AbsentTypesData">
                                 <p>:(</p>
                              </div>
                           )
                        )
                     }
                  </div>
               </div>
         </main>
      </>
   )
}

export { NewsFeedPage };