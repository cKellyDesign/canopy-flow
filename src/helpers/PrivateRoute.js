import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { store } from '../index';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('access_token') && store.getState().userInfo
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)