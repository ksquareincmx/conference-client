import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { CalendarPage, Login } from "pages";

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/room/:roomId" component={CalendarPage} />
      <Route path="/login" component={Login} />
      <Route path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  </Router>
);
