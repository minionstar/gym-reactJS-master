import { t } from "i18next";
import React, { useState } from "react";
import styled from "styled-components";
import backImg from '../../../assets/images/home/HeaderIMG.png';
import StyledButton from "../../items/StyledButton";
import coolicon from "../../../assets/images/home/coolicon.png";

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    background-image: url(${backImg});
    background-size: cover;
    background-repeat: no-repeat;
    justify-content: center;
    min-height: 85vh;
    .content {
        max-width: 70%;
        padding: 0.7em 10%;
        /* margin-top: 3em; */
        margin-bottom: 0px;
        font-family: "CabinRegular";
        font-style: italic;
        font-weight: bold;
        font-size: 4.5em;
        line-height: 120%;
        letter-spacing: 0.01em;
        color: #F2F2F2;
    }
    .colored {
        color: #FECA00;
    }

    .button-group {
        display: flex;
        margin-top: 33px;
        width: fit-content;
        /* margin-bottom: 300px; */
        padding-left: 10%;
    }
    .image {
        margin-right: 15px;
        width: 14px;
        height: 18px;
    }
    @media (max-width: 1280px){
        /* background-size: contain; */
        .content {
            margin-top: 80px;
            margin-bottom: 40px;
            font-size: 45px;
        }
        .button-group {
            flex-direction: row;
        }
    }
    @media (max-width: 992px) {
        
        .content, .button-group {
            padding: 13px 80px;
            /* font-size: 3em; */
        }
        
    }
    @media (max-width: 768px) {
        justify-content: center;
        align-items: center;
        .content {
            margin-top: 190px;
            margin-bottom: 0px;
            font-family: "CabinRegular";
            font-style: italic;
            font-weight: bold;
            font-size: 36px;
            line-height: 43px;
            text-align: center;
            letter-spacing: 0.01em;
            color: #F2F2F2;
        }
        .content, .button-group{
            padding: 13px 60px;
        }
        .button-group {
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            margin-top: 35px;
            margin-right: -24px;
            margin-bottom: 100px;
            height: 140px;
            gap: 10px 0px;
        }
       
    }
    
    @media (max-width: 576px){
        .content, .button-group{
            padding: 13px 25px; 
        }
    }
`;

const FirstPage = ()=>{
    const [active, setActive] = useState('gym');
    
    const onGym = () =>{
        setActive('gym');
    }
    const onLocation = () => {
        setActive('location');
    }
    return(
        <Container id="firstpage">
            <p className="content">
                {t('Outdoor gym now open with')} 
                <span className="colored"> {t('15% discount')} </span>
            </p>
            <div className="button-group">
                <StyledButton active={active === 'gym'} onClick={onGym} > 
                    {t('Find Gym’s')}
                </StyledButton>
                <StyledButton active={active === 'location'} onClick={onLocation}>
                    <img src={coolicon} className="image"/>
                    {t('Enter location now')}
                </StyledButton>
            </div>
        </Container>
    );
}

export default FirstPage;