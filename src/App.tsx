import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { AboutPage } from '@pages/AboutPage';
import { AccountPage } from '@pages/AccountPage';
import { LoginPage } from '@pages/LoginPage';
import { ContentPage } from '@pages/ContentPage';
import { HomePage } from '@pages/HomePage/HomePage';
import { ItemsPage } from '@pages/ItemsPage';
import { NewsPage } from '@pages/NewsPage';
import { NowherePage } from '@pages/NowherePage';
import ObjectInfoPage from '@pages/ObjectInfoPage/ObjectInfoPage';
import { ReceivePage } from '@pages/ReceivePage';
import { TestPage } from '@pages/TESTpage';
import { Spoiler } from '@pages/Teaser';
import { AgreementsPage } from "@pages/AgreementsPage";
import { SingupPage } from "@pages/SignupPage";
import { IntroductionPage } from "@pages/IntroductionPage/IntroductionPage";
import { NewsFeedPage } from '@pages/NewsFeedPage';
import { NewsOverlay } from '@pages/NewsOverlay';
import AuthService from '@services/authService';
import { RootState } from './ReduxStore/store';
import { useSelector } from 'react-redux';
import { AccountManagementPage } from '@pages/service/AccountManagementPage';
import AccountModalWindow from '@components/ModalWindows/AccountModalWindow';
import { IPrivileges } from '@interfaces/IAccounts';
import { FileManagementPage } from '@pages/service/FileManagementPage';
import { FileManagementPage_Avatars } from '@pages/service/FileManagementPage_Avatars';
import ManagementFileModalWindow from '@components/ModalWindows/ManagementFileModalWindow';
import UploadFileModalWindow from '@components/ModalWindows/UploadFileModalWindow';

function App() {
  const navigate = useNavigate();
  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);
  const userPrivileges = useSelector((state: RootState) => state.userPrivileges) as IPrivileges[] | [];
  const location = useLocation();

  useEffect(() => {
    AuthService.isAuth();
  }, [navigate]);

  useEffect(() => {
    if (isAuthorized && (location.pathname.toLowerCase() === '/login' || location.pathname.toLowerCase() === '/signup')) {
      navigate('/Account/Profile');
    }
  }, [navigate, isAuthorized])

  return (
    <Routes>
      <Route path="/" element={<IntroductionPage />} />
      <Route path="/Home" element={<HomePage />} />
      <Route path="/Content" element={<ContentPage />} />
      <Route path="/Content/Items" element={<ItemsPage />} />
      <Route path="/Content/Item/:titleId" element={<ObjectInfoPage />} />
      <Route path="/News" element={<NewsFeedPage />} >
        <Route path=":titleId" element={<NewsOverlay />} />
      </Route>
      <Route path="/Receive" element={<ReceivePage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Signup" element={<SingupPage />} />
      <Route path="/About" element={<AboutPage />} />
      <Route path="/Agreements" element={<AgreementsPage />} />
      <Route path="*" element={<NowherePage />} />
      <Route path="/TEST" element={<TestPage />} />
      <Route path="/📦" element={<Spoiler />} />

      {isAuthorized &&
        <Route path="/Account/Profile" element={<AccountPage />} />
      }

      {isAuthorized
        && ["UserEdit", "UserDeletePreliminarily", "UserDeletePermanently", "UserCreate", "UserPrivilegesManaging", "UserStatusManaging"].some(privilege =>
          userPrivileges?.some(userPrivilege => userPrivilege.Title === privilege)
        )
        && (<Route path="/Service/Account_management" element={<AccountManagementPage />}>
          <Route path=":accountId" element={<AccountModalWindow />} />
        </Route>)}

      {isAuthorized
        && ["AvatarAdd", "AvatarDelete"].some(privilege =>
          userPrivileges?.some(userPrivilege => userPrivilege.Title === privilege)
        )
        && (
          <>
            <Route path="/Service/File_management" element={<FileManagementPage />} />
            <Route path="/Service/File_management/Avatars" element={<FileManagementPage_Avatars />}>
              <Route path="Upload" element={<UploadFileModalWindow />} />
              <Route path=":avatarId" element={<ManagementFileModalWindow />} />
            </Route>
          </>
        )}

    </Routes>
  )
}

export default App;
