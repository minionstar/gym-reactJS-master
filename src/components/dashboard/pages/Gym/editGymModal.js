import React, {useState, useEffect, useRef}from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import {FiDownload} from 'react-icons/fi';
import CustomSelect from "../item/CustomSelect";
import CustomQRCode from "../item/CustomQRCode";
import { exportComponentAsPNG } from 'react-component-export-image';
import { updateGym } from "../../../../fiebaseImp/js/gym";

const Container = styled('div')`
    background: black;
    width: 667px;
    height: 500px;
    padding: 20px 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 20px;

    .header {
        font-weight: bold;
        font-size: 24px;
        line-height: 130%;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: #F2F2F2;
        display: flex;
        flex-direction: row;
        align-items: center;

        .gym-name {
            color: #888888;
            text-transform: uppercase;
            margin-left: 18px;
        }
    }

    .content {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        .label {
            font-size: 14px;
            line-height: 100%;
            color: #888888;
            margin-bottom: 8px;
        }
        .qr-code {
            display: flex;
            flex-direction: column;
            margin-right: 20px;
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
`;

const EditGym  = (props) => {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [membership, setMembership] = useState('');
    const [owner, setOwner] = useState('');

    const [nameError, setNameError] = useState(false);
    const [ownerError, setOwnerError] = useState(false);
    const [memError, setMemError] = useState(false);
    
    const qrRef = useRef();
    useEffect(()=>{
        setIsOpen(props.isOpen);
        setName(props.gymName);
    }, [props]);

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
        updateGym(props.qrCode, name, owner, membership)
        .then(data => {
            if(data.success === 'success'){
                props.refresh();
                hideModal();
            }
        })
    }
    const onDownload = () => {
        exportComponentAsPNG(qrRef, {fileName:'QR CODE'});
    }
    return(
        <Modal
        show={isOpen}
        onHide={hideModal}
        centered
        dialogClassName="login-modal"
        >
            <Container>
                <div className="header">
                    <span>
                        {t('Edit')}
                    </span>
                    <span className="gym-name"> 
                        GYM NAme
                    </span>
                </div>
                <div className="content">
                    <div className="qr-code">
                        <span className="label">
                            {t('QR code')}
                        </span>
                        <div className="image-container">
                            <CustomQRCode containerClass="image" size={120}
                                ref={qrRef}  qrCode={props.qrCode}/>
                            <div className="download" onClick={onDownload}>
                                <FiDownload className="icon"/>
                                {t('Download')}
                            </div>
                        </div>
                    </div>
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
                            options={props.owners} 
                            className={ownerError? "input-select error" : "input-select"}
                            placeholder={''} onChange={onOwnerChange} />
                        
                        <span className="label">
                            {t('GYM membership')}
                        </span>
                        <CustomSelect 
                            options={props.memberships} 
                            className={memError? "input-select error" : "input-select"}
                            placeholder={''} onChange={onMembershipChange} />
                    </div>
                </div>
                <div className="button-group">
                    <span className="button" onClick={hideModal}>
                        {t('Cancel')}
                    </span>
                    <span className="button active" onClick={onSave}>
                        {t('Save')}
                    </span>
                </div>
            </Container>
        </Modal>
    );
}

export default EditGym;