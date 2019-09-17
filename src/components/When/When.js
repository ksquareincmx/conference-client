import React from "react";

export const When = ({ children, predicate }) => {
  if (!predicate) {
    return <React.Fragment />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};
