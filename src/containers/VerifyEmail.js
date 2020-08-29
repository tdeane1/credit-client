import React, { useState } from "react";
import { Auth } from "aws-amplify";
//import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
//import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./VerifyEmail.css";
//import { validateCodeForm, renderRequestCodeForm } from "./ResetPassword"

export default function VerifyEmail() {
    const [fields, handleFieldChange] = useFormFields({
        code: "",
        email: "",
    });
    const [codeSent, setCodeSent] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSendingCode, setIsSendingCode] = useState(false);


    /* function validateCodeForm() {
        return fields.email.length > 0;
    } */

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
            console.log(isSendingCode)
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
                <Form.Group bsSize="large" controlId="code">
                    <Form.Label>Confirmation Code</Form.Label>
                    <Form.Control
                        autoFocus
                        type="tel"
                        value={fields.code}
                        onChange={handleFieldChange}
                    />

                </Form.Group>
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
    /* console.log("in VerifyEmail"); */
    return (

        <div>
            {!codeSent
                ? renderRequestCodeForm()
                : !confirmed
                    ? renderConfirmationForm()
                    : renderSuccessMessage()}
        </div>

    );
}