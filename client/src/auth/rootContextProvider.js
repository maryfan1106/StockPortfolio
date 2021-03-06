import { authReducer, SET_AUTH, REMOVE_AUTH } from './reducers';
import React, { useReducer} from 'react';
import Cookies from "js-cookie";
export const RootContext = React.createContext();

// provides authentication context for protected routes
export const RootContextProvider = ({ children }) => {
    // check for token each time user goes to protected route
    const prevAuth = Cookies.get("token")!=null;
    const [authenticatedState, dispatch] = useReducer(authReducer, { authenticated: prevAuth });

    const setAuthenticated = () => {
        dispatch({ type: SET_AUTH });
    };

    const removeAuthenticated = () => {
        Cookies.remove("token");
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