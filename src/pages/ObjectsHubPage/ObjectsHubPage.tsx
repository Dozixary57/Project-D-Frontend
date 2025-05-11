import { Helmet } from "react-helmet-async";
import { Navbar } from "@components/Navbar/Navbar";
import "./ObjectsHubPage.scss";
import ObjectsSearcher from "./ObjectsSearcher/ObjectsSearcher";
import { Footer } from "@components/Footer/Footer";
import { Link } from "react-router-dom";
import { CellStyledAmountWithShadow, CellStyledTitleWithShadow } from "@utilities/StylizedText";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@ReduxStore/store";
import { useEffect, useState } from "react";
import ObjectsService from "@services/ObjectsService";
import { selectFilteredObjects, selectIsFiltered } from "@ReduxStore/Reducers/objects/selectFilteredObjects";
// import { setFilterParamsList, setFilterTitleQuery, setFilterByCategory, setObjectsData } from "@ReduxStore/Reducers/objects/objectsFilteredResult";
import CollapsibleWrapper from "@utilities/CollapsibleWrapper";

const ObjectsHubPage = () => {
  const objectsCountList = useSelector((state: RootState) => state.objectsCountList);
  const isDataFiltered = useSelector(selectIsFiltered);

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryName: string) => {
    const currentValue = openCategories[categoryName] ?? true;
    setOpenCategories(prev => ({
      ...prev,
      [categoryName]: !currentValue
    }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    ObjectsService.getObjectsCountList();
    // dispatch(setObjectsData([
    //   {
    //     Items: [
    //       {
    //         "_id": "6575c136464a5833bb51a02c",
    //         "ID": 2,
    //         "Title": "Branch",
    //         "IconURL": "http://localhost:5000/Icon/Branch.png"
    //       },
    //       {
    //         "_id": "6541dac0affe5146d88f15da",
    //         "ID": 1,
    //         "Title": "Sword of the departed",
    //         "IconURL": "http://localhost:5000/Icon/Sword_of_the_departed.png"
    //       }
    //     ]
    //   },
    //   {
    //     Blocks: [
    //       {
    //         "_id": "6575c136464a5833bb51a02c",
    //         "ID": 2,
    //         "Title": "Branch",
    //         "IconURL": "http://localhost:5000/Icon/Branch.png"
    //       },
    //       {
    //         "_id": "6541dac0affe5146d88f15da",
    //         "ID": 1,
    //         "Title": "Sword of the departed",
    //         "IconURL": "http://localhost:5000/Icon/Sword_of_the_departed.png"
    //       }
    //     ]
    //   },
    // ]));
  }, []);

  const filteredObjects = useSelector(selectFilteredObjects);

  useEffect(() => {
    console.log(filteredObjects)
  }, [filteredObjects]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>DizaQute | Content</title>
      </Helmet>
      <Navbar />
      <main className="OBJECTS_HUB_PAGE">
        <ObjectsSearcher />
        <div className="Content">
          {!isDataFiltered ? (
            <div className="SectionGallery">
              <Link to="/Content/Items" className="ItemsLink">
                <div className="ItemsCell">
                  <CellStyledTitleWithShadow text="Items" />
                  <CellStyledAmountWithShadow text={objectsCountList?.Items} />
                </div>
              </Link>
              <Link to="/Content/Creatures" className="CreaturesLink">
                <div className="CreaturesCell">
                  <CellStyledAmountWithShadow text={objectsCountList?.Creatures} />
                  <CellStyledTitleWithShadow text="Creatures" />
                </div>
              </Link>
              <Link to="/Content/Locations" className="LocationsLink">
                <div className="LocationsCell">
                  <CellStyledAmountWithShadow text={objectsCountList?.Locations} />
                  <CellStyledTitleWithShadow text="Locations" />
                </div>
              </Link>
              <Link to="/Content/Mechanics" className="MechanicsLink">
                <div className="MechanicsCell">
                  <CellStyledAmountWithShadow text={objectsCountList?.Mechanics} />
                  <CellStyledTitleWithShadow text="Mechanics" />
                </div>
              </Link>
              <Link to="/Content/Blocks" className="BlocksLink">
                <div className="BlocksCell">
                  <CellStyledAmountWithShadow text={objectsCountList?.Blocks} />
                  <CellStyledTitleWithShadow text="Blocks" />
                </div>
              </Link>
            </div>
          ) : filteredObjects && filteredObjects.length > 0 ? (
            <div className="FilteredObjectsList">
              {filteredObjects.map((categoryObj, index) => {
                const [categoryName, items] = Object.entries(categoryObj)[0];
                const isCategoryOpen = openCategories[categoryName] ?? true;

                const countFromList = (objectsCountList && typeof objectsCountList === 'object')
                  ? objectsCountList[categoryName as keyof typeof objectsCountList] || 0
                  : 0;

                return (
                  <div key={index} className="CategorySection">
                    <div className="SectionHeader" onClick={() => toggleCategory(categoryName)}>
                      <p>{categoryName}</p>
                      {Array.isArray(items) && items.length > 0 && <p>{items.length} / {countFromList}</p>}
                      <p style={isCategoryOpen ? { transform: "rotate(90deg) translateX(0.15em) translateY(0.15em)", transition: "transform 0.3s ease-out" } : { transition: "transform 0.3s ease-out" }}>&gt;</p>
                    </div>
                    <CollapsibleWrapper isOpen={isCategoryOpen} classes="SectionContent">
                      <div className="SectionItem">
                        <p>ID</p>
                        <p>Title</p>
                      </div>
                      {Array.isArray(items) && items.length > 0 ? (
                        items.map((item: any) => (
                          <Link key={item._id} to={`/Content/${categoryName}/${item.Title}`}>
                            <div className="SectionItem">
                              <p>{item.ID}</p>
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
            </div>
          ) : (
            <p className="NoFilteredResults">
              No results match your filter criteria
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ObjectsHubPage;