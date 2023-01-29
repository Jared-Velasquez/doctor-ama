import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tabs, Tab, Button } from 'react-bootstrap';
import CareFinder from '../../components/CareFinder/CareFinder';
import ChatViewer from '../../components/ChatViewer/ChatViewer';
import ConversationList from '../../components/ConversationList/ConversationList';
import ProfileEditor from '../../components/ProfileEditor/ProfileEditor';
import ProfileViewer from '../../components/ProfileViewer/ProfileViewer';
import {  useNavigate } from "react-router-dom";

import {
    getUserId,
    signOutUser,
  } from "../../firebase/account"

function Home (props) {
    let [inConvo, setInConvo] = useState(false);
    let [uid, setUid] = useState('loading..');
    const navigate = useNavigate();

    let [convoIDAct, setConvoIDAct] = useState(null);

    useEffect(
        () => { async function uuu()  {
            const u = await getUserId();
            console.log("API call made");
            if(!u) {
                navigate("/login");
            }
            setUid(u);
        }
        uuu();
        }, []
    )


    return (
        <Container className="pt-4">
            <Row><Col><p>User ID is: {uid}</p></Col>
            <Col><Button variant="danger" className="float-end" onClick={() => {
                signOutUser();
                console.log("API Call made")
                window.location.reload();
            }}>Log Out</Button>
</Col></Row>
            
        <Row>
        <Col>
            {inConvo ? 
                <Tabs
                defaultActiveKey="def"
                transition={false}
                className="mb-3"
              >
                <Tab eventKey="def" title="Conversation Details" className="overflow-auto" style={{ height: '75vh' }}>
                  <ProfileViewer convoID={convoIDAct} />
                </Tab>
                <Tab eventKey="mine" title="My Profile" className="overflow-auto" style={{ height: '75vh' }}>
                  <ProfileEditor />
                </Tab>
              </Tabs>
             : 
             <Tabs
             defaultActiveKey="def"
             transition={false}
             className="mb-3"
           >
             <Tab eventKey="def" title="My Profile" className="overflow-auto" style={{ height: '75vh' }}>
               <ProfileEditor />
             </Tab>
           </Tabs>}
        </Col>
        <Col>
            {!inConvo ? 
                <Tabs
                defaultActiveKey="convlist"
                transition={false}
                className="mb-3"
              >
                <Tab eventKey="convlist" title="Conversations" className="overflow-auto" style={{ height: '75vh' }}>
                  <ConversationList entry={()=>{setInConvo(true)}} setConvoIDAct={setConvoIDAct} />
                </Tab>
                <Tab eventKey="find" title="Find Care Professionals" className="overflow-auto" style={{ height: '75vh' }}>
                  <CareFinder entry={()=>{setInConvo(true)}} setConvoIDAct={setConvoIDAct} />
                </Tab>
              </Tabs>
             : <ChatViewer uid={uid} exit={()=>{setInConvo(false)}} />}
        </Col>
      </Row>
        </Container>
    );
}

export default Home;