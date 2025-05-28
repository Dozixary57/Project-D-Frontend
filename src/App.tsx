import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { AccountPage } from '@pages/AccountPage/AccountPage';
import { LoginPage } from '@pages/LoginPage/LoginPage';
import { HomePage } from '@pages/HomePage/HomePage';
import { NowherePage } from '@pages/NowherePage/NowherePage';
import ObjectInfoPage from '@pages/ObjectInfoPage/ObjectInfoPage';
import { ReceivePage } from '@pages/ReceivePage/ReceivePage';
import { AgreementsPage } from "@pages/AgreementsPage/AgreementsPage";
import { SingupPage } from "@pages/SignupPage/SignupPage";
import { IntroductionPage } from "@pages/IntroductionPage/IntroductionPage";
import { NewsFeedPage } from '@pages/NewsFeedPage/NewsFeedPage';
import { NewsOverlay } from '@pages/NewsFeedPage/elements/NewsOverlay';
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
import ObjectsHubPage from '@pages/ObjectsHubPage/ObjectsHubPage';
import ObjectsListPage from '@pages/ObjectsListPage/ObjectsListPage';
import DonationPage from '@pages/DonationPage/DonationPage';

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
      <Route path="/Content" element={<ObjectsHubPage />} />
      <Route path="/Content/Items" element={<ObjectsListPage />} />
      <Route path="/Content/Items/:titleId" element={<ObjectInfoPage />} />
      <Route path="/News" element={<NewsFeedPage />} >
        <Route path=":titleId" element={<NewsOverlay />} />
      </Route>
      <Route path="/Receive" element={<ReceivePage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Signup" element={<SingupPage />} />
      <Route path="/Agreements" element={<AgreementsPage />} />
      <Route path="*" element={<NowherePage />} />

      {isAuthorized &&
        <Route path="/Account/Profile" element={<AccountPage />} />
      }

      <Route path="/Donation" element={<DonationPage />} />

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
