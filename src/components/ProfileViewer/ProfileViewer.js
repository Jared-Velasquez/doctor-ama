import React, { useState, useCallback, useEffect } from 'react';
import { Container, Alert, Table } from 'react-bootstrap';
import { getOtherProfile } from '../../firebase/database';
import './ProfileViewer.css'

function ProfileViewer (props) {
    const [pv_ul, setPv_ul] = useState(null); 

    useEffect(() => {
        console.log("begin call getOtherProfile API");

        getOtherProfileWrapper().catch(console.error);
    }, [props.convoUID])

    const getOtherProfileWrapper = useCallback(async () => {
        if(props.convoUID) {
            console.log("convoUID:" + props.convoUID)
            const result = await getOtherProfile(props.convoUID);
            console.log("call getOtherProfile API");
            setPv_ul(result);
        }
    })

    return (
        <Container className="conversationprofilecontainer">
            <h3>Conversation Profile</h3>
            {(!pv_ul || !pv_ul.status) ? 
                <Alert variant="danger">Error Loading User Profile!</Alert> :
                <Table striped bordered hover>
      <tbody>
        {pv_ul.result.map((pair) => {return(
            <tr>
                <td>{pair.key}</td>
                <td>{pair.value}</td>
            </tr>
        );
        })
        }
      </tbody>
    </Table>
            }
        </Container>
    );
}

export default ProfileViewer;