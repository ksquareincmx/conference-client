import React from "react";
import { AuthConsumer } from "providers/Auth/Auth";

// Cambiar el nombre de la propiedad por authContext
export function withAuthContext(Component) {
  return function WrappedComponent(props) {
    return (
      <AuthConsumer>
        {auth => <Component context={auth} {...props} />}
      </AuthConsumer>
    );
  };
}
