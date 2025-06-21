import { Helmet } from "react-helmet-async";
import { Navbar } from "@components/Navbar/Navbar";
import { SearchFilter } from "@components/SearchFilter/SearchFilter";
import "./ObjectsListPage.scss"

import ParallaxTilt from 'react-parallax-tilt'
import React, { useEffect, useRef, useState } from "react";
import ObjectsService from "@services/ObjectsService";
import { Link } from "react-router-dom";
import dataLoadingSprite from "@images/DataLoadingSprite.webp";
import { RootState, store } from "@ReduxStore/store";
import { useSelector } from "react-redux";
// import filteredItemsData from "@ReduxStore/Reducers/filteredItemsData";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLastUrlSegment } from "@tools/UrlSegments";
import ObjectsSearcher from "@components/ObjectsSearcher/ObjectsSearcher";
import PageHelmet from "@components/PageHelmet/PageHelmet";
import { Footer } from "@components/Footer/Footer";

interface Items {
  _id: string;
  ID: number;
  Title: string;
  IconURL: string;
}

const ObjectsListPage = () => {
  const lastUrlSegment = useLastUrlSegment();

  const [isLoading, setIsLoading] = useState(false);
  const filteredItems = useSelector((state: RootState) => state.filteredItemsData);

  const fetchData = async (collection: string) => {
    console.log(collection)
    setIsLoading(true);

    store.dispatch({
      type: 'ITEMS_DATA',
      payload: await ObjectsService.getObjects(collection)
    })

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(lastUrlSegment || '');
  }, [])

  useEffect(() => {
    console.log(filteredItems);
  }, [filteredItems])

  return (
    <>
      <PageHelmet title={lastUrlSegment || "Objects"} />
      <Navbar />
      <main className="ItemPageMain">
        <SearchFilter data={{ title: 'Items' }} />
        {/* <ObjectsSearcher /> */}

        {isLoading ? (
          <div className="noDataContainer">
            <div>
              {/* <LoadingImage /> */}
              <img src={dataLoadingSprite} alt="Loading..." />
              <p>Loading...</p>
            </div>
          </div>
        ) : (
          (filteredItems && filteredItems.length > 0) ? (
            <TransitionGroup className="GridOfItems">
              {filteredItems.map((item: Items) => (
                <CSSTransition
                  key={item._id}
                  timeout={250}
                  classNames="CardOfItem"
                >
                  <Link
                    to={`/Content/Items/${item.Title.replace(/ /g, '_')}`}
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
                                : require('@images/objects/NoThumbnailObjectIcon.png')
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
                <button onClick={() => fetchData(lastUrlSegment || '')}>
                  <img src={require('@images/RetryIcon.png')} alt="RetryIcon" />
                </button>
              </div>
            </div>
          )
        )}
      </main>
      <Footer />
    </>
  )
}

export default ObjectsListPage;