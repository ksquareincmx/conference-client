import React, { Component } from "react";
import "./App.css";
import { Routes } from "./Routes";
import { AuthProvider } from "./providers/Auth";

export class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Routes />
      </AuthProvider>
    );
  }
}
