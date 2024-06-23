import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { IAccount } from '../Interfaces/IAccounts';

export function Username() {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    function handleTokenChange() {
      const token = localStorage.getItem('AccessToken');
      if (token) {
        const decoded: IAccount = jwtDecode(token);
        setUsername(decoded?.Username);
      }
    }

    window.addEventListener('storage', handleTokenChange);

    handleTokenChange();

    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, []);

  return (
    <>{username}</>
  );
}

export function NavUsername() {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    function handleTokenChange() {
      const token = localStorage.getItem('AccessToken');
      if (token) {
        const decoded: IAccount = jwtDecode(token);
        setUsername(decoded?.Username);
      }
    }

    window.addEventListener('storage', handleTokenChange);

    handleTokenChange();

    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, []);

  const displayUsername = username?.length > 9 ? `${username.slice(0, 8)}...` : username;

  return (
    <>{displayUsername}</>
  );
}