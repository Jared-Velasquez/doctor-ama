import { doc, getDoc, exists, updateDoc, setDoc, addDoc, arrayUnion, collection, serverTimestamp } from 'firebase/firestore';
import {auth, db} from './index.js';

const initializeUser = async (userID, userType, specialities) => {
    await setDoc(doc(db, "Users", userID), {
        conversationList: [],
        healthProfile: [],
        specialities: specialities,
        type: userType
    }).catch((error) => {
        return {
            status: false,
            result: "Error in adding user document to Firestore Database"
        }
    })

    return {
        status: true,
        result: "User was successfully added to Firestore Database and Authentication"
    }
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
            result: userDoc.data().healthProfile
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

const initializeConversation = async (recipientID) => {
    const recipientRef = doc(db, "Users", recipientID);
    const recipientDoc = await getDoc(recipientRef).catch((error) => {
        return {
            status: false,
            result: "Error in retrieving document from Firestore Database"
        }
    })

    if (recipientDoc.exists()) {
        const docRef = await addDoc(collection(db, "Conversations"), {
            doctorID: recipientID,
            userID: auth.currentUser.uid
        }).catch((error) => {
            return {
                status: false,
                result: "Error in initializing conversation within Firestore Database"
            }
        })

        const userRef = doc(db, "Users", auth.currentUser.uid);

        const initialConversationObject = {
            conversationID: docRef.id,
            unread: false,
            icon: "",
            timestamp: Date.now()
        }
        await updateDoc(userRef, {
            conversationList: arrayUnion(initialConversationObject)
        }).catch((error) => {
            return {
                status: false,
                result: "Error in adding conversation to user document within Firestore Database"
            }
        })
        await updateDoc(recipientRef, {
            conversationList: arrayUnion(initialConversationObject)
        }).catch((error) => {
            return {
                status: false,
                result: "Error in adding conversation to doctor document within Firestore Database"
            }
        })

        return {
            status: true,
            result: "Successfully initialized conversation with user and doctor"
        }
    } else {
        return {
            status: false,
            result: "Recipient ID does not exist within Firestore Database"
        }
    }
}

const sendMessage = async (conversationID, message, userID) => {
    const conversationRef = await doc(db, "Conversations", conversationID);

    const conversationDoc = await getDoc(conversationRef).catch((error) => {
        return {
            status: false,
            result: "Error in retrieving conversation document wtihin Firestore Database"
        }
    })

    if (conversationDoc.exists()) {
        const streamRef = collection(conversationRef, "ConversationStream");


        let otherUser = "";
        // Mark the conversation as unread for the other user
        if (conversationDoc.data().doctorID === userID) { // Doctor is the other user
            otherUser = conversationDoc.data().userID;
        } else if (conversationDoc.data().userID === userID) { // User is the other user
            otherUser = conversationDoc.data().doctorID;
        } else {
            return {
                status: false,
                result: "User does not exist within Firestore Database"
            }
        }

        // Send the message
        addDoc(streamRef, {
            sender: userID,
            message: message,
            timestamp: Date.now()
        })

        const userRef = await doc(db, "Users", otherUser)

        const userDoc = await getDoc(userRef).catch((error) => {
            return {
                status: false,
                result: "Error in retrieving user document within Firestore Database"
            }
        });

        if (userDoc.exists()) {
            const conversationList = userDoc.data().conversationList;
            const chosenConversationElement = conversationList.filter(element => element.conversationID === conversationID);
            if (chosenConversationElement.length === 0) {
                return {
                    status: false,
                    result: "Conversation does not exist within user"
                }
            } else {
                let chosenConversation = chosenConversationElement[0];
                chosenConversation.unread = true;

                let deletedChosenConversation = conversationList.filter(element => element.conversationID !== conversationID);
                deletedChosenConversation.push(chosenConversation);

                await updateDoc(userRef, {
                    conversationList: deletedChosenConversation
                });
                return {
                    status: true,
                    result: "Conversation has been successfully updated"
                }
            }
        } else {
            return {
                status: false,
                result: "User does not exist within Firestore Database"
            }
        }
    } else {
        return {
            status: false,
            result: "Conversation ID does not exist within Firestore Database"
        }
    }
}

export {getOwnProfile, getOtherProfile, setProfile, initializeUser, initializeConversation, sendMessage};