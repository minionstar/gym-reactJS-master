import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Slider from "@farbenmeer/react-spring-slider";
import StyledButton from './../../items/StyledButton';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from  'react-icons/ai';
import img_work from '../../../assets/images/home/gym-work.png';

const Container = styled('div')`
    padding: 4em 7em;
    font-family: "CabinRegular";
    font-style: normal;
    /* min-height: 100vh; */
    .pricing {
        text-align: left;
        font-weight: bold;
        font-size: 1.1em;
        line-height: 130%;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: #FFCC00;
    }
    .content {
        display: flex;
        flex-direction: row;
    }
    .describe {
        max-width: 23.5em;
        margin-right: 8%;
        display: flex;
        flex-direction: column;
        min-height: 38.75em;
        width: 23.5em;
        .bullet {
            width: 0.6em;
            height: 0.6em;
            margin: -4.5em 0.4em;
        }
    }
    .describe-item {
        display: flex;
        flex-direction: column;
    }
    .image-pad {
        width: calc(100% - 376px - 120px);
        display: flex;
        flex-direction: column;
    }
    .content-header {
        font-weight: bold;
        padding-left: 0.6em;
        font-size: 3.5em;
        line-height: 100%;
        letter-spacing: 0.01em;
        color: #F2F2F2;
    }
    .content-description {
        font-size: 0.8em;
        line-height: 160%;
        color: #888888;
        font-weight: normal;
        margin-top: 3em;
    }
    .content-list {
        font-size: 0.8em;
        line-height: 160%;
        color: #F2F2F2;
        font-weight: normal;
        padding-left: 1.3em;
        height: 11.5em;
        overflow: auto;
        li {
            margin-top: 1em;
        }
        &::-webkit-scrollbar {
            width: 0.4em;
        }
        &::-webkit-scrollbar-track {
            background-color: #888888;
            border-radius: 100px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 100px;
            background-color: #FFCC00;
            box-shadow: inset 0 0 0.4em rgba(0, 0, 0, 0.8);
        }
    }
    .arrow {
        width: 1.3em;
        height: 1em;
        color: #F2F2F2;
    }
    .arrow-bg {
        width: 2em;
        height: 2em;
        border: 1px solid #FECA00;
        border-radius: 50%;
        margin-top: 13em;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .button-group {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    .image {
        margin-top: 1.5em;
        width: 100%;
        max-height: 30em;
        border-radius: 2em;
    }
    .image-panel {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .button {
        margin-top: 1em;
    }

    .content-phone {
        .content-items {
            height: 720px;
        }
        .describe-item{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .header {
            font-size: 36px;
            line-height: 100%;
            text-align: center;
            color: #F2F2F2;
            max-width: 200px;
        }
        .image {
            max-width: 100%;
            max-height: 222px;
            margin-top: 0px;
        }
        .description {
            font-size: 14px;
            line-height: 160%;
            color: #888888;
            margin-top: 30px;
            min-height: 110px;
        }
        .content-list {
            font-size: 14px;
            line-height: 160%;
            color: #F2F2F2;
            font-weight: normal;
            padding-left: 20px;
            height: 180px;
            overflow: auto;
            li {
                margin-top: 16px;
            }
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
        .button-group {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .image-panel {
            margin-top: 30px;
        }
        .button {
            margin-right: 0px;
        }
    }
    .content-phone {
        display: none;
    }
    .bullet {
        width: 10px;
        height: 10px;
        border-radius: 100px;
        margin: -90px 5px;
        border: 1px solid white;
    }

    @media (max-width: 1280px) {
        padding: 13px 80px;
        .button-group {
            flex-direction: column;
        }
        .image-pad {
            justify-content: space-evenly;
        }
        .describe {
            margin-right: 60px;
        }
        .image-pad {
            width: calc(100% - 376px - 60px);
        }
    }

    @media (max-width: 768px) {
        padding: 13px 60px;
        .pricing {
            text-align: center;
        }
        .content {
            display: none;
        }
        .content-phone {
            display: unset;
        }
        .arrow-bg {
            margin-top: 320px;
        }
        .bullet {
            margin: -10px 5px;
        }
    }
    @media (max-width: 576px){
        padding: 13px 25px; 
    }
`
const WorkPage = () =>{
    const {t} = useTranslation();
    const [active, setActive] = useState('');

    const onSubscribe = ()=>{
        setActive('subscribe');
    }

    const onGymWhere = () =>{
        setActive('gym_where');
    }

	const BulletComponent = ({ onClick, isActive }) => (
		<li
            className="bullet"
			style={{
				opacity: !isActive && "0.5",
			}}
			onClick={onClick}
		/>
	);

	const ArrowComponent = ({ onClick, direction }) => {
		return (
            <>
                {
                    direction === 'left' && 
                        <div
                            className="arrow-bg"
                            onClick={onClick}
                        >
                            <AiOutlineArrowLeft className="arrow"/>
                        </div>
                }
                {
                    direction === 'right' &&
                        <div
                        className="arrow-bg"
                        onClick={onClick}
                    >
                        <AiOutlineArrowRight className="arrow"/>
                    </div>
                }
            </>
			
		);
	};

    return(
        <Container id="work">
            <p className="pricing"> {t("Pricing")} </p>
            <div className="content">
                <div className="describe">
                    <Slider
                        hasBullets
                        hasArrows
                        BulletComponent={BulletComponent}
                        ArrowComponent={ArrowComponent}
                    >
                        <div className="describe-item">
                            <span className="content-header"> 
                                {t("How to vigory works")} 
                            </span>
                            <span className="content-description">
                                Lorem ipsum dolor sit amet, consectetur 
                                adipiscing elit, sed do eiusmod tempor incididunt 
                                ut labore et dolore magna aliqua. Ut enim ad minim 
                                veniam, quis nostrud exercitation ullamco laboris 
                                nisi ut aliquip ex ea commodo consequat. 
                            </span>
                            <ul className="content-list">
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                                <li>
                                    Ut enim ad minim veniam, quis nostrud exercitation 
                                    ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                </li>
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                            </ul>
                        </div>
                        <div className="describe-item">
                            <span className="content-header"> 
                                {t("How to vigory works")} 
                            </span>
                            <span className="content-description">
                                Lorem ipsum dolor sit amet, consectetur 
                                adipiscing elit, sed do eiusmod tempor incididunt 
                                ut labore et dolore magna aliqua. Ut enim ad minim 
                                veniam, quis nostrud exercitation ullamco laboris 
                                nisi ut aliquip ex ea commodo consequat. 
                            </span>
                            <ul className="content-list">
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                                <li>
                                    Ut enim ad minim veniam, quis nostrud exercitation 
                                    ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                </li>
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                            </ul>
                        </div>
                    </Slider>
                    
                </div>
                <div className="image-pad">
                    <div className="button-group">
                        <StyledButton active={active === 'subscribe'} 
                            className="button"
                            onClick={onSubscribe}>
                            {t('Subscribe now')}
                        </StyledButton>
                        <StyledButton active={active === 'gym_where'}
                            className="button"
                            onClick={onGymWhere}>
                            {t('Gym’s where ever you are')}
                        </StyledButton>
                    </div>
                    <div className="image-panel">
                        <img src={img_work} className="image"/>
                    </div>
                </div>
            </div>
            <div className="content-phone">
                <div className="content-items">
                    <Slider
                        hasBullets
                        hasArrows
                        BulletComponent={BulletComponent}
                        ArrowComponent={ArrowComponent}
                    >
                        <div className="describe-item">
                            <span className="header"> 
                                {t("How to vigory works")} 
                            </span>
                            <div className="image-panel">
                                <img src={img_work} className="image"/>
                            </div>
                            <span className="description">
                                Lorem ipsum dolor sit amet, consectetur 
                                adipiscing elit, sed do eiusmod tempor incididunt 
                                ut labore et dolore magna aliqua. Ut enim ad minim 
                                veniam, quis nostrud exercitation ullamco laboris 
                                nisi ut aliquip ex ea commodo consequat. 
                            </span>
                            <ul className="content-list">
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                                <li>
                                    Ut enim ad minim veniam, quis nostrud exercitation 
                                    ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                </li>
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                            </ul>
                        </div>
                        <div className="describe-item">
                            <span className="header"> 
                                {t("How to vigory works")} 
                            </span>
                            <div className="image-panel">
                                <img src={img_work} className="image"/>
                            </div>
                            <span className="description">
                                Lorem ipsum dolor sit amet, consectetur 
                                adipiscing elit, sed do eiusmod tempor incididunt 
                                ut labore et dolore magna aliqua. Ut enim ad minim 
                                veniam, quis nostrud exercitation ullamco laboris 
                                nisi ut aliquip ex ea commodo consequat. 
                            </span>
                            <ul className="content-list">
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                                <li>
                                    Ut enim ad minim veniam, quis nostrud exercitation 
                                    ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                </li>
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                                <li>
                                    Condimentum vitae sapien mi quis
                                </li>
                            </ul>
                        </div>                    
                    </Slider>
                </div>
                
                <div className="button-group">
                    <StyledButton active={active === 'subscribe'} 
                        className="button"
                        onClick={onSubscribe}>
                        {t('Subscribe now')}
                    </StyledButton>
                    <StyledButton active={active === 'gym_where'}
                        className="button"
                        onClick={onGymWhere}>
                        {t('Gym’s where ever you are')}
                    </StyledButton>
                </div>
            </div>
        </Container>
    );
}

export default WorkPage;