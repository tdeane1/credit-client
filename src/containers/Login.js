import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, FormGroup, FormControl, FormLabel, NavItem } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
//import changePassword from "./ChangePassword";
import "./Login.css";

export default function Login() {
    const history = useHistory();
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [IsPwdToChange, setIsPwdToChange] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
    });

    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await Auth.signIn(fields.email, fields.password)
                .then(user => {
                    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        console.log("new password required")
                        setIsPwdToChange(true);
                    } else {
                        userHasAuthenticated(true);
                        history.push("/");
                    }
                });
        } catch (e) {
            onError(e);
            setIsLoading(false);;
        }
    }


    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                {IsPwdToChange ?
                    <LinkContainer to="/changePassword">
                        <NavItem>Change Password Required</NavItem>
                    </LinkContainer>
                    : <>
                        <FormGroup controlId="email" >
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={fields.email}
                                onChange={handleFieldChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" >
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                type="password"
                                value={fields.password}
                                onChange={handleFieldChange}
                            />
                        </FormGroup>
                        <Button block bsSize="large" disabled={!validateForm()} type="submit">
                            Login
                        </Button>
                    </>
                }
            </form>
        </div>
    );
}