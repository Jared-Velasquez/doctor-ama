import React, { useEffect, useRef, useState } from 'react';
import { Alert, Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import CareFinder from '../../components/CareFinder/CareFinder';
import ChatViewer from '../../components/ChatViewer/ChatViewer';
import ConversationList from '../../components/ConversationList/ConversationList';
import ProfileEditor from '../../components/ProfileEditor/ProfileEditor';
import ProfileViewer from '../../components/ProfileViewer/ProfileViewer';

function Home (props) {
    let [inConvo, setInConvo] = useState(false);


    return (
        <Container className="pt-4">
        <Row>
        <Col>
            {inConvo ? 
                <Tabs
                defaultActiveKey="def"
                transition={false}
                className="mb-3"
              >
                <Tab eventKey="def" title="Conversation Details">
                  <ProfileViewer />
                </Tab>
                <Tab eventKey="mine" title="My Profile">
                  <ProfileEditor />
                </Tab>
              </Tabs>
             : 
             <Tabs
             defaultActiveKey="def"
             transition={false}
             className="mb-3"
           >
             <Tab eventKey="def" title="My Profile">
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
                <Tab eventKey="convlist" title="Conversations">
                  <ConversationList entry={()=>{setInConvo(true)}} />
                </Tab>
                <Tab eventKey="find" title="Find Care Professionals">
                  <CareFinder />
                </Tab>
              </Tabs>
             : <ChatViewer exit={()=>{setInConvo(false)}} />}
        </Col>
      </Row>
        </Container>
    );
}

export default Home;