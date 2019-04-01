import React from "react";

export const Event = props => {
  const { content } = props;
  return (
    <span>
      <strong>{content}</strong>
    </span>
  );
};
