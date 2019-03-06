import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { Login } from "pages/Login";
import { Calendar } from "pages/Calendar";

export const Routes = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Calendar} />
      <Route path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  </Router>
);
