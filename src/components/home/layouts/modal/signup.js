import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import img_login from '../../../../assets/images/home/LogInFormBG.png';
import img_verification from '../../../../assets/images/home/verification.png';
import img_login_modal from '../../../../assets/images/home/LogInFormBGMobile.png';
import img_success from '../../../../assets/images/home/account_success.png';
import {AiOutlineCloseCircle, AiFillEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import { t } from "i18next";
import {BsCheckCircle} from 'react-icons/bs';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import StyledButton from "../../../items/StyledButton";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import FadeIn from 'react-fade-in';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { nameValidator } from "../../../../helpers/nameValidator";
import { emailValidator } from "../../../../helpers/emailValidator";
import { passwordValidator } from "../../../../helpers/passwordValidator";
import { getVerificationCode } from "../../../../helpers/verification";
import { signUpWithEmailAndPassword } from "../../../../fiebaseImp/js/user";

const Container = styled('div')`
    width: 980px;
    height: 600px; 
    background: #040404;
    border-radius: 24px;
    background-image: url(${img_login});
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;
    padding: 44px;
    .social {
        width: 480px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .text{
            font-size: 24px;
            line-height: 29px;
            color: #F2F2F2;
        }

        .button{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #1C1A1D;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-right: -12px;
            border: 1px solid #3A3A3A;
            font-size: 10px;
            line-height: 12px;
            color: #888888;
            .step{
                font-size: 18px;
                line-height: 22px; 
            }
        }
        .button.active {
            border:none;
            color: black;
            font-weight: bold;
            background: #FECA00;
            z-index: 5;
        }
    }
    .social-group {
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        .icon{
            font-size: 20px;
        }
    }
   
    .close {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;
        color: #F2F2F2;
        cursor: pointer;

        .icon {
            font-size: 24px;
            margin-right: 12px;
        }
    }
    .setting {
        padding: 42px 50px 18px 50px ;
        margin: 40px 40px 40px 60px;
        border-radius: 20px;
        background: #1C1A1D;
        border: 1px solid #3A3A3A;
        width: 300px;

        .title{
            text-align: center;
            font-size: 48px;
            line-height: 48px;
            letter-spacing: 0.01em;
            color: #F2F2F2;
            margin-bottom: 38px;
            .colored{
                color:#FECA00;
                font-style: italic;
            }
        }
        .label {
            font-size: 14px;
            line-height: 100%;
            letter-spacing: 0.01em;
            color: #888888;
            margin-bottom: 4px;
        }
        .label-layout {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .password-input{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            position: relative;
            .icon {
                position: absolute;
                right: 18px;
                color:#888888;
                font-size: 18px;
            }
            .input{
                margin-bottom: 0px;
            }
        }
        .input{
            background: #1C1A1D;
            border: 1px solid #888888;
            box-sizing: border-box;
            border-radius: 12px;
            width: 300px;
            height: 50px;
            padding-left: 18px;
            color: #888888; 
            margin-bottom: 5px;
        }
        
        .error-msg {
            margin-top: 16px;
            color: red;
            font-size: 14px;
            line-height: 100%;
            padding: 0px 6px;
            visibility: hidden;
            height: 18px;
            word-wrap: break-word;
        }
        .error-msg.active {
            visibility: visible;
        }
        .button-layout {
            display: flex;
            align-items: center;
            flex-direction: column;
            margin-top: 20px;
            .text-layout{
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                margin-top: 20px;
                .label{
                    margin-bottom: 0px;
                }
                .link{
                    font-size: 14px;
                    line-height: 17px;
                    color: #F2F2F2;
                    margin-left: 10px;
                }
            }
        }
        .splitter {
            background: #888888;
            height: 1px;
            width: 100%;
            margin-top: 47px;
            margin-bottom: 18px;
        }
        .signup-btn{
            font-size: 24px;
            line-height: 29px;
            letter-spacing: 0.01em;
            color: #F2F2F2;
        }
        .arrow {
            font-size: 18px;
            margin-right: 18px;
        }
        .button{
            margin-right: 0px;
        }

    }
    .setting.disable {
        display: none;
    }
    .login-img{
        background-image: url(${img_login_modal});
        background-size: cover;
        background-repeat: no-repeat;
        display: none;
    }
    .button-layout-mobile{
        display: none;
    }
    .phone-input{
        background-color: #1C1A1D;
        color: #888888;
        width: 100%;
        border: none;
        border-radius: 12px;
        height: 48px;
    }
    .phone-container{
        background: #1C1A1D;
        border: 1px solid #888888;
        box-sizing: border-box;
        border-radius: 12px;
        width: 300px;
        height: 50px;
        color: #888888; 
    }
    .phone-button{
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
        background: #1C1A1D;
        border: none;

        &:hover, &:active, &:focus{
            background: #1C1A1D;
            border-top-left-radius: 12px;
            border-bottom-left-radius: 12px;
        } 
    }
    .phone-button.open{
        background: #1C1A1D;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
    }
    .react-tel-input .flag-dropdown.open{
        background: #1C1A1D;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
    }
    .react-tel-input .selected-flag:hover, .react-tel-input .selected-flag:focus {
        background: #1C1A1D;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
    }
    .react-tel-input .flag-dropdown.open .selected-flag
    {
        background: #1C1A1D;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
    }
    .phone-dropdown{
        background: #1C1A1D;
        &::-webkit-scrollbar {
            width: 6px;
        }
        &::-webkit-scrollbar-track {
            background-color: #888888;
            border-radius: 100px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 100px;
            background-color: #FFCC00;
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.8);
        }
    }
    .react-tel-input .country-list .country:hover {
        background-color: #302d2d;
    }
    .react-tel-input .country-list .country.highlight {
        background-color: #424141;
    }
    
    .verification{
        width: 215px;
        height: 150px;
        margin-bottom: 18px;
    }
    .success{
        width: 298px;
        height: 279px;
        margin-bottom: 10px;
    }
   
    @media (max-width: 1280px) {
        width: 800px;
    }
    @media (max-width: 1000px) {
        width: 700px;
    }
    @media (max-width: 768px) {
        flex-direction: column;
        background: none;
        width: 340px;
        height: auto;
        .social{
            display: none;
        }
        .login-img {
            display: flex;
            height: 230px;
            padding: 29px;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            .close{
                width: 100%;
                display:flex;
                justify-content: flex-end;
            }
            .text{
                font-size: 24px;
                line-height: 29px;
                color: #F2F2F2;
            }
            .button{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: #1C1A1D;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-right: -12px;
                border: 1px solid #3A3A3A;
                font-size: 10px;
                line-height: 12px;
                color: #888888;
                .step{
                    font-size: 18px;
                    line-height: 22px; 
                }
            }
            .button.active {
                border:none;
                color: black;
                font-weight: bold;
                background: #FECA00;
                z-index: 5;
            }
        }
        .setting {
            margin:0px;
            border-radius: 0px;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
            padding: 19px;
            .title{
                font-size: 36px;
                line-height: 44px;
            }
            .input{
                width: 100%;
            }  
        }
        .setting.disable {
            display: none;
        }
    }
    @media (max-width: 576px){

    }

`;

const Signup = (props)=>{
    const [isOpen, setIsOpen] = useState(props.isOpen);

    const [step, setStep] = useState(1);
    const [completeStep, setCompleteStep] = useState(1);
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [passwordShown, setPasswordShown] = useState(false);
    const [password, setPassword] = useState('');
    const [rePwd, setRePwd] = useState('');

    const [verifyCode, setVerifyCode] = useState('');
    const [verifyText, setVerifyText] = useState('');
    const [error, setError] = useState('');


    useEffect(()=>{
        setIsOpen(props.isOpen);
    }, [props])

    const resetStates = () =>{
        setStep(1);
        setPhone("");
        setName("");
        setEmail("");
        setPassword('');
        setRePwd('');
        setError('');
        setVerifyCode('');
        setVerifyText('');
        setPasswordShown(false);
        setCompleteStep(1);
    }
    const hideModal = () => {
        setIsOpen(false);
        resetStates();
        props.close();
    }
    const setOldStep = (num) =>{
        if(num >= completeStep){
            setCompleteStep(num);
        }
    }
    const onStep = (num)=>{
        if(num<=completeStep){
            setStep(num);
        }
    }

    const onLogin = ()=>{
        hideModal();
        props.openLogin();
    }
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const onNextStep = () => {
        switch(step)
        {
            case 1:
                const nameError = nameValidator(name);
                if(nameError)
                {
                    setError(t(nameError));
                    return;
                }
                const emailError = emailValidator(email);
                if(emailError){
                    setError(t(emailError));
                    return;
                }
                const phoneError = isPossiblePhoneNumber('+'+phone)? '': 
                    t('Phone Number is not correct.');
                if(phoneError){
                    setError(phoneError);
                    return;
                }
                setStep(step => step+1);
                setOldStep(1);
                break;
            case 2:
                const pwdError = passwordValidator(password);
                if(pwdError)
                {
                    setError(pwdError);
                    return;
                }
                if(password !== rePwd){
                    setError(t('Password is not same'));
                    return;
                }
                getVerificationCode(phone)
                .then(code=>{
                    if(code){
                        setVerifyCode(code);
                        setStep(step => step+1);
                        setOldStep(2);
                    }
                    else{
                        setError(t('Can not get verification code.'));
                        return;
                    }
                });
                break;
            case 3:
                if(verifyCode !== verifyText){
                    setError(t('Verification code is not correct.'));
                    return;
                }
                signUpWithEmailAndPassword(name, email, password, phone)
                .then(data=>{
                    if (data.error === '') {
                        setStep(step => step+1);
                        setOldStep(3);
                    } else if (data.error === 'auth/email-already-in-use') {
                        setError(t('Same email is alreay existed.'));
                        return;
                    } else if (data.error === 'auth/weak-password'){
                        setError(t('Weak Password'));
                        return;
                    }
                    else{
                        setError(t('Something wrong, try again.'));
                        return;
                    }
                })
                break;
            case 4:
                setOldStep(4);
                hideModal();
                break;
        }
    }

    return(
        <Modal
            show={isOpen}
            onHide={hideModal}
            centered
            dialogClassName="login-modal"
            >
                <Container>
                    <div className="social">
                        <div className="close" onClick={hideModal}>
                            <AiOutlineCloseCircle className="icon"/>
                            {t('Close')}
                        </div>
                        <div>
                            <p className="text"> 
                                {t('Personal info')}
                            </p>
                            <div className="social-group">
                                <div className={step === 4? 'button active' : 'button'} 
                                    onClick={()=>onStep(4)}>
                                    <BsCheckCircle className="icon"/>
                                </div>
                                <div className={step === 3? 'button active' : 'button'} 
                                    onClick={()=>onStep(3)}>
                                    <span className="step">3</span>
                                    <span>{t('Step')}</span>
                                </div>
                                <div className={step === 2? 'button active' : 'button'} 
                                    onClick={()=>onStep(2)}>
                                    <span className="step">2</span>
                                    <span>{t('Step')}</span>
                                </div>
                                <div className={step === 1? 'button active' : 'button'} 
                                    onClick={()=>onStep(1)}>
                                    <span className="step">1</span>
                                    <span>{t('Step')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="login-img">
                        <div className="close" onClick={hideModal}>
                            <AiOutlineCloseCircle className="icon"/>
                            {t('Close')}
                        </div>
                        <div className="step-description">
                            <p className="text"> 
                                {t('Personal info')}
                            </p>
                            <div className="social-group">
                                <div className={step === 4? 'button active' : 'button'}
                                    onClick={()=>onStep(4)}>
                                    <BsCheckCircle className="icon"/>
                                </div>
                                <div className={step === 3? 'button active' : 'button'}
                                    onClick={()=>onStep(3)}>
                                    <span className="step">3</span>
                                    <span>{t('Step')}</span>
                                </div>
                                <div className={step === 2? 'button active' : 'button'}
                                    onClick={()=>onStep(2)}>
                                    <span className="step">2</span>
                                    <span>{t('Step')}</span>
                                </div>
                                <div className={step === 1? 'button active' : 'button'}
                                    onClick={()=>onStep(1)}>
                                    <span className="step">1</span>
                                    <span>{t('Step')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FadeIn delay={100} 
                        className={step ===1?"setting" : "setting disable"} 
                        transitionDuration={300} visible={step === 1}>
                        <div className="title">
                            <span>
                                {t('Sign')}
                            </span>
                            <span className="colored">
                                &nbsp;{t('up')}
                            </span>
                        </div>
                        <span className="label">
                            {t('Name')}
                        </span>
                        <input className="input" value={name}
                            onChange={e =>{
                                setName(e.target.value);
                                setError('');
                             }}/>

                        <span className="label">
                            {t('Email Address')}
                        </span>
                        <input className="input" value={email}
                            onChange={e =>{
                                setEmail(e.target.value);
                                setError('');
                            }}/>

                        <span className="label">
                            {t('Phone number')}
                        </span>
                        <PhoneInput
                            country={'ae'}
                            value={phone}
                            containerClass="phone-container"
                            inputClass="phone-input"
                            buttonClass="phone-button"
                            dropdownClass="phone-dropdown"
                            onChange={phone =>{
                                setPhone(phone);
                                setError('');
                            }}
                        />

                        <div className={error? "error-msg active": "error-msg"}>
                            {error}
                        </div>
                        
                        <div className="button-layout">
                            <StyledButton active={true} className="button"
                                onClick={onNextStep}>
                                {t('Next step')}
                            </StyledButton>
                            <div className="text-layout">
                                <span className="label">
                                    {t("I have an account")}
                                </span>
                                <span className="link" onClick={onLogin}>
                                    {t('Log in')}
                                </span>
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={100} 
                        className={step ===2?"setting" : "setting disable"} 
                        transitionDuration={300} visible={step === 2}>
                        <div className="title">
                            <span>
                                {t('Sign')}
                            </span>
                            <span className="colored">
                                &nbsp;{t('up')}
                            </span>
                        </div>
                        <span className="label">
                            {t('Password')}
                        </span>
                        <div className="password-input">
                            <input className="input" 
                                type={passwordShown? "text": "password"}
                                value={password}
                                onChange={e=>{
                                    setError('');
                                    setPassword(e.target.value);
                                }}/>
                            {
                                passwordShown? 
                                <AiOutlineEyeInvisible className="icon" onClick={togglePassword}/>:
                                <AiFillEye className="icon" onClick={togglePassword}/>
                            }
                            
                        </div>
                        <span className="label">
                            {t('Repeat password')}
                        </span>
                        <div className="password-input">
                            <input className="input" 
                                type={passwordShown? "text": "password"}
                                value={rePwd}
                                onChange={e=>{
                                    setError('');
                                    setRePwd(e.target.value);
                                }}/>
                            {
                                passwordShown? 
                                <AiOutlineEyeInvisible className="icon" onClick={togglePassword}/>:
                                <AiFillEye className="icon" onClick={togglePassword}/>
                            }
                            
                        </div>
                        <div style={{visibility:'hidden'}}> 
                            <span className="label">
                                {t('Email Address')}
                            </span>
                            <input className="input"/>
                        </div>
                        
                        <div className={error? "error-msg active": "error-msg"}>
                            {error}
                        </div>

                        <div className="button-layout">
                            <StyledButton active={true} className="button"
                                onClick={onNextStep}>
                                {t('Next step')}
                            </StyledButton>
                            <div className="text-layout">
                                <span className="label">
                                    {t("I have an account")}
                                </span>
                                <span className="link" onClick={onLogin}>
                                    {t('Log in')}
                                </span>
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={100} 
                        className={step ===3?"setting" : "setting disable"} 
                        transitionDuration={300} visible={step === 3}>
                        <div className="title"
                            style={{marginBottom: '0px'}}
                        >
                            <img src={img_verification} className="verification"/>
                        </div>
                        <span className="label">
                            {t('A verification code message has been sent to the email address provided. Please enter the email code in the box below.')}
                        </span>
                        <div style={{marginTop: '20px'}}>
                            <span className="label">
                                {t('Activation code')}
                            </span>
                            <input className="input"
                                value={verifyText}
                                onChange={e=>{
                                    setVerifyText(e.target.value);
                                    setError('');
                                }}
                            />
                        </div>
                        <div className={error? "error-msg active": "error-msg"}>
                            {error}
                        </div>
                        <div className="button-layout">
                            <StyledButton active={true} className="button"
                                onClick={onNextStep}>
                                {t('Submit')}
                            </StyledButton>
                        </div>
                    </FadeIn>
                    <FadeIn delay={100} 
                        className={step ===4? "setting" : "setting disable"} 
                        transitionDuration={300} visible={step === 4}>
                        <div className="title"
                            style={{marginBottom: '0px'}}
                        >
                            <img src={img_success} className="success"/>
                        </div>
                        <span className="label">
                            {t('A verification code message has been sent to the email address provided.')}
                        </span>
                        
                        <div className="button-layout">
                            <StyledButton active={true} className="button"
                                onClick={onLogin}
                            >
                                {t('Log in')}
                            </StyledButton>
                        </div>
                    </FadeIn>
                </Container>
        </Modal>
    );
}

export default Signup;