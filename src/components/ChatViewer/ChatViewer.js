import React, { useState } from 'react';
import { Button, Container, Table, Row, Col, Form} from 'react-bootstrap';
import './ChatViewer.css'

// attribution time2TimeAgo: https://stackoverflow.com/questions/19540077/converting-unix-time-to-minutes-ago-in-javascript
// username: sitifensys
function time2TimeAgo(ts) {
    // This function computes the delta between the
    // provided timestamp and the current time, then test
    // the delta for predefined ranges.

    var d=new Date();  // Gets the current time
    var nowTs = Math.floor(d.getTime()/1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
    var seconds = nowTs-Math.floor(ts/1000.0);

    // more that two days
    if (seconds > 2*24*3600) {
       return "A few days ago";
    }
    // a day
    if (seconds > 24*3600) {
       return "Yesterday";
    }

    if (seconds > 3600) {
       return "A few hours ago";
    }
    if (seconds > 1800) {
       return "Half an hour ago";
    }
    if (seconds > 60) {
       return Math.floor(seconds/60) + " minutes ago";
    }
    else {
        return "Just now";
    }
}

function ChatViewer (props) {
    const dummy_ml = [
        {
            "sender": "QzLltZTPMghitfupPlqXf8SXatY2",
            "timestamp": 1674955189943,
            "message": "This is the doctor sending a message!"
        },
        {
            "timestamp": 1674955228695,
            "sender": "nDk3GxvFTDhplSbK7ge63sE2zc73",
            "message": "This is the patient sending a message!"
        },
        {
            "timestamp": 1674955325337,
            "message": "This is the patient sending a second message!",
            "sender": "nDk3GxvFTDhplSbK7ge63sE2zc73"
        },
        {
            "message": "This is the doctor sending a second message!",
            "timestamp": 1674955340053,
            "sender": "QzLltZTPMghitfupPlqXf8SXatY"
        },
        {
            "timestamp": 1674955352675,
            "sender": "QzLltZTPMghitfupPlqXf8SXatY2",
            "message": "This is the doctor sending a second message!"
        },
        {
            "sender": "QzLltZTPMghitfupPlqXf8SXatY2",
            "timestamp": 1674955189943,
            "message": "This is the doctor sending a message!"
        },
        {
            "timestamp": 1674955228695,
            "sender": "nDk3GxvFTDhplSbK7ge63sE2zc73",
            "message": "This is the patient sending a message!"
        },
        {
            "timestamp": 1674955325337,
            "message": "This is the patient sending a second message!",
            "sender": "nDk3GxvFTDhplSbK7ge63sE2zc73"
        },
        {
            "message": "This is the doctor sending a second message!",
            "timestamp": 1674955340053,
            "sender": "QzLltZTPMghitfupPlqXf8SXatY"
        },
        {
            "timestamp": 1674961871012,
            "sender": "QzLltZTPMghitfupPlqXf8SXatY2",
            "message": "This is the doctor sending a second message!"
        }
    ];

    const [draft, setDraft] = useState("");
    return (
        <div>
            <Button onClick={()=>{props.exit()}}>Back</Button>
            <Container className="overflow-auto" style={{ height: '80vh' }}>
                {dummy_ml.map((m) => {
                    if(m.sender === props.uid) {
                        return <><p className="chatRight">{time2TimeAgo(m.timestamp)}</p><p className="chatBlue chatRight">{m.message}</p></>
                    }
                    else {
                        return  <span><p>{time2TimeAgo(m.timestamp)}</p><p className="chatGrey">{m.message}</p></span>
                    }
                })}
            </Container>
            <Container>
                <Row>
                    <Col  xs={9}>
                        <Form.Control as="textarea" rows={1} placeholder="Send a message..."  onChange={((e) => {
                            setDraft(e.target.value)
                        })}/>
                    </Col>
                    <Col>
                        <Button>&#11152;</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ChatViewer;