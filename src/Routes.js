import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Login } from "pages/Login";
import { Home } from "pages/Home";
import { Calendar } from "pages/Calendar";
import { Dashboard } from "pages/Dashboard";

export const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/calendar" component={Calendar} />
    </div>
  </Router>
);
