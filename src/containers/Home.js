import React, { useRef, useState, useEffect } from "react";
import "./Home.css";
import { Form, Row, Container, Button, FormControl } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";

export default function Home() {
    const [fields, handleFieldChange] = useFormFields({
        idNumber: "",
        creditScore: ""
    });

    const [content, setContent] = useState("");
    cont [showFields, setShowFields] = false;

    function validateForm() {
        console.log(fields.idNumber);
        console.log(Home.idNumber);
        return (
            fields.idNumber.length > 0 &&
            fields.idNumber.length <12
        );
    }
    async function handleSubmit() {
        event.preventDefault();

        /*         console.log(country.value);
                console.log(idType.value);
                console.log(fields.idNumber); */

        let id = "".concat(country.value.substr(0, 2))
            .concat(idType.value.substr(0, 2))
            .concat("0".repeat(11 - fields.idNumber.length)
                .concat(fields.idNumber));
        console.log(id);
        setShowFields(false)


        try {
            await API.get("creditScore", `/creditScore/${id}`)
                .then(content => {
                    console.log(content);
                   /*  outPutFields.creditScore = content.creditScore;
                    outputFields.creditScoreRemarks = content.creditScoreRemarks;
                    outputFields.lastName = content.lastName; */
                    setContent(content);
                    console.log(content.creditScore);
                    creditScoreField.disabled="false";
                    setShowFields(true)
                    

                }
                
            )
        }
        catch (e) {
            setShowFields(false);
            onError(e);
            
        }


    }
    function renderForm() {
        return (

            <div >
                <h1>Credit Note Check</h1>
                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId="country">
                        <Form.Label>Select Country ID is from</Form.Label>
                        <Form.Control as="select"
                            size="sm"
                            autoFocus
                            onSubmit={handleFieldChange}>
                            <option>tt-Trinidad and Tobago</option>
                            <option>bd-Barbados</option>
                            <option>us-United States</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="idType">
                        <Form.Label>Select Type of Id</Form.Label>
                        <Form.Control as="select"
                            size="sm"
                            onSubmit={handleFieldChange}>
                            <option>dp-Drivers Permit</option>
                            <option>pp-Passport</option>
                            <option>id-National ID Card</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="idNumber">
                        <Form.Label>ID Number</Form.Label>
                        <Form.Control
                            size="sm"
                            type="input"
                            placeholder="Enter ID Number"
                            value={fields.password}
                            onChange={handleFieldChange}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button
                            variant="outline-primary"
                            type="submit"
                            disabled={!validateForm()}
                        >Get Credit Score
                    </Button>
                    
                    </Form.Group>
                    <Form.Group controlId="creditScoreField">
                        <Form.Label>Credit Score</Form.Label>
                        <Form.Control
                            disabled="false"
                            value={content.creditScore}
                            onChange={e => setContent(e.target.value)}>
                        </Form.Control>
                    </Form.Group><Form.Group controlId="creditScoreRemarks">
                        <Form.Label>Credit Remarks</Form.Label>
                        <Form.Control
                            disabled="false"
                            value={content.creditScoreRemarks}
                            onChange={e => setContent(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            disabled="false"
                            value={content.lastName}
                            onChange={e => setContent(e.target.value)}>
                        </Form.Control>
                    </Form.Group>


                </Form>

            </div >

        );
    }

    function RenderCreditScore() {
        console.log(content.creditScore);
        return (
            <div>
                <Form >

                    <Form.Group controlId="score">
                        <Form.Label>Credit Score</Form.Label>
                        <Form.Control as="readOnly"
                            size="sm"

                            value={content.creditScore}>

                        </Form.Control>
                    </Form.Group>
                </Form>

            </div>

        );
    }
    return (
        <div className="Home">
            {renderForm()}
        </div>
    );
}