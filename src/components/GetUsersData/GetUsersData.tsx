import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface IUserAccessToken {
  id: string;
}

export const GetCurrentUserId = () => {
  const userAccessToken = localStorage.getItem('AccessToken');
  if (userAccessToken !== null && userAccessToken.length > 0) {
    const accessToken = JSON.parse(userAccessToken);
    const decoded: IUserAccessToken = jwtDecode(accessToken);
    return decoded.id ? decoded.id : null;
  }
};



export function getUserUsernameById(_id = GetCurrentUserId()) {

};

export function getUserEmailById(_id = GetCurrentUserId()) {

};

export function getUserPrivilegesById(_id = GetCurrentUserId()) {

}

export default {};