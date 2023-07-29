import { Helmet } from "react-helmet";
import { InfoCard_Item } from "../components/elements/GridOfItems/InfoCard_Item";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";

const ItemsPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | Items</title>
            </Helmet>
            <NavBar />
            <main>
                <div>
                    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', display: 'inline-block' }}><div style={{ float: 'left', width: '80%' }}>Предметы</div><div style={{ float: 'right' }}>Сортировать</div></div>
                    <div style={{ textAlign: 'center' }}>
                        <InfoCard_Item />
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        {/*<InfoCard_Item />*/}
                        </div>
                    </div>
            </main>
        </>
    )
}

export { ItemsPage };