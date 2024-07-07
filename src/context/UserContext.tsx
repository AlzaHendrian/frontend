import React, { createContext, useReducer, ReactNode, Dispatch, useEffect } from 'react';

// Define the UserState interface
export interface UserState {
  isLogin: boolean;
  user: Record<string, any>;
}

// Define the UserAction interface
export interface UserAction {
  type: 'USER_SUCCESS' | 'LOGIN_SUCCESS' | 'AUTH_ERROR' | 'LOGOUT';
  payload?: any;
}

// Create the UserContext
export const UserContext = createContext<[UserState, Dispatch<UserAction>] | undefined>(undefined);

// Initial state
const initialState: UserState = {
  isLogin: false,
  user: {},
}

// Reducer function to handle state changes
const reducer = (state: UserState, action: UserAction): UserState => {
  const { type, payload } = action;

  switch (type) {
    case 'USER_SUCCESS':
    case 'LOGIN_SUCCESS':
      // Set localstorage item with key "token"
      localStorage.setItem("token", payload.token);

      return {
        isLogin: true,
        user: payload,
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      // Remove localstorage item with key "token"
      localStorage.removeItem("token");

      return {
        isLogin: false,
        user: {},
      };
    default:
      throw new Error('Unhandled action type');
  }
}

// Define the UserContextProvider props
interface UserContextProviderProps {
  children: ReactNode;
}

// UserContextProvider component
export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(state, "<<< state di context");
  }, [state]);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
}
