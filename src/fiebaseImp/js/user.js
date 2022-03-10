import firebase, {auth, db} from '../main';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    FacebookAuthProvider,
    OAuthProvider,
    signInWithPopup,
    signOut,
    RecaptchaVerifier,
    signInWithPhoneNumber
    } from 'firebase/auth';
import { 
    collection,
    doc, 
    addDoc,
    updateDoc, 
    setDoc, 
    getDocs, 
    getDoc, 
    deleteDoc,
    query,
    where,
    limit
    } from 'firebase/firestore';

import { UserTypeArray } from '../../const/userType';

const collection_user = "users";

const getUser = (id) => {
    return getDoc(doc(db, collection_user, id));
}

const saveUser = async (uid, sure_name, username,type, phone, membership, activated = true) => {
    await setDoc(doc(db, collection_user, uid),{
        sure_name,
        username,
        role: [type],
        phone,
        membership,
        activated:true,
    });
}

const addUser =  (username) =>{
    return addDoc(collection(db, collection_user),{
        username: username,
        role: [5],
        activated:true
    });
}

const addUserWithEmailAndName = (username, displayname) => {
    return addDoc(collection(db, collection_user),{
        username: username,
        sure_name: displayname,
        role: [5],
        activated:true
    });
}

export const createNewUser = (sure_name, username, role, phone, membership) =>{
    return addDoc(collection(db, collection_user),{
        sure_name,
        username,
        role,
        phone,
        membership,
        activated:true
    });
}



export const getGymOwners = () =>{
    return getDocs(collection(db, collection_user))
    .then(datas =>{
        let gym_owners = [];
        datas.forEach((data)=>{
            if(data.data().role.includes(3)) {
                gym_owners.push({label: data.data().sure_name, value:data.id});
            }
        });
        return gym_owners;
    })
}

export const getAllUsers = () => {
    return getDocs(collection(db, collection_user))
    .then(datas =>{
        let users = [];
        datas.forEach((data)=>{
            let user = data.data();
            let type = '';
            user.role.forEach(element => {
                type += UserTypeArray[element] + ', '; 
            });
            type = type.replace(/,\s*$/, "");
            users.push({
                surename: user.sure_name,
                username: user.username,
                mobile: user.phone,
                type: type,
                membership: user.membership,
                activated: user.activated,
                photo: user.photo,
                id: data.id,
            });
        });
        return users;
    })
}
const updateUser = async (id, updatedUser) => {
    await updateDoc(doc(db, collection_user, id), updatedUser);
}

const deleteUser = async (id) => {
    await deleteDoc(doc(db, collection_user, id));
}

const isActivatedUser = async (id) => {
    const usr = await getUser(id);
    const usr_data = usr.data(); 
    return usr.activated;
}

const deActivatedUser = async (id) => {
    const usr = await getUser(id);
    const usr_data = usr.data(); 
    usr_data.activated = !usr_data.activated;
    updateUser(id, usr_data);
}

export const changeUserRole = (uid, role)=>{
    updateUser(uid, {role:role});
}

export const changeUserActivateState = (id, state) =>{
    return updateDoc(doc(db, collection_user, id),{
            activated: state
        })
        .then(()=>{
            return {success:'success', error:''};
        })
        .catch((error)=>{
            return {success:'', error:error.message};
        })
}
export const getUsers = () => {
    return getDocs(collection(db, collection_user));
}

export const saveNewUser = async (sure_name, username,role, mobile, membership)=>{
    return addDoc(collection(db, collection_user),{
        sure_name,
        username,
        role,
        mobile,
        membership,
        activated:true
    })
    .then((data)=>{
        return {success:data.id, error: ''};
    })
    .catch((error)=>{
        return {success:'', error: error.message};
    })
}

export const changeUser = (uid,sure_name, username,type, mobile, membership)=>{
    return setDoc(doc(db, collection_user, uid),{
        sure_name,
        username,
        type,
        mobile,
        membership,
        activated:true})
        .then(()=>{
            return {success:'success', error:''}
        })
        .catch((error)=>{
            return {success:'', error:error.message}
        })
}


export const signUpWithEmailAndPassword = (sure_name, email, password, phone) => {
    let token = 0, userId;
    let error = '';

    return createUserWithEmailAndPassword(auth, email, password)
        .then((data)=>{
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idtoken)=>{
            token = idtoken;
            saveUser(userId, sure_name, email, 5, phone, '');
            return {token:token, error:''};
        })
        .catch((err)=>{
            return {profile: '', error: err.code, token: token};
        });
}

export const updateUserImage = async(uid, url) => {
    await updateDoc(doc(db, collection_user, uid),{
            photo: url
        });
}

export const logInWithEmailAndPassword =  (email, password) => {
    let token = '';
    let userId = 0;

    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            userId = userCredential.user.uid;
            return userCredential.user.getIdToken();
        })
        .then((idtoken)=>{
            token = idtoken;
            return getUser(userId);
        })
        .then((data)=>{
            data = {...data.data(), id: data.id};
            return {profile:data, error:'', token: token};
        })
        .catch((error) => {
            return {profile:'', error: error.code, token:''};
        });
}

export const logOut = ()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        console.log(error)
    });
}


 ///------Login with Social Account -------------

 // Login with google accont

 const provider = new GoogleAuthProvider();
//  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const loginwithGoogleAccount = ()=>{
    let email = '';
    let token = 0;
    let name = '';
    return signInWithPopup(auth, provider)
    .then((result)=>{
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const accesstoken = credential.accessToken;
        const user = result.user;

        token = credential.idToken;
        email = user.email;
        name = user.displayName;
        console.log(user);
        const q = query(collection(db, collection_user), where("username", "==", user.email), limit(1));
        return getDocs(q);
    })
    .then((docs)=>{
        if(docs.size != 0)
        {
            let profile
            docs.forEach((doc)=>{
                profile = {...doc.data(), id: doc.id};
            })
            return {profile:profile, error:'', token: token};
        }
        else{
            return addUserWithEmailAndName(email, name)
            .then(data=>{
                return {profile:{username:email,sure_name: name, id: data.id}, error:'', token: token};
            })
        }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
        return {profile:'', error: error.message, token:''};
      });
}

// Login with facebook
// const fb_provider = new FacebookAuthProvider();

// export const loginWithFacebook = ()=>{
//     let email = '';
//     let token = '';
//     signInWithPopup(auth, fb_provider)
//     .then((result) => {
//         const user = result.user;
//         const credential = FacebookAuthProvider.credentialFromResult(result);
//         const accesstoken = credential.accessToken;
//         console.log(user.toJSON())

//         email = user.email;
//         token = credential.idToken;
//         const q = query(collection(db, collection_user), where("email", "==", user.email), limit(1));
//         return getDocs(q);
//     })
//     .then((docs)=>{
//         if(docs.size != 0)
//         {
//             docs.forEach((doc)=>{
//                 return {profile:doc.data(), error:'', token: token};
//             })
//         }
        // else{
        //     return addUser(email)
        //     .then(data=>{
        //         return {profile:{username:email, type:5, id: data.id}, error:'', token: token};
        //     })
        // }
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         const email = error.email;
//         const credential = FacebookAuthProvider.credentialFromError(error);
//         console.log(error);
//         return {profile:'', error: error.message, token:''};
//     });
// }

// Login with Apple

const appleProvider = new OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');

export const loginWithApple = () => {
    let token = '';
    let email = '';
    let name = '';
    return signInWithPopup(auth, appleProvider)
        .then((result) => {
            const user = result.user;

            // Apple credential
            const credential = OAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            
            token = credential.idToken;
            email = user.email;
            name = user.displayName;
            const q = query(collection(db, collection_user), where("email", "==", user.email), limit(1));
            return getDocs(q);
        })
        .then((docs)=>{
            if(docs.size != 0)
            {
                docs.forEach((doc)=>{
                    return {profile:doc.data(), error:'', token: token};
                })
            }
            else{
                return addUserWithEmailAndName(email, name)
                .then(data => {
                    return {profile:{username:email, displayName: name, type:5, id: data.id}, error:'', token: token};
                })
            }
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The credential that was used.
            const credential = OAuthProvider.credentialFromError(error);
            console.log(error);

            return {profile:'', error: error.message, token:''};
        });

}

// Login with Phone

// window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
//     'size': 'invisible',
//     'callback': (response) => {
//       // reCAPTCHA solved, allow signInWithPhoneNumber.
//     //   onSignInSubmit();
//     }
//   }, auth);
// // const phoneNumber = getPhoneNumberFromUserInput();
// const appVerifier = window.recaptchaVerifier;

// export const loginWithPhone = (phoneNumber)=>{
//     let token = '';
//     let email = '';
//     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//     .then((confirmationResult) => {
//       // SMS sent. Prompt user to type the code from the message, then sign the
//       // user in with confirmationResult.confirm(code).
//       window.confirmationResult = confirmationResult;
//       // ...
//     }).catch((error) => {
//       // Error; SMS not sent
//       // ...
//     });

// }
