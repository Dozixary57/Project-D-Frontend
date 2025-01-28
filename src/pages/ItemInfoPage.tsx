import { useEffect, useState, useRef } from "react";
import itemService from '../backend/services/itemService';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/elements/navigation_bar/Navbar";
import "./ItemInfoPage.scss"
import { DataForNavigation, PrevButton, NextButton } from "../components/elements/ObjectNavigation/ObjectNavigation";
import ModalWindow, { OpenModalWindow } from "../components/ModalWindows/ModalWindow1";
import { useSelector } from "react-redux";
import { RootState } from "../ReduxStore/store";
import StyledMarkdown from "../components/StyledMarkdown";
import { IMediaUnit } from "../Interfaces/IMediaSectionComponents";
import { ImagesAndVideosTabContent, SoundsTabContent } from "./MediaSectionComponents";

interface Item {
  _id: string;
  Title: string;
  Description: {
    General: string;
    Authorial: string;
  };
  Lore: string;
  Classification: {
    Type: string;
    Subclass: string;
  }
  IconURL: string;
  ParallaxURL: string;
  ModelURL: string;
  Media: {
    Sounds: IMediaUnit[];
    Videos: IMediaUnit[];
    Images: IMediaUnit[];
  }
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
  // const [soundActiveTab, setSoundActiveTab] = useState(0);

  // const [imageActiveTab, setImageActiveTab] = useState(0);

  const [favoriteToggle, setFavoriteToggle] = useState(false);

  const [loadIconError, setLoadIconError] = useState(false);
  // const [loadParallaxError, setLoadParallaxError] = useState(false);
  const [loadModelError, setLoadModelError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await itemService.getItemByTitle(titleId);

        setItem(res);
        console.log(res)
        setViewActiveTab(1)
      } catch (error) {
        if (error) throw error
      }
    };

    fetchData();
  }, [titleId]);

  // TEST DATA
  // useEffect(() => {
  //   if (item === null || item.Media.Sounds.length > 3) return;

  //   // setItem((prevItem: any) => ({
  //   //   ...prevItem,
  //   //   Media: {
  //   //     ...prevItem.Media,
  //   //     Sounds: [
  //   //       ...(prevItem.Media.Sounds || []),
  //   //       {
  //   //         Title: "9",
  //   //         Url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  //   //         Description:
  //   //           "long sound long sound long sound long sound long sound long sound long sound long sound long sound long sound long sound long sound ",
  //   //       },
  //   //     ],
  //   //   },
  //   // }));
  //   setItem((prevItem: any) => ({
  //     ...prevItem,
  //     Media: {
  //       ...prevItem.Media,
  //       Sounds: [
  //         ...(prevItem.Media.Sounds || []),
  //         {
  //           Title: "9",
  //         },
  //       ],
  //     },
  //   }));
  // }, [item]);
  //

  const ViewTabContent = () => {
    switch (viewActiveTab) {
      case 1:
        return (
          item.IconURL?.length > 0 && !loadIconError ?
            <img
              src={item.IconURL}
              onClick={() => openModalWindow(item.IconURL)}
              alt={item.Title + " icon view."}
              onError={() => setLoadIconError(true)}
            />
            :
            <img src={require('../images/objects/NoThumbnailObjectIcon.png')} alt={item.Title + " icon view."} />
        );
      // case 2:
      //   return (
      //     item.ParallaxURL?.length > 0 && !loadParallaxError ?
      //       <img
      //         src={item.ParallaxURL}
      //         onClick={() => openModalWindow(item.ParallaxURL)}
      //         alt={item.Title + " parallax view."}
      //         onError={() => setLoadParallaxError(true)}
      //       />
      //       :
      //       <img src={require('../images/objects/NoParallaxObjectIcon.png')} alt={item.Title + " parallax view."} />
      //   );
      case 3:
        return (
          item.ModelURL?.length > 0 && !loadModelError ?
            <img
              src={item.ModelURL}
              onClick={() => openModalWindow(item.ModelURL)}
              alt={item.Title + " 3D model view."}
              onError={() => setLoadModelError(true)}
            />
            :
            <img src={require('../images/objects/No3DObjectIcon.png')} alt={item.Title + " 3D model view."} />
        );
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
                <img src={favoriteToggle ? require('../images/FavoriteActive.png') : require('../images/FavoriteInactive.png')} alt="FavoriteIcon" />
              </button>
            </div>
            <div className="EditingActions">
              {isEditingMode ?
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
                  {userPrivileges && userPrivileges.map(privilege => privilege.Title).includes('ObjectEdit') && (
                    <button className="EditingButton" onClick={() => setIsEditingMode(true)}>
                      <img src={require('../images/EditingIcon.png')} alt="EditingIcon" />
                    </button>
                  )}
                  {userPrivileges && userPrivileges.map(privilege => privilege.Title).includes('ObjectDelete') && (
                    <button className="DisagreeButton">
                      <img src={require('../images/BinIcon.png')} alt="BinIcon"></img>
                    </button>
                  )}
                </>
              }
            </div>
            <div className="ActionIndicator">
              <p style={isEditingMode ? { backgroundColor: 'rgba(226, 64, 0, 0.4)' } : { backgroundColor: 'rgba(170, 170, 170, 0.4)' }}>{isEditingMode ? "Editing" : "Viewing"}</p>
            </div>
          </div>
          <div className="GeneralData">
            <div className="descriptionData section">
              <h2 className="generalDataHeader">Description</h2>
              {/* <h5 className="itemInfoLastUpd">Last update: 11/1/23 </h5> */}
              <div className="generalDataContent">
                <div className="GeneralDescription">
                  <StyledMarkdown>{item.Description.General}</StyledMarkdown>
                </div>
                <div className="AuthorialDescription">
                  <StyledMarkdown>{item.Description.Authorial}</StyledMarkdown>
                </div>
              </div>
            </div>

            <div className="acquisitionData section">
              <h2 className="generalDataHeader">Acquisition</h2>
              <div className="generalDataContent">
                {/* {item.Acquisition ?
                <StyledMarkdown>{item.Lore}</StyledMarkdown>
                : */}
                <p className="noData">Acquisition is unknown...</p>
                {/* } */}
              </div>
            </div>

            <div className="usedForData section">
              <h2 className="generalDataHeader">Used for</h2>
              <div className="generalDataContent">
                <p className="noData">Usage unknown...</p>
              </div>
            </div>

            <div className="storyData section">
              <h2 className="generalDataHeader">Story</h2>
              <div className="generalDataContent">
                {item.Lore ?
                  <StyledMarkdown>{item.Lore}</StyledMarkdown>
                  :
                  <p className="noData">Story isn't written...</p>
                }
              </div>
            </div>

            <div className="mediaData section">
              <h2 className="generalDataHeader">Media</h2>
              <div className="generalDataContent">
                <SoundsTabContent data={item.Media.Sounds} />
                <hr className="sectionSeparator" />
                <ImagesAndVideosTabContent data={item.Media.Images} />
                <hr className="sectionSeparator" />

                {item.Media?.Videos ?
                  <div></div>
                  :
                  <p className="noData">Videos are unknown...</p>
                }
              </div>
            </div>
          </div>
          <div className="VisualData">
            <button
              className={`objectTabs objTab1 ${viewActiveTab === 1 ? 'objActiveTab' : 'objInactiveTab'} ${item.IconURL?.length > 0 ? '' : 'objUndefinedTab'}`}
              onClick={() => setViewActiveTab(1)}
              title="In-game object icon"
            >
              <img src={require('../images/objects/ThumbnailObjectIcon.png')} />
            </button>
            {/* <button
              className={`objectTabs objTab2 ${viewActiveTab === 2 ? 'objActiveTab' : 'objInactiveTab'} ${item.ParallaxURL?.length > 0 ? '' : 'objUndefinedTab'}`}
              onClick={() => setViewActiveTab(2)}
              title="Parallax view"
            >
              <img src={require('../images/objects/ParallaxObjectIcon.png')} />
            </button> */}
            <button
              className={`objectTabs objTab3 ${viewActiveTab === 3 ? 'objActiveTab' : 'objInactiveTab'} ${item.ModelURL?.length > 0 ? '' : 'objUndefinedTab'}`}
              onClick={() => setViewActiveTab(3)}
              title="In-game 3D Model"
            >
              <img src={require('../images/objects/3DObjectIcon.png')} />
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
                <img src={require(('../images/HealthPropertyIcon.png'))} />
              </div>
              <p>Health</p>
              <p>20000</p>
            </div>
            <div>
              <div>
                <img src={require(('../images/HealthPropertyIcon.png'))} />
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