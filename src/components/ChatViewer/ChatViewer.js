import React from 'react';
import { Button } from 'react-bootstrap';

function ChatViewer (props) {
    return (
        <div>
            <p>Chat viewer</p>
            <Button onClick={()=>{props.exit()}}>Back</Button>
        </div>
    );
}

export default ChatViewer;