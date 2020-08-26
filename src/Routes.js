import React from "react";
import { Route, Switch, useParams, withRouter, location } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import ChangePassword from "./containers/ChangePassword"
import ResetPassword from "./containers/ResetPassword"
import VerifyEmail from "./containers/VerifyEmail"

function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route path="/changePassword" >
                <ChangePassword />
            </Route>
            <Route exact path="/login/reset">
                <ResetPassword />
            </Route>
            <Route exact path="/verifyEmail">
                <VerifyEmail />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}
export default withRouter(Routes);