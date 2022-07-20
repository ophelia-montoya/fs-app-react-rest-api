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
          
          // checks if authenticatedUser is in state... 
          render={(props) =>
            context.authenticatedUser ? (

              // change props from  string to an object containing data re: route...
              <Component {...props} />
            ) : (

              // ...to redirect to '/signin' if no authenticatedUser in state
              <Redirect to={{
                  pathname: "/signin",

                  // if authenticated, redirect to route user tried to access
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