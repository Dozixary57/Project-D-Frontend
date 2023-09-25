import "./SearchFilter.scss"
import {useState} from "react";

export function SearchFilter() {

    const [viewPanel, setViewPanel] = useState(false)
    const [filterPanel, setFilterPanel] = useState(false)

    const [activeView, setActiveView] = useState("Grid")

    const [activePartition, setActivePartition] = useState(true)

    // Test
    const [rarityFilter, setRarityFilter] = useState(false)

    return (
        <>
            <div className="SearchFilter">
                <p>Items</p>
                <div className="SearchFilterTools">
                    <input type="text" name="searchLine" placeholder="Item title..." autoComplete="off"/>
                    <input type="button" onClick={() => setFilterPanel(prev => !prev)} className="FilterTool" />
                    <input type="button" onClick={() => setViewPanel(prev => !prev)} className="ViewTool"/>
                </div>
            </div>
            <div className={`SearchViewPanel ${viewPanel ? "SearchViewPanelV" : "SearchViewPanelH"}`}>
                <input type="button" onClick={() => setActiveView("Grid")} className="GridView"/>
                <input type="button" onClick={() => setActiveView("List")} className="ListView"/>

                <hr  style={{margin: "0", boxShadow: "0 0 0 0.2em #AAA inset", height: "2em"}} />

                <input type="button" onClick={() => setActivePartition(prev => !prev)} className={activePartition ? "PartitionOn" : "PartitionOff"}/>
            </div>
            <div className={`SearchFilterPanel ${filterPanel ? "SearchFilterPanelV" : "SearchFilterPanelH"}`}>
                <div className="FilterContainer">
                    <div className="FilterMenu">
                        <ul>
                            <li><input type="button" onClick={() => setRarityFilter(prev => !prev)} className={rarityFilter ? "FilterOn" : "FilterOff"}/> Rarity</li>
                            <li><input type="button" onClick={() => setRarityFilter(prev => !prev)} className={rarityFilter ? "FilterOn" : "FilterOff"}/> Rarity</li>
                        </ul>
                        <input type="button" value="Reset" className="filtersReset"/>
                    </div>
                    <hr />
                    <div className="FilterValue">

                    </div>
                </div>
            </div>
        </>
    )
}