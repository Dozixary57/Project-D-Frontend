﻿import React from 'react';
import { Route, Routes } from 'react-router';
import { AboutMePage } from './pages/AboutMePage';
import { AboutPage } from './pages/AboutPage';
import { AccountPage } from './pages/AccountPage';
import { LoginPage } from './pages/LoginPage';
import { CreaturesPage } from './pages/CreaturesPage';
import { ContentPage } from './pages/ContentPage';
import { HomePage } from './pages/HomePage';
import { ItemsPage } from './pages/ItemsPage';
import { LandingPage } from './pages/LandingPage';
import { LocationsPage } from './pages/LocationsPage';
import { NewsPage } from './pages/NewsPage';
import { NowherePage } from './pages/NowherePage';
import { ObjectInfoPage } from './pages/ObjectInfoPage';
import { ReceivePage } from './pages/ReceivePage';
import { TestPage } from './pages/TESTpage';
import { Spoiler } from './pages/\uD83D\uDCE6';
import {AgreementsPage} from "./pages/AgreementsPage";
import {SingupPage} from "./pages/SignupPage";

function App() {
        return (
                <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/Home" element={<HomePage />} />
                        <Route path="/Content" element={<ContentPage />} />
                        <Route path="/Content/Items" element={<ItemsPage />} />
                        <Route path="/Content/Item/:titleId" element={<ObjectInfoPage />} />
                        <Route path="/Content/Creatures" element={<CreaturesPage />} />
                        <Route path="/Content/Locations" element={<LocationsPage />} />
                        <Route path="/News" element={<NewsPage />} />
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
