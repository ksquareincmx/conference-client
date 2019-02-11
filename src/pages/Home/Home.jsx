import React, { Component } from "react";

class HomePageLogic extends Component {
  render() {
    return (
      <div className="home-page">
        <h2>Home</h2>
      </div>
    );
  }
}

// This you can define the use of providers
function HomePage() {
  return <HomePageLogic />;
}

export default HomePage;
