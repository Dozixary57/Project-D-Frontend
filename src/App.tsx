import React from 'react';
import { Route, Routes } from 'react-router';
import { AboutMePage } from './pages/AboutMePage';
import { AboutPage } from './pages/AboutPage';
import { AccountPage } from './pages/AccountPage';
import { LoginPage } from './pages/LoginPage';
import { CreaturesPage } from './pages/CreaturesPage';
import { ContentPage } from './pages/ContentPage';
import { HomePage } from './pages/HomePage';
import { ItemsPage } from './pages/ItemsPage';
import { LocationsPage } from './pages/LocationsPage';
import { NewsPage } from './pages/NewsPage';
import { NowherePage } from './pages/NowherePage';
import { ItemInfoPage } from './pages/ItemInfoPage';
import { ReceivePage } from './pages/ReceivePage';
import { TestPage } from './pages/TESTpage';
import { Spoiler } from './pages/Teaser';
import { AgreementsPage } from "./pages/AgreementsPage";
import { SingupPage } from "./pages/SignupPage";
import { IntroductionPage } from "./pages/IntroductionPage";
import { NewsFeedPage } from './pages/NewsFeedPage';

function App() {
        return (
                <Routes>
                        <Route path="/" element={<IntroductionPage />} />
                        <Route path="/Home" element={<HomePage />} />
                        <Route path="/Content" element={<ContentPage />} />
                        <Route path="/Content/Items" element={<ItemsPage />} />
                        <Route path="/Content/Item/:titleId" element={<ItemInfoPage />} />
                        <Route path="/Content/Creatures" element={<CreaturesPage />} />
                        <Route path="/Content/Locations" element={<LocationsPage />} />
                        <Route path="/News_Feed" element={<NewsFeedPage />} />
                        <Route path="/Receive" element={<ReceivePage />} />
                        <Route path="/Login" element={<LoginPage />} />
                        <Route path="/Signup" element={<SingupPage />} />
                        <Route path="/Account" element={<AccountPage />} />
                        <Route path="/About" element={<AboutPage />} />
                        <Route path="/About_Me" element={<AboutMePage />} />
                        <Route path="/Agreements" element={<AgreementsPage />} />
                        <Route path="*" element={<NowherePage />} />
                        <Route path="/TEST" element={<TestPage />} />
                        <Route path="/📦" element={<Spoiler />} />
                </Routes>
        )
}

export default App;
