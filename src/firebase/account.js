import app from "./index.js"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth"
import { getFirestore , doc, setDoc, query, collection, where, getDocs} from "firebase/firestore"; 

const db = getFirestore(app);

const auth = getAuth(app);

export async function makeUser(email, password) {
    try {

        const repeatEmailCheck = collection(db, "users");
        const q = query(repeatEmailCheck, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        var emailIsTaken = false;
        querySnapshot.forEach((doc) => {
          alert("Email already has account");
          emailIsTaken = true;
        });
        if(emailIsTaken){return false;}

        const res = await createUserWithEmailAndPassword(auth, email, password);
        const ref = doc(db, "users", res.user.uid);
        await setDoc(ref, {
          email: email,
          ismoderator: false,
        });

        await updateProfile(auth.currentUser, {
          displayName: email,
        });
      } catch (err) {
        alert(err.message);
        return false;
      }
    return true;
}

export async function signIn (email, password) {
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