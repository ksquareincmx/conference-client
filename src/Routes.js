import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { Calendar, RoomPage, Login } from "pages";

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/room/:roomId" component={RoomPage} />
      <Route path="/login" component={Login} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  </Router>
);
