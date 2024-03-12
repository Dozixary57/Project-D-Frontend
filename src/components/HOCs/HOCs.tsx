import React, { ComponentType, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../backend/services/authService';
import { useCookies } from 'react-cookie';

export function withAuthCheck(Component: ComponentType<any>, to = '/login') {
  return function(props: any) {
    // const [cookie] = useCookies(['UniqueDeviceIdentifier']);

    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const navigate = useNavigate();

    const checkAuth = async () => {
      const auth = await authService.isAuth();
      setIsAuth(auth);
    };

    useEffect(() => {
      checkAuth();
    }, []);

    // useEffect(() => {
    //   checkAuth();
    // }, [cookie['UniqueDeviceIdentifier']]);

    useEffect(() => {
      if (isAuth === false) {
        authService.Logout();
        navigate(to);
      }
    }, [isAuth, navigate]);

    if (isAuth === null) {
      return <div>Загрузка...</div>; // Или любой другой компонент загрузки.
    } else if (isAuth) {
      return <Component {...props} />;
    } else {
      return null;
    }

  };
}