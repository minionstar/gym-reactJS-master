import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import img_login from '../../../../assets/images/home/LogInFormBG.png';
import img_login_modal from '../../../../assets/images/home/LogInFormBGMobile.png';
import {AiOutlineCloseCircle, AiFillEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import { t } from "i18next";
import {FaFacebook, FaApple, FaGoogle, FaMobileAlt} from 'react-icons/fa';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import StyledButton from "../../../items/StyledButton";
import FadeIn from 'react-fade-in';
import { logInWithEmailAndPassword, loginwithGoogleAccount, loginWithApple } from "../../../../fiebaseImp/js/user";
import { emailValidator } from "../../../../helpers/emailValidator";
import { useNavigate } from "react-router-dom";

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
            background: rgba(254, 202, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            .icon{
                font-size: 20px;
                color: #FECA00;
            }
        }
    }
    .social-group {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
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
            margin-bottom: 15px;
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
            margin-bottom: 29px;
        }
       
        .button-layout {
            display: flex;
            align-items: center;
            flex-direction: column;
        }
        .splitter {
            background: #888888;
            height: 1px;
            width: 100%;
            margin-top: 20px;
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
    .login-img{
        background-image: url(${img_login_modal});
        background-size: cover;
        background-repeat: no-repeat;
        display: none;
    }
    .button-layout-mobile{
        display: none;
    }
    .error-msg {
        margin-top: 16px;
        color: red;
        font-size: 14px;
        line-height: 100%;
        padding: 0px 6px;
        visibility: hidden;
        height: 18px;
        margin-bottom: 20px;
        word-wrap: break-word;
    }
    .error-msg.active {
        visibility: visible;
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
            justify-content: flex-end;
            align-items: flex-start;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
        }
        .setting{
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
            .button-layout{
                display: none;
            }   
        }
        .button-layout-mobile{
            display: flex;
            flex-direction: column;

            .button-group{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                .signup-btn{
                    font-size: 18px;
                    line-height: 22px;
                    .arrow{
                        font-size: 12px;
                        margin-right: 12px;
                    }
                }
                .signup-btn{
                    font-size: 14px;
                    line-height: 17px;
                    padding: 16px 38px;
                    min-width: auto;
                }
            }
            .splitter{
                margin-top: 30px;
                margin-bottom: 12px;
            }
            .button{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: rgba(254, 202, 0, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 10px;
                .icon{
                    font-size: 20px;
                    color: #FECA00;
                }
            }
            .social-btn-group{
                display: flex;
                flex-direction: column;
                align-items: center;
                .text{
                    font-size: 18px;
                    line-height: 22px;
                    color: #F2F2F2;
                }
            }
        }
    }
    @media (max-width: 576px){

    }

`;

const Login = (props)=>{
    const [isOpen, setIsOpen] = useState(props.isOpen);
    const [passwordShown, setPasswordShown] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    useEffect(()=>{
        setIsOpen(props.isOpen);
    }, [props])

    const resetStates = () =>{
        setUsername('');
        setError('');
        setPasswordShown(false);
        setPassword('');    
    }

    const onSignup = () => {
        hideModal();
        props.openSignup();
    }

    const hideModal = () => {
        setIsOpen(false);
        resetStates();
        props.close();
    }
    const onLogin = ()=>{
        const emailError = emailValidator(username);
        if(emailError){
            setError(emailError);
            return;
        }
        if(password === '')
        {
            setError(t('Input password.'));
            return;
        }
        logInWithEmailAndPassword(username, password)
        .then(data =>{
           
            if(data.error !== ''){
                switch(data.error){
                    case 'auth/user-not-found':
                        setError(t('User is not found.'));
                        break;
                    case 'auth/wrong-password':
                        setError(t('Password is not correct.'));
                        break;
                    case 'auth/too-many-requests':
                        setError(t('Too many request with wrong account. Please wait.'));
                        break;
                    default:
                        setError(t('Something wrong, try again.'));
                        break;
                }
                return;
            }
            else{
                localStorage.setItem('profile',JSON.stringify(data.profile));
                localStorage.setItem('isAuthenticated', 'true');
                hideModal();
                navigate('/dashboard');
            }
        });
    }
    const onGoogle = () =>{
        loginwithGoogleAccount()
        .then(data=>{
            if(data.error === ''){
                localStorage.setItem('profile', JSON.stringify(data.profile));
                localStorage.setItem('isAuthenticated', 'true');
                hideModal();
                navigate('/dashboard');
            }
        })
    }
    const onFacebook = () => {

    }
    const onApple = () => {
        loginWithApple()
        .then(data => {
            if(data.error === ''){
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('profile', JSON.stringify(data.profile));
                hideModal();
                navigate('/dashboard');
            }
        })
    }
    const onMobile = () => {

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
                                {t('Sign in with')}
                            </p>
                            <div className="social-group">
                                <div className="button" onClick={onFacebook}>
                                    <FaFacebook className="icon"/>
                                </div>
                                <div className="button" onClick={onApple}>
                                    <FaApple className="icon"/>
                                </div>
                                <div className="button" onClick={onGoogle}>
                                    <FaGoogle className="icon"/>
                                </div>
                                <div className="button" onClick={onMobile}>
                                    <FaMobileAlt className="icon"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="login-img">
                        <div className="close" onClick={hideModal}>
                            <AiOutlineCloseCircle className="icon"/>
                            {t('Close')}
                        </div>
                    </div>
                    <FadeIn delay={100} 
                        className="setting"
                        transitionDuration={300}>
                        <div className="title">
                            <span>
                                {t('Log')}
                            </span>
                            <span className="colored">
                                &nbsp;{t('in')}
                            </span>
                        </div>
                        <span className="label">
                            {t('User name')}
                        </span>
                        <input className="input" value={username}
                            onChange={e => {
                                setError('');
                                setUsername(e.target.value);
                            }}/>
                        <div className="label-layout">
                            <span className="label">
                                {t('Password')}
                            </span>
                            <span className="label">
                                {t('Fogot password?')}
                            </span>
                        </div>
                        <div className="password-input">
                            <input className="input" value={password}
                                type={passwordShown? "text": "password"}
                                onChange= {e => {
                                    setError('');
                                    setPassword(e.target.value);
                                }}/>
                            {
                                passwordShown? 
                                <AiOutlineEyeInvisible className="icon" onClick={togglePassword}/>:
                                <AiFillEye className="icon" onClick={togglePassword}/>
                            }
                            
                        </div>
                        <div className={error? "error-msg active": "error-msg"}>
                            {error}
                        </div>
                        <div className="button-layout">
                            <StyledButton active={true} className="button"
                                onClick={onLogin}>
                                {t('Log in')}
                            </StyledButton>
                            <div className="splitter"/>
                            <span className="label">
                                {t("I don't have account")}
                            </span>
                            <span className="signup-btn"
                                onClick={onSignup}>
                                <AiOutlineArrowLeft className="arrow"/>
                                {t('Sign up')}
                            </span>
                        </div>
                        <div className="button-layout-mobile">
                            <div className="button-group">
                                <span className="signup-btn"
                                    onClick={onSignup}>
                                    <AiOutlineArrowLeft className="arrow"/>
                                    {t('Sign up')}
                                </span>
                                <StyledButton active={true} className="signup-btn">
                                    {t('Log in')}
                                </StyledButton>
                                
                            </div>
                            <div className="splitter"/>
                            <div className="social-btn-group">
                                <p className="text"> 
                                    {t('Sign in with')}
                                </p>
                                <div className="social-group">
                                    <div className="button">
                                        <FaFacebook className="icon" onClick={onFacebook}/>
                                    </div>
                                    <div className="button">
                                        <FaApple className="icon" onClick={onApple}/> 
                                    </div>
                                    <div className="button">
                                        <FaGoogle className="icon" onClick={onGoogle}/>
                                    </div>
                                    <div className="button">
                                        <FaMobileAlt className="icon" onClick={onMobile}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </Container>
        </Modal>
    );
}

export default Login;