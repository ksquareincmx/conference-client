import React from "react";
import { AuthConsumer } from "providers/AuthProvider";

// Change the prop name for authContext
export function withAuthContext(Component) {
  return function WrappedComponent(props) {
    return (
      <AuthConsumer>
        {auth => <Component authContext={auth} {...props} />}
      </AuthConsumer>
    );
  };
}
