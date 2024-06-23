import { jwtDecode } from 'jwt-decode';
import { IAccount } from '../../Interfaces/IAccounts';

const GetCurrentUserAccessTokenPayload = () => {
  const userAccessToken = localStorage.getItem('AccessToken');
  if (userAccessToken !== null && userAccessToken.length > 0) {
    const accessToken = JSON.parse(userAccessToken);
    const payload: IAccount = jwtDecode(accessToken);
    return payload;
  } else {
    return null;
  }
}


export const GetCurrentUserId = () => {
  const AccessTokenPayload = GetCurrentUserAccessTokenPayload();
  if (AccessTokenPayload) {
    return AccessTokenPayload._id ? AccessTokenPayload._id : null;
  }
};


export const CheckCurrentUserPrivilege = {
  isObjectEdit: () => {
    const AccessTokenPayload = GetCurrentUserAccessTokenPayload();
    if (AccessTokenPayload) {
      return AccessTokenPayload.Privileges?.find((privilege) => privilege.Title === 'ObjectEdit') ? true : false;
    } else {
      return false;
    }
  },
  isUserPrivilegesManaging: () => {
    const AccessTokenPayload = GetCurrentUserAccessTokenPayload();
    if (AccessTokenPayload) {
      return AccessTokenPayload.Privileges?.find((privilege) => privilege.Title === 'UserPrivilegesManaging') ? true : false;
    } else {
      return false;
    }
  },
  isUserEdit: () => {
    const AccessTokenPayload = GetCurrentUserAccessTokenPayload();
    if (AccessTokenPayload) {
      return AccessTokenPayload.Privileges?.find((privilege) => privilege.Title === 'UserEdit') ? true : false;
    } else {
      return false;
    }
  },
  isUserDelete: () => {
    const AccessTokenPayload = GetCurrentUserAccessTokenPayload();
    if (AccessTokenPayload) {
      return AccessTokenPayload.Privileges?.find((privilege) => privilege.Title === 'UserDelete') ? true : false;
    } else {
      return false;
    }
  },
  isUserCreate: () => {
    const AccessTokenPayload = GetCurrentUserAccessTokenPayload();
    if (AccessTokenPayload) {
      return AccessTokenPayload.Privileges?.find((privilege) => privilege.Title === 'UserCreate') ? true : false;
    } else {
      return false;
    }
  }
};