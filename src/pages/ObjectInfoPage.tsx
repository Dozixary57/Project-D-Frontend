import React, { useEffect, useState } from "react";
import itemService from '../backend/services/itemService';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";
import "./ObjectInfoPage.scss"
import {DataForNavigation, PrevButton, NextButton} from "../components/elements/ObjectNavigation/ObjectNavigation";
import Tabs from "../components/TEST/Tabs";

interface Item {
    _id: string;
    Title: string;
    Description: string;
    CoverURL: string;
    VolumeURL: string;
    ModelURL: string;
}

const ObjectInfoPage = () => {

    const { titleId } = useParams<{ titleId: string }>();
    const [item, setItem] = useState<any>(null);

    const [viewActiveTab, setViewActiveTab] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await itemService.getItemByTitle(titleId);
                setItem(res);
                setViewActiveTab(1)
            } catch (error) {
                if (error) throw error
            }
        };

        fetchData();
    }, [titleId])

    const ViewTabContent = () => {
        switch (viewActiveTab) {
            case 1:
                return <img src={item.CoverURL ? item.CoverURL : require('../images/objects/NoThumbnailObjectIcon.png')} alt={item.Title + " icon view."} />;
            case 2:
                return <img src={item.VolumeURL ? item.VolumeURL : require('../images/objects/NoParallaxObjectIcon.png')} alt={item.Title + " parallax view."} />;
            case 3:
                return <img src={item.ModelURL ? item.ModelURL : require('../images/objects/No3DObjectIcon.png')} alt={item.Title + " 3D model view."} />;
            default:
                return <img src={item.CoverURL ? item.CoverURL : require('../images/objects/NoThumbnailObjectIcon.png')} alt={item.Title + " icon view."} />;
        }
    };

    const renderItem = () => {
        return (
            <main className="ObjectInfoPage">
                <PrevButton />
                <div className="Content">
                    <h2 className="ObjectTitle">{item.Title}</h2>
                    <div className="TextData">
                        <h5 className="itemInfoLastUpd">Last update: 11/1/2023 </h5>
                        <div className="descriptionData">
                            <h2 className="descriptionHeader">Description</h2>
                            <p className="descriptionText">Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text</p>
                        </div>
                    </div>
                    <div className="VisualData">
                        <button className={`objectTabs objTab1 ${viewActiveTab === 1 ? 'objActiveTab' : 'objInactiveTab'} ${item.CoverURL ? '' : 'objUndefinedTab'}`} onClick={() => setViewActiveTab(1)} >
                            <img src={require('../images/objects/ThumbnailObjectIcon.png')}/>
                        </button>
                        <button className={`objectTabs objTab2 ${viewActiveTab === 2 ? 'objActiveTab' : 'objInactiveTab'} ${item.VolumeURL ? '' : 'objUndefinedTab'}`} onClick={() => setViewActiveTab(2)}>
                            <img src={require('../images/objects/ParallaxObjectIcon.png')}/>
                        </button>
                        <button className={`objectTabs objTab3 ${viewActiveTab === 3 ? 'objActiveTab' : 'objInactiveTab'} ${item.ModelURL ? '' : 'objUndefinedTab'}`} onClick={() => setViewActiveTab(3)}>
                            <img src={require('../images/objects/3DObjectIcon.png')}/>
                        </button>
                        <div className="objectView">
                            <ViewTabContent />
                        </div>
                    </div>
                    <div className="DefinitionData">
                        <h3>Properties</h3>
                        <div>
                            <div>
                                <img src={require(('../images/HealthPropertyIcon.png'))}/>
                            </div>
                            <p>Health</p>
                            <p>20000</p>
                        </div>
                        <div>
                            <div>
                                <img src={require(('../images/HealthPropertyIcon.png'))}/>
                            </div>
                            <p>Health</p>
                            <p>20000</p>
                        </div>
                    </div>
                </div>
                <NextButton />
                {/*<Tabs />*/}
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