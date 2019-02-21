import React from "react";
import { withAuthContext } from "../../hocs/Auth";

function Home({ context }) {
  return (
    <div className="home-page">
      <h2>Home! Hello ksquarians!</h2>
    </div>
  );
}

export const HomeWithAuthContext = withAuthContext(Home);
