import React from "react";
import WithAuthContext from "../../hocs/Auth";

function Home({ context }) {
  return (
    <div className="home-page">
      <h2>Home! Hello ksquarians XOXO!</h2>
    </div>
  );
}

export default WithAuthContext(Home);
