import {app} from "./index.js"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth"
import { getFirestore , doc, setDoc, query, collection, where, getDocs} from "firebase/firestore"; 
import { initializeUser } from './database.js';

const db = getFirestore(app);

const auth = getAuth(app);

export async function makeUser(email, password) {
    let res;

    try {
      res = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return {
        result: false,
        error: error
      }
    }

    const result = await initializeUser(res.user.uid, 0, []);

    return result;
}

export async function signInUser(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        alert("Wrong email and/or password");
        return false;
      }
    return true;
}

export async function signOutUser() {
  signOut(auth).then(function() {
    window.location.reload();
    return true;
  }, function(error) {
    return false;
  });
}

export async function getUserId(){
  const isLoggedIn = await userLoggedIn();
  if(isLoggedIn)
    return auth.currentUser.uid;
  else
    return null;
}

// Credit for code by Nicholas Tower: https://stackoverflow.com/a/49326537
export const userLoggedIn = () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      resolve(!!user);
    })
  });
}