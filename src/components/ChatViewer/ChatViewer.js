import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Container, Alert, Row, Col, Form} from 'react-bootstrap';
import { loadConversation, sendMessage } from '../../firebase/database';
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
    const [messages, setMessages] = useState(null);
    const PAGINATION_WINDOW = 100;

    useEffect(() => {
        loadConversationWrapper().catch(console.error);
        const interval = setInterval(() => loadConversationWrapper().catch(console.error), 15000)
        return () => {
          clearInterval(interval);
        }
    }, [props.convoID]);

    const loadConversationWrapper = useCallback(async () => {
        if(props.convoID) {
            console.log("Made API Call TEST BEFORE");
            console.log(props.convoID);
            const result = await loadConversation(props.convoID, PAGINATION_WINDOW);
            setMessages(result);
            //console.log(result);
        }
    })

    const chatEnd = useRef(null);

    useEffect(() => {
        chatEnd.current?.scrollIntoView()
      }, [messages]);

    const [draft, setDraft] = useState("");

    const handleMessageSend = async () => {
        if (draft.length > 0) {
            await sendMessage(props.convoID, draft, props.uid);
            console.log("Made API Call");
            const result = await loadConversation(props.convoID, PAGINATION_WINDOW);
            setMessages(result);
            setDraft("");
            
        }
    }

    return (
        <div>
            <Button onClick={()=>{props.exit()}}>Back</Button>
            <Container className="overflow-auto" style={{ height: '75vh' }}>
                {(messages?.result && messages.result.length > 0) ? messages.result.map((m) => {
                    if(m.sender === props.uid) {
                        return <><p className="chatRight">{time2TimeAgo(m.timestamp)}</p><p className="chatBlue chatRight">{m.message}</p></>
                    }
                    else {
                        return  <span><p>{time2TimeAgo(m.timestamp)}</p><p className="chatGrey">{m.message}</p></span>
                    }
                }) : <Alert>"No messages yet! Send one now."</Alert>}
                <div ref={chatEnd}/>
            </Container>
            <Container>
                <Row>
                    <Col  xs={9}>
                        <Form.Control as="textarea" rows={1} placeholder="Send a message..." value={draft} onChange={((e) => {
                            setDraft(e.target.value)
                        })}/>
                    </Col>
                    <Col>
                        <Button onClick={async () => {await handleMessageSend();}}>&#11152;</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ChatViewer;