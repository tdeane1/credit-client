import React from "react";
import { Route, Switch, useParams, withRouter, location } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import ChangePassword from "./containers/ChangePassword"

 function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route path="/changePassword" />
                <ChangePassword />
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}
export default withRouter(Routes);