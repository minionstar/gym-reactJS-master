import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactImageUploading from 'react-images-uploading';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from './item/Header';
import { MdDelete, MdChangeCircle } from 'react-icons/md';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateUserImage } from '../../../fiebaseImp/js/user';
import UserContext from '../../../context/UserContext';
import { getMembershipNames } from '../../../fiebaseImp/js/membership';
import { UserTypeArray } from '../../../const/userType';
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
        .input {
            background: #1C1A1D;
            border: 1px solid #888888;
            border-radius: 12px;
            margin-bottom: 20px;
            height: 35px;
            color:#888888;
            padding-left: 10px;
            min-width:180px;
            margin:auto;
        }
        .labelInput{
            display: flex;
            justify-content:space-between;
            flex-direction: row;
            align-items: center;
            gap: 0px 10px;
            padding:10px 5px;
            span{
                white-space: nowrap;
            }
        }
    }
    .w-60{
        width:60% !important;
    }
    .gym-image{
        width: 200px;
        height: 170px;
        border-radius: 10px;
        border: 2px solid #F2F2F2;
        object-fit: cover;
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

const Setting = () => {

    const { t } = useTranslation();
    const [user, setUser] = useContext(UserContext);

    const state = JSON.parse(localStorage.getItem('profile'));
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState([]);
    const [saveImage, setSaveImage] = useState(state.photo);

    const { path } = useLocation();
    const [membership, setMembership] = useState('');
    const [description, setDescription] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        if (state.membership) {
            getMembershipNames()
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].value === state.membership) {
                            setMembership(data[i].label);
                            setDescription(data[i].description);
                            break;
                        }
                    }
                });

        }
        let type = '';
        state.role.forEach(element => {
            type += UserTypeArray[element] + ', ';
        });
        type = type.replace(/,\s*$/, "");
        setRole(type);

    }, [path]);


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

    return (
        <Container>
            <Header title={t('Information')} button={state.username}
                openModal={() => { }} user={true} />
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
                                    <img src={saveImage} alt="" className='image' /> :
                                    <div className='image'></div>
                                )
                            }
                            {images.map((image, index) => (
                                <React.Fragment key={index}>
                                    <img src={image.data_url} alt="" className='image' />

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
                        {t('My Information')}
                    </div>

                    <div className='details'>
                        <div className='detail'>
                            <span className='label'> {t('Name')} </span>
                            <span className='text'> {state.sure_name} </span>
                        </div>
                        <div className='detail'>
                            <span className='label'> {t('Email')} </span>
                            <span className='text'> {state.username} </span>
                        </div>
                        <div className='detail'>
                            <span className='label'> {t('Membership')} </span>
                            <span className='text'> {membership} </span>
                        </div>
                        <div className='membership-content'>
                            {
                                description && description.map((item, index) => (
                                    <li key={index}> {item.text} </li>
                                ))
                            }
                        </div>
                        <div className='detail'>
                            <span className='label'> {t('Roles')} </span>
                            <span className='text'> {role} </span>
                        </div>
                        <div className='detail'>
                            <span className='label'> {t('Phone')} </span>
                            <span className='text'> {state.phone} </span>
                        </div>
                    </div>

                </div>
            </div>
            <div className='content'>
                <div className='information w-60'>
                    <div className='header'>
                        {t('Gyms Information')}
                    </div>
                    <hr />
                    <div className='details' style={{ flexDirection: 'row' }}>
                        <span className='w-60'>
                            <div className='labelInput'>
                                <span className='text'> {'Trade license number :'} </span>
                                <span>
                                    <input className={"input"}
                                        // value={name}
                                        onChange={e => {
                                            // setNameError(false);
                                            // setName(e.target.value);
                                            console.log(e.currentTarget.value);
                                        }} />
                                </span>
                            </div>
                            <div className='labelInput'>
                                <span className='text'> {'Company Name :'} </span>
                                <span>
                                    <input className={"input"}
                                        // value={name}
                                        onChange={e => {
                                            // setNameError(false);
                                            // setName(e.target.value);
                                            console.log(e.currentTarget.value);
                                        }} />
                                </span>
                            </div>
                        </span>
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
                            }) => {
                                return (
                                    <div className='image-content' style={{ padding: 10 }} {...dragProps}>
                                        {images.length === 0 &&
                                            (!saveImage ?
                                                <img src={saveImage} alt="" className='gym-image' /> :
                                                <div className='gym-image'></div>
                                            )}
                                        {images.map((image, index) => (
                                            <React.Fragment key={index}>
                                                <img src={image.data_url} alt="" className='gym-image' />

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
                                    </div>

                                );
                            }}
                        </ReactImageUploading>
                    </div>
                </div>

            </div>
        </Container>
    );
}

export default Setting;