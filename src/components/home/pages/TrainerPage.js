import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import img_Ronan from '../../../assets/images/home/Ronan.png';
import img_Brayden from '../../../assets/images/home/Brayden.png';
import img_Devin from '../../../assets/images/home/Devin.png';
import img_Marco from '../../../assets/images/home/Marco.png';
import img_Antonio from '../../../assets/images/home/Antonio.png';

const Container = styled('div')`
    padding: 3.7em 8em 9em;
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
        align-items: flex-start;
    }
    .title {
        font-weight: bold;
        font-size: 4em;
        line-height: 100%;
        letter-spacing: 0.01em;
        color: #F2F2F2;
        width: 27.5em;
        margin-right: 3.6em;
    }
    .description {
        width: calc(100% - 27.5em);
        font-size: 0.9em;
        line-height: 160%;
        letter-spacing: 0.01em;
        color: #888888;
    }
    .trainers {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 3em;
        padding-bottom: 2.5em;
        overflow: auto;
    }
    .trainer-top {
        padding-top: 5em;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .trainer-bottom {
        padding-bottom: 5em;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .trainer-image {
        width: 11em;
        height: 11em;
        border-radius: 50%;
    }
    .trainer-name {
        font-size: 1.5em;
        line-height: 160%;
        letter-spacing: 0.01em;
        color: #F2F2F2;
    }
    .trainer-role {
        font-size: 0.8em;
        line-height: 160%;
        letter-spacing: 0.01em;
        color: #888888;
    }

    @media (max-width: 1280px) {
        padding: 13px 80px; 
        .content {
            flex-direction: column;
            align-items: center;
        }
        .title {
            width: 225px;
            text-align: center;
            font-size: 36px;
            line-height: 100%;
            margin-right: 0px;
        }
        .description {
            width: 100%;
            margin-top: 22px;
            font-size: 14px;
            line-height: 160%;
        }
    }

    @media (max-width: 768px) {
        padding: 13px 60px 100px;
        .pricing {
            text-align: center;
        }
        
    }
    @media (max-width: 576px){
        padding: 13px 25px 100px; 
    }
`;

const TrainerPage = () => {
    const {t} = useTranslation();

    return(
        <Container id="trainer">
            <p className="pricing"> 
                {t('Our trainer')} 
            </p>
            <div className="content">
                <span className="title">
                    {t('We have expert trainer')}
                </span>
                <span className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                     sed do eiusmod tempor incididunt ut labore et dolore 
                     magna aliqua. Ut enim ad minim veniam, quis nostrud 
                     exercitation ullamco laboris nisi ut aliquip ex ea 
                     commodo consequat. Duis aute irure dolor in reprehenderit 
                      voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                </span>
            </div>
            <div className="trainers">
                <div className="trainer-top">
                    <img src={img_Ronan} className="trainer-image"/>
                    <span className="trainer-name">
                        Ronan
                    </span>
                    <span className="trainer-role">
                        Cardio trainer
                    </span>
                </div>
                <div className="trainer-bottom">
                    <img src={img_Brayden} className="trainer-image"/>
                    <span className="trainer-name">
                        Brayden
                    </span>
                    <span className="trainer-role">
                        Boxing trainer
                    </span>
                </div>
                <div className="trainer-top">
                    <img src={img_Devin} className="trainer-image"/>
                    <span className="trainer-name">
                        Devin
                    </span>
                    <span className="trainer-role">
                        Fitness trainer
                    </span>
                </div>
                <div className="trainer-bottom">
                    <img src={img_Marco} className="trainer-image"/>
                    <span className="trainer-name">
                        Marco
                    </span>
                    <span className="trainer-role">
                        Dumbbell trainer
                    </span>
                </div>
                <div className="trainer-top">
                    <img src={img_Antonio} className="trainer-image"/>
                    <span className="trainer-name">
                        Antonio
                    </span>
                    <span className="trainer-role">
                        Bodybuilding Coach
                    </span>
                </div>
            </div>
        </Container>
    );
}

export default TrainerPage;