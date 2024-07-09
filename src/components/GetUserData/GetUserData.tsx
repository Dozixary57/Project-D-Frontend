import { jwtDecode } from 'jwt-decode';
import { IAccount } from '../../Interfaces/IAccounts';

export const GetCurrentUserAccessTokenString = () => {
  const userAccessToken = localStorage.getItem('AccessToken');
  if (userAccessToken !== null && userAccessToken.length > 0) {
    const accessTokenString = JSON.parse(userAccessToken);
    return accessTokenString;
  } else {
    return null;
  }
};

const GetCurrentUserAccessTokenPayload = () => {
  const accessTokenString = GetCurrentUserAccessTokenString();
  if (accessTokenString) {
    const payload: IAccount = jwtDecode(accessTokenString);
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


export const CurrentUserPrivilege = {
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
  isUserStatusManaging: () => {
    const AccessTokenPayload = GetCurrentUserAccessTokenPayload();
    if (AccessTokenPayload) {
      return AccessTokenPayload.Privileges?.find((privilege) => privilege.Title === 'UserStatusManaging') ? true : false;
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
  isUserDeletePreliminarily: () => {
    const AccessTokenPayload = GetCurrentUserAccessTokenPayload();
    if (AccessTokenPayload) {
      return AccessTokenPayload.Privileges?.find((privilege) => privilege.Title === 'UserDeletePreliminarily') ? true : false;
    } else {
      return false;
    }
  },
  isUserDeletePermanently: () => {
    const AccessTokenPayload = GetCurrentUserAccessTokenPayload();
    if (AccessTokenPayload) {
      return AccessTokenPayload.Privileges?.find((privilege) => privilege.Title === 'UserDeletePermanently') ? true : false;
    } else {
      return false;
    }
  },
  isUserRestore: () => {
    const AccessTokenPayload = GetCurrentUserAccessTokenPayload();
    if (AccessTokenPayload) {
      return AccessTokenPayload.Privileges?.find((privilege) => privilege.Title === 'UserRestore') ? true : false;
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