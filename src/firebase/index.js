import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const sdkSetup = require('./sdkSetup.json');

const firebaseConfig = sdkSetup;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
    app,
    db,
    auth
}