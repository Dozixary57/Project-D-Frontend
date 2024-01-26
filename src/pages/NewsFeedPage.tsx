import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavBar";
import "./NewsFeedPage.scss"
import { useEffect, useState } from "react";
import newsService from "../backend/services/newsService";
import { RootState, store } from "../ReduxStore/store";
import { useSelector } from "react-redux";
import React from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface INewsType {
    _id: string;
    Sequence: number;
    Title: string;
    Description: string;
}

interface INews {
    _id: string;
    Title: string;
    Content: {
        Annotation: string;
    }
    Type: string;
    PublicationDate: string;
}

const NewsFeedPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchLineValue, setSearchLineValue] = useState<string>('');

    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleButtonClear = (event: React.MouseEvent) => {
        event.preventDefault();
        setSearchLineValue('');
        inputRef.current && inputRef.current.focus();
    };    

    const newsTypesData = useSelector((state: RootState) => state.newsTypesData);
    const newsData = useSelector((state: RootState) => state.newsData);

    const [filteredNewsData, setFilteredNewsData] = useState<[]>([]);

    const [selectedNewsType, setSelectedNewsType] = useState<string>("All");

    const [showNewsCover, setShowNewsCover] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {

            const _newsData = await newsService.getAllNews();
            const __newsData = _newsData.sort((a, b) => Number(b.PublicationDate) - Number(a.PublicationDate));

            store.dispatch({
                type: 'NEWS_DATA',
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

        setIsLoading(false);
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
            setFilteredNewsData(filteredData);
        }
    }, [newsData, newsTypesData, selectedNewsType, searchLineValue])

    function formatDateTime(timestamp: number): string {

        const date = new Date(timestamp);

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
    
        return `${hours}:${minutes} ${month}/${day}/${year}`;
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Project D | News Feed</title>
            </Helmet>
            <NavBar />
            <main className="NEWS_FEED_PAGE">
                <div className="NEWS_FEED_CONTENT">
                    <h2>Feed News</h2>
                    <div className="FeedContent">
                        <div className="NewsSearchLine">
                            <img src={require('../images/SearchIcon.png')} alt="SearchIcon" />
                            <input type="text" ref={inputRef} value={searchLineValue} onChange={(event) => setSearchLineValue(event.target.value)} placeholder="News title..." />
                            {<button onMouseDown={handleButtonClear} style={{ transform: searchLineValue ? 'scale(1)' : 'scale(0)' }}>
                                <img src={require('../images/CloseIcon.png')} />
                            </button>}
                        </div>
                        {/* <TransitionGroup> */}
                            {filteredNewsData && filteredNewsData.map((News: INews) => (
                                // <CSSTransition key={News._id} timeout={1000} classNames="NewsArticle" unmountOnExit>
                                    <article className={`Article${News.Type}`}>
                                        <div className="NewsTitle">
                                            <label>{News.Type.charAt(0)}</label>
                                            <h3>{News.Title}</h3>
                                            <button>
                                                <img src={require('../images/FavoriteInactive.png')} alt="FavoriteIcon" />
                                            </button>
                                        </div>
                                        {showNewsCover && <img src={require('../images/Backgrounds/BackgroundSky.png')} alt="auto" />}
                                        <p>{News.Content.Annotation}</p>
                                        <h5>{formatDateTime(Number(News.PublicationDate))}</h5>
                                    </article>
                                //  </CSSTransition>
                            ))}
                        {/* </TransitionGroup> */}
                    </div>
                    <div className="FeedFilter">
                        <div className="NewsTypesComponent">
                            <h3>Type</h3>
                            <div className="NewsTypesList">
                                <button onClick={() => setSelectedNewsType("All")} className={selectedNewsType === "All"? "SelectedNewsTypeButton" : ""}>All</button>
                                {newsTypesData && newsTypesData.map((newsType: INewsType) => (
                                    <button onClick={() => setSelectedNewsType(newsType.Title)} className={selectedNewsType === newsType.Title ? "SelectedNewsTypeButton" : ""}>
                                        {newsType.Title}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => setShowNewsCover(prev => !prev)}>
                            <img src={showNewsCover? require('../images/HideImageIcon.png') : require('../images/ShowImageIcon.png')} alt="ShowOrHideCoverIcon"/>
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}

export { NewsFeedPage };