import React, { useState } from 'react';
import {makeUser} from "../../firebase/account"
import {uploadImage} from '../../firebase/database.js';
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
    const [imageAsFile, setImageAsFile] = useState('');

    const [nextFlow, setNextFlow] = useState(false);

    async function handleRegistrationSubmit(event) {
        event.preventDefault();
        let testvar = await makeUser(remail, rpassword)
        console.log(testvar);
        if(testvar){
            alert("Successfully Registered!");
            setNextFlow(true);
            //window.location = "/";
        }
        else {
            alert("Something didn't work...");
        }
    }

    const handleImageAsFile = (file) => {
        const image = file.target.files[0];
        setImageAsFile(imageFile => (image));
        uploadImage(image);
    }

    const dummy_qs = ["Name or Nickname", "Preferred Pronouns", "Age",
    "Date of Birth", "Place of Birth", "Ethnicity",
    "Gender", "Sex", "Height",
    "Weight", "Language", "Sexuality"]

    const [intake, setIntake] = useState(dummy_qs.map((q) => {return {key: q, value: "", visible: true}}))
    return (
        <Container className="registrationcontainer">
            <div>
                <img class="monstera1" src="https://static.vecteezy.com/system/resources/previews/009/974/134/original/cutout-monstera-leaf-watercolor-simplicity-painting-free-png.png" />
            </div>
            <div>
                <img class="monstera2" src="https://static.vecteezy.com/system/resources/previews/009/974/134/original/cutout-monstera-leaf-watercolor-simplicity-painting-free-png.png" />
            </div>
            <Row className="rowcontainer">
                <Col className="registrationA">
                    {!nextFlow? <>
                    <p class="intro">Registration: Hi, it's nice to meet you! &#128522;</p>
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
                        <input type='file' onChange={handleImageAsFile}/>
                        <Button variant="success" type="submit">
                        Register
                        </Button>
                        <Button as={Link} className="loginbutton" to="/login">Log In Instead</Button>
                    </Form>
                    </> : <>
                    <h3>Intake Form</h3>
                    <p>Please leave any questions you would not like to answer blank.</p>
                    <Form>
                    {intake.map((f, i) => {
                        return (<>
                            <Form.Label>{f.key}</Form.Label>
                            <Form.Control type="text" placeholder="Optional" value={f.value} onChange={(e) => {
                                    var copy = intake.slice();
                                    copy[i].value = e.target.value;
                                    setIntake(copy);
                                }} />
                            </>
                        )
                    })}
                    </Form>
                    <Button>Submit</Button>
                    </>}
                </Col>
                <Col className="registrationB">
                    <p>[avatar]</p>
                </Col>
            </Row>
        </Container>
    );
}
export default Registration;