import React, {useState} from 'react';
export const RootContext = React.createContext();

// provides authentication context for protected routes
export const RootContextProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const defaultContext = {
        authenticated,
        setAuthenticated
    };

  return (
    <RootContext.Provider value={defaultContext}>
      {children}
    </RootContext.Provider>
  );
};