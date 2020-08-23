import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import {
    FormGroup,
    FormControl,
    FormLabel,
    Button
} from "react-bootstrap";
/* import LoaderButton from "../components/LoaderButton"; */
import { onError } from "../libs/errorLib";
import "./ChangePassword.css";
import { Auth } from "aws-amplify";

export default function ChangePassword() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
    });
    const history = useHistory();
    const [newUser, setNewUser] = useState(null);
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        /* setIsLoading(true); */
        try {
            await Auth.completeNewPassword(
                fields.user,
                fields.password,
            );
            userHasAuthenticated(true);
            history.push("/");
        } catch (e) {
            onError(e);
            /* setIsLoading(false); */
        }
        //setNewUser("test");


    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault();

        //setIsLoading(true);
    }

    function renderConfirmationForm() {
        return (
            <form onSubmit={handleConfirmationSubmit}>
                <FormGroup controlId="confirmationCode" bsSize="large">
                    <FormLabel>Confirmation Code</FormLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        onChange={handleFieldChange}
                        value={fields.confirmationCode}
                    />
                    {/* <HelpBlock>Please check your email for the code.</HelpBlock> */}
                </FormGroup>
                <Button
                    block
                    type="submit"
                    bsSize="large"
                    /* isLoading={isLoading} */
                    disabled={!validateConfirmationForm()}
                >
                    Verify
        </Button>
            </form>
        );
    }

    function renderForm() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        /* autoFocus */
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type="password"
                        onChange={handleFieldChange}
                        value={fields.confirmPassword}
                    />
                </FormGroup>
                <Button
                    block
                    type="submit"
                    bsSize="large"
                    /* isLoading={isLoading} */
                    disabled={!validateForm()}
                >
                    Signup
        </Button>
            </form>
        );
    }


    return (
        <div className="Signup">
            {newUser === null ? renderForm() : renderConfirmationForm()}
        </div>
    );
}
