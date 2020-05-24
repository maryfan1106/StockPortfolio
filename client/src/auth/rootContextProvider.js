import { authReducer, SET_AUTH, REMOVE_AUTH } from './reducers';
import React, { useReducer} from 'react';
import Cookies from "js-cookie";
export const RootContext = React.createContext();

// provides authentication context for protected routes
export const RootContextProvider = ({ children }) => {
    console.log(Cookies.get("token"));
    // check for token each time user goes to protected route
    const prevAuth = window.localStorage.getItem('auth') || false;
    const [authenticatedState, dispatch] = useReducer(authReducer, { authenticated: prevAuth });

    const setAuthenticated = () => {
        dispatch({ type: SET_AUTH });
    };

    const removeAuthenticated = () => {
        dispatch({ type: REMOVE_AUTH });
    };
    
    const defaultContext = {
        authenticated: authenticatedState.authenticated,
        setAuthenticated,
        removeAuthenticated
    };

  return (
    <RootContext.Provider value={defaultContext}>
      {children}
    </RootContext.Provider>
  );
};