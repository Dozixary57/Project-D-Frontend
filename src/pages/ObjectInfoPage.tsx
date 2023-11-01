import React, { useEffect, useState } from "react";
import itemService from '../backend/services/itemService';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";
import "./ObjectInfoPage.scss"
import {DataForNavigation, PrevButton, NextButton} from "../components/elements/ObjectNavigation/ObjectNavigation";

interface Item {
    _id: string;
    Title: string;
    Description: string;
    CoverURL: string;
}

const ObjectInfoPage = () => {

    const { titleId } = useParams<{ titleId: string }>();
    const [item, setItem] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await itemService.getItemByTitle(titleId);
                setItem(res);
            } catch (error) {
                if (error) throw error
            }
        };

        fetchData();
    }, [titleId])

    const renderItem = () => {
        return (
            <main className="ObjectInfoPage">
                <PrevButton />
                <div className="Content">
                    <div className="TextData">
                        <h2 className="itemTitle">{item.Title}</h2>
                        <h5 className="itemInfoLastUpd">Last update: 11/1/2023 </h5>
                        <p className="mainText">Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text</p>

                    </div>
                    <div className="VisualData">
                        <div className="ItemCover">
                            <img src={item.CoverURL} alt={item.Title} />
                        </div>
    {/*                    <div className="Definition">
                            <p>{`Value: ${item.Value}`}</p>
                            <hr />
                            <p></p>
                        </div>*/}
                    </div>
                </div>
                <NextButton />
            </main>
    );
    };

    return (
        (item) ? (
            <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{`${item.Title} | DizaQute`}</title>
                </Helmet>
                <NavBar />
                <>
                    <DataForNavigation />
                    {renderItem()}
                </>
            </>
        ) : (
            <p>No items found</p>
        )
    )
}

export { ObjectInfoPage };