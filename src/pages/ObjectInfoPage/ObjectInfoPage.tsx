import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { Navbar } from "@components/Navbar/Navbar";
import { DataForNavigation, PrevButton, NextButton } from "@components/ObjectNavigation/ObjectNavigation";
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
import ObjectLoreComponent from "./elements/ObjectLoreComponent";
import ObjectAcquisitionComponent from "./elements/ObjectAcquisitionComponent";
import { usePenultimateUrlSegment } from "@tools/LastUrlSegment";
import ObjectsService from "@services/ObjectsService";
import { selectEditingFlags, selectEditingState } from "@ReduxStore/Reducers/editing/actions/editingModeSelectors";
import { setFormObjectData } from "@ReduxStore/Reducers/editing/data/formObjectData";
import { useTranslation } from 'react-i18next';

const ObjectInfoPage = () => {
    const { t } = useTranslation();

  const penultimateSegment = usePenultimateUrlSegment();

  const { titleId } = useParams<{ titleId: string }>();
  const objectInfoData = useSelector((state: RootState) => state.objectInfoData);

  const dispatch = useDispatch();

  const editingModeFlags = useSelector(selectEditingFlags);
  const editingModeState = useSelector(selectEditingState);

  // !!!
  useEffect(() => {
    console.log(editingModeFlags);
    console.log(editingModeState);
  }, [editingModeFlags, editingModeState]);
  // !!!

  useNavigationBlock(editingModeState === 'MODIFIED');

  useEffect(() => {
    ObjectsService.getObjectByTitle(penultimateSegment || '', titleId);
  }, [titleId]);

  useEffect(() => {
    dispatch(setFormObjectData(objectInfoData));
  }, [objectInfoData]);

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
                <ObjectAcquisitionComponent acquisition={objectInfoData.Acquisition} />

                {/* <div className={`${style.usedForData} ${style.section}`}>
                  <h2 className={style.generalDataHeader}>Used for</h2>
                  <div className={style.generalDataContent}>
                    <p className={style.noData}>Usage unknown...</p>
                  </div>
                </div> */}

                <ObjectLoreComponent lore={objectInfoData.Lore ?? ''} />

                <div className={`${style.mediaData} ${style.section}`}>
                  <h2 className={style.generalDataHeader}>{t('objectInfo.sections.media')}</h2>
                  <div className={style.generalDataContent}>
                    <SoundsTabContent data={objectInfoData.Media?.Sounds ?? []} />
                    <hr className={style.sectionSeparator} />
                    <ImagesAndVideosTabContent data={objectInfoData.Media?.Images ?? []} />
                    <hr className={style.sectionSeparator} />
                    <ImagesAndVideosTabContent data={objectInfoData.Media?.Videos ?? []} title="Video" />
                  </div>
                </div>
              </div>
              <div className={style.visualAndDefinitionData}>
                <VisualTabContent iconUrl={objectInfoData.IconURL} modelUrl={objectInfoData.ModelURL ?? ''} />
                <DefinitionInfoComponent
                  defData={{
                    ...objectInfoData.Classification,
                    Type: objectInfoData.Classification?.Type ?? '',
                    Characteristics: objectInfoData.Characteristics ?? [],
                    Subclass: objectInfoData.Classification?.Subclass ?? ''
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
      <p>No object found</p>
    )
  )
}

export default ObjectInfoPage;