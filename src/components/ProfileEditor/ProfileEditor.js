import React, { useEffect, useState } from 'react';
import { Button, Alert, Table, Container, ToggleButton, Row, Col } from 'react-bootstrap';

function ProfileEditor (props) {
    const dummy = {
        status: true,
      result: [
          {key: "Name", value: "Jacob Zhi", visible: true},
          {key: "lamaoaoao", value: "fjfoffifjfjf", visible: false},
          {key: "kasefjoaesijoi", value: "fjfoffifjfjf", visible: true}
        ]
      }
    const [editMode, setEditMode] = useState(false);
    const [m_data, setM_data] = useState(dummy);
    return (
        <Container>
        <h3>My Profile</h3>

        <Container>
            <ToggleButton checked={editMode}  variant="outline-primary"
            onClick={() => {setEditMode(!editMode); setM_data(dummy)}}>{editMode ? "Cancel" : "Edit"}</ToggleButton>{' '}
            {editMode ? <Button variant="success">Save</Button>: null}
        </Container>
        {!m_data?.status ? 
            <Alert variant="danger">Error Loading Your Profile!</Alert> :
            editMode ? 
            <Table striped bordered hover>
                <tbody>
                    {m_data?.result.map((pair, i) => {
                        return (
                        <tr>
                            <td>Visibility <input type="checkbox" checked={pair.visible} onChange={() => {
                                var copy = {...m_data};
                                copy.result[i].visible = !pair.visible;
                                setM_data(copy);

                            }} /></td>
                            <td>{pair.key}</td>
                            <td>
                                <input type="text" value={pair.value} onChange={(e) => {
                                    var copy = {...m_data};
                                    copy.result[i].value = e.target.value;
                                    setM_data(copy);
                                }
                                } />
                            </td>
                        </tr>
                    )
                    })}
                </tbody>
            </Table>
            :
            <Table striped bordered hover>
                <tbody>
                    {m_data?.result.map((pair) => {return(
                        <tr>
                            <td>{pair.visible ? "Visible" : "Hidden"}</td>
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

export default ProfileEditor;