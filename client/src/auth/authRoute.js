import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RootContext } from './rootContextProvider';

export const AuthenticatedRoute = ({ component:Component, ...props }) => {
    // get auth context from root provider
    const { authenticated } = useContext(RootContext);
    return (
        // return route if authenticated and redirect otherwise
        <Route
        {...props}
        render={() => (authenticated ? 
            <Component/> : 
            <Redirect to='/login' />)
        }
        />
    );
};