import React, { useEffect, useState, useRef } from "react";
import itemService from '../backend/services/itemService';
import {useNavigate, useParams} from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/elements/navigation_bar/Navbar";
import "./ItemInfoPage.scss"
import {DataForNavigation, PrevButton, NextButton} from "../components/elements/ObjectNavigation/ObjectNavigation";
import ModalWindow, { OpenModalWindow } from "../components/ModalWindows/ModalWindow1";
import { useSelector } from "react-redux";
import { RootState } from "../ReduxStore/store";

interface Item {
    _id: string;
    Title: string;
    Description: {
        General: string;
        Authorial: string;
    };
    Classification: {
        Type: string;
        Subclass: string;
    }
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

    const userPrivileges = useSelector((state: RootState) => state.userPrivileges);

    const [isEditingMode, setIsEditingMode] = useState(false);

    const modalRef = useRef<OpenModalWindow | null>(null);
    const openModalWindow = (url: string) => {
        modalRef.current?.open(url);
    }

    const { titleId } = useParams<{ titleId: string }>();
    const [item, setItem] = useState<any>(null);

    const [viewActiveTab, setViewActiveTab] = useState(1);

    const [favoriteToggle, setFavoriteToggle] = useState(false);

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
                    {/* {item.IconURL && <button />} */}
                    <img src={item.IconURL ? item.IconURL : require('../images/objects/NoThumbnailObjectIcon.png')} onClick={() => openModalWindow(item.IconURL)} alt={item.Title + " icon view."} />
                </>);
            case 2:
                return (<>
                    {/* {item.ParallaxURL && <button />} */}
                    <img src={item.ParallaxURL ? item.ParallaxURL : require('../images/objects/NoParallaxObjectIcon.png')} alt={item.Title + " parallax view."} />
                </>);
            case 3:
                return (<>
                    {/* {item.ModelURL && <button />} */}
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
                        <button className="BackButton" onClick={() => navigate('/Content/Items')}>&lt;&nbsp;&nbsp;</button>
                        <div className="TitleData">
                            <h2>{item.Title}</h2>
                            <button onClick={() => setFavoriteToggle(prev => !prev)}>
                                <img src={favoriteToggle? require('../images/FavoriteActive.png') : require('../images/FavoriteInactive.png')} alt="FavoriteIcon" />
                            </button>
                        </div>
                        <div className="EditingActions">
                            {isEditingMode?
                                <>
                                    <button className="AgreeButton">
                                        <img src={require('../images/YesIcon.png')} alt="BinIcon"></img>
                                    </button>
                                    <button className="DisagreeButton" onClick={() => setIsEditingMode(prev => !prev)}>
                                        <img src={require('../images/NoIcon.png')} alt="BinIcon"></img>
                                    </button>
                                </>
                                :
                                <>
                                    {userPrivileges && userPrivileges.includes("ObjectEdit") && (
                                        <button className="EditingButton" onClick={() => setIsEditingMode(true)}>
                                            <img src={require('../images/EditingIcon.png')} alt="EditingIcon" />
                                        </button>
                                    )}
                                    {userPrivileges && userPrivileges.includes("ObjectDelete") && (
                                        <button className="DisagreeButton">
                                            <img src={require('../images/BinIcon.png')} alt="BinIcon"></img>
                                        </button>
                                    )}
                                </>
                            }
                        </div>
                        <div className="ActionIndicator">
                            <p style={isEditingMode? {backgroundColor: 'rgba(226, 64, 0, 0.4)'} : {backgroundColor: 'rgba(170, 170, 170, 0.4)'}}>{isEditingMode? "Editing" : "Viewing"}</p>
                        </div>
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
                        <div className="ObjectType">
                            <h3 className="ObjectTypeTitle">Type</h3>
                            <div className="ObjectTypeValue">
                                <img src={require('../images/ObjectTypeWeapon.png')} />                         
                                <p>{item.Classification.Type}</p>
                            </div>
                        </div>
                        <div className="ObjectSubclass">
                            <h3 className="ObjectSubclassTitle">Subclass</h3>
                            <div className="ObjectSubclassValue">
                                <img src={require('../images/ObjectSubclassShortRange.png')} />                         
                                <p>{item.Classification.Subclass}</p>
                            </div>
                        </div>

                        <div className="ObjectPropertiesTitle">
                            <h3>Properties</h3>
                        </div>

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
                <Navbar />
                <ModalWindow ref={modalRef} />
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