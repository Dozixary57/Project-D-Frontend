import { useEffect, useState, useRef } from "react";
import itemService from '@services/itemService';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { Navbar } from "../../components/elements/navigation_bar/Navbar";
import { DataForNavigation, PrevButton, NextButton } from "../../components/elements/ObjectNavigation/ObjectNavigation";
import StyledMarkdown from "../../components/StyledMarkdown";
import { ImagesAndVideosTabContent, SoundsTabContent } from "./elements/MediaSectionComponents";
import { IObjectInfo } from '@interfaces/IObjectInfo';
import VisualTabContent from "./elements/VisualTabContent";
import PageHeaderComponent from "./elements/PageHeaderComponent";
import "./ObjectInfoPage.scss"
import DefinitionInfoComponent from "./elements/DefinitionInfoComponent";
import AuthorialInfoComponent from "./elements/AuthorialInfoComponent";
import { Footer } from "@components/Footer/Footer";

const ObjectInfoPage = () => {
  // const [isEditingMode, setIsEditingMode] = useState(false);

  const { titleId } = useParams<{ titleId: string }>();
  const [objectInfo, setObjectInfo] = useState<IObjectInfo | null>(null);

  useEffect(() => {
    setObjectInfo(null);

    const fetchData = async () => {
      try {
        const res = await itemService.getItemByTitle(titleId);

        setObjectInfo(res);
        //
        console.log(res)
        //
      } catch (error) {
        if (error) throw error
      }
    };

    fetchData();
  }, [titleId]);

  return (
    (objectInfo) ? (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`${objectInfo.Title} | DizaQute`}</title>
        </Helmet>
        <Navbar />
        <DataForNavigation />
        <main className="objectInfoPage">
          <PrevButton />
          <div className="contentLayout">
            <PageHeaderComponent title={objectInfo.Title} category={objectInfo.Category} />
            {/* <AuthorialInfoComponent data={objectInfo} /> */}
            <div className="content">
              <div className="generalData">
                <div className="descriptionData section">
                  <h2 className="generalDataHeader">Description</h2>
                  {/* <h5 className="itemInfoLastUpd">Last update: 11/1/23 </h5> */}
                  <div className="generalDataContent">
                    <div>
                      <StyledMarkdown>{objectInfo.Description.General}</StyledMarkdown>
                    </div>
                    <div>
                      <StyledMarkdown>{objectInfo.Description.Authorial}</StyledMarkdown>
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
                    {objectInfo.Lore ?
                      <StyledMarkdown>{objectInfo.Lore}</StyledMarkdown>
                      :
                      <p className="noData">Story isn't written...</p>
                    }
                  </div>
                </div>

                <div className="mediaData section">
                  <h2 className="generalDataHeader">Media</h2>
                  <div className="generalDataContent">
                    <SoundsTabContent data={objectInfo.Media.Sounds} />
                    <hr className="sectionSeparator" />
                    <ImagesAndVideosTabContent data={objectInfo.Media.Images} />
                    <hr className="sectionSeparator" />
                    <ImagesAndVideosTabContent data={objectInfo.Media.Videos} title="Video" />
                  </div>
                </div>
              </div>
              <div className="visualAndDefinitionData">
                <VisualTabContent iconUrl={objectInfo.IconURL} modelUrl={objectInfo.ModelURL} />
                <DefinitionInfoComponent
                  defData={{
                    ...objectInfo.Classification,
                    Characteristics: objectInfo.Characteristics
                  }}
                />
              </div>
            </div>
          </div>
          <NextButton />
        </main>
        <Footer />
      </>
    ) : (
      <p>No items found</p>
    )
  )
}

export default ObjectInfoPage;