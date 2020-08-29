import React from "react";
import { Route, Switch, useParams, withRouter, location } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import ChangePassword from "./containers/ChangePassword"
import ResetPassword from "./containers/ResetPassword"
import VerifyEmail from "./containers/VerifyEmail"
import AuthenticatedRoute from "./components/AuthenticatedRoutes";
import UnauthenticatedRoute from "./components/UnauthenticatedRoutes";

export default function Routes() {
    return (
        <Switch>
            <AuthenticatedRoute exact path="/">
                <Home />
            </AuthenticatedRoute>
            <UnauthenticatedRoute exact path="/login">
                <Login />
            </UnauthenticatedRoute>
            <AuthenticatedRoute exact path="/changePassword" >
                <ChangePassword />
            </AuthenticatedRoute>
            <UnauthenticatedRoute exact path="/login/reset">
                <ResetPassword />
            </UnauthenticatedRoute>
            <AuthenticatedRoute exact path="/verifyEmail">
                <VerifyEmail />
            </AuthenticatedRoute>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}
