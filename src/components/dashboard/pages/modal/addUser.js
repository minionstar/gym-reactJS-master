import React, {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import CustomSelect from "../item/CustomSelect";
import UserTypes from "../../../../const/userType";
import { emailValidator } from "../../../../helpers/emailValidator";
import { createNewUser } from "../../../../fiebaseImp/js/user";
const Container = styled('div')`
    width: 498px;
    height: 600px;
    background-color: black;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    padding: 30px 40px;
    .header {
        font-weight: bold;
        font-size: 24px;
        line-height: 29px;
        text-transform: uppercase;
        color: #F2F2F2;
    }
    .content {
        display:flex;
        flex-direction: column;
        margin-top: 25px;
    }
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
        margin-bottom: 20px;
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
        margin-top: 30px;
    }
    .input-select {
        margin-bottom: 20px;
    }
    .error {
        border-color: red !important;
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
    @media (max-width: 768px) {
        width: 300px;
        height: unset;
        .header {
            margin-bottom: 20px;
        }
        
        .button {
            margin-right: 0px;
        }
        .button-group {
            justify-content: space-between;
            margin-top: 50px;
        }
    }
`;


const AddUser = (props) => {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [type, setType] = useState([]);
    const [membership, setMembership] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [mobileError, setMobileError] = useState(false);
    const [typeError, setTypeError] = useState(false);
    const [membershipError, setMembershipError] = useState(false);

    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] =  useState(false);
    const [disable, setDisable] = useState(false);

    useEffect(()=>{
        setIsOpen(props.isOpen);
    }, [props]);

    const resetStates = ()=>{
        setName('');
        setEmail('');
        setMobile('');
        setType([]);
        setMembership('');

        setNameError(false);
        setEmailError(false);
        setMobileError(false);
        setTypeError(false);
        setMembershipError(false);
        setDisable(false);
    }
    const hideModal = () => {
        resetStates();
        setIsOpen(false);
        emptyMessage();
        props.close();
    }

    const emptyMessage = () => {
        setCreateSuccess(false);
        setCreateError(false);
    }

    const onSelectType = (data) => {
        setTypeError(false);
        emptyMessage();
        let temp = [];
        data.forEach(element => {
            temp.push(element.value);
        });
        setType(temp);
    }

    const onSelectMembership = (data) => {
        setMembershipError(false);
        emptyMessage();
        setMembership(data.value);
    }

    const onSave = () => {
        if(disable)
            return;
        if(name === '' || mobile === '' || 
            emailValidator(email) || type.length === 0 || membership === ''){
            setNameError(name === '');
            setEmailError(emailValidator(email));
            setMobileError(mobile === '');
            setTypeError(type.length === 0);
            setMembershipError(membership === '');
            return;   
        }
        setDisable(true);
        createNewUser(name, email, type, mobile, membership)
        .then(data => {
            if(data.id !== '')
            {
                setCreateSuccess(true);
                setDisable(false);
                resetStates();
                props.refresh();
            }
        })
        .catch(e =>{
            setCreateError(true);
        });
    }
    return (
        <Modal
        show={isOpen}
        onHide={hideModal}
        centered
        dialogClassName="login-modal"
        >  
            <Container>
                <div className="header">
                    {t('Add user')}
                </div>
                <div className="content">
                    <span className="label">
                        {t('Name')}
                    </span>
                    <input className={nameError? "input error" : "input"} 
                        value={name} 
                        onChange={e => {
                            emptyMessage();
                            setNameError(false);
                            setName(e.target.value);
                        }}/>
                    <span className="label">
                        {t('Email')}
                    </span>
                    <input className={emailError? "input error": "input"} 
                        type="email" value={email}
                        onChange={e=>{
                            setEmailError(false);
                            emptyMessage();
                            setEmail(e.target.value);
                        }}/>
                    <span className="label">
                        {t('Mobile')}
                    </span>
                    <input className={mobileError? "input error": "input"}
                        value={mobile}
                        onChange={e=>{
                            emptyMessage();
                            setMobileError(false);
                            setMobile(e.target.value);
                        }}/>
                    <span className="label">
                        {t('Type')}
                    </span>
                    <CustomSelect options={UserTypes} placeholder={''}
                        className={typeError? "input-select error" : "input-select"} 
                        isMulti={true} onChange={onSelectType}/>
                    <span className="label">
                        {t('Membership')}
                    </span>
                    <CustomSelect options={props.memberships} placeholder={''}
                        className={membershipError? "input-select error" : "input-select"} onChange={onSelectMembership}/>
                </div>
                <div className="message">
                    { 
                        createError &&
                        <span className="error-msg">
                            {t('Cannot create a new user. Try again.')}
                        </span>
                    }
                    {
                        createSuccess && 
                        <span className="success-msg">
                            {t('New User is created successfully.')}
                        </span>
                    }
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

export default AddUser;