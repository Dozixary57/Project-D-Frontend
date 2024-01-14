import "./SearchFilter.scss"
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState, store} from "../../ReduxStore/store";
import itemService from "../../backend/services/itemService";
import searchTitleId from "../../ReduxStore/Reducers/searchTitleId";

export function SearchFilter({ data }: { data: any }) {

    const itemsData = useSelector((state: RootState) => state.itemsData);
    const titleIdSearch = useSelector((state: RootState) => state.searchTitleId);

    const [titleIdSearchToggle, setTitleIdSearchToggle] = useState<boolean>(true);

    const [filteredTitleId, setFilteredTitleId] = useState<string>(titleIdSearch || '');

    const [searchAvailable, setSearchAvailable] = useState<boolean>(false);
    useEffect(() => {
        setSearchAvailable(false);
        if (itemsData && itemsData.length > 0) {
            setSearchAvailable(true);
    
        }
    }, [itemsData]);

    useEffect(() => {
        if (itemsData) {
            if (filteredTitleId && filteredTitleId.length !== 0) {
                store.dispatch({
                    type: 'SEARCH_TITLE_ID',
                    payload: filteredTitleId
                })
                if (titleIdSearchToggle) {
                    const filteredItems = itemsData.filter((item: any) =>
                        item.Title.toLowerCase().startsWith(filteredTitleId.toLowerCase())
                    );
                    store.dispatch({
                        type: 'FILTERED_ITEMS_DATA',
                        payload: filteredItems
                    })
                } else {
                    const filteredItems = itemsData.filter((item: any) =>
                        String(item.ID).toLowerCase().startsWith(filteredTitleId.toLowerCase())
                    );
                    store.dispatch({
                        type: 'FILTERED_ITEMS_DATA',
                        payload: filteredItems
                    })
                }
            } else {
                store.dispatch({
                    type: 'SEARCH_TITLE_ID',
                    payload: ''
                })
                store.dispatch({
                    type: 'FILTERED_ITEMS_DATA',
                    payload: itemsData
                })
            }
        }
    }, [itemsData, filteredTitleId, titleIdSearch, titleIdSearchToggle]);

    const [searchErrMessage, setSearchErrMessage] = useState<string>('');
    useEffect(() => {
        var label = document.getElementById('labelErrMessage');

        if (!titleIdSearchToggle && isNaN(Number(filteredTitleId))) {
            setSearchErrMessage('The value must be a number.')
        } else {
            setSearchErrMessage('');
        }

        if (label) {
            if (searchErrMessage !== '') {
                label.style.opacity = '1';
            } else {
                label.style.opacity = '0';
            }
        }

        console.log(searchErrMessage)

    }, [filteredTitleId, titleIdSearchToggle]);

    const searchFilterPanelRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (searchFilterPanelRef.current) {
          const height = searchFilterPanelRef.current.scrollHeight;
          document.documentElement.style.setProperty('--search-filter-panel-height', `${height}px`);
        //   console.log(height);
        }
    }, []);
    

    const [filterPanel, setFilterPanel] = useState(false)

    // Test
    const [rarityFilter, setRarityFilter] = useState(false)


    return (
        <>
            <div className="SearchToolbar">
                <p>{data.title}</p>
                <div className='SearchFilterElements'>
                    <div className="SearchLine">
                        <input disabled={!searchAvailable} type="text" value={filteredTitleId} name="searchLine" onChange={(event) => setFilteredTitleId(event.target.value)} placeholder={`Item ${titleIdSearchToggle? 'title' : 'id'}...`} autoComplete="off"/>
                        <button className="SearchLineBtnClear" style={{scale: filteredTitleId ? '1' : '0'}} onClick={() => setFilteredTitleId('')} />

                        <label id="labelErrMessage">{searchErrMessage}</label>
                    </div>
                    <button disabled={!searchAvailable} onClick={() => setTitleIdSearchToggle(prev => !prev)}>
                        <img src={require('../../images/ToggleArrows.png')} alt="ToggleArrows"/>
                        <label>{titleIdSearchToggle? 'Title' : 'ID'}</label>
                    </button>
                    <button disabled={!searchAvailable} onClick={() => setFilterPanel(prev => !prev)} className={filterPanel? 'ActiveFilterTool' : 'InactiveFilterTool'}>
                        <img src={require('../../images/SearchFilterSettingsIcon.png')} alt="FilterTool"/>
                    </button>
                </div>
            </div>
            <div className={`SearchFilterPanel ${filterPanel ? "SearchFilterPanelV" : "SearchFilterPanelH"}`} ref={searchFilterPanelRef}>
                <div className="ViewingModesContainer">
                    <p>Viewing Modes</p>
                    <div className="ViewingModesBtns">
                        <button className="" />
                        <button className="" />
                        <button className="" />
                        <button className="" />
                    </div>
                </div>
                <hr/>
                <div className="SearchFilterContainer">
                    <p>Filtering Parameters</p>
                    <div className="FilterMenuContainer">
                        <div className="FilterMenuParameters">
                            <ul>
                                <li><input type="button" onClick={() => setRarityFilter(prev => !prev)} className={rarityFilter ? "FilterOptionOn" : "FilterOptionOff"}/> Rarity</li>
                                <li><input type="button" onClick={() => setRarityFilter(prev => !prev)} className={rarityFilter ? "FilterOptionOn" : "FilterOptionOff"}/> Rarity</li>
                            </ul>
                            <hr />
                            <div className="FilterValue">

                            </div>
                        </div>
                        <input type="button" value="Reset" className="filtersReset"/>
                    </div>
                </div>
            </div>
        </>
    )
}