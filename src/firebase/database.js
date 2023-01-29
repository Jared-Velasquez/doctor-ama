import { doc, getDoc, exists, updateDoc, setDoc, addDoc, arrayUnion, collection, serverTimestamp, getDocs, query, where, startAfter, limit, orderBy } from 'firebase/firestore';
import {auth, db, storage} from './index.js';
import { v4 as uuidv4 } from 'uuid';

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
        result: "User was successfully added to Firestore Database and Authentication",
        id: userID,
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

const getUserConversations = async (userID) => {
    const userRef = doc(db, 'Users', userID);

    const userDoc = await getDoc(userRef).catch((error) => {
        return {
            status: false,
            result: "Error in retrieving document from Firestore Database"
        }
    });

    if (userDoc.exists()) {
        return {
            status: true,
            result: userDoc.data().conversationList.sort(function compareFn(a, b) { return b.timestamp - a.timestamp; })
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

        const userDoc = await getDoc(userRef).catch((error) => {
            return {
                status: false,
                result: "Error in retrieving document from Firestore Database"
            }
        })

        const userDisplayNameArray = userDoc.data().healthProfile.filter(element => element.key === "displayName");
        const recipientDisplayNameArray = recipientDoc.data().healthProfile.filter(element => element.key === "displayName");

        const userIconArray = userDoc.data().healthProfile.filter(element => element.key === "icon");
        const recipientIconArray = recipientDoc.data().healthProfile.filter(element => element.key === "icon");

        let userDisplayName = "";
        let recipientDisplayName = "";

        if (userDisplayNameArray.length === 0 || !userDisplayNameArray[0].visible) {
            userDisplayName = "Anonymous"
        } else {
            userDisplayName = userDisplayNameArray[0].value;
        }

        if (recipientDisplayNameArray.length === 0  || !recipientDisplayNameArray[0].visible) {
            recipientDisplayName = "Anonymous"
        } else {
            recipientDisplayName = recipientDisplayNameArray[0].value;
        }

        let userIcon = "";
        let recipientIcon = "";

        if (userIconArray.length === 0 || !userIconArray[0].visible) {
            userIcon = "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png";
        } else {
            userIcon = userIconArray[0].value;
        }

        if (recipientIconArray.length === 0 || !recipientIconArray[0].visible) {
            recipientIconArray = "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png";
        } else {
            recipientIcon = recipientIconArray[0].value;
        }

        const initialConversationObjectUser = {
            conversationID: docRef.id,
            unread: false,
            icon: recipientIcon,
            timestamp: Date.now(),
            displayName: recipientDisplayName
        }

        const initialConversationObjectRecipient = {
            conversationID: docRef.id,
            unread: false,
            icon: userIcon,
            timestamp: Date.now(),
            displayName: userDisplayName
        }

        await updateDoc(userRef, {
            conversationList: arrayUnion(initialConversationObjectUser)
        }).catch((error) => {
            return {
                status: false,
                result: "Error in adding conversation to user document within Firestore Database"
            }
        })
        await updateDoc(recipientRef, {
            conversationList: arrayUnion(initialConversationObjectRecipient)
        }).catch((error) => {
            return {
                status: false,
                result: "Error in adding conversation to doctor document within Firestore Database"
            }
        })

        return {
            status: true,
            result: docRef.id
        }
    } else {
        return {
            status: false,
            result: "Recipient ID does not exist within Firestore Database"
        }
    }
}

const sendMessage = async (conversationID, message, userID) => {
    const conversationRef = doc(db, "Conversations", conversationID);

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

        /*const doctorID = conversationDoc.data().doctorID;
        const patientID = conversationDoc.data().userID;

        const doctorRef = doc(db, "Users", doctorID);
        const patientRef = doc(db, "Users", patientID);

        const doctorDoc = await getDoc(doctorRef);
        const patientDoc = await getDoc(patientRef);*/

        

        // Send the message
        addDoc(streamRef, {
            sender: userID,
            message: message,
            timestamp: Date.now()
        })

        const userRef = await doc(db, "Users", userID);

        const userDoc = await getDoc(userRef);

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
                chosenConversation.timestamp = Date.now();

                let deletedChosenConversation = conversationList.filter(element => element.conversationID !== conversationID);
                deletedChosenConversation.push(chosenConversation);

                await updateDoc(userRef, {
                    conversationList: deletedChosenConversation
                });
            }
        } else {
            return {
                status: false,
                result: "User does not exist within Firestore Database"
            }
        }

        const otherRef = await doc(db, "Users", otherUser)

        const otherDoc = await getDoc(otherRef).catch((error) => {
            return {
                status: false,
                result: "Error in retrieving user document within Firestore Database"
            }
        });

        if (otherDoc.exists()) {
            const conversationList = otherDoc.data().conversationList;
            const chosenConversationElement = conversationList.filter(element => element.conversationID === conversationID);
            if (chosenConversationElement.length === 0) {
                return {
                    status: false,
                    result: "Conversation does not exist within user"
                }
            } else {
                let chosenConversation = chosenConversationElement[0];
                chosenConversation.unread = true;
                chosenConversation.timestamp = Date.now();

                let deletedChosenConversation = conversationList.filter(element => element.conversationID !== conversationID);
                deletedChosenConversation.push(chosenConversation);

                await updateDoc(otherRef, {
                    conversationList: deletedChosenConversation
                });
            }
        } else {
            return {
                status: false,
                result: "User does not exist within Firestore Database"
            }
        }

        return {
            status: true,
            result: "Conversation has been successfully updated"
        }
    } else {
        return {
            status: false,
            result: "Conversation ID does not exist within Firestore Database"
        }
    }
}

const loadConversation = async (conversationID, paginationWindow, lastDocument = "lastDocument") => {
    const conversationRef = await doc(db, "Conversations", conversationID);

    const conversationDoc = await getDoc(conversationRef).catch((error) => {
        return {
            status: false,
            result: "Error in retrieving conversation document wtihin Firestore Database"
        }
    })

    if (conversationDoc.exists()) {
        const messageRef = await doc(conversationRef, "ConversationStream", lastDocument);
        const messageDoc = await getDoc(messageRef).catch((error) => {
            return {
                status: false,
                result: "Error in retrieving conversation document within Firestore Database"
            }
        })

        if (messageDoc.exists()) {
            const streamRef = await collection(conversationRef, "ConversationStream");
            let lastDoc;
            const q = query(collection(conversationRef, "ConversationStream"), where("timestamp", "==", messageDoc.data().timestamp));

            const singleSnapshot = await getDocs(q);
            lastDoc = singleSnapshot.docs[0];

            const nextQuery = query(streamRef, orderBy("timestamp"), startAfter(lastDoc), limit(paginationWindow));
            const messageSnapshots = await getDocs(nextQuery);

            let returnArray = [];
            let lastVisibleID = "";
    
            let index = 0;
            messageSnapshots.forEach((message) => {
                if (index === messageSnapshots.docs.length - 1) {
                    lastVisibleID = message.id;
                }
                returnArray.push(message.data());
                index++;
            })
    
            return {
                status: true,
                result: returnArray,
                lastVisibleID: lastVisibleID
            }
        } else {
            const streamRef = collection(conversationRef, "ConversationStream");

            const mostRecentQuery = query(streamRef, orderBy("timestamp"), limit(paginationWindow));
            const messageSnapshots = await getDocs(mostRecentQuery);
    
            let returnArray = [];
            let lastVisibleID = "";
    
            let index = 0;
            messageSnapshots.forEach((message) => {
                if (index === messageSnapshots.docs.length - 1) {
                    lastVisibleID = message.id;
                }
                returnArray.push(message.data());
                index++;
            })
    
            return {
                status: true,
                result: returnArray,
                lastVisibleID: lastVisibleID
            }
        }
    } else {
        return {
            status: false,
            result: "Conversation ID does not exist within Firestore Database"
        }
    }
}

const markRead = async (conversationID, userID) => {
    const userRef = await doc(db, "Users", userID);
    const userDoc = await getDoc(userRef);

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
            chosenConversation.unread = false;

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
            result: "User ID does not exist within Firestore Database"
        }
    }
}

const listDoctors = async () => {
    const q = query(collection(db, "Users"), where("type", "==", 1));
    const querySnapshot = await getDocs(q);
    let returnArray = [];
    querySnapshot.forEach((doc) => {
        let doctorData = doc.data();
        delete doctorData.conversationList;
        doctorData.userID = doc.id;
        
        returnArray.push(doctorData);
    })

    return {
        status: true,
        result: returnArray
    }
}

const getUsersFromConversation = async (conversationID) => {
    const conversationRef = doc(db, "Conversations", conversationID);
    const conversationDoc = await getDoc(conversationRef);

    if (conversationDoc.exists()) {
        return {
            status: true,
            patientID: conversationDoc.data().userID,
            doctorID: conversationDoc.data().doctorID
        }
    } else {
        return {
            status: false,
            result: ""
        }
    }
}

const uploadImage = async (image) => {
    const fileName = uuidv4();
    const uploadTask = storage.ref(`/ProfilePictures/${fileName}`).put(image);

    uploadTask.on('state_changed', (snapshot) => {
        console.log(snapshot);
    }, (err) => {
        console.log(err);
    }, () => {
        storage.ref('ProfilePictures').child(fileName).getDownloadURL().then((url) => {
            console.log(url);
        })
    })
}

export {getOwnProfile, getOtherProfile, setProfile, initializeUser, initializeConversation, sendMessage, loadConversation, markRead, listDoctors, getUserConversations, getUsersFromConversation, uploadImage};