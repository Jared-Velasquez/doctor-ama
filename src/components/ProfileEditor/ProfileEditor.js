import React, { useEffect, useState, useCallback } from 'react';
import { Button, Alert, Table, Container, ToggleButton, Row, Col } from 'react-bootstrap';
import { getOwnProfile, setProfile } from '../../firebase/database';
import './ProfileEditor.css'

function ProfileEditor (props) {
    const [editMode, setEditMode] = useState(false);
    const [m_data, setM_data] = useState(null);
    const [orig_data, setOrig_data] = useState(null);

    useEffect(() => {
        getHealthProfileWrapper().catch(console.error);
    }, [props.uid]);

    const getHealthProfileWrapper = useCallback(async () => {
        console.log("getOwnProfile API Call");
        const result = await getOwnProfile(props.uid);
        setM_data(result);
        setOrig_data(result);
    })

    const handleSave = async () => {
        const newHealthData = m_data.result;
        console.log("setProfile API call");
        await setProfile(props.uid, newHealthData);
        setEditMode(false);
    }

    return (
        <Container className='bigprofilecontainer'>
        <div className='profilecontainer'>
        <h3>My Medical Profile</h3>

        <Container>
            <ToggleButton className='profilebutton' checked={editMode}  variant="outline-primary"
            onClick={() => {setEditMode(!editMode); setM_data(orig_data)}}>{editMode ? "Cancel" : "Edit"}</ToggleButton>{' '}
            {editMode ? <Button className='profilebutton' variant="success" onClick={handleSave}>Save</Button>: null}
        </Container>
        {!m_data?.status ? 
            <Alert variant="danger">Error Loading Your Profile!</Alert> :
            editMode ? 
            <Table striped bordered hover>
                <tbody>
                    {m_data?.result.map((pair, i) => {
                        return (
                        <tr>
                            <td className='visibilitycolumn'><input type="checkbox" checked={pair.visible} onChange={() => {
                                var copy = {...m_data};
                                copy.result[i].visible = !pair.visible;
                                setM_data(copy);

                            }} /> Visibility</td>
                            <td className='categorycolumn'>{pair.key}</td>
                            <td className='entrycolumn'>
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
                            <td className="visibilitycolumn">{pair.visible ? <>&#x2713; Visible</> : <>&#x2717; Hidden</>}</td>
                            <td className="categorycolumn">{pair.key}</td>
                            <td className="entrycolumn">{pair.value}</td>
                        </tr>
                    );
                    })
                    }
                </tbody>
                </Table>
            }
                </div>
            </Container>
            );
}

export default ProfileEditor;