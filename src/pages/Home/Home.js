import React, { useEffect, useState, useCallback } from 'react';
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
import { getUsersFromConversation } from '../../firebase/database';

function Home (props) {
    let [inConvo, setInConvo] = useState(false);
    let [uid, setUid] = useState('loading..');
    const navigate = useNavigate();

    let [convoIDAct, setConvoIDAct] = useState(null);

    let [convoUID, setConvoUID] = useState(null)

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

    useEffect(
        () => {
            getUsersFromConversationWrapper().catch(console.error);
        }, [convoIDAct]
    )

    const getUsersFromConversationWrapper = useCallback(async () => {
        const result = await getUsersFromConversation(convoIDAct);
        if(result.status) {
            if(result.doctorID === uid) {
                console.log("Other uid is patient")
                setConvoUID(result.patientID);
            }
            else {
                console.log("Other uid is doctor")
                setConvoUID(result.doctorID);
            }
        }
        console.log("Call getUsersFromConversation API");
    })


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
                <Tab eventKey="def" title="Conversation Details" className="overflow-auto" style={{ height: '75vh', width: '40vw' }}>
                  <ProfileViewer convoUID={convoUID} />
                </Tab>
                <Tab eventKey="mine" title="My Profile" className="overflow-auto" style={{ height: '75vh', width: '40vw' }}>
                  <ProfileEditor uid={uid} />
                </Tab>
              </Tabs>
             : 
             <Tabs
             defaultActiveKey="def"
             transition={false}
             className="mb-3"
           >
             <Tab eventKey="def" title="My Profile" className="overflow-auto" style={{ height: '75vh', width: '40vw' }}>
               <ProfileEditor uid={uid} />
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
                  <ConversationList uid={uid} entry={()=>{setInConvo(true)}} setConvoIDAct={setConvoIDAct} />
                </Tab>
                <Tab eventKey="find" title="Find Care Professionals" className="overflow-auto" style={{ height: '75vh' }}>
                  <CareFinder entry={()=>{setInConvo(true)}} setConvoIDAct={setConvoIDAct}  />
                </Tab>
              </Tabs>
             : <ChatViewer convoID={convoIDAct} uid={uid} exit={()=>{setInConvo(false)}} />}
        </Col>
      </Row>
        </Container>
    );
}

export default Home;