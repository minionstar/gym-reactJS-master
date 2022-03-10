import { t } from "i18next";
import React from "react";
import styled from "styled-components";
import Circle from "../../items/Circle";
import StyledButton from "../../items/StyledButton";
import {IoLogoAppleAppstore, IoLogoGooglePlaystore} from 'react-icons/io5';
import img_phone from '../../../assets/images/home/phone.png';
const Container = styled('div')`
    padding: 3.75em 8em;
    position: relative;
    height: 48.75em;
    display: flex;
    align-items: center;
    width: calc(100% - 16em);
    
    .pricing {
        text-align: left;
        font-weight: bold;
        font-size: 1.1em;
        line-height: 1.4em;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: #FFCC00;
    }
    .title {
        font-weight: bold;
        font-size: 4em;
        line-height: 100%;
        letter-spacing: 0.01em;
        color: #F2F2F2;
        /* width: 27.5em; */
        margin: 0px;
    }
    .content {
        height: 24em;
        width: 40%;
        background: #000000;
        border-radius: 1.5em;
        padding: 2.5em 1.8em;
        padding-right: calc(100% - 31.25em);
        display: flex;
        flex-direction: column;
        gap: 0.5em 0em;
    }
    .image-wrapper  {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 7.5em;
    }
    .image {
        /* position: absolute; */
        width: 48.75em;
        height: 48.75em;
    }
    .description {
        font-size: 0.8em;
        line-height: 160%;
        letter-spacing: 0.01em;
        color: #FFFFFF;
        opacity: 0.5;
        margin-top: 1.8em;
    }
    .download-text{
        font-size: 1.1em;
        line-height: 160%;
        letter-spacing: 0.01em;
        color: #FFFFFF;
    }
    .button-layout {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .icon {
        color: #FFCC00;
        margin-right: 0.7em;
        font-size: 1.7em;
    }
    .text {
        font-size: 0.8em;
        line-height: 160%;
        letter-spacing: 0.01em;
        color: rgba(255, 255, 255, 0.7);
        opacity: 0.5;
        margin: 0px 1em;
    }
    .button {
        margin-right: 0px;
    }
    @media (max-width: 1280px) {
        margin-top: 200px;
        padding: 13px 80px;
        height: auto;

        .pricing {
            text-align: center;
        }
        .image-wrapper{
            right: 0px;
            top: -160px;
            width: 490px;
            height: 490px;
            left: calc(50% - 270px);
        }
        .image {
            width: 490px;
            height: 490px;
        }
        .content{
            padding: 30px;
            height: auto;
            padding-top: 300px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .title {
            width: 160px;
            font-size: 36px;
            line-height: 100%;
            text-align: center;
        }
        .description {
            max-width: 450px;
        }
        .text {
            display: none;
        }
        .button-layout{
            flex-direction: column;
            .button {
                margin-top: 16px;
            }
        }
    }

    @media (max-width: 768px) {
        padding: 0px;
        .content{
            border-radius: 0px;
        }
        .image {
            width: 360px;
            height: 360px;
        }
    }

`;

const DownloadPage = ()=>{
    return(
        <Container id="download">
            <div className="content">
                <p className="pricing">
                    {t('Our trainer')}
                </p>
                <p className="title">
                    {t('Download the app')}
                </p>
                <p className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna 
                    aliqua.
                </p>
                <p className="download-text">
                    {t('Download on')}
                </p>
                <div className="button-layout">
                    <StyledButton className="button">
                        <IoLogoAppleAppstore className="icon"/>
                        {t('App store')}
                    </StyledButton>
                    <span className="text">
                        or
                    </span>
                    <StyledButton className="button">
                        <IoLogoGooglePlaystore className="icon" />
                        {t('Google Play')}
                    </StyledButton>
                </div>
            </div>
            <div className="image-wrapper">
                {/* <Circle size={'780px'} right={'130px'}/>
                <Circle size={'633.6px'} right={'203.2px'}/>
                <Circle size={'521.36px'} right={'259.32px'}/>
                <Circle size={'406.67px'} right={'316.26px'}/> */}
                <img src={img_phone} className="image" />
            </div>
            
        </Container>
    );
}

export default DownloadPage;