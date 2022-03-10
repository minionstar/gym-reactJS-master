import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MapPicker from 'react-google-map-picker';
import FadeIn from 'react-fade-in';
import {FiDownload} from 'react-icons/fi';
import { saveGym, createGymId, deleteGymById } from "../../../../fiebaseImp/js/gym";
import { exportComponentAsPNG } from 'react-component-export-image';
import Geocode from "react-geocode";
import CustomQRCode from "../item/CustomQRCode";

const Container = styled('div')`
    width: 828px;
    height: 500px;
    border-radius: 20px;
    background: black;
    display: flex;
    flex-direction: row;
    overflow: hidden;
   
    .modal-backdrop
    {
        opacity:0.2 !important;
    }
    .panel {
        width: 50%;
        display: flex;
        position: relative;
        flex-direction: column;
    }
    .error {
        border-color: red !important;
    }
    .title {
        font-weight: bold;
        font-size: 24px;
        line-height: 29px;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: #F2F2F2;
        padding: 20px 25px;
    }
    .setting{
        display:flex;
        flex-direction: column;
        padding: 25px 30px;
        .label{
            font-size: 14px;
            line-height: 100%;
            letter-spacing: 0.01em;
            color: #888888;
            margin-bottom: 8px;
        }
        .input {
            color: #888888;
            background: #1C1A1D;
            border-radius: 12px;
            border: 1px solid #888888;
            height: 50px;
            padding-left: 10px;
        }
        .qr-button {
            font-size: 18px;
            line-height: 22px;
            color: #F2F2F2;
            height: 130px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #1C1A1D;
            border: 1px solid #888888;
            border-radius: 12px;
            margin-top: 36px;
        }
        .qr-button.disable {
            display: none;
        }
        .qr-generated.disable {
            display: none;
        }
        .qr-generated {
            font-size: 18px;
            line-height: 22px;
            color: #F2F2F2;
            height: 130px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #1C1A1D;
            border: 1px solid #888888;
            border-radius: 12px;
            margin-top: 36px;
            .content-layout {
                display:flex;
                flex-direction: row;
                align-items: center;
                .qr-image {
                    width:30px;
                    height: 30px;
                    margin-right: 4px;
                    color:#888888;
                }
                .text {
                    font-size: 18px;
                    line-height: 140%;
                    letter-spacing: 0.01em;
                    color: #888888;
                }
            }
            .button-group {
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: 14px;
                line-height: 160%;
                letter-spacing: 0.01em;
                color: #F2F2F2;
                margin-top: 30px;
                .download {
                    display: flex;
                    flex-direction: row;
                    margin-right: 25px;
                    .icon {
                        font-size: 18px;
                        color: #F2F2F2;
                        margin-right: 6px;
                    }
                }
                .delete {
                    margin-left: 25px;
                    color: #F03F3F;
                }
            }
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
            margin-top: 68px;
        }
        .message {
            display: flex;
            align-items: center;
            margin-top: 10px;
            height: 20px;
        }
        .error-msg {
            font-size: 14px;
            line-height: 100%;
            letter-spacing: 0.01em;
            color: red;
        }
        .success-msg {
            font-size: 14px;
            line-height: 100%;
            letter-spacing: 0.01em;
            color: #F2F2F2;
        }
    }
    .gmnoprint {
        display: none;
    }
    .map-title {
        position: absolute;
        left: 19px;
        top: 27px;
        font-size: 18px;
        line-height: 22px;
        color: #F2F2F2;
        z-index: 10;
    }
    .title-mobile {
        display: none;
    }   
    @media (max-width: 1180px){
        width: 600px;
    }
    @media (max-width: 768px) {
        width: 360px;
        border-radius: 0px;
        height: unset;
        flex-direction: column-reverse;
        .panel {
            width: unset;
            height: 360px;
            .title {
                display: none;
            }
            .button{
                margin-left: 0px;
            }
            .button-group{
                margin-top: 30px;
                justify-content: space-between;
            }
        }
        .title-mobile {
            padding: 18px 20px;
            display: unset;
            font-size: 18px;
            line-height: 22px;
            letter-spacing: 0.01em;
            text-transform: uppercase;
            color: #F2F2F2;
        }
    }
    
`;

const DEFAULT_LOCATION = {lat:25.2048, lng: 55.2708};
const DEFAULT_ZOOM = 9;

const AddGym = (props)=>{
    const [isOpen, setIsOpen] = useState(false);
    const {t} = useTranslation();
    const [step, setStep] = useState(1);
    const [qrCode, setQrCode] = useState('');
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [qrCodeError, setQrCodeError] = useState(false);
    const qrRef = useRef();
    const GOOGLE_MAP_API_KEY = 'AIzaSyDQ4WBaFAr6HqsjFOiAc_8jXxBUgLel-TM';
    Geocode.setApiKey(GOOGLE_MAP_API_KEY);
    Geocode.setLanguage('en');
    const [location, setLocation] = useState(DEFAULT_LOCATION);

    const [createError, setCreateError] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [disable, setDisable] = useState(false);

    useEffect(()=>{
        setIsOpen(props.isOpen);
    }, [props]);

    const resetStates = ()=>{
        if(qrCode !== ''){
            deleteGymById(qrCode);
        }
        setIsOpen(false);
        setNameError('');
        setName('');
        setQrCode('');
        setQrCodeError('');
        setLocation(DEFAULT_LOCATION);
        setStep(1);
        setCreateError(false);
        setCreateSuccess(false);
        setIsCreated(false);
        setDisable(false);
    }
    const hideModal = () => {
        resetStates();
        if(isCreated) {
            props.refresh();
        }
        props.close();
    }

    const onCreateQRCode = () => {
        setCreateError(false);
        setQrCodeError(false);
        setCreateSuccess(false);
        if(qrCode !== ''){
            deleteGymById(qrCode);
        }
        createGymId()
        .then((data) => {
            setQrCode(data.id);
            setStep(2);
        })
    }
    const onDeleteQRCode = () => {
        if(qrCode !== ''){
            deleteGymById(qrCode);
        }
        setStep(1);
    }


    const handleChangeLocation = (lat, lng) => {
        setLocation({lat:lat, lng:lng});
    }
    const onCreate = () => {
        if(disable)
            return;
        if(name === '' || qrCode === ''){
            setNameError(name === '');
            setQrCodeError(qrCode === '');
            return;
        }
        setDisable(true);
        Geocode.fromLatLng(location.lat, location.lng)
        .then((response)=>{
            const address = response.results[0].formatted_address;
            return saveGym(qrCode, name,address,location);
        })
        .then(data=>{
            if(data.success === 'success'){
                setQrCode('');
                setStep(1);
                setCreateSuccess(true);
                setIsCreated(true);
                setName('');
                setDisable(false);
            }
            else{
                setCreateError(true);
            }
            
        })
        .catch(error => {
            console.log(error);
        });

    }
    const onDownload = () => {
        exportComponentAsPNG(qrRef, {fileName:'QR CODE'});
    }
    const onInputName = (e) => {
        setCreateError(false);
        setCreateSuccess(false);
        setNameError(false);
        setName(e.target.value)
    }
    return(
        <Modal
        show={isOpen}
        onHide={hideModal}
        centered
        dialogClassName="login-modal"
        >  
            <Container>
                <div className="panel">
                    <span className="title">
                        {t('Add GYM')}
                    </span>
                    <div className="setting">
                        <span className="label">
                            {t('GYM name')}
                        </span>
                        <input className={nameError? "input error" : "input"}
                            value={name}
                            onChange={e => onInputName(e)}/>
                        <div className={step ===1? (qrCodeError? "qr-button error" :"qr-button")
                             : "qr-button disable"}
                            onClick={onCreateQRCode}>
                            {t('Generate QR code')}
                        </div>
                        <FadeIn delay={100} 
                            className={step ===2? "qr-generated" : "qr-generated disable"} 
                            transitionDuration={300} visible={step === 2}>
                            <div className="content-layout">
                                <CustomQRCode containerClass="qr-image" size={30}
                                    qrCode={qrCode} ref={qrRef}/>
                                <span className="text">
                                    {t('QR code was generated !')}
                                </span>
                            </div>
                            <div className="button-group">
                                <div className="download" onClick={onDownload}>
                                   <FiDownload className="icon"/>
                                    {t('Download')}
                                </div>
                                <span onClick={onCreateQRCode}>
                                    {t('Generate New')}
                                </span>
                                <span className="delete" onClick={onDeleteQRCode}>
                                    {t('Delete')}
                                </span>
                            </div>
                        </FadeIn>
                        <div className="message">
                            { createError &&
                                <span className="error-msg">
                                    {t('Cannot create a new gym. Try again.')}
                                </span>
                            }
                            {
                                createSuccess && 
                                <span className="success-msg">
                                    {t('New Gym is created successfully.')}
                                </span>
                            }
                        </div>
                        
                        <div className="button-group">
                            <span className="button" onClick={hideModal}>
                                {t('Cancel')}
                            </span>
                            <span className="button active" onClick={onCreate}>
                                {t('Create')}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="panel">
                    <span className="map-title">
                        {t('Location')}
                    </span>
                    <MapPicker 
                        defaultLocation={DEFAULT_LOCATION}
                        zoom={DEFAULT_ZOOM}
                        mapTypeId="roadmap"
                        onChangeLocation={handleChangeLocation} 
                        apiKey={GOOGLE_MAP_API_KEY}/>
                </div>
                <span className="title-mobile">
                    {t('Add GYM')}
                </span>
                
            </Container>
        </Modal>
    )
}

export default AddGym;