import React, { useState, Slider, useEffect, useCallback} from 'react';
import {makeUser} from "../../firebase/account"
import {setProfile, uploadImage} from '../../firebase/database.js';
import { Alert, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import "./Registration.css"
import Avatar, { genConfig } from 'react-nice-avatar'
import {getSignupQuestions} from '../../utilities/utilities.js';
import {  useNavigate } from "react-router-dom";

function Registration(props) {
    
    const [rname, setRname] = useState('');
    const [rpronouns, setRpronouns] = useState('');
    const [remail, setRemail] = useState('');
    const [rpassword, setRpassword] = useState('');
    const [imageAsFile, setImageAsFile] = useState('');
    
    const [facecolor, setfacecolor] = useState("#F9C9B6");
    const [earsize, setearsize] = useState("big");
    const [eyestyle, seteyestyle] = useState("oval");
    const [nosestyle, setnosestyle] = useState("long");
    const [mouthstyle, setmouthstyle] = useState("smile");
    const [shirtstyle, setshirtstyle] = useState("polo");
    const [glassesstyle, setglassesstyle] = useState("none");
    const [haircolor, sethaircolor] = useState("#FFFFFF");
    const [hairstyle, sethairstyle] = useState("womanshort");
    const [hatstyle, sethatstyle] = useState("none");
    const [hatcolor, sethatcolor] = useState("#D2EFF3");
    const [eyebrowstyle, seteyebrowstyle] = useState("up");
    const [shirtcolor, setshirtcolor] = useState("#FC909F");
    const [bgcolor, setbgcolor] = useState("#9287FF");

    const [userID, setUserID] = useState("");

    const[config, setConfig] = useState({
        "faceColor": "#F9C9B6",
        "earSize": "big",
        "eyeStyle": "oval",
        "noseStyle": "long",
        "mouthStyle": "smile",
        "shirtStyle": "polo",
        "glassesStyle": "none",
        "hairColor": "#FFFFFF",
        "hairStyle": "womanShort",
        "hatStyle": "none",
        "hatColor": "#D2EFF3",
        "eyeBrowStyle": "up",
        "shirtColor": "#FC909F",
        "bgColor": "#9287FF"
    })

    const navigate = useNavigate();

    useEffect(() => {
        setConfig({
            "sex": "woman",
            "hatStyle": "none",
            "eyeBrowStyle": "down",
            "faceColor": facecolor,
            "earSize": earsize,
            "hairColor": haircolor,
            "hairStyle": hairstyle,
            "eyeStyle": eyestyle,
            "glassesStyle": glassesstyle,
            "noseStyle": nosestyle,
            "mouthStyle": mouthstyle,
            "shirtStyle": shirtstyle,
            "shirtColor": shirtcolor,
            "bgColor": bgcolor
        })
    }, [facecolor, earsize, haircolor, hairstyle, eyestyle, glassesstyle, 
        nosestyle, mouthstyle, shirtstyle, shirtcolor, bgcolor])


    const [nextFlow, setNextFlow] = useState(false);

    async function handleHealthProfileSubmit(event) {
        event.preventDefault();
        await setProfile(userID, intake);
        navigate("/");
    }

    async function handleRegistrationSubmit(event) {
        event.preventDefault();
        let testvar = await makeUser(remail, rpassword)
        setUserID(testvar.id);
        console.log(testvar);
        if(testvar){
            alert("Successfully Registered!");
            setNextFlow(true);
        }
        else {
            alert("Something didn't work...");
        }
    }

    const questions = getSignupQuestions();

    const [intake, setIntake] = useState(questions.map((q) => {return {key: q, value: "", visible: false}}))
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
                        <Button variant="success" type="submit">
                        Register
                        </Button>
                        <Button variant="secondary" as={Link} className="loginbutton" to="/login">Log In Instead</Button>
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
                    <Button variant='success' onClick={handleHealthProfileSubmit}>Submit</Button>
                    </>}
                </Col>
                <Col className="registrationB">
                    <div className="avatarcontainer">
                        <Avatar className="avatar" style={{ width: '18vw', height: '18vw' }} {...config} />
                    </div>
                    <div className="slidercontainer">
                        <p>face color</p>
                        <input type="color" id="facecolor"
                            onChange={(e) => {
                                setfacecolor(e.target.value)
                            }}
                        ></input>

                        <p>ear size</p>
                        <input type="range" min="0" max="1" step="1" class="slider" id="earsize" 
                            onChange={(e) => {
                            let temp = e.target.value;
                            if (temp == 0) {
                                setearsize("small");
                                console.log(e.target.value);
                            }
                            else {
                                setearsize("big");
                            }
                        }} />

                        <p>hair color</p>
                        <input type="color" id="haircolor"
                            onChange={(e) => {
                                sethaircolor(e.target.value)
                            }}
                        ></input>

                        <p>hair style</p>
                        <input type="range" min="0" max="4" step="1" class="slider" id="hairstyle" 
                            onChange={(e) => {
                            let temp = e.target.value;
                            const hairstyles = ["normal", "thick", "mohawk", "womanLong", "womanShort"];
                            sethairstyle(hairstyles[temp]);
                        }} />

                        <p>eye style</p>
                        <input type="range" min="0" max="2" step="1" class="slider" id="eyestyle" 
                            onChange={(e) => {
                            let temp = e.target.value;
                            const eyestyles = ["circle", "oval", "smile"];
                            seteyestyle(eyestyles[temp]);
                        }} />

                        <p>glasses style</p>
                        <input type="range" min="0" max="2" step="1" class="slider" id="glassesstyle" 
                            onChange={(e) => {
                            let temp = e.target.value;
                            const glassesstyles = ["round", "square", "none"];
                            setglassesstyle(glassesstyles[temp]);
                        }} />

                        <p>nose style</p>
                        <input type="range" min="0" max="2" step="1" class="slider" id="nosestyle" 
                            onChange={(e) => {
                            let temp = e.target.value;
                            const nosestyles = ["short", "long", "round"];
                            setnosestyle(nosestyles[temp]);
                        }} />

                        <p>mouth style</p>
                        <input type="range" min="0" max="2" step="1" class="slider" id="mouthstyle" 
                            onChange={(e) => {
                            let temp = e.target.value;
                            const mouthstyles = [["laugh", "smile", "peace"]];
                            setmouthstyle(mouthstyles[temp]);
                        }} />

                        <p>shirt style</p>
                        <input type="range" min="0" max="2" step="1" class="slider" id="shirtstyle" 
                            onChange={(e) => {
                            let temp = e.target.value;
                            const shirtstyles = ["hoody", "short", "polo"];
                            setshirtstyle(shirtstyles[temp]);
                        }} />

                        <p>shirt color</p>
                        <input type="color" id="shirtcolor"
                            onChange={(e) => {
                                setshirtcolor(e.target.value)
                            }}
                        ></input>

                        <p>background color</p>
                        <input type="color" id="bgcolor"
                            onChange={(e) => {
                                setbgcolor(e.target.value)
                            }}
                        ></input>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
export default Registration;