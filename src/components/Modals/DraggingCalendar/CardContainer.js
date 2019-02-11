import React from "react";
import { getCardStyles } from "./Styles";

function CardContainer(props) {
  const styles = getCardStyles(props.coordinates);
  return <div style={styles.cardContainer}>{props.children}</div>;
}

export default CardContainer;
