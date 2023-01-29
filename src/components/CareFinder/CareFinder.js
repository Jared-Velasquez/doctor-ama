import React from 'react';
import { Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import './CareFinder.css';

const dummy = {
    status: true, // firebase loaded succesfully
    result: [ 
    {
        userID: "1joijfk1j2",
        healthProfile: [
            {key: "name", value: "Joe Bruin", visible: true},
            {key: "pronouns", value: "he/they", visible: true},
            {key: "profile", value: "https://www.jeanlouismedical.com/img/doctor-profile-small.png", visible: true}
        ],
        specialties: ["opthamology", "family med"] 
    }, 
    {
        userID: "123hfa9fs93",
        healthProfile: [
            {key: "name", value: "Martha Martinez", visible: true},
            {key: "pronouns", value: "she/her", visible: true},
            {key: "profile", value: "../../../public/example1.png", visible: true}
        ],
        specialties: ["obstetrician/gynecology"] 
    },
    ]
  };

function CareFinder (props) {
    if(!dummy.status || dummy.result?.length === 0) {
        return (
            <p class="doctorlist-centermsg">No medical providers... yet &#128532;</p>
        )
    }
    return (
        <div class="doctorlist-overall">
            {dummy.result.map((doctor, i) => {
                let currname = null
                let currpronoun = null
                let currprofile = null
                let currspecialties = (doctor.specialties).join(", ")
                for (let i = 0; i < doctor.healthProfile.length; i++) {
                    let curr = doctor.healthProfile[i].key
                    let currvalue = doctor.healthProfile[i].value
                    if (curr === "name") {
                        currname = currvalue
                    }
                    else if (curr === "pronouns") {
                        currpronoun = currvalue
                    }
                    else if (curr === "profile") {
                        currprofile = currvalue
                    }
                }
                return (
                    <div class="doctorlist-pad">
                    <table class="doctorlist-entry">
                        <tr>
                            <td class="doctorlist-td">
                                <img src={currprofile} class="doctorlist-image"/>
                            </td>
                            <td class="doctorlist-td">
                                <h4>
                                    {currname + "  "}<Badge pill bg="secondary">{currspecialties}</Badge>
                                </h4>
                                <p class="doctorlist-pronouns">{"pronouns: " + currpronoun}</p>
                            </td>
                            <td>
                                <Button variant="success">Chat!</Button>{' '}
                            </td>
                            <td></td> <td></td> <td></td>
                        </tr>
                    </table>
                    </div>
                );
            })}
            
        </div>
    );
}

export default CareFinder;