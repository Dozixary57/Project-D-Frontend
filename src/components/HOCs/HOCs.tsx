import React, { ComponentType, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../backend/services/authService';
import { useSelector } from 'react-redux';
import { RootState } from '../../ReduxStore/store';

export function withAuthCheck(Component: ComponentType<any>) {
  return function AuthCheck(props: any) {
    const navigate = useNavigate();
    const [shouldRender, setShouldRender] = useState(false);

    const isAuthorized = useSelector((state: RootState) => state.isAuthorized);
    const isLoadingState = useSelector((state: RootState) => state.isLoadingState);

    useEffect(() => {
      if (isAuthorized === false) {
        // authService.Logout();
        navigate('/Login');
      } else if (isAuthorized) {
        setShouldRender(true);
      } else {
        navigate('/Home');
      }
    }, [isAuthorized]);

    if (isLoadingState === true) {
      return <div>Загрузка...</div>;
    } else if (shouldRender) {
      return <Component {...props} />;
    } else {
      return null;
    }
  };
}
