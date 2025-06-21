import { useEffect, useState } from "react";
import CollapsibleWrapper from "@utilities/CollapsibleWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@ReduxStore/store";
import { IObjectsCountList } from "@interfaces/IObjectsData";
import { setFilterByCategory, setFilterParamsList, setObjectsData } from "@ReduxStore/Reducers/filtering/objectsFilteredResult";
import "./ObjectsSearcher.scss"
import { useTranslation } from "react-i18next";

const ObjectsSearcher = ({
  Title = 'Search',
  Query = { queryId: '', queryTitle: '' },
  Available = false,
  FilterPanelOpen = false,
  TitleVisible = true,
  SearchModeToggleVisible = false,
  FilterPanelToggleVisible = false,
}: {
  Title?: string,
  Query?: {
    queryId: string,
    queryTitle: string
  },
  Available?: boolean,
  FilterPanelOpen?: boolean,
  TitleVisible?: boolean,
  SearchModeToggleVisible?: boolean,
  FilterPanelToggleVisible?: boolean
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Search Availability & Filter Panel Toggle
  const [isSearchAvailable, setIsSearchAvailable] = useState(Available);
  const [filterPanelToggle, setFilterPanelToggle] = useState(FilterPanelOpen);

  // Search Query
  const [searchQuery, setSearchQuery] = useState<{ queryId: string, queryTitle: string }>(Query);

  // Search Mode Toggle
  const [titleIdSearchToggle, setTitleIdSearchToggle] = useState<"byTitle" | "byId">("byTitle");

  const [isTitleVisible, setIsTitleVisible] = useState(TitleVisible);
  const [isSearchModeToggleVisible, setIsSearchModeToggleVisible] = useState(SearchModeToggleVisible);
  const [isFilterPanelToggleVisible, setIsFilterPanelToggleVisible] = useState(FilterPanelToggleVisible);



  const objectsCountList: IObjectsCountList = useSelector((state: RootState) => state.objectsCountList);




  const [selectOptions, setSelectOptions] = useState<{ value: string, label: string, disabled: boolean }[]>([{ value: 'all', label: 'All', disabled: true }]);
  const [selectedOption, setSelectedOption] = useState<{ value: string, label: string } | null>(selectOptions[0]);

  // 
  useEffect(() => {
    dispatch({ type: 'OBJECTS_COUNT_LIST', payload: null });
  }, [])

  useEffect(() => {
    const options = [{ value: 'all', label: 'All', disabled: false },];

    if (objectsCountList) {
      Object.entries(objectsCountList).forEach(([key, count]) => {
        options.push({
          value: key.toLowerCase(),
          label: key,
          disabled: count < 1,
        });
      });
    }

    const filteredOptions = options.filter(option => option.value !== 'all');
    const enabledOptionsCount = filteredOptions.filter(option => !option.disabled).length;

    if (enabledOptionsCount >= 2) {
      options.push({ value: 'selectable', label: '[ Selectable ]', disabled: false });
    } else {
      options.push({ value: 'selectable', label: '[ Selectable ]', disabled: true });
    }

    setSelectOptions(options);
    setIsSearchAvailable(options.length > 2);
  }, [objectsCountList]);

  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    const selectedValue = selectedOption?.value;
    const hasParams = !!(searchQuery.queryId || searchQuery.queryTitle);
    const hasCategory = !!(selectedValue && selectedValue !== 'all');

    // dispatch(setObjectsData(
    //   ObjectsService.getObjectsByCategories("Items")
    // ));


    if (hasParams) {
      const filterParams: { ID?: number; Title?: string } = {};

      if (searchQuery.queryId) {
        filterParams.ID = Number(searchQuery.queryId);
      }

      if (searchQuery.queryTitle) {
        filterParams.Title = searchQuery.queryTitle;
      }

      dispatch(setFilterParamsList(filterParams));
    } else {
      dispatch(setFilterParamsList(null));
    }

    if (hasCategory) {
      dispatch(setFilterByCategory([String(selectedValue)]));
    } else {
      dispatch(setFilterByCategory([]));
    }

    setIsFilterActive(hasCategory);
  }, [selectedOption, searchQuery]);

  return (
    <div className="OBJECTS_SEARCHER">
      <div className="SearchPanel">
        {isTitleVisible && <div className="SearchHeader">
          <h3 className="SearchTitle">{Title}</h3>
          <hr className="Separator" />
        </div>}
        <div className="SearchLineWithMode">
          <div className="SearchLineContainer">
            <input
              type={titleIdSearchToggle === "byTitle" ? "text" : "number"}
              value={titleIdSearchToggle === "byTitle" ? searchQuery.queryTitle : searchQuery.queryId}
              className="SearchLine"
              onChange={(event) => setSearchQuery(prev => ({ ...prev, [titleIdSearchToggle === "byTitle" ? 'queryTitle' : 'queryId']: event.target.value }))}
              onKeyDown={
                titleIdSearchToggle === "byId"
                  ? (event) => {
                    const invalidChars = ['e', 'E', '+', '-', '.', ',', ' '];
                    if (invalidChars.includes(event.key)) {
                      event.preventDefault();
                    }
                  }
                  : undefined
              }
              placeholder={`${t('searchComponent.searchPlaceholder.general')} ${titleIdSearchToggle === "byTitle" ? t('searchComponent.searchPlaceholder.title') : t('searchComponent.searchPlaceholder.id')}`}
              disabled={!isSearchAvailable}
              autoComplete="off"
            />
            <button
              onClick={() => titleIdSearchToggle === "byTitle" ? setSearchQuery(prev => ({ ...prev, queryTitle: '' })) : setSearchQuery(prev => ({ ...prev, queryId: '' }))}
              onMouseDown={(event) => event.preventDefault()}
              tabIndex={-1}
              disabled={titleIdSearchToggle === "byTitle" ? !searchQuery.queryTitle : !searchQuery.queryId || !isSearchAvailable}
            />
          </div>
          {isSearchModeToggleVisible && <button
            className="SearchModeToggleButton"
            onClick={() => setTitleIdSearchToggle(prev => prev === "byTitle" ? "byId" : "byTitle")}
            onMouseDown={(event) => event.preventDefault()}
            tabIndex={-1}
            disabled={!isSearchAvailable}
          >
            <img src={require('@images/ToggleArrows.png')} alt="Toggle button" />
            <label>{titleIdSearchToggle === "byTitle" ? 'Title' : 'ID'}</label>
          </button>}
        </div>
        {isFilterPanelToggleVisible && <button
          className={`FilterPanelToggle ${filterPanelToggle ? 'active' : ''}`}
          onClick={() => setFilterPanelToggle(prev => !prev)}
          disabled={!isSearchAvailable}
        >
          <img src={require('@images/SearchFilterSettingsIcon.png')} alt="FilterTool" />
        </button>}
      </div>
      <CollapsibleWrapper isOpen={filterPanelToggle}>
        <div className='FilterPanel'>
          <div className="FilterItem">
            <p>Category</p>
            <div className="CategoryOptions">
              <select
                className="Selector"
                onChange={(event) => {
                  const value = event.target.value;
                  const selected = value === 'selectable'
                    ? { value: 'selectable', label: '[ selectable ]' }
                    : selectOptions.find(option => option.value === value) || null;
                  setSelectedOption(selected);
                }}
                value={selectedOption?.value || ''}
              >
                {selectOptions.map((option, index) => (
                  <option key={index} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </option>
                ))}
              </select>
              {selectedOption && selectedOption.value === 'selectable' && (
                <div className="OptionsList">
                  <hr className="Separator" />
                  {selectOptions &&
                    selectOptions
                      .filter(option =>
                        option.value !== 'all' &&
                        option.value !== 'selectable' &&
                        option.disabled === false
                      )
                      .map((option, index) => (
                        <div key={index}>
                          <input type="checkbox" />
                          <label>{option.label}</label>
                        </div>
                      ))
                  }
                </div>
              )}
            </div>
          </div>
          <button
            className="ResetFilter"
            onClick={() => setSelectedOption(selectOptions[0])}
            disabled={!isFilterActive}
          >Reset</button>
        </div>
      </CollapsibleWrapper>
    </div>
  )
}

export default ObjectsSearcher;