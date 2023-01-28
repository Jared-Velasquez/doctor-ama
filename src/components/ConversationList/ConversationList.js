import React from 'react';
import { Button } from 'react-bootstrap';

function ConversationList (props) {
    return (
        <div>
            <p>Conversation List</p>
            <Button onClick={()=>{props.entry()}}>Click into convo</Button>
        </div>
    );
}

export default ConversationList;