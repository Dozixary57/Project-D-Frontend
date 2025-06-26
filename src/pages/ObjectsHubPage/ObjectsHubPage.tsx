import { Link } from "react-router-dom";
import { CellStyledAmountWithShadow, CellStyledTitleWithShadow } from "@utilities/StylizedText";
import { useSelector } from "react-redux";
import { RootState } from "@ReduxStore/store";
import { useEffect, useState } from "react";
import ObjectsService from "@services/ObjectsService";
import { selectFilteredObjects, selectIsFiltered } from "@ReduxStore/Reducers/filtering/selectFilteredObjects";
import CollapsibleWrapper from "@utilities/CollapsibleWrapper";
import ObjectsSearcher from "@components/ObjectsSearcher/ObjectsSearcher";
import PageHelmet from "@components/PageHelmet/PageHelmet";
import { IObjectsCountList } from "@interfaces/IObjectsData";
import { LocalLoadingIndicator } from "@components/LoadingIndicators/LoadingIndicators";
import "./ObjectsHubPage.scss";

const ObjectsHubPage = () => {
  const isLoading = useSelector((state: RootState) => state.isLocalLoadingState);

  const isDataFiltered = useSelector(selectIsFiltered);
  const filteredObjects = useSelector(selectFilteredObjects);

  return (
    <>
      <PageHelmet title="Content" />
      <ObjectsSearcher SearchModeToggleVisible={true} FilterPanelToggleVisible={true} />
      <div className="OBJECTS_HUB_PAGE">
        {!isDataFiltered ? (
          <ObjectsHubList />
        ) : isLoading || (filteredObjects && Object.keys(filteredObjects).length > 0) ? (
          <FilteredObjectsList />
        ) : (
          <NoFilteredObjects />
        )}
      </div>
    </>
  )
}

export default ObjectsHubPage;

const ObjectsHubList = () => {
  return (
    <div className="SECTION_GALLERY">
      <HubUnit
        Title="Items"
        ImageUrl="Sword of the departed.png"
        GridArea="1 / 1 / 5 / 5"
        BackgroundColor="95, 205, 230"
      />
      <HubUnit
        Title="Creatures"
        GridArea="1 / 13 / 7 / 18"
        BackgroundColor="120, 95, 215"
      />
      <HubUnit
        Title="Locations"
        GridArea="13 / 1 / 18 / 8"
        BackgroundColor="105, 190, 50"
      />
      <HubUnit
        Title="Mechanics"
        GridArea="7 / 7 / 11 / 11"
        BackgroundColor="255, 200, 95"
      />
    </div>
  )
}

const FilteredObjectsList = () => {
  const filteredObjects = useSelector(selectFilteredObjects);
  const objectsCountList = useSelector((state: RootState) => state.objectsCountList);

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryName: string) => {
    const currentValue = openCategories[categoryName] ?? true;
    setOpenCategories(prev => ({
      ...prev,
      [categoryName]: !currentValue
    }));
  };

  return (
    <div className="FILTERED_OBJECTS_LIST">
      {Object.entries(filteredObjects).map(([categoryName, items]) => {
        const isCategoryOpen = openCategories[categoryName] ?? true;

        const countFromList = objectsCountList?.[categoryName as keyof IObjectsCountList] ?? 0;

        return (
          <div key={categoryName} className="CategorySection">
            <div
              className="SectionHeader"
              onClick={() => toggleCategory(categoryName)}
            >
              <p>{categoryName}</p>
              {Array.isArray(items) && items.length > 0 && (
                <p>
                  {items.length} / {countFromList}
                </p>
              )}
              <p
                style={
                  isCategoryOpen
                    ? {
                      transform:
                        "rotate(90deg) translateX(0.15em) translateY(0.15em)",
                      transition: "transform 0.3s ease-out"
                    }
                    : {
                      transition: "transform 0.3s ease-out"
                    }
                }
              >
                &gt;
              </p>
            </div>
            <CollapsibleWrapper isOpen={isCategoryOpen} classes="SectionContent">
              <div className="SectionItem">
                <p>ID</p>
                <p>Title</p>
              </div>
              {Array.isArray(items) && items.length > 0 ? (
                items.map((item: any) => (
                  <Link
                    key={item._id}
                    to={`/Content/${categoryName}/${item.Title}`}
                  >
                    <div className="SectionItem">
                      <p>{item.ID ? item.ID : '-'}</p>
                      <p>{item.Title}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No data</p>
              )}
            </CollapsibleWrapper>
          </div>
        );
      })}

      <LocalLoadingIndicator />
    </div>
  )
}

const HubUnit = ({ Title, ImageUrl, GridArea, BackgroundColor }: { Title: keyof IObjectsCountList, ImageUrl?: string, GridArea: string, BackgroundColor?: string }) => {
  const objectsCountList = useSelector((state: RootState) => state.objectsCountList);

  useEffect(() => {
    if (objectsCountList[Title] === undefined || objectsCountList[Title] === null)
      ObjectsService.getObjectsCount(Title);
  }, []);

  return (
    <Link to={objectsCountList[Title] ? `/Content/${Title}` : ''} className={`HUB_UNIT ${objectsCountList[Title] ? '' : 'NoData'}`} style={{ '--grid-area': GridArea, '--element-color': BackgroundColor } as React.CSSProperties}>
      <div className="UnitData">
        <CellStyledTitleWithShadow text={Title} />
        <CellStyledAmountWithShadow text={objectsCountList[Title] || 0} />
        <img src={ImageUrl ? require(`@images/objects_hub/${ImageUrl}`) : require("@images/objects/NoThumbnailObjectIcon.png")} alt={Title} />
      </div>
    </Link>
  )
}

const NoFilteredObjects = () => {
  return (
    <p className="NO_FILTERED_OBJECTS">
      No results match your filter criteria
    </p>
  )
}