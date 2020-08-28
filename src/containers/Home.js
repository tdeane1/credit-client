import React, { useRef, useState, useEffect } from "react";
import "./Home.css";
import { Form, Row, Container, Button, FormControl, ListGroup } from "react-bootstrap";

import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";

export default function Home() {
    const [idNumber, setIdNumber] = useState("");
    const [content, setContent] = useState("");
    
    function validateForm() {
        console.log(idNumber);           
        return (
            idNumber.length > 0 &&
            idNumber.length < 12
        );
    }

    function handleChange() {
        setContent("");
    }

    function handleIdChange(event) {
        setIdNumber(event.target.value);
        setContent("");
    }
    
    async function handleSubmit() {
        event.preventDefault();
        let id = "".concat(country.value.substr(0, 2))
            .concat(idType.value.substr(0, 2))
            .concat("0".repeat(11 - idNumber.length)
                .concat(idNumber));
        console.log(id);
        try {
            await API.get("creditScore", `/creditScore/${id}`)
                .then(contentReturned => {
                    console.log(contentReturned);
                    /*  outPutFields.creditScore = content.creditScore;
                     outputFields.creditScoreRemarks = content.creditScoreRemarks;
                     outputFields.lastName = content.lastName; */
                    setContent(contentReturned);
                    //console.log("this is line 47 " + content.creditScore);
                    //creditScoreField.disabled = "false";
                }
                );
        }
        catch (e) {
            setContent("");
            //onError(e);
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
                            onChange={handleChange}
                        >
                            <option>tt-Trinidad and Tobago</option>
                            <option>bd-Barbados</option>
                            <option>us-United States</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="idType">
                        <Form.Label>Select Type of Id</Form.Label>
                        <Form.Control as="select"
                            size="sm"
                            onChange={handleChange}
                        >
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
                            value={idNumber}
                            onChange={handleIdChange}>
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
                    <ListGroup >
                        <ListGroup.Item
                        >Credit Score   : {content.creditScore} </ListGroup.Item>
                        <ListGroup.Item>Credit Remarks : {content.creditScoreRemarks} </ListGroup.Item>
                        <ListGroup.Item>Last Name      : {content.lastName} </ListGroup.Item>
                    </ListGroup>
                </Form>
            </div >
        );
    }

    return (
        <div className="Home">
            {renderForm()}
        </div>
    );
}