import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "./Context";


// Destructures component prop in function parameters
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (

    // Route component subscribed to all actions/data provided by Context.js
    <Consumer>
      {(context) => (
        <Route
          {...rest}
          render={(props) =>
            context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                  pathname: "/signin",
                  state: { from: props.location },
                }} />
            )
          }
        />
      )}
    </Consumer>
  );
};


export default PrivateRoute;