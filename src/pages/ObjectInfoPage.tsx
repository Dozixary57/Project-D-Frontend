import React, { useEffect, useState } from "react";
import itemService from '../backend/services/itemService';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";
import "../components/styles/object_info_page_styles.scss"

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
    }, [])

    const renderItem = () => {
        return (
            <>
                <div className="TextData">
                    <h2 className="itmContTitl">{`${item.Title}`}</h2>
                    <p>Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text</p>

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
            </>
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
                <main className="AltMainForItem">
                    {renderItem()}
                </main>
            </>
        ) : (
            <p>No items found</p>
        )
    )
}

export { ObjectInfoPage };