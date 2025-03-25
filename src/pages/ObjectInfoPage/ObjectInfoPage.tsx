import { useEffect, useState, useRef } from "react";
import itemService from '@services/itemService';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { Navbar } from "../../components/elements/navigation_bar/Navbar";
import { DataForNavigation, PrevButton, NextButton } from "../../components/elements/ObjectNavigation/ObjectNavigation";
import StyledMarkdown from "../../components/StyledMarkdown";
import { ImagesAndVideosTabContent, SoundsTabContent } from "./elements/MediaSectionComponents";
import { IObjectInfo } from '@interfaces/IObjectInfo';
import VisualTabContent from "./elements/VisualTabContent";
import PageHeaderComponent from "./elements/PageHeaderComponent";
import style from "./ObjectInfoPage.module.scss"
import DefinitionInfoComponent from "./elements/DefinitionInfoComponent";
import { Footer } from "@components/Footer/Footer";
import EditingActionsComponent from "./elements/EditingActionsComponent";
import ObjectDescriptionComponent from "./elements/ObjectDescriptionComponent";
import useNavigationBlock from "@tools/useNavigationBlock";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "ReduxStore/store";

const ObjectInfoPage = () => {
  const location = useLocation();

  const { titleId } = useParams<{ titleId: string }>();
  const [objectInfo, setObjectInfo] = useState<IObjectInfo | null>(null);

  const editingState = useSelector((state: RootState) => state.editingState);
  const dispatch = useDispatch();
  
  const navigate = useNavigationBlock(editingState === 'MODIFIED');

  useEffect(() => {
    if (editingState === 'ACTIVE') dispatch({ type: 'STOP_EDITING' });
  }, [location]);


  useEffect(() => {
    setObjectInfo(null);

    const fetchData = async () => {
      try {
        const res = await itemService.getItemByTitle(titleId);

        setObjectInfo(res);
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
        <main className={style.objectInfoPage}>
          <PrevButton />
          <div className={style.contentLayout}>
            <PageHeaderComponent title={objectInfo.Title} category={objectInfo.Category} />
            <EditingActionsComponent />
            {/* <AuthorialInfoComponent data={objectInfo} /> */}
            <div className={style.content}>
              <div className={style.generalData}>
                {/* <ObjectDescriptionComponent description={{ General: "2131", Authorial: "wqeqwe" }} /> */}
                <ObjectDescriptionComponent description={objectInfo.Description} />
                <div className={`${style.acquisitionData} ${style.section}`}>
                  <h2 className={style.generalDataHeader}>Acquisition</h2>
                  <div className={style.generalDataContent}>
                    {/* {item.Acquisition ?
                <StyledMarkdown>{item.Lore}</StyledMarkdown>
                : */}
                    <p className={style.noData}>Acquisition is unknown...</p>
                    {/* } */}
                  </div>
                </div>

                <div className={`${style.usedForData} ${style.section}`}>
                  <h2 className={style.generalDataHeader}>Used for</h2>
                  <div className={style.generalDataContent}>
                    <p className={style.noData}>Usage unknown...</p>
                  </div>
                </div>

                <div className={`${style.storyData} ${style.section}`}>
                  <h2 className={style.generalDataHeader}>Story</h2>
                  <div className={style.generalDataContent}>
                    {objectInfo.Lore ?
                      <StyledMarkdown>{objectInfo.Lore}</StyledMarkdown>
                      :
                      <p className={style.noData}>Story isn't written...</p>
                    }
                  </div>
                </div>

                <div className={`${style.mediaData} ${style.section}`}>
                  <h2 className={style.generalDataHeader}>Media</h2>
                  <div className={style.generalDataContent}>
                    <SoundsTabContent data={objectInfo.Media.Sounds} />
                    <hr className={style.sectionSeparator} />
                    <ImagesAndVideosTabContent data={objectInfo.Media.Images} />
                    <hr className={style.sectionSeparator} />
                    <ImagesAndVideosTabContent data={objectInfo.Media.Videos} title="Video" />
                  </div>
                </div>
              </div>
              <div className={style.visualAndDefinitionData}>
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