import { jwtDecode } from 'jwt-decode';
import { IAccount, IPrivileges } from '@interfaces/IAccounts';
import { useEffect, useState } from 'react';

export function GetUsername() {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    function handleTokenChange() {
      setUsername(GetCurrentUserAccessTokenPayload()?.Username ?? '');
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

export function GetNavUsername() {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    function handleTokenChange() {
      setUsername(GetCurrentUserAccessTokenPayload()?.Username ?? '');
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
export const GetCurrentUserAccessTokenString = (): string | null => {
  const token = localStorage.getItem('AccessToken');
  return token && token.length > 0 ? JSON.parse(token) : null;
};

export const GetCurrentUserAccessTokenPayload = (): IAccount | null => {
  const tokenString = GetCurrentUserAccessTokenString();
  return tokenString ? jwtDecode<IAccount>(tokenString) : null;
};

const hasPrivilege = (privilegeTitle: string): boolean => {
  const payload = GetCurrentUserAccessTokenPayload();
  return payload?.Privileges?.some((privilege: IPrivileges) => privilege.Title === privilegeTitle) ?? false;
};

export const GetCurrentUserId = (): string | null => {
  const payload = GetCurrentUserAccessTokenPayload();
  return payload?._id ?? null;
};

export const GetCurrentUserPrivileges = {
  isObjectEdit: () => hasPrivilege('ObjectEdit'),
  isUserPrivilegesManaging: () => hasPrivilege('UserPrivilegesManaging'),
  isUserStatusManaging: () => hasPrivilege('UserStatusManaging'),
  isUserEdit: () => hasPrivilege('UserEdit'),
  isUserDeletePreliminarily: () => hasPrivilege('UserDeletePreliminarily'),
  isUserDeletePermanently: () => hasPrivilege('UserDeletePermanently'),
  isUserRestore: () => hasPrivilege('UserRestore'),
  isUserCreate: () => hasPrivilege('UserCreate')
};