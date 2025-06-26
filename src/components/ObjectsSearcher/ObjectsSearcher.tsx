import { useEffect, useState } from "react";
import CollapsibleWrapper from "@utilities/CollapsibleWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@ReduxStore/store";
import { IObjectsCountList } from "@interfaces/IObjectsData";
import { setFilterByCategory, setFilterParamsList, setObjectsData } from "@ReduxStore/Reducers/filtering/objectsFilteredResult";
import { useTranslation } from "react-i18next";
import { selectFilteredObjects, selectIsFiltered } from "@ReduxStore/Reducers/filtering/selectFilteredObjects";
import ObjectsService from "@services/ObjectsService";
import "./ObjectsSearcher.scss"

const ObjectsSearcher = ({
  Title = 'Search',
  Available = false,

  FilterPanelOpen = false,
  TitleVisible = true,
  SearchModeToggleVisible = false,
  FilterPanelToggleVisible = false,
}: {
  Title?: string,
  Available?: boolean,

  FilterPanelOpen?: boolean,
  TitleVisible?: boolean,
  SearchModeToggleVisible?: boolean,
  FilterPanelToggleVisible?: boolean
}) => {
  // Search Availability & Filter Panel Toggle
  const [isSearchAvailable, setIsSearchAvailable] = useState(Available);
  const [filterPanelToggle, setFilterPanelToggle] = useState(FilterPanelOpen);

  const [isTitleVisible] = useState<Readonly<boolean>>(TitleVisible);
  const [isFilterPanelToggleVisible] = useState<Readonly<boolean>>(FilterPanelToggleVisible);

  const objectsCountList = useSelector((state: RootState) => state.objectsCountList);

  useEffect(() => {
    setIsSearchAvailable(objectsCountList && Object.keys(objectsCountList).length > 0);
  }, [objectsCountList]);

  return (
    <div className="OBJECTS_SEARCHER">
      <div className="SearchPanel">
        {isTitleVisible && <div className="SearchHeader">
          <h3 className="SearchTitle">{Title}</h3>
          <hr className="Separator" />
        </div>}

        <SearchLine SearchAvailable={isSearchAvailable} SearchModeToggleVisible={SearchModeToggleVisible} />

        {isFilterPanelToggleVisible && <button
          className={`FilterPanelToggle ${filterPanelToggle ? 'active' : ''}`}
          onClick={() => setFilterPanelToggle(prev => !prev)}
          disabled={!isSearchAvailable}
        >
          <img src={require('@images/SearchFilterSettingsIcon.png')} alt="FilterTool" />
        </button>}
      </div>
      {isFilterPanelToggleVisible && <FilterPanel FilterPanelOpen={filterPanelToggle} />}
    </div>
  )
}

export default ObjectsSearcher;

const SearchLine = ({ SearchAvailable, SearchModeToggleVisible }: { SearchAvailable: Readonly<boolean>, SearchModeToggleVisible?: Readonly<boolean> }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isSearchAvailable, setIsSearchAvailable] = useState<boolean>(SearchAvailable ?? false);
  useEffect(() => { setIsSearchAvailable(SearchAvailable ?? false) }, [SearchAvailable]);

  // Search Query
  const [searchQuery, setSearchQuery] = useState<{ queryId: string, queryTitle: string }>({ queryId: '', queryTitle: '' });

  // Search Mode Toggle Visible
  const [isSearchModeToggleVisible] = useState<Readonly<boolean>>(SearchModeToggleVisible ?? false);
  // Search Mode Toggle
  const [byTitleIdSearchToggle, setByTitleIdSearchToggle] = useState<"byTitle" | "byId">("byTitle");

  useEffect(() => {
    const hasParams = !!(searchQuery.queryId || searchQuery.queryTitle);

    if (hasParams) {
      const filterParams: { ID?: string; Title?: string } = {};

      if (byTitleIdSearchToggle === "byId" && searchQuery.queryId) {
        filterParams.ID = searchQuery.queryId;
      }

      if (byTitleIdSearchToggle === "byTitle" && searchQuery.queryTitle) {
        filterParams.Title = searchQuery.queryTitle;
      }

      ObjectsService.getObjectsByCriteria(filterParams);

      dispatch(setFilterParamsList(filterParams));
    } else {
      dispatch(setFilterParamsList(null));
    }
  }, [searchQuery, byTitleIdSearchToggle]);

  return (
    <div className="SEARCH_LINE_WITH_MODE">
      <div className="SearchLineContainer">
        <input
          type={byTitleIdSearchToggle === "byTitle" ? "text" : "number"}
          value={byTitleIdSearchToggle === "byTitle" ? searchQuery.queryTitle : searchQuery.queryId}
          className="SearchLine"
          onChange={(event) => setSearchQuery(prev => ({ ...prev, [byTitleIdSearchToggle === "byTitle" ? 'queryTitle' : 'queryId']: event.target.value }))}
          onKeyDown={
            byTitleIdSearchToggle === "byId"
              ? (event) => {
                const invalidChars = ['e', 'E', '+', '-', '.', ',', ' '];
                if (invalidChars.includes(event.key)) {
                  event.preventDefault();
                }
              }
              : undefined
          }
          placeholder={`${t('searchComponent.searchPlaceholder.general')} ${byTitleIdSearchToggle === "byTitle" ? t('searchComponent.searchPlaceholder.title') : t('searchComponent.searchPlaceholder.id')}`}
          disabled={!isSearchAvailable}
          autoComplete="off"
        />
        <button
          onClick={() => byTitleIdSearchToggle === "byTitle" ? setSearchQuery(prev => ({ ...prev, queryTitle: '' })) : setSearchQuery(prev => ({ ...prev, queryId: '' }))}
          onMouseDown={(event) => event.preventDefault()}
          tabIndex={-1}
          disabled={byTitleIdSearchToggle === "byTitle" ? !searchQuery.queryTitle : !searchQuery.queryId || !isSearchAvailable}
        />
      </div>
      {isSearchModeToggleVisible && <button
        className="SearchModeToggleButton"
        onClick={() => setByTitleIdSearchToggle(prev => prev === "byTitle" ? "byId" : "byTitle")}
        onMouseDown={(event) => event.preventDefault()}
        tabIndex={-1}
        disabled={!isSearchAvailable}
      >
        <img src={require('@images/ToggleArrows.png')} alt="Toggle button" />
        <label>{byTitleIdSearchToggle === "byTitle" ? 'Title' : 'ID'}</label>
      </button>}
    </div>
  )
}

const FilterPanel = ({ FilterPanelOpen }: { FilterPanelOpen: boolean }) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(FilterPanelOpen);
  useEffect(() => {
    setIsFilterPanelOpen(FilterPanelOpen);
  }, [FilterPanelOpen])

  const isFilterApplied = useSelector(selectIsFiltered);

  // Category filter item
  const [selectOptions, setSelectOptions] = useState<{ value: string, label: string, disabled: boolean }[]>([{ value: 'all', label: 'All', disabled: true }]);
  const [selectedOption, setSelectedOption] = useState<{ value: string, label: string } | null>(selectOptions[0]);

  return (
    <CollapsibleWrapper isOpen={isFilterPanelOpen}>
      <div className="FILTER_PANEL">
        <FilteringByCategory {...{ selectOptions, setSelectOptions, selectedOption, setSelectedOption }} />
        <button
          className="ResetFilter"
          onClick={() => setSelectedOption(selectOptions[0])}
          disabled={!isFilterApplied}
        >Reset</button>
      </div>
    </CollapsibleWrapper>
  )
}

const FilteringByCategory = ({
  selectOptions,
  setSelectOptions,
  selectedOption,
  setSelectedOption
}: {
  selectOptions: { value: string, label: string, disabled: boolean }[];
  setSelectOptions: React.Dispatch<React.SetStateAction<{ value: string, label: string, disabled: boolean }[]>>;
  selectedOption: { value: string, label: string } | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<{ value: string, label: string } | null>>;
}) => {
  const dispatch = useDispatch();
  const objectsCountList = useSelector((state: RootState) => state.objectsCountList);
  const filteredObjects = useSelector(selectFilteredObjects);
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);

  useEffect(() => {
    const options = [{ value: 'all', label: 'All', disabled: false }];

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
  }, [objectsCountList]);

  useEffect(() => {
    const selectedValue = selectedOption?.value;
    let categoriesToCheck: string[] = [];

    if (selectedValue === 'selectable') {
      if (checkedCategories.length === 0) {
        dispatch(setFilterByCategory([]));
      } else {
        dispatch(setFilterByCategory(checkedCategories));
        categoriesToCheck = checkedCategories;
      }
    } else if (selectedValue && selectedValue !== 'all') {
      dispatch(setFilterByCategory([selectedValue]));
      categoriesToCheck = [selectedValue];
    } else {
      dispatch(setFilterByCategory([]));
    }

    categoriesToCheck.forEach((category) => {
      const existing = filteredObjects?.[category];
      if (!existing || existing.length === 0) {
        ObjectsService.getObjectsByCategory(category as keyof IObjectsCountList);
      }
    });
  }, [selectedOption, checkedCategories]);

  const toggleCheckbox = (value: string) => {
    setCheckedCategories(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="FILTER_ITEM">
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
            setCheckedCategories([]); // сбрасываем чекбоксы при смене выбора
          }}
          value={selectedOption?.value || ''}
        >
          {selectOptions.map((option, index) => (
            <option key={index} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        {selectedOption?.value === 'selectable' && (
          <div className="OptionsList">
            <hr className="Separator" />
            {selectOptions
              .filter(option =>
                option.value !== 'all' &&
                option.value !== 'selectable' &&
                option.disabled === false
              )
              .map((option, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={`checkbox-${option.value}`}
                    checked={checkedCategories.includes(option.value)}
                    onChange={() => toggleCheckbox(option.value)}
                  />
                  <label htmlFor={`checkbox-${option.value}`}>{option.label}</label>
                </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
};