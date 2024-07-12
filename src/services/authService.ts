
import { Dispatch } from 'react';
import { UserAction } from '../context/UserContext';
import { API, setAuthToken } from '../api/api';

export const checkAuth = async (dispatch: Dispatch<UserAction>): Promise<boolean> => {
  if (!localStorage.token) {
    return false;
  }

  setAuthToken(localStorage.token);

  try {
    const response = await API.get('check-auth', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });

    console.log("check user success : ", response);
    let payload = response.data.data;
    payload.token = localStorage.token;
    dispatch({
      type: 'USER_SUCCESS',
      payload,
    });
    return true;
  } catch (error) {
    console.log("check user failed : ", error);
    return false;
  }
};
