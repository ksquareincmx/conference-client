import React from "react";
import { AuthConsumer } from "providers/Auth/Auth";

export default function WithAuthContext(Component) {
  return function WrappedComponent(props) {
    return (
      <AuthConsumer>
        {auth => <Component context={auth} {...props} />}
      </AuthConsumer>
    );
  };
}
