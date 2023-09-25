import { Helmet } from "react-helmet";
import { InfoCard_Item } from "../components/elements/GridOfItems/InfoCard_Item";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";
import "./ItemsPage.scss"
import {SearchFilter} from "../components/SearchFilter/SearchFilter";

const ItemsPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | Items</title>
            </Helmet>
            <NavBar />
            <main className="ItemPageMain">
                <SearchFilter />
                {/*<div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', display: 'inline-block' }}><div style={{ float: 'left', width: '80%' }}>Предметы</div><div style={{ float: 'right' }}>Сортировать</div></div>*/}
                <div className="GridOfItems">
                    <InfoCard_Item />
                </div>

            </main>
        </>
    )
}

export { ItemsPage };