import React, { useEffect, useState } from "react";
import itemService from '../backend/services/itemService';
import {useNavigate, useParams} from 'react-router-dom';
import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavBar";
import "./ItemInfoPage.scss"
import {DataForNavigation, PrevButton, NextButton} from "../components/elements/ObjectNavigation/ObjectNavigation";

interface Item {
    _id: string;
    Title: string;
    Description: {
        General: string
        Authorial: string
    };
    IconURL: string;
    ParallaxURL: string;
    ModelURL: string;
/*
    VolumeURL: string;
    ModelURL: string;
*/
}

const ItemInfoPage = () => {
    const navigate = useNavigate();

    const { titleId } = useParams<{ titleId: string }>();
    const [item, setItem] = useState<any>(null);

    const [viewActiveTab, setViewActiveTab] = useState(1);

    const [activeAuthorialDescription, setActiveAuthorialDescription] = useState(false);

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
                return (<>
                    {item.IconURL && <button />}
                    <img src={item.IconURL ? item.IconURL : require('../images/objects/NoThumbnailObjectIcon.png')} alt={item.Title + " icon view."} />
                </>);
            case 2:
                return (<>
                    {item.ParallaxURL && <button />}
                    <img src={item.ParallaxURL ? item.ParallaxURL : require('../images/objects/NoParallaxObjectIcon.png')} alt={item.Title + " parallax view."} />
                </>);
            case 3:
                return (<>
                    {item.ModelURL && <button />}
                    <img src={item.ModelURL ? item.ModelURL : require('../images/objects/No3DObjectIcon.png')} alt={item.Title + " 3D model view."} />
                </>);
            default:
                return <img src={item.IconURL ? item.IconURL : require('../images/objects/NoThumbnailObjectIcon.png')} alt={item.Title + " icon view."} />;
        }
    };

    const renderItem = (item: Item) => {
        return (
            <main className="ObjectInfoPage">
                <PrevButton />
                <div className="Content">
                    <div className="ObjectTitle">
                        <button onClick={() => navigate('/Content/Items')}>&lt;&nbsp;&nbsp;</button>
                        <h2>{item.Title}</h2>
                        <div></div>
                    </div>
                    <div className="TextData">
                        <h5 className="itemInfoLastUpd">Last update: 11/1/23 </h5>
                        <div className="descriptionData">
                            <h2 className="descriptionHeader">Description</h2>
                            <div className="GeneralDescription">
                                {item.Description.General.split('\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                            {item.Description.Authorial ? (
                                <>
                                    <div className={`AuthorialDescription ${activeAuthorialDescription ? 'AuthorialDescriptionIsActive' : 'AuthorialDescriptionIsInactive'}`}>
                                        <p>{item.Description.Authorial}</p>
                                    </div>
                                    <button onClick={() => setActiveAuthorialDescription(prev => !prev)}>
                                        <span className={activeAuthorialDescription ? 'arrowIsActive' : 'arrowIsInactive'}>▼</span>
                                    </button>
                                </>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                    <div className="VisualData">
                        <button className={`objectTabs objTab1 ${viewActiveTab === 1 ? 'objActiveTab' : 'objInactiveTab'} ${item.IconURL ? '' : 'objUndefinedTab'}`} onClick={() => setViewActiveTab(1)}>
                            <img src={require('../images/objects/ThumbnailObjectIcon.png')}/>
                        </button>
                        <button className={`objectTabs objTab2 ${viewActiveTab === 2 ? 'objActiveTab' : 'objInactiveTab'} ${item.ParallaxURL ? '' : 'objUndefinedTab'}`} onClick={() => setViewActiveTab(2)}>
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
                            <p>HealthHealth</p>
                            <p>20000</p>
                        </div>
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
                    {renderItem(item)}
                </>
            </>
        ) : (
            <p>No items found</p>
        )
    )
}

export { ItemInfoPage };