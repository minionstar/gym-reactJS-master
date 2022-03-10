import Slider from "@farbenmeer/react-spring-slider";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import img_user from '../../../assets/images/home/UserPhoto.png';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from  'react-icons/ai';

const Container = styled('div')`
    padding: 3.75em 8em;

    .containerLayout {
        background: #000000;
        border-radius: 1.5em;
        padding: 1.8em;
    }
    .content-container{
        display: flex;
        flex-direction: row;
    }
    .pricing {
        text-align: left;
        font-weight: bold;
        font-size: 1.1em;
        line-height: 1.3em;
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
        margin: 0px;
    }
    .control-panel {
        width: 18.75em;
        position: absolute;
        height: 17.5em;
        z-index: 1;
        background: black;
    }
    .content {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 17.5em; 
    }
    .personal-info {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        .image{
            width: 5em;
            height: 5em;
            border-radius: 50%;
        }
        .data{
            display:flex;
            flex-direction: column;
            justify-content: space-around;
            line-height: 160%;
            letter-spacing: 0.01em;
            margin-left: 1.4em;
           .name{
                font-size: 1.5em;
                color: #F2F2F2;
           }
           .role {
                color: #888888;
                font-size: 0.8em;
           }
        }
    }
    .content-item {
        height: 17.5em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 18.75em;
    }
    .description {
        font-size: 1.1em;
        line-height: 160%;
        letter-spacing: 0.01em;
        color: #F2F2F2;
        overflow: auto;
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
        height: 0.9em;
        color: #F2F2F2;
    }
    .arrow-bg {
        width: 1.8em;
        height: 1.8em;
        border: 1px solid #FECA00;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        position: absolute;
        bottom: -6.3em;
        margin-left: 2.5em;
    }
    @media (max-width: 1280px){
        padding: 13px 80px;
    }
    
    @media (max-width: 768px) {
        padding: 0px;
        .containerLayout {
            padding: 30px 20px;
            border-radius: 0px;
        }
        .pricing {
            text-align: center;
        }
        .control-panel {
            width: 100%;
            z-index: unset;
            height: fit-content;
            position: unset;
        }
        .title {
            text-align: center;
            width: 100%;
            font-size: 36px;
            line-height: 44px;
        }
        .content-container {
            flex-direction: column;
        }
        .content-item {
            padding: 0;
            margin-top: 30px;
        }
        .personal-info {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            margin-bottom: 30px;
            .image{
                width: 56px;
                height: 56px;
                border-radius: 50%;
            }
            .data{
                display:flex;
                flex-direction: column;
                justify-content: space-around;
                line-height: 160%;
                letter-spacing: 0.01em;
                margin-left: 22px;
                .name{
                        font-size: 24px;
                        color: #F2F2F2;
                }
                .role {
                        color: #888888;
                        font-size: 14px;
                }
            }
        }
        .arrow-bg {
            position: static;
            margin:0px;
            margin-top: 140px;
        }
        .arrow-left {
           margin-left: 35%;
        }
        .arrow-right {
            margin-right: 35%;
        }
        .content{
            height: 380px;
        }
    }
`;
const FeedbackPage = ()=>{
    const {t} = useTranslation();

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
                            style={{left:'5em'}}
                            onClick={onClick}
                        >
                            <AiOutlineArrowRight className="arrow"/>
                        </div>
                }
            </>
			
		);
	};

    return(
        <Container id="feedback">
            <div className="containerLayout">
                <p className="pricing"> 
                    {t('What our clients say')}
                </p>
                <div className="content-container">
                    <div className="control-panel">
                        <p className="title">
                            {t('Feedback')}
                        </p>
                    </div>
                    <div className="content">
                        <Slider
                            hasArrows
                            ArrowComponent={ArrowComponent}
                        >
                            <div className="content-item">
                                <div className="personal-info">
                                    <img src={img_user} className="image"/>
                                    <div className="data">
                                        <span className="name">
                                            Albert Flores
                                        </span>
                                        <span className="role">
                                            Lafayette, California
                                        </span>
                                    </div>
                                </div>
                                <p className="description">
                                    "Your company is truly upstanding and is behind 
                                    its product 100%. It's the perfect solution for our business. 
                                    It has really helped our business."
                                    "Your company is truly upstanding and is behind 
                                    its product 100%. It's the perfect solution for our business. 
                                    It has really helped our business."
                                    "Your company is truly upstanding and is behind 
                                    its product 100%. It's the perfect solution for our business. 
                                    It has really helped our business."
                                </p>
                            </div>
                                
                            <div/>
                        </Slider>
                    </div>
                </div>
                
            </div>
        </Container>
    );

}

export default FeedbackPage;