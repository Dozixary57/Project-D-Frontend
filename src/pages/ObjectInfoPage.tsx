import React, { useEffect, useState } from "react";
import itemService from '../backend/services/itemService';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";
import "../components/styles/object_info_page_styles.scss"
import ItemService from "../backend/services/itemService";

interface Item {
    _id: {
        $oid: string;
    };
    ID: number;
    Title: string;
    Characteristics: {
        HP: number[];
        Weight: number[];
        Damage: number[];
        Length: number[];
    };
    Properties: {
        Combustibility: number[];
    };
    Craft: {
        Placement_1: (number | null)[][];
    };
    Value: number;
    Media: {
        Cover: string | null;
        '3D-Model': string | null;
        Demonstration: string | null;
        Background: string | null;
    };
}

const ObjectInfoPage = () => {
    const { titleId } = useParams<{ titleId: string }>();
    const [item, setItem] = useState<any>(null);

    useEffect(() => {
        if (!item) {
            getItem();
        }
    }, [titleId])

    const getItem = async () => {
        let res = await itemService.getItemByTitle(titleId);
        console.log(res);
        setItem(res);
    }

    const [cover, setCover] = useState<string>('');

    useEffect(() => {
        const getCover = async () => {
            let item = await ItemService.getItemByTitle(titleId);
            const coverUrl = await ItemService.getItemCoverUrl(item.Media.Cover === null ? 'NOOBJECT' : item.Media.Cover);
            setCover(coverUrl);
        };
        getCover();
    }, []);

    
    
    const renderItem = (item: Item, cover : string) => {
        return (
            <>
                <div className="TextData">
                        <h2 className="itmContTitl">{`${item.Title}`}</h2>
                        <p>Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text</p>
                    <p>Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text</p>

                </div>
                <div className="VisualData">
                    <div className="ItemCover">
                        <img src={cover} alt={item.Title} />
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
                    {renderItem(item, cover)}
                </main>
            </>
        ) : (
            <p>No items found</p>
        )
    )
}

export { ObjectInfoPage };