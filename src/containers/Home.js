import React, { useState } from "react";
import "./Home.css";
import { Form, Button, ListGroup, Spinner } from "react-bootstrap";

//import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";

export default function Home() {
    const [idNumber, setIdNumber] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);


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

    async function handleSubmit(event) {
        setIsLoading(true);
        event.preventDefault();
        console.log(event.target);
        console.log(event.target.country.value);
        let id = "".concat(event.target.country.value.substr(0, 2))
            .concat(event.target.idType.value.substr(0, 2))
            .concat("0".repeat(11 - idNumber.length)
                .concat(idNumber));
        console.log(id);
        try {
            await API.get("creditScore", `/creditScore/${id}`)
                .then(contentReturned => {
                    console.log(contentReturned);
                    setIsLoading(false);
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
            setIsLoading(false);
            setContent("");
            //onError(e);
        }
    }

    function renderForm() {
        return (
            <div >

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
                        {isLoading ? <>
                            <Spinner
                                as="span"
                                animation="border"
                                role="status"
                                aria-hidden="true"
                            />
                        </>
                            : <></>
                        }
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