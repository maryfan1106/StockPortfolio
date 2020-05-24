import { authReducer, SET_AUTH, REMOVE_AUTH } from './reducers';
import React, { useReducer} from 'react';
export const RootContext = React.createContext();

// provides authentication context for protected routes
export const RootContextProvider = ({ children }) => {
    const [authenticatedState, dispatch] = useReducer(authReducer, { authenticated: false });

    const setAuthenticated = () => {
        setTimeout(() => {
            dispatch({ type: SET_AUTH });
        }, 700);
    };

    const removeAuthenticated = () => {
        setTimeout(() => {
            dispatch({ type: REMOVE_AUTH });
        }, 700);
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