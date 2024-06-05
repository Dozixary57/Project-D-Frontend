import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/elements/navigation_bar/Navbar";
import "./ItemsPage.scss"
import {SearchFilter} from "../components/SearchFilter/SearchFilter";

import ParallaxTilt from 'react-parallax-tilt'
import React, {useEffect, useRef, useState} from "react";
import itemService from "../backend/services/itemService";
import {Link} from "react-router-dom";
import dataLoadingSprite from "../images/DataLoadingSprite.webp";
import {RootState, store} from "../ReduxStore/store";
import {useSelector} from "react-redux";
import filteredItemsData from "../ReduxStore/Reducers/filteredItemsData";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import LoadingProgressBar, { ProgressBarHandle } from '../components/LoadingProgressBar/LoadingProgressBar';
// import LoadingImage from "../components/LoadingImage/LoadingImage";

interface Items {
    _id: string;
    ID: number;
    Title: string;
    IconURL: string;
}

const ItemsPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const filteredItems = useSelector((state: RootState) => state.filteredItemsData);

    const fetchData = async () => {
        setIsLoading(true);

        store.dispatch({
            type: 'ITEMS_DATA',
            payload: await itemService.getItems()
        })

        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [])

    const progressBarRef = useRef<ProgressBarHandle>(null);

    const LoadingPB_Handle = () => {
        progressBarRef.current?.startProgress();
    };
    

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | Items</title>
            </Helmet>
            <LoadingProgressBar ref={progressBarRef} />
            <Navbar />
            <main className="ItemPageMain">
                <SearchFilter data={{  title: 'Items' }} />

                {isLoading? (
                    <div className="noDataContainer">
                        <div>
                            {/* <LoadingImage /> */}
                            <img src={dataLoadingSprite} alt="Loading..." />
                            <p>Loading...</p>
                        </div>
                    </div>
                ) : (
                    (filteredItems && filteredItems.length > 0)? (
                        <TransitionGroup className="GridOfItems">
                            {filteredItems.map((item: Items) => (
                                <CSSTransition
                                    key={item._id}
                                    timeout={250}
                                    classNames="CardOfItem"
                                >
                                    <Link
                                        to={`/Content/Item/${item.Title.replace(/ /g, '_')}`}
                                        className="LinkStyle"
                                    >
                                        <div className="CardOfItem">
                                            <figure className="Card">
                                                <ParallaxTilt
                                                    tiltMaxAngleX={20}
                                                    tiltMaxAngleY={20}
                                                    perspective={1500}
                                                    tiltReverse={true}
                                                    className="ParallaxEffectCard"
                                                >
                                                    <p>{item.ID}</p>
                                                    <img
                                                        className="ParallaxEffectItem"
                                                        src={
                                                            item.IconURL
                                                                ? item.IconURL
                                                                : require('../images/objects/NoThumbnailObjectIcon.png')
                                                        }
                                                        alt={filteredItems.Title}
                                                    />
                                                    <figcaption className="ParallaxEffectTitle">
                                                        {item.Title}
                                                    </figcaption>
                                                </ParallaxTilt>
                                            </figure>
                                        </div>
                                    </Link>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    ) : (
                        <div className="noDataContainer">
                            <div>
                                <p>Data could not be retrieved from the server.</p>
                                <button onClick={() => {fetchData(); LoadingPB_Handle();}}>
                                    <img src={require('../images/RetryIcon.png')} alt="RetryIcon" />
                                </button>
                            </div>
                        </div>
                    )
                )}
            </main>
        </>
    )
}

export { ItemsPage };