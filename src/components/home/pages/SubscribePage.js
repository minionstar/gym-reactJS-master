import { t } from "i18next";
import React from "react";
import styled from "styled-components";
import StyledButton from "../../items/StyledButton";
import {FaReddit} from "react-icons/fa";
import {IoMdPaperPlane, IoLogoYoutube, IoLogoFacebook,IoLogoInstagram, IoLogoTwitter} from 'react-icons/io';
const Container = styled('div')`
    padding: 3.75em 8em 0px;
    margin-top: 5em;
    .containerLayout {
        background: black;
        border-radius: 1.3em 1.3em 0px 0px;
        padding: 1.8em;
        display: flex;
        flex-direction: row;
        justify-content: space-between; 
    }
    .input {
        background: #000000;
        border: 1px solid #888888;
        border-radius: 0.6em;
        height: 3.1em;
        width: 13em;
        padding: 0px 0.6em;
        color: #888888;
    }
    .title{
        font-weight: bold;
        font-size: 1.5em;
        line-height: 130%;
        letter-spacing: 0.01em;
        color: #FECA00;
        width: 9em;
        margin-right: 1.3em;
    }
    .label {
        font-size: 0.8em;
        line-height: 100%;
        letter-spacing: 0.01em;
        color: #888888;
    }
    
    .newsletter {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    .social {
        display: flex;
        justify-content: center;
        align-items: flex-end;

        .item {
            color: #888888;
            font-size: 1.6em;
            margin-right: 1.9em;
            &:hover {
                color: #F2F2F2;
            } 
        }
    }
    .button {
        margin-left: 1.3em;
    }
    .plane {
        margin-left: 0.6em;
        font-size: 1.5em;
    }
    .social-layout {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    @media (max-width: 1280px) {
        padding: 13px 80px; 
        .containerLayout {
            flex-direction: column;
        }
        .social-layout {
            align-items: center;
            margin-top: 20px;
        }
        .title {
            font-size: 24px;
            line-height: 130%;
        }
    }

    @media (max-width: 800px) {
        padding: 13px 60px;
    }
    @media (max-width: 768px){
        padding: 0px;
        .containerLayout {
            border-radius: 0px;
        }
        .newsletter {
            flex-direction: column;
            align-items: center;
        }
        .title{
            text-align: center;
            margin-bottom: 16px;
        }
        .input {
            margin-bottom: 16px;
            width: 280px;
        }
    }
`;

const SubscribePage = () => {
    return(
        <Container id="subscribe">
            <div className="containerLayout">
                <div className="newsletter">
                    <span className="title">
                        {t('Subscribe to our newsletter')}
                    </span>
                    <div>
                        <p className="label">
                            {t('Enter your email address')}
                        </p>
                        <input className="input"/>
                    </div>
                    <StyledButton active={true} className="button">
                        {t('subscribe')}
                        <IoMdPaperPlane className="plane"/>
                    </StyledButton>
                </div>
                <div className="social-layout">
                    <p className="label">
                        {t('Visit our social media ')}
                    </p>
                    <div className="social">
                        <IoLogoYoutube className="item"/>
                        <IoLogoFacebook className="item" />
                        <IoLogoInstagram className="item" />
                        <FaReddit className="item"/>
                        <IoLogoTwitter className="item"/>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default SubscribePage;