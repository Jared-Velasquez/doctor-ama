import React, { useState } from 'react';
import {signInUser} from "../../firebase/account"
import { Alert, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import "./Login.css"

function Login(props) {
    const [lemail, setLemail] = useState('');
    const [lpassword, setLpassword] = useState('');

    async function handleLoginSubmit(event) {
        event.preventDefault();
        if(await signInUser(lemail, lpassword)){
            alert("Successfully logged in!");
            window.location = "/";
        }
        else {
            alert("Something didn't work...");
        }
    }

    return (
        <Container>
        <div class="logincontainer">
        <Row className="rowcontainer">
            <Col className="square border-end loginA">
                    <p class="slogan">Affirming, Accessible Healthcare Without Bias or Discrimination.</p>
            </Col>
            <Col className="loginB">
                <p class="intro">Hi! Welcome to Dr. AMA ("ask me anything!")</p>
                <Form onSubmit={handleLoginSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={lemail} onChange={(e) => setLemail(e.target.value)}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={lpassword} onChange={(e) => setLpassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="success" type="submit">
                    Log In
                    </Button>
                    <Button as={Link} className="registerbutton" to="/registration">Register</Button>
                </Form>
            </Col>
        </Row>
        </div>
        </Container>
    );
    }


export default Login;