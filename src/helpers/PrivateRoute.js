import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      rest.auth && !rest.auth(rest.path)
        ? <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        : <Component {...props} />
    )}
  />
);

export default PrivateRoute;
