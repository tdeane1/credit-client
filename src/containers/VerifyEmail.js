import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import {
    HelpBlock,
    FormGroup,
    FormControl,
    FormLabel,
    Button
} from "react-bootstrap";
//import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./ResetPassword.css";
//import { validateCodeForm, renderRequestCodeForm } from "./ResetPassword"

export default function ResetPassword() {
    const [fields, handleFieldChange] = useFormFields({
        code: "",
        email: "",
    });
    const [codeSent, setCodeSent] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSendingCode, setIsSendingCode] = useState(false);


    function validateCodeForm() {
        return fields.email.length > 0;
    }

    function validateVerifyForm() {
        return (
            fields.code.length > 0
        );
    }

    async function handleSendCodeClick(event) {
        event.preventDefault();

        setIsSendingCode(true);

        try {
            await Auth.verifyCurrentUserAttribute("email")
                .then(() => {
                    console.log("Verification code sent");
                    setCodeSent(true);
                })

        } catch (error) {
            onError(error);
            setIsSendingCode(false);
        }
    }

    async function handleConfirmClick(event) {
        event.preventDefault();

        setIsConfirming(true);

        try {
            Auth.verifyCurrentUserAttributeSubmit("email", fields.code)
                .then(() => {
                    console.log('email verified');
                    setConfirmed(true)
                });
        } catch (error) {
            onError(error);
            setIsConfirming(false);
        }
    }

    function renderRequestCodeForm() {
        return (
            <form onSubmit={handleSendCodeClick}>

                <Button variant="primary"
                    block
                    type="submit"


                >
                    Send Confirmation
        </Button>
            </form>
        );
    }

    function renderConfirmationForm() {
        return (
            <form onSubmit={handleConfirmClick}>
                <FormGroup bsSize="large" controlId="code">
                    <FormLabel>Confirmation Code</FormLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        value={fields.code}
                        onChange={handleFieldChange}
                    />

                </FormGroup>
                <hr />
                <Button
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isConfirming}
                    disabled={!validateVerifyForm()}
                >
                    Confirm
            </Button>
            </form>
        );
    }

    function renderSuccessMessage() {
        return (
            <div className="success">
                <p>Your email address has been verified.</p>
            </div>
        );
    }

    return (
        <div className="VerifyPassword">
            {!codeSent
                ? renderRequestCodeForm()
                : !confirmed
                    ? renderConfirmationForm()
                    : renderSuccessMessage()}
        </div>
    );
}