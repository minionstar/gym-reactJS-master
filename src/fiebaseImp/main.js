import {initializeApp} from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
}

const firebase = initializeApp(config);
export const auth = getAuth();
export const db = getFirestore();

let isLogin = false;

onAuthStateChanged(auth, (user)=>{
    if(user){
        isLogin = true;
    }
    else{
        isLogin = false;
    }
});
export const useAuth = ()=>{
   return isLogin;
}

export default firebase;

