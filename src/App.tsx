import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { AccountPage } from '@pages/AccountPage/AccountPage';
import { LoginPage } from '@pages/AuthPages/LoginPage';
import { SignupPage } from "@pages/AuthPages/SignupPage";
import HomePage from '@pages/HomePage/HomePage';
import { NowherePage } from '@pages/NowherePage/NowherePage';
import ObjectInfoPage from '@pages/ObjectInfoPage/ObjectInfoPage';
import { AgreementsPage } from "@pages/AgreementsPage/AgreementsPage";
import NewsPage from '@pages/NewsPage/NewsPage';
import NewsModalComponent from '@pages/NewsPage/elements/NewsModalComponent';
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
import ReceivePage from '@pages/ReceivePage/ReceivePage';
import OverviewPage from '@pages/OverviewPage/OverviewPage';
import MainLayout from 'layouts/MainLayout';
import AuthLayout from 'layouts/AuthLayout';
import { ProjectVisionPage } from '@pages/VisionPage/ProjectVisionPage';
import ListComponent from 'layouts/inner/ListComponent';
import ContentModalWindow from '@components/ModalWindows/ContentModalWindow';
import VisionModalComponent from '@pages/VisionPage/VisionModalComponent/VisionModalComponent';

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
      <Route path="/" element={<OverviewPage />} />

      <Route element={<MainLayout />}>

        <Route path="/Home" element={<HomePage />} />

        <Route path="/Vision" element={
          <ListComponent>
            <ProjectVisionPage />
          </ListComponent>
        }>
          <Route path=":titleId" element={
            <ContentModalWindow>
              <VisionModalComponent />
            </ContentModalWindow>
          } />
        </Route>

        <Route path="/News" element={
          <ListComponent>
            <NewsPage />
          </ListComponent>
        } >
          <Route path=":titleId" element={
            <ContentModalWindow>
              <NewsModalComponent />
            </ContentModalWindow>
          } />
        </Route>

      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Signup" element={<SignupPage />} />
      </Route>


      <Route path="/Content" element={<ObjectsHubPage />} />
      <Route path="/Content/Items" element={<ObjectsListPage />} />
      <Route path="/Content/Items/:titleId" element={<ObjectInfoPage />} />
      <Route path="/Receive" element={<ReceivePage />} />
      <Route path="/Agreements" element={<AgreementsPage />} />
      <Route path="*" element={<NowherePage />} />

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
