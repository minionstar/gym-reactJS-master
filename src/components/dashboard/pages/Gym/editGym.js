import React, {useState, useEffect, useRef, useLayoutEffect, useContext}from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import {FiDownload} from 'react-icons/fi';
import CustomSelect from "../item/CustomSelect";
import CustomQRCode from "../item/CustomQRCode";
import { exportComponentAsPNG } from 'react-component-export-image';
import { useLocation } from 'react-router-dom';
import Slider from "@farbenmeer/react-spring-slider";
import {MdCancel} from 'react-icons/md';
import ReactImageUploading from 'react-images-uploading';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {MdDelete, MdChangeCircle} from 'react-icons/md';
import { updateGymImage, removeGymImageByIndex, getGym, updateGym} from "../../../../fiebaseImp/js/gym";
import { useMediaQuery } from "react-responsive";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from  'react-icons/ai';
import UserContext from "../../../../context/UserContext";

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
    .header {
        background: black;
        font-weight: bold;
        font-size: 24px;
        line-height: 130%;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: #F2F2F2;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 70px;

        .gym-name {
            color: #888888;
            text-transform: uppercase;
            margin-left: 18px;
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 20px;
        gap: 20px 0px;
        .image-container {
            padding: 20px;
            border-radius: 20px;
            width: calc(100% - 40px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 20px;
            background: black;
            .title {
                font-size: 20px;
                line-height: 130%;
                letter-spacing: 0.01em;
                text-transform: uppercase;
                color: #888888;
            }
            .preview-image-panel {
                display:flex;
                flex-direction: row;
                justify-content: center;
                .image {
                    width: 300px; 
                    height: 200px;
                    border-radius: 15px;
                    object-fit: contain;
                }
            }
            .image-gallery {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                height: 150px;
                margin: 0px 20px;
            }
        }
        .label {
            font-size: 14px;
            line-height: 100%;
            color: #888888;
            margin-bottom: 8px;
        }
        .qr-code {
            display: flex;
            flex-direction: column;
            padding: 20px 30px;
            background: black;
            border-radius: 20px;
            .image-container {
                width: 184px;
                height: 234px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background: #1C1A1D;
                border: 1px solid #888888;
                color: #F2F2F2;
                border-radius: 12px;
                .image {
                    width: 140px;
                    height: 140px;
                    margin-bottom: 30px;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }
                .download {
                    display: flex;
                    flex-direction: row;
                }
                .icon {
                    font-size: 18px;
                    color: #F2F2F2;
                    margin-right: 6px;
                }
            }
            
        }
        .setting-panel {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 20px 30px;
            background: black;
            border-radius: 20px;
            margin-right: 30px;
            .input {
                background: #1C1A1D;
                border: 1px solid #888888;
                border-radius: 12px;
                margin-bottom: 20px;
                height: 50px;
                color:#888888;
                padding-left: 10px;
            }
            .input-select {
                margin-bottom: 20px;
            }
        }
    }
    .button{
        width: 100px;
        height: 50px; 
        display: flex;
        justify-content: center;
        align-items: center;
        color: #F2F2F2;
        font-size: 18px;
        line-height: 22px;
        border-radius: 10px;
        border: 1px solid #888888;
        margin-left: 16px;
    }
    .button.active{
        text-transform: uppercase;
        color: #000000;
        background: #FECA00;
        border: none;
    }
    .button-group{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }

    .error {
        border-color: red !important;
    }
    .image-item {
        margin-right: 20px;
        width: 150px;
        height: 120px;
        position: relative;
        border-radius: 10px;
        justify-content: center;
        background: #1C1A1D;
        display: flex;
        .image {
            max-width: 100%;
            height: 120px;
            object-fit: contain;
        }
        .delete {
            position: absolute;
            width: 20px;
            height: 20px;
            right: -10px;
            top: -10px;
            color: red;
            font-size: 18px;
        }
    }
    .button-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .image-content {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 0px 30px;
        gap: 30px 0px;
        background: black;
        border-radius: 25px;
        margin-right: 20px;
        .image {
            width: 150px;
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
    .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: #F2F2F2;
        background-color: #0000008a;
    }
    .info-container {
        display: flex;
        flex-direction: row;
        padding: 20px;
        width: calc(100% - 40px);
        /* background: black; */
    }
    
    @media (max-width: 1180px){
        width: 600px;
    }
    @media (max-width: 768px) {
        width: 360px;
        height: unset;
        .header {
            margin-bottom: 20px;
        }
        .content {
            width: 100%;
            flex-direction: column;
            .qr-code{
                width: 100%;
                .image-container {
                    width: 100%;
                    height: 168px;
                    flex-direction: row;
                    margin-bottom: 38px;
                    .image {
                        width: 112px;
                        height: 112px;
                        margin-right: 50px;
                        margin-bottom: 0px;
                    }
                }
            }
        }
        .button {
            margin-right: 0px;
        }
        .button-group {
            justify-content: space-between;
            margin-top: 50px;
        }
    }
    .lang-menu-text {
        &:active{
            background: red;
        }
    }
    .menu-indicator.active {
        color: #FECA00;
    }
    .empty-image {
        width: 300px; 
        height: 200px;
        border-radius: 15px;
        border: 1px solid #888888;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .text {
            font-size: 16px;
            line-height: 130%;
            letter-spacing: 0.01em;
            color: #F2F2F2;
            width: 70%;
        }
    }
`;

const EditGym  = (props) => {
    const {t} = useTranslation();
    const state = JSON.parse(localStorage.getItem('state'));
    const [user, setUser] = useContext(UserContext);
    const [gymData, setGymData] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(state.content.name? state.content.name: '');
    const [membership, setMembership] = useState(state.content.membership? state.content.membership : '');
    const [owner, setOwner] = useState(state.content.owner?state.content.membership :'');
    const qrRef = useRef();

    const [nameError, setNameError] = useState(false);
    const [ownerError, setOwnerError] = useState(false);
    const [memError, setMemError] = useState(false);
    
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState([]);

    const [gymImages, setGymImages] = useState([]);
    const [selectImage, setSelectImage] = useState('');
    const uploadUserImage = () => {
        const imageFile = images[0].file;
        const storage = getStorage();
        const userRef = ref(storage, `/gym/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(userRef, imageFile);
        uploadTask.on('state_changed', 
            (snapshot) => {
                setUploading(true);
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    // console.log('Upload is paused');
                    break;
                case 'running':
                    // console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
               
            }, 
            () => {
                setUploading(false);
               
                setImages([]);
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log(downloadURL);
                    updateGymImage(gymData.qrCode, downloadURL)
                    .then(data =>{
                        if(data.success === 'success')
                        {
                            getGym(gymData.qrCode)
                            .then(data=>{
                                setGymData({...data});
                                setGymImages(data.images);
                            })
                        }
                    })
                });
                
            }
        );
    }
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    useEffect(()=>{
        setGymData(state.content);
        setGymImages(state.content.images? state.content.images: []);
        setSelectImage(state.images? state.content.images[0] : '');
        if(state.content.images && state.content.images.length > 0)
        {
            setSelectImage(state.content.images[0]);
        }
    }, [props]);

    const [slideCnt, setSlideCnt] = useState(0);
    const is1280 = useMediaQuery({ query: "(max-width:1280px)" });
    const is768 = useMediaQuery({ query: "(max-width:768px)" });
    const is576 = useMediaQuery({ query: "(max-width:576px)" });
    const [isCentered, setIsCentered] = useState(false);
    useLayoutEffect(()=>{
        setSlideCnt((window.innerWidth - 400) / 180);
        setIsCentered((window.innerWidth - 400) / 180 > gymImages.length);
        if(is1280){
            setSlideCnt((window.innerWidth - 400) / 180);
            setIsCentered((window.innerWidth - 400) / 180 > gymImages.length);
        }
        if(is768){
            setSlideCnt((window.innerWidth - 400) / 180);
            setIsCentered((window.innerWidth - 400) / 180 > gymImages.length);
        }
        if(is576){
            setSlideCnt((window.innerWidth - 400) / 180);
            setIsCentered((window.innerWidth - 400) / 180 > gymImages.length);
        }
    })

   

    const resetStates = ()=>{
        setName('');
        setIsOpen(false);
        setMembership('');
        setOwner('');
        setNameError(false);
        setOwnerError(false);
        setMemError(false);
    }
    const hideModal = () => {
        resetStates();
        props.close();
    }

    const onOwnerChange = (data) => {
        setOwnerError(false);
        setOwner(data.value)
    }
    const onMembershipChange = (data) => {
        setMemError(false);
        setMembership(data.value);
    }
    const onSave = () => {
        if(name === '' || owner ==='' || membership === ''){
            setNameError(name === '');
            setMemError(membership === '');
            setOwnerError(owner === '');
            return;
        }

        updateGym(gymData.qrCode, name, owner, membership)
        .then(data => {
            if(data.success === 'success'){
                getGym(gymData.qrCode)
                .then(data=>{
                    setGymData(data);
                    setGymImages(data.images);
                })
            }
        })
    }
    const onDownload = () => {
        exportComponentAsPNG(qrRef, {fileName:'QR CODE'});
    }

    const ArrowComponent = ({ onClick, direction }) => {
		return (
            <>
                {
                    direction === 'left' && 
                        <div
                            className="arrow-bg arrow-left"
                            onClick={onClick}
                        >
                            <AiOutlineArrowLeft className="arrow"/>
                        </div>
                }
                {
                    direction === 'right' &&
                        <div
                            className="arrow-bg arrow-right"
                            style={{left:'80px'}}
                            onClick={onClick}
                        >
                            <AiOutlineArrowRight className="arrow"/>
                        </div>
                }
            </>
			
		);
	};
    const onSelectImage = (image) => {
        setSelectImage(image);
    }
    const onRemoveImage = (index) => {
        removeGymImageByIndex(gymData.qrCode, index)
        .then(data=>{
            if(data.success === 'success')
            {
                getGym(gymData.qrCode)
                .then(data=>{
                    setGymData(data);
                    setGymImages(data.images);
                })
            }
        })
    }
    

    return(
       <Container>
           <div className="header">
                <span className="gym-name">
                    {gymData.name}
                </span>
           </div>
           <div className="content">
                <div className="image-container">
                    <span className="title">
                        {t('Gym Images')}
                    </span>
                    <div className="preview-image-panel">
                        {selectImage && <img src={selectImage} className="image"/>}
                        {!selectImage && 
                            <div className="empty-image">
                                <span className="text">
                                    {t("You don't have uploaded gym image yet.")}
                                </span>
                            </div>
                        }
                    </div>
                    {!isCentered &&
                    <div className="image-gallery">
                        <Slider slidesAtOnce={slideCnt} 
                            hasArrows
                            >
                            {gymImages.map((item, index)=>(
                                <div className="image-item" key={index} 
                                    onClick={()=>onSelectImage(item)}>
                                    <img src={item} className="image"/>
                                    <MdCancel className="delete" onClick={()=>onRemoveImage(index)}/>
                                </div> 
                            ))}
                           
                        </Slider>
                    </div>}
                    {isCentered && 
                    <div className="image-gallery">
                        {gymImages && gymImages.map((item, index)=>(
                            <div className="image-item" key={index}
                                 onClick={()=>onSelectImage(item)}>
                                <img src={item} className="image"/>
                                <MdCancel className="delete" onClick={()=>onRemoveImage(index)}/>
                            </div> 
                        ))}
                    </div>}
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
                           
                            {images.map((image, index) => (
                                <div key={index}>
                                    <img  src={image.data_url} alt="" className='image' />
    
                                    <div className="image-item__btn-wrapper">
                                        <div className='update-btn' onClick={() => onImageUpdate(index)}>
                                            <MdChangeCircle />
                                        </div>
                                        <div className='delete-btn' onClick={() => onImageRemove(index)}>
                                            <MdDelete />
                                        </div>
                                    </div>
                                </div>
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
                </div>
                <div className="info-container">
                  
                    <div className="setting-panel">
                        <span className="label">
                            {t('GYM name')}
                        </span>
                        <input className={nameError? "input error": "input"} 
                            value={name}
                            onChange={e => {
                                setNameError(false);
                                setName(e.target.value);
                            }}/>
                        <span className="label">
                            {t('GYM owner')}
                        </span>
                        <CustomSelect 
                            defaultValue={state.owners.find(option => option.value === state.content.owner)}
                            options={state.owners}
                            className={ownerError? "input-select error" : "input-select"}
                            placeholder={''} onChange={onOwnerChange} />
                        
                        <span className="label">
                            {t('GYM membership')}
                        </span>
                        <CustomSelect
                            defaultValue={state.memberships.find(option => option.value === state.content.membership)}
                            options={state.memberships} 
                            className={memError? "input-select error" : "input-select"}
                            placeholder={''} onChange={onMembershipChange} />
                        <div className="button-container" onClick={()=>onSave()}>
                            <span className="button active">
                                {t('Save')}
                            </span>
                        </div>
                    </div>
                    <div className="qr-code">
                        <span className="label">
                            {t('QR code')}
                        </span>
                        <div className="image-container">
                            <CustomQRCode containerClass="image" size={120}
                                ref={qrRef}  qrCode={gymData.qrCode? gymData.qrCode : ''}/>
                            <div className="download" onClick={onDownload}>
                                <FiDownload className="icon"/>
                                {t('Download')}
                            </div>
                        </div>
                    </div>
                </div>
           </div>
       </Container>
    );
}

export default EditGym;