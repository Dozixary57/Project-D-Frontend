import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
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
import { NewsOverlay } from './pages/NewsOverlay';
import AuthService from './backend/services/authService';
import { RootState } from './ReduxStore/store';
import { useSelector } from 'react-redux';
import { AccountManagementPage } from './pages/AccountManagementPage';
import AccountModalWindow from './components/ModalWindows/AccountModalWindow';
import { IPrivileges } from './Interfaces/IAccounts';

function App() {
  const [cookies] = useCookies(['UniqueDeviceIdentifier']);
  const navigate = useNavigate();
  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);
  const userPrivileges = useSelector((state: RootState) => state.userPrivileges) as IPrivileges[] | [];
  const location = useLocation();

  useEffect(() => {
    AuthService.isAuth();
  }, [navigate]);

  useEffect(() => {
    if (isAuthorized && (location.pathname.toLowerCase() === '/login' || location.pathname.toLowerCase() === '/signup')) {
      navigate('/Account')
    }
  }, [navigate, isAuthorized])

  useEffect(() => {
    if (!cookies['UniqueDeviceIdentifier']) {
      AuthService.Logout();
    }
  }, [cookies]);

  return (
    <Routes>
      <Route path="/" element={<IntroductionPage />} />
      <Route path="/Home" element={<HomePage />} />
      <Route path="/Content" element={<ContentPage />} />
      <Route path="/Content/Items" element={<ItemsPage />} />
      <Route path="/Content/Item/:titleId" element={<ItemInfoPage />} />
      <Route path="/Content/Creatures" element={<CreaturesPage />} />
      <Route path="/Content/Locations" element={<LocationsPage />} />
      <Route path="/News" element={<NewsFeedPage />} >
        <Route path=":titleId" element={<NewsOverlay />} />
      </Route>
      <Route path="/Receive" element={<ReceivePage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Signup" element={<SingupPage />} />
      <Route path="/Account" element={<AccountPage />} />
      <Route path="/About" element={<AboutPage />} />
      <Route path="/About_me" element={<AboutMePage />} />
      <Route path="/Agreements" element={<AgreementsPage />} />
      <Route path="*" element={<NowherePage />} />
      <Route path="/TEST" element={<TestPage />} />
      <Route path="/📦" element={<Spoiler />} />

      {isAuthorized
      && ["UserEdit", "UserDelete", "UserCreate", "UserPrivilegesManaging"].some(privilege => 
        userPrivileges.some(userPrivilege => userPrivilege.Title === privilege)
      )
      && (<Route path="/Service/Account_management" element={<AccountManagementPage />}>
        <Route path=":accountId" element={<AccountModalWindow />} />
      </Route> )}

    </Routes>
  )
}

export default App;
