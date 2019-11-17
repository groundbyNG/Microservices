import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() =>
          localStorage.token ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute;