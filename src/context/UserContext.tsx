import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';

export interface UserState {
  isLogin: boolean;
  user: Record<string, any>;
}

export interface UserAction {
  type: 'USER_SUCCESS' | 'LOGIN_SUCCESS' | 'AUTH_ERROR' | 'LOGOUT';
  payload?: any;
}

export const UserContext = createContext<[UserState, Dispatch<UserAction>] | undefined>(undefined);

const initialState: UserState = {
  isLogin: false,
  user: {},
}

const reducer = (state: UserState, action: UserAction): UserState => {
  const { type, payload } = action;

  switch (type) {
    case 'USER_SUCCESS':
    case 'LOGIN_SUCCESS':
      
      // Set localstorage item with key "token"
      localStorage.setItem("token", payload.token)

      return {
        isLogin: true,
        user: payload,
      }
    case 'AUTH_ERROR':
    case 'LOGOUT':

      // Remove localstorage item with key "token" 
      localStorage.removeItem("token")

      return {
        isLogin: false,
        user: {},
      }
    default:
      throw new Error('Unhandled action type');
  }
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
}
