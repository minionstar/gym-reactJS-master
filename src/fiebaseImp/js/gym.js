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
    collectionGroup,
    query,
    arrayUnion,
    arrayRemove,
    where,
    limit
    } from 'firebase/firestore';

const collection_gym = "gyms";

export const getGyms = () => {
    return getDocs(collection(db, collection_gym));
}

export const getGym = (id) => {
    return getDoc(doc(db, collection_gym, id))
    .then(data=>{
        return {...data.data(), qrCode: data.id};
    })
}

export const createGymId =  ()=>{
    return addDoc(collection(db, collection_gym),{})
            .then((data)=>{
                return {id:data.id};
            })
            .catch((error)=>{
                console.log(error);
            })
}

export const deleteGymById = async(id)=>{
    await deleteDoc(doc(db, collection_gym, id));
}

export const saveGym = (id, name, address, location)=>{
    return setDoc(doc(db, collection_gym, id),{
                name:name,
                address,
                location
            })
            .then(()=>{
                return {success:'success', error:''};
            })
            .catch((error)=>{
                return {error:error.message, success:''};
            })
}

export const updateGym = (id, name, owner, membership) =>{
    return updateDoc(doc(db, collection_gym, id),{
            name:name,
            owner:owner,
            membership:membership
        })
        .then(()=>{
            return {success:'success', error:''};
        })
        .catch((error)=>{
            return {success:'', error:error.message};
        })
}

export const updateGymImage = (id, image) => {
    return getDoc(doc(db, collection_gym, id))
    .then(data => {
        return data.data().images;
    })
    .then(images => {
        let temp = images? images: [];
        temp.push(image);
        return updateDoc(doc(db, collection_gym, id), {
            images: temp
        })
    })
    .then(()=>{
        return {success:'success', error:''};
    })
    .catch((error)=>{
        return {success:'', error:error.message};
    })
}

export const changeGymActivation = (id, state) => {
    return updateDoc(doc(db, collection_gym, id),{
        activated: state
    })
    .then(()=>{
        return {success:'success', error:''};
    })
    .catch((error)=>{
        return {success:'', error:error.message};
    })
}

export const removeGymImageByIndex = (id, index) => {
    return getDoc(doc(db, collection_gym, id))
    .then(data => {
        return data.data().images;
    })
    .then(images => {
        console.log(images);
        if(images){
            images.splice(index, 1);
            return updateDoc(doc(db, collection_gym, id), {
                images: images
            })
        }
        throw 'exception';
    })
    .then(()=>{
        return {success:'success', error:''};
    })
    .catch((error)=>{
        return {success:'', error:error.message};
    })
}

export const getAllClassesForGym = gymId => {
    let classes = [];
    const classGroup = query(collectionGroup(db, 'classes'));
    return getDocs(classGroup)
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let classInfo = doc.data();
          if(classInfo.gym === gymId){
              classes.push({...classInfo, id: doc.id});
          }
        });
        return classes;
      })
      .catch(() => {
        return [];
      });
}

export const saveClassesForGym = (gymId, info) => {
    return addDoc(collection(db, 'gyms', gymId, 'classes'), info)
    .then(data=>{
        return data.id;
    })
}

export const updateClass = (gymId, docId, content) => {
    return updateDoc(doc(db, 'gyms/'+gymId + '/classes', docId), content)
    .then(() => {
        return {success: 'success', error:''};
    })
    .catch(e => {
        return {success: '', error: 'error'};
    })
}

export const getTrainers = (gymId) => {
    return getDoc(doc(db, collection_gym, gymId))
    .then(data => {
        return {success: data.data().trainers, error: ''};
    })
    .catch((error)=>{
        return {success:'', error:error.message};
    })
}

export const addTrainer = (gymId, data) => {
    return updateDoc(doc(db, collection_gym, gymId), {
        trainers: arrayUnion(data)
    })
    .then(()=>{
        return true;
    })
    .catch(()=>{
        return false;
    })
}

export const updateTrainer = (gymId, data) => {
    return updateDoc(doc(db, collection_gym, gymId), {
        trainers: data
    })
    .then(()=>{
        return true;
    })
    .catch(()=>{
        return false;
    })
}