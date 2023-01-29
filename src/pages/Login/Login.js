import React, { useState } from 'react';
import {signInUser} from "../../firebase/account"
import { Alert, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import "./Login.css"
import {  useNavigate } from "react-router-dom";


function Login(props) {
    const [lemail, setLemail] = useState('');
    const [lpassword, setLpassword] = useState('');
    const navigate = useNavigate();


    async function handleLoginSubmit(event) {
        event.preventDefault();
        if(await signInUser(lemail, lpassword)){
            alert("Successfully logged in!");
            navigate("/");
        }
        else {
            alert("Something didn't work...");
        }
    }

    return (
        <Container className="logincontainer">
        <div>
            <img class="monstera1" src="https://static.vecteezy.com/system/resources/previews/009/974/134/original/cutout-monstera-leaf-watercolor-simplicity-painting-free-png.png" />
        </div>
        <div>
            <img class="monstera2" src="https://static.vecteezy.com/system/resources/previews/009/974/134/original/cutout-monstera-leaf-watercolor-simplicity-painting-free-png.png" />
        </div>
        <Row className="rowcontainer">
            <Col className="loginA">
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
                    <div className="registerbutton">
                        No account? <Button variant="secondary" as={Link} to="/registration">Register</Button>
                    </div>
                </Form>
            </Col>
        </Row>
        </Container>
    );
}
export default Login;