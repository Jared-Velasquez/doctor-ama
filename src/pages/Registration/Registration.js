import React, { useState } from 'react';
import {makeUser} from "../../firebase/account"
import { Alert, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import "./Registration.css"

function Registration(props) {
    const [rname, setRname] = useState('');
    const [rpronouns, setRpronouns] = useState('');
    const [remail, setRemail] = useState('');
    const [rpassword, setRpassword] = useState('');

    async function handleRegistrationSubmit(event) {
        event.preventDefault();
        let testvar = await makeUser(remail, rpassword)
        console.log(testvar);
        if(testvar){
            alert("Successfully Registered!");
            window.location = "/";
        }
        else {
            alert("Something didn't work...");
        }
    }

    return (
        <Container>
        <div class="registrationcontainer">
        <Row className="rowcontainer">
            <Col className="registrationA">
                <p class="intro">Registration: Hi, it's nice to meet you!</p>
                <Form onSubmit={handleRegistrationSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email to Register!</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={remail} onChange={(e) => setRemail(e.target.value)}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={rpassword} onChange={(e) => setRpassword(e.target.value)}/>
                        <Form.Text className="text-muted">
                        so everything is always private :)
                        </Form.Text>
                    </Form.Group>
                    <Button variant="success" type="submit">
                    Register
                    </Button>
                    <Button as={Link} className="loginbutton" to="/login">Log In</Button>
                </Form>
            </Col>
            <Col className="square border-end registrationB">
                <p class="slogan">[avatar]</p>
            </Col>
        </Row>
        </div>
        </Container>
    );
}

export default Registration;