import { doc, getDoc, exists, updateDoc } from 'firebase/firestore';
import {db} from './index.js';

const addUser = async () => {

}

const getOwnProfile = async (userID) => {
    //const userRef = database.collection('Users').doc(userID);
    const userRef = doc(db, "Users", userID);

    const userDoc = await getDoc(userRef).catch((error) => {
        return {
            status: false,
            result: "Error in retrieving document from Firestore Database"
        }
    });

    if (userDoc.exists()) {
        return {
            status: true,
            result: doc.data().healthProfile
        }
    } else {
        return {
            status: false,
            result: "User ID does not exist within Firestore Database"
        }
    }
}

const getOtherProfile = async (userID) => {
    //const userRef = database.collection('Users').doc(userID);
    const userRef = doc(db, "Users", userID);

    const userDoc = await getDoc(userRef).catch((error) => {
        return {
            status: false,
            result: "Error in retrieving document from Firestore Database"
        }
    });

    if (userDoc.exists()) {
        const userData = userDoc.data();
        const visibleHealthProfile = userData.healthProfile.filter(element => element.visible);

        return {
            status: true,
            result: visibleHealthProfile
        }

    } else {
        return {
            status: false,
            result: "User ID does not exist within Firestore Database"
        }
    }
}

const setProfile = async (userID, profile) => {
    const userRef = doc(db, "Users", userID);

    const userDoc = await getDoc(userRef).catch((error) => {
        return {
            status: false,
            result: "Error in retrieving document from Firestore Database"
        }
    });

    if (userDoc.exists()) {
        await updateDoc(userRef, {
            healthProfile: profile
        }).catch((error) => {
            return {
                status: false,
                result: "Error in updating document from Firestore Database"
            }
        })

        return {
            status: true
        }
    } else {
        return {
            status: false,
            result: "User ID does not exist within Firestore Database"
        }
    }
}

export {getOwnProfile, getOtherProfile, setProfile};