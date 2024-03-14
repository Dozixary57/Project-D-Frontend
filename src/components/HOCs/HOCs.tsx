import React, { ComponentType, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../backend/services/authService';
import { useCookies } from 'react-cookie';

export function withAuthCheck(Component: ComponentType<any>, routeType: 'private' | 'public', to = '/login') {
  return function AuthCheck(props: any) {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const navigate = useNavigate();

    const checkAuth = async () => {
      if (routeType === 'private') {
        const auth = await authService.isAuth();
        setIsAuth(auth);
      }
    };

    useEffect(() => {
      checkAuth();
    }, []);

    useEffect(() => {
      if (routeType === 'private' && isAuth === false) {
        authService.Logout();
        navigate(to);
      }
    }, [isAuth, navigate]);

    if (routeType === 'private' && isAuth === null) {
      return <div>Загрузка...</div>; // Или любой другой компонент загрузки.
    } else if (routeType === 'private' && isAuth) {
      return <Component {...props} />;
    } else if (routeType === 'public') {
      return <Component {...props} />;
    } else {
      return null;
    }
  };
}