import React from "react";
import "./App.css";
import { Routes } from "./Routes";
import { AuthProvider } from "providers";
import Konami from "react-konami";

export class App extends React.Component {
  easterEgg = () => {
    alert(
      "What? How you do this? This is going to drop the production database!"
    );
  };

  render() {
    return (
      <AuthProvider>
        <Routes />
        <Konami easterEgg={this.easterEgg} />
      </AuthProvider>
    );
  }
}
