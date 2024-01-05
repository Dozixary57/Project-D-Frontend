import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavBar";
import "./ItemsPage.scss"
import {SearchFilter} from "../components/SearchFilter/SearchFilter";

import ParallaxTilt from 'react-parallax-tilt'
import React, {useEffect, useState} from "react";
import itemService from "../backend/services/itemService";
import {Link} from "react-router-dom";
import dataLoadingSprite from "../images/DataLoadingSprite.webp";
import {RootState, store} from "../ReduxStore/store";
import {useSelector} from "react-redux";
import filteredItemsData from "../ReduxStore/Reducers/filteredItemsData";
import { TransitionGroup, CSSTransition } from 'react-transition-group';


interface Items {
    _id: string;
    ID: {
        Certain: String;
    }
    Title: string;
    IconURL: string;
}

const ItemsPage = () => {

    const filteredItems = useSelector((state: RootState) => state.filteredItemsData);

    useEffect(() => {
        const fetchData = async () => {
            store.dispatch({
                type: 'ITEMS_DATA',
                payload: await itemService.getItems()
            })
        };

        fetchData();
    }, [])

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | Items</title>
            </Helmet>
            <NavBar />
            <main className="ItemPageMain">
                <SearchFilter data={{  title: 'Items' }} />
                {(filteredItems && filteredItems.length > 0)? (
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
                                                <p>{item.ID.Certain}</p>
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
                        {filteredItems && filteredItems.length === 0? (
                            <p>Items not found.</p>
                        ) : (
                            <div>
                                <img src={dataLoadingSprite} alt="Loading..."/>
                                <p>Loading...</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </>
    )
}

export { ItemsPage };