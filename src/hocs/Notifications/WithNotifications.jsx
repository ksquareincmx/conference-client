import React from "react";
import { ToastConsumer } from "react-toast-notifications";

export function withNotifications(Component) {
  return function WrappedComponent(props) {
    return (
      <ToastConsumer>
        {toasts => {
          const { add } = toasts;
          return <Component notify={add} {...props} />;
        }}
      </ToastConsumer>
    );
  };
}
