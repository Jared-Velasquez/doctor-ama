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
  } from "../../firebase/account"

function Home (props) {
    let [inConvo, setInConvo] = useState(false);
    let [uid, setUid] = useState('loading..');
    const navigate = useNavigate();

    useEffect(
        () => { async function uuu()  {
            const u = await getUserId();
            if(!u) {
                navigate("/login");
            }
            setUid(u);
            console.log("API call made");
        }
        uuu();
        }, []
    )


    return (
        <Container className="pt-4">
            <Row><Col><p>User ID is: {uid}</p></Col>
            <Col><Button variant="danger" className="float-end">Log Out</Button>
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
                  <ProfileViewer />
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
                  <ConversationList entry={()=>{setInConvo(true)}} />
                </Tab>
                <Tab eventKey="find" title="Find Care Professionals" className="overflow-auto" style={{ height: '75vh' }}>
                  <CareFinder />
                </Tab>
              </Tabs>
             : <ChatViewer uid={uid} exit={()=>{setInConvo(false)}} />}
        </Col>
      </Row>
        </Container>
    );
}

export default Home;