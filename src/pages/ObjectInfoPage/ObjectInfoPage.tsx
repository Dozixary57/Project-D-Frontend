import { useEffect } from "react";
import ObjectService from '@services/objectService';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { Navbar } from "../../components/elements/navigation_bar/Navbar";
import { DataForNavigation, PrevButton, NextButton } from "../../components/elements/ObjectNavigation/ObjectNavigation";
import { ImagesAndVideosTabContent, SoundsTabContent } from "./elements/MediaSectionComponents";
import VisualTabContent from "./elements/VisualTabContent";
import PageHeaderComponent from "./elements/PageHeaderComponent";
import style from "./ObjectInfoPage.module.scss"
import DefinitionInfoComponent from "./elements/DefinitionInfoComponent";
import { Footer } from "@components/Footer/Footer";
import EditingActionsComponent from "./elements/EditingActionsComponent";
import ObjectDescriptionComponent from "./elements/ObjectDescriptionComponent";
import useNavigationBlock from "@tools/useNavigationBlock";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "ReduxStore/store";
import ObjectStoryComponent from "./elements/ObjectStoryComponent";
import { handleEditChanges } from "@tools/HandleEditChanges";
import ObjectAcquisitionComponent from "./elements/ObjectAcquisitionComponent";

const ObjectInfoPage = () => {
  const location = useLocation();

  const { titleId } = useParams<{ titleId: string }>();
  const objectInfoData = useSelector((state: RootState) => state.objectInfoData);

  const objectInfoPageEditingStates = useSelector((state: RootState) => state.objectInfoPageEditingStates);
  const editingState = useSelector((state: RootState) => state.editingState);
  const dispatch = useDispatch();

  useNavigationBlock(editingState === 'MODIFIED');

  useEffect(() => {
    const hasChanges = Object.values(objectInfoPageEditingStates).some(value => value === true);

    if (hasChanges) {
      store.dispatch({ type: 'CONTENT_MODIFIED' });
    } else if (editingState === 'MODIFIED') {
      store.dispatch({ type: 'START_EDITING' });
    }

    console.log(objectInfoPageEditingStates);
  }, [objectInfoPageEditingStates]);

  useEffect(() => {
    handleEditChanges(dispatch).resetAllStatesByDefault();
    try {
      ObjectService.getObjectByTitle(titleId);
    } catch (error) {
      console.error(error);
    }
  }, [titleId]);

  useEffect(() => {
    dispatch({
      type: 'NEW_OBJECT_INFO_DATA',
      payload: objectInfoData
    })
  }, [objectInfoData]);

  // !!!
  useEffect(() => {
    if (editingState !== 'MODIFIED') {
      dispatch({
        type: 'NEW_OBJECT_INFO_DATA',
        payload: objectInfoData
      });
    }
  }, [editingState]);
  // !!!

  return (
    (objectInfoData) ? (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`${objectInfoData.Title} | DizaQute`}</title>
        </Helmet>
        <Navbar />
        <DataForNavigation />
        <main className={style.objectInfoPage}>
          <PrevButton />
          <div className={style.contentLayout}>
            <PageHeaderComponent title={objectInfoData.Title} category={objectInfoData.Category} />
            <EditingActionsComponent />
            {/* <AuthorialInfoComponent data={objectInfo} /> */}
            <div className={style.content}>
              <div className={style.generalData}>
                <ObjectDescriptionComponent description={objectInfoData.Description} />
                {/* <div className={`${style.acquisitionData} ${style.section}`}>
                  <h2 className={style.generalDataHeader}>Acquisition</h2>
                  <div className={style.generalDataContent}>
                    <p className={style.noData}>Acquisition is unknown...</p>
                  </div>
                </div> */}
                <ObjectAcquisitionComponent acquisition={objectInfoData.Acquisition} />

                {/* <div className={`${style.usedForData} ${style.section}`}>
                  <h2 className={style.generalDataHeader}>Used for</h2>
                  <div className={style.generalDataContent}>
                    <p className={style.noData}>Usage unknown...</p>
                  </div>
                </div> */}

                <ObjectStoryComponent story={objectInfoData.Lore} />

                <div className={`${style.mediaData} ${style.section}`}>
                  <h2 className={style.generalDataHeader}>Media</h2>
                  <div className={style.generalDataContent}>
                    <SoundsTabContent data={objectInfoData.Media.Sounds} />
                    <hr className={style.sectionSeparator} />
                    <ImagesAndVideosTabContent data={objectInfoData.Media.Images} />
                    <hr className={style.sectionSeparator} />
                    <ImagesAndVideosTabContent data={objectInfoData.Media.Videos} title="Video" />
                  </div>
                </div>
              </div>
              <div className={style.visualAndDefinitionData}>
                <VisualTabContent iconUrl={objectInfoData.IconURL} modelUrl={objectInfoData.ModelURL} />
                <DefinitionInfoComponent
                  defData={{
                    ...objectInfoData.Classification,
                    Characteristics: objectInfoData.Characteristics
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