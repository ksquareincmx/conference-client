import React from "react";
import "./App.css";
import { Routes } from "./Routes";
import { AuthProvider } from "providers";

export class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <Routes />
      </AuthProvider>
    );
  }
}
