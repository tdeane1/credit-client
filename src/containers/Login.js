import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, FormGroup, FormControl, FormLabel, Spinner, } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import { useHistory, browserHistory, useParams, withRouter, location } from "react-router-dom";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
//import ChangePassword from "./ChangePassword";
import "./Login.css";
import { updateLanguageServiceSourceFile } from "typescript";


export default function Login() {

    const history = useHistory();
    const { userHasAuthenticated } = useAppContext();
    //const [ context, setContext]  = useAppContext();
    //const [userName, setUserName]= useState("");
    //const { setUserName } = useAppContext();
    const [LoggedInEmail, setLoggedInEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [IsPwdToChange, setIsPwdToChange] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        newPassword: "",
        newPasswordConfirm: ""

    });
    const [IsVerified, setIsVerified] = useState(false);


    function validateNewPasswordForm() {
        //console.log("validateNewPasswordForm");
        return (
            fields.newPassword.length > 0 && fields.newPasswordConfirm.length > 0 &&
            fields.newPassword === fields.newPasswordConfirm
        );
    }

    function validateLoginForm() {
        //console.log("validateLoginForm");
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmitLogin(event) {
        console.log("handleSubmitLogin");
        event.preventDefault();
        setIsLoading(true);


        try {
            await Auth.signIn(fields.email, fields.password)
                .then(user => {
                    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        //console.log("new password required")
                        //setUserName(user.attributes.email);
                        setIsLoading(false);
                        setIsPwdToChange(true);
                    }
                    else {
                        setIsLoading(false);
                        setLoggedInEmail(user.attributes.email)
                        //setUserName(user.attributes.email);
                        console.log("in userauthenticated");
                        console.log(user.attributes.email);
                        console.log(user.attributes.email_verified);
                        userHasAuthenticated(true);
                        if (user.attributes.email_verified === true) { setIsVerified(true) }
                        else {
                            history.push("/");
                        }
                    }
                });
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }
    async function handleSubmitPasswordChange(event) {
        event.preventDefault();
        setIsLoading(true);
        console.log("In handleSubmitPasswordChange");
        //setIsPwdToChange(false);
        try {
            await Auth.signIn(fields.email, fields.password)
                .then(user => {
                    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                        try {
                            Auth.completeNewPassword(
                                user,               // the Cognito User Object
                                fields.newPassword       // the new password

                            ).then(user => {
                                //user is logged in
                                setIsLoading(false);
                                console.log(user);
                                history.push("/")
                            });
                            alert("New Password Change Not Successful")
                            setIsLoading(false);
                            setIsPwdToChange(true);
                        }
                        catch (e) {
                            setIsLoading(false);
                            onError(e);
                        }

                    } else {
                        setIsLoading(false);


                    }
                });
        }

        catch (e) {
            setIsLoading(false);
            onError(e);
        }
    }



    function renderConfirmPassword() {
        console.log("In renderConfirmPassword");

        return (
            <form onSubmit={handleSubmitPasswordChange}>

                <FormGroup controlId="newPassword" >
                    <FormLabel>New Password</FormLabel>
                    <FormControl
                        autoFocus
                        type="password"
                        value={fields.newPassword}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="newPasswordConfirm" >
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl
                        type="password"
                        value={fields.newPasswordConfirm}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <Button block disabled={!validateNewPasswordForm()} type="submit">
                    ChangePassword
                </Button>


            </form>
        );
    }
    function renderLoginOnly() {

        return (

            <form onSubmit={handleSubmitLogin}>

                <FormGroup controlId="email" >
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                        size="sm"
                    />
                </FormGroup>
                <FormGroup controlId="password" >
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                        size="sm"
                    />
                </FormGroup>
                <nav className="nav">
                    <a className="nav-link active" href="/login/reset">Forgot password?</a>
                </nav>
                <Button block disabled={!validateLoginForm()} type="submit">
                    Login
                </Button>
                {isLoading ? <>
                <Button variant="primary"  disabled visible="False">
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    <span className="sr-only">Loading...</span>
                    Loading...
                </Button>
                  </> :<></>}    


            </form>
        );
    }


    return (
        <div className="Login">
            {IsPwdToChange ? renderConfirmPassword() : renderLoginOnly()}
        </div>
    );
}
