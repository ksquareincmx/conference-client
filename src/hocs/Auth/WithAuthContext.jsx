import React from "react";
import { AuthConsumer } from "providers/Auth/Auth";

// Change the prop name for authContext
export function withAuthContext(Component) {
  return function wrappedComponent(props) {
    return (
      <AuthConsumer>
        {auth => <Component context={auth} {...props} />}
      </AuthConsumer>
    );
  };
}
