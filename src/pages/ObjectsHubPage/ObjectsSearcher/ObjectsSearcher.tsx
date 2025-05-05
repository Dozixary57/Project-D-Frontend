import { useEffect, useState } from "react";
import "./ObjectsSearcher.scss"
import CollapsibleWrapper from "@utilities/CollapsibleWrapper";
import { useSelector } from "react-redux";
import { RootState } from "@ReduxStore/store";
import { IObjectsCountList } from "@interfaces/IObjectsData";

const ObjectsSearcher = () => {
  const objectsCountList: IObjectsCountList = useSelector((state: RootState) => state.objectsCountList);

  const [searchQuery, setSearchQuery] = useState<{ queryId: string, queryTitle: string }>({
    queryId: '',
    queryTitle: ''
  });
  const [isSearchAvailable, setIsSearchAvailable] = useState(false);
  const [titleIdSearchToggle, setTitleIdSearchToggle] = useState<"byTitle" | "byId">("byTitle");
  const [filterPanelToggle, setFilterPanelToggle] = useState(false);

  const [selectOptions, setSelectOptions] = useState<{ value: string, label: string, disabled: boolean }[]>([{ value: 'none', label: 'None', disabled: true }]);
  const [selectedOption, setSelectedOption] = useState<{ value: string, label: string } | null>(selectOptions[0]);

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
    if (selectedOption?.value === selectOptions[0].value) {
      setIsFilterActive(false);
    } else {
      setIsFilterActive(true);
    }
  }, [selectedOption]);
  const handleResetFilter = () => {
    setSelectedOption(selectOptions[0]);
  };

  return (
    <div className="OBJECTS_SEARCHER">
      <div className="SearchPanel">
        <h3 className="SearchTitle">Search</h3>
        <hr className="Separator" />
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
              placeholder={`Search by ${titleIdSearchToggle === "byTitle" ? ' [ title ]' : ' [ id ]'}`}
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
          <button
            className="SearchModeToggleButton"
            onClick={() => setTitleIdSearchToggle(prev => prev === "byTitle" ? "byId" : "byTitle")}
            onMouseDown={(event) => event.preventDefault()}
            tabIndex={-1}
            disabled={!isSearchAvailable}
          >
            <img src={require('@images/ToggleArrows.png')} alt="Toggle button" />
            <label>{titleIdSearchToggle === "byTitle" ? 'Title' : 'ID'}</label>
          </button>
        </div>


        <button
          className={`FilterPanelToggle ${filterPanelToggle ? 'active' : ''}`}
          onClick={() => setFilterPanelToggle(prev => !prev)}
          disabled={!isSearchAvailable}
        >
          <img src={require('@images/SearchFilterSettingsIcon.png')} alt="FilterTool" />
        </button>
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
            onClick={handleResetFilter}
            disabled={!isFilterActive}
          >Reset</button>
        </div>
      </CollapsibleWrapper>
    </div>
  )
}

export default ObjectsSearcher;