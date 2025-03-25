import { jwtDecode } from 'jwt-decode';
import { IAccount, IPrivileges } from '@interfaces/IAccounts';

export const GetCurrentUserAccessTokenString = (): string | null => {
  const token = localStorage.getItem('AccessToken');
  return token && token.length > 0 ? JSON.parse(token) : null;
};

const GetCurrentUserAccessTokenPayload = (): IAccount | null => {
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