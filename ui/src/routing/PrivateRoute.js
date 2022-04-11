import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { logIn } from '../routing/routes';

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = true;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: logIn,
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
