import firebase, {auth, db} from '../main';
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
    limit,
    orderBy
    } from 'firebase/firestore';

const collection_membership = "memberships";

export const getMemberships = () => {
    const membeship_ref = collection(db, collection_membership);
    const q = query(membeship_ref);
    return getDocs(q)
    .then(datas =>{
        let memberships = [];
        datas.forEach((data)=>{
            memberships.push({... data.data(), id:data.id});
        });
        return memberships;
    })
}

export const getMembershipNames = () => {
    return getDocs(collection(db, collection_membership))
    .then(datas => {
        let memberships = [];
        datas.forEach(data => {
            memberships.push({label: data.data().name, value: data.id,
                description: data.data().description});
        })
        return memberships;
    })
}

export const deleteMembership = async (id)=>{
    await deleteDoc(doc(db, collection_membership, id));
}

export const addMembership = async (name,description, monthly_amount, annually_amount, weakly_amount)=>{
    return addDoc(collection(db, collection_membership),{
        name,
        description,
        monthly_amount,
        weakly_amount,
        annually_amount
    })
    .then((data)=>{
        return {success:data.id, error: ''};
    })
    .catch((error)=>{
        return {success:'', error: error.message};
    })
}

export const changeMembership = (id, name,description, priority, monthly_amount, weakly_amount, annually_amount)=>{
    return setDoc(doc(db, collection_membership, id),{
            name,
            description,
            priority,
            description,
            annually_amount,
            monthly_amount,
            weakly_amount
        })
        .then(()=>{
            return {success:'success', error:''}
        })
        .catch((error)=>{
            return {success:'', error:error.message}
        })
}