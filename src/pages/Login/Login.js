import React from 'react';
import { Alert, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Login.css"

function Login (props) {
    return (
        <Container>
        <div class="logincontainer">
        <Row className="rowcontainer">
            <Col className="square border-end loginA">
                    <p class="slogan">Affirming, Accessible Healthcare Without Bias or Discrimination.</p>
            </Col>
            <Col className="loginB">
                <p class="intro">Hi! Welcome to Dr. AMA ("ask me anything!")</p>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="success" type="submit">
                    Submit
                    </Button>
                </Form>
            </Col>
        </Row>
        </div>
        </Container>
    );
}

export default Login;