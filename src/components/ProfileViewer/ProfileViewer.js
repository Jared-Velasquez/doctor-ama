import React from 'react';
import { Container, Alert, Table } from 'react-bootstrap';

function ProfileViewer (props) {
    const dummy = {
        status: true,
      result: [
          {key: "Name", value: "Jacob Zhi"},
          {key: "lamaoaoao", value: "fjfoffifjfjf"},
          {key: "kasefjoaesijoi", value: "fjfoffifjfjf"}
        ]
      }
    return (
        <Container>
            <h3>Conversation Profile</h3>
            {!dummy.status ? 
                <Alert variant="danger">Error Loading User Profile!</Alert> :
                <Table striped bordered hover>
      <tbody>
        {dummy.result.map((pair) => {return(
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