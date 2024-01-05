import "./SearchFilter.scss"
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState, store} from "../../ReduxStore/store";
import itemService from "../../backend/services/itemService";
import filterTitle from "../../ReduxStore/Reducers/filterTitle";

export function SearchFilter({ data }: { data: any }) {

    const itemsData = useSelector((state: RootState) => state.itemsData);
    const titleSearch = useSelector((state: RootState) => state.filterTitle);

    const [titleIdSearchToggle, setTitleIdSearchToggle] = useState<boolean>(true);

    const [filteredTitleId, setFilteredTitleId] = useState<string>(titleSearch || '');

    const [searchAvailable, setSearchAvailable] = useState<boolean>(false);
    useEffect(() => {
        setSearchAvailable(false);
        if (itemsData) {
            setSearchAvailable(true);
        }
    }, [itemsData]);


    useEffect(() => {
        if (itemsData) {
            if (filteredTitleId && filteredTitleId.length !== 0) {
                store.dispatch({
                    type: 'FILTER_TITLE',
                    payload: filteredTitleId
                })
                const filteredItems = itemsData.filter((item: any) =>
                    item.Title.toLowerCase().startsWith(filteredTitleId.toLowerCase())
                );
                store.dispatch({
                    type: 'FILTERED_ITEMS_DATA',
                    payload: filteredItems
                })
            } else {
                store.dispatch({
                    type: 'FILTER_TITLE',
                    payload: ''
                })
                store.dispatch({
                    type: 'FILTERED_ITEMS_DATA',
                    payload: itemsData
                })
            }
        }
    }, [itemsData, filteredTitleId, titleSearch]);

    const [filterPanel, setFilterPanel] = useState(false)

    // Test
    const [rarityFilter, setRarityFilter] = useState(false)

    return (
        <>
            <div className="SearchToolbar">
                <p>{data.title}</p>
                <div className="SearchFilterElements">
                    <div className="SearchLine">
                        <input disabled={!searchAvailable} type="text" value={filteredTitleId} name="searchLine" onChange={(event) => setFilteredTitleId(event.target.value)} placeholder={`Item ${titleIdSearchToggle? 'title' : 'id'}...`} autoComplete="off"/>
                        <button className="SearchLineBtnClear" style={{scale: filteredTitleId ? '1' : '0'}} onClick={() => setFilteredTitleId('')} />
                    </div>
                    <button disabled={!searchAvailable} onClick={() => setTitleIdSearchToggle(prev => !prev)}>
                        <img src={require('../../images/ToggleArrows.png')} alt="ToggleArrows"/>
                        <label>{!titleIdSearchToggle? 'Title' : 'ID'}</label>
                    </button>
                    <input disabled={!searchAvailable} type="button" onClick={() => setFilterPanel(prev => !prev)} className="FilterTool" />
                </div>
            </div>
            <div className={`SearchFilterPanel ${filterPanel ? "SearchFilterPanelV" : "SearchFilterPanelH"}`}>
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