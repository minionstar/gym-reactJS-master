import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactImageUploading from 'react-images-uploading';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from './item/Header';
import {MdDelete, MdChangeCircle} from 'react-icons/md';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateUserImage } from '../../../fiebaseImp/js/user';

const Container = styled('div')`
    display: flex;
    width: 100%;
    flex-direction: column;
    .content {
        padding: 20px;
        display: flex;
        flex-direction: row;
    }
    .image-content {
        position: relative;
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 30px;
        gap: 30px 0px;
        background: black;
        border-radius: 25px;
        margin-right: 20px;
        .image {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 1px solid #F2F2F2;
            object-fit: cover;
        }
        .button{
            width: 110px;
            height: 50px; 
            display: flex;
            justify-content: center;
            align-items: center;
            color: #F2F2F2;
            font-size: 18px;
            line-height: 22px;
            border-radius: 10px;
            border: 1px solid #888888;
        }
        .button.active{
            text-transform: uppercase;
            color: #000000;
            background: #FECA00;
            border: none;
        }
        .image-item__btn-wrapper{
            width: 150px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 0px 20px;
            font-size: 24px;
            .update-btn {
                color: white;
            }
            .delete-btn {
                color: red;
            }
        }
    }
    .information {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        border-radius: 25px;
        padding: 20px;
        background: black;
        .header {
            display: flex;
            flex-direction: row;
            justify-content: center;
            color: #F2F2F2;
            font-size: 24px;
        }
        .details {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px 0px;
        }
        .detail {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0px 10px;
        }
        .membership-content {
            display: flex;
            flex-direction: column;
            color: #F2F2F2;
            font-size: 14px;
            padding-left: 16px;
        }
        .label{
            font-size: 14px;
            line-height: 100%;
            letter-spacing: 0.01em;
            color: #888888;
        }
        .text {
            font-size: 18px;
            color: #F2F2F2;
            line-height: 100%;
        }
    }
    .bar-container{
        background-color: #888888;
        width: 150px;
        height: 15px;
        border-radius: 10px;
        text-align: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .bar-completed {
        background-color: lightblue;
        width: 150px;
        height: 15px; 
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .bar-label{
        line-height: 100%;
        font-size: 12px;
        color: #F2F2F2;
    }
    .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: #F2F2F2;
    }
    
`;

const EditUser  = () => {
    const {state} = useLocation();
    const {t} = useTranslation();

    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState([]);
    const [saveImage, setSaveImage] = useState(state.photo);
    
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    
    const uploadUserImage = () => {
        const imageFile = images[0].file;
        const storage = getStorage();
        const userRef = ref(storage, `/users/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(userRef, imageFile);
        uploadTask.on('state_changed', 
            (snapshot) => {
                setUploading(true);
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
               
            }, 
            () => {
                setUploading(false);
               
                setImages([]);
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateUserImage(state.id, downloadURL);
                    setSaveImage(downloadURL);
                });
                
            }
        );
    }

    return(
        <Container>
            <Header title={t('Users')} button={state.username}
                openModal = {()=>{}} user={true}/>
            <div className='content'>
                
                <ReactImageUploading
                    value={images}
                    onChange={onChange}
                    dataURLKey="data_url"
                >
                    
                    {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                    }) => (
                    <div className='image-content' {...dragProps}>
                        {
                            images.length === 0 &&
                            (saveImage ?
                                <img  src={saveImage} alt="" className='image' /> :
                                <div className='image'></div>
                            )
                        }
                        {images.map((image, index) => (
                            <React.Fragment key={index}>
                                <img  src={image.data_url} alt="" className='image' />
   
                                <div className="image-item__btn-wrapper">
                                    <div className='update-btn' onClick={() => onImageUpdate(index)}>
                                        <MdChangeCircle />
                                    </div>
                                    <div className='delete-btn' onClick={() => onImageRemove(index)}>
                                        <MdDelete />
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                        {
                            images.length === 0 && 
                            
                            <span className='button active' onClick={onImageUpload}>
                                {t('Select')}
                            </span>
                        }
                        
                        {
                            images.length !== 0 && 
                            
                            <span className='button active' onClick={uploadUserImage}>
                                {t('Upload')}
                            </span>
                        }
                        {
                            uploading && 
                            <div className='overlay'>
                                {t('Uploading image...')}
                            </div>
                        }
                    </div>

                    )}
                </ReactImageUploading>
                    
                <div className='information'>
                    <div className='header'>
                        {t('User Information')}
                    </div>
                    
                    <div className='details'>
                        <div className='detail'>
                            <span className='label'> {t('Name')} </span>
                            <span className='text'> {state.surename} </span>
                        </div>
                        <div className='detail'>
                            <span className='label'> {t('Email')} </span>
                            <span className='text'> {state.username} </span>
                        </div>
                        <div className='detail'>
                            <span className='label'> {t('Membership')} </span>
                            <span className='text'> {state.membership} </span>
                        </div>
                        <div className='membership-content'>
                            {
                                state.description && state.description.map((item, index) => (
                                    <li key={index}> {item.text} </li>
                                ))
                            }
                        </div>
                        <div className='detail'>
                            <span className='label'> {t('Roles')} </span>
                            <span className='text'> {state.type} </span>
                        </div>
                        <div className='detail'>
                            <span className='label'> {t('Phone')} </span>
                            <span className='text'> {state.mobile} </span>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </Container>
    );
}

export default EditUser;