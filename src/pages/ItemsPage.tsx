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

interface Items {
    _id: string;
    Title: string;
    CoverURL: string;
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
                {/*<div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', display: 'inline-block' }}><div style={{ float: 'left', width: '80%' }}>Предметы</div><div style={{ float: 'right' }}>Сортировать</div></div>*/}
                {(filteredItems && filteredItems.length > 0)? (
                    <div className="GridOfItems">
                        {filteredItems.map((item: Items) => {
                            return (
                                <Link key={item._id} to={`/Content/Item/${item.Title.replace(/ /g, "_")}`} className='LinkStyle'>
                                    <div className='CardOfItem'>
                                        <figure className='Card'>
                                            <ParallaxTilt tiltMaxAngleX={20} tiltMaxAngleY={20} perspective={1500} tiltReverse={true} className="ParallaxEffectCard">
                                                <img className="ParallaxEffectItem" src={item.CoverURL ? item.CoverURL : require('../images/objects/NoThumbnailObjectIcon.png')} alt={filteredItems.Title} />
                                                <figcaption className="ParallaxEffectTitle">{item.Title}</figcaption>
                                            </ParallaxTilt>
                                        </figure>
                                    </div>
                                </Link>
                            )
                        })}
                        {/*<InfoCard_Item />*/}
                    </div>
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