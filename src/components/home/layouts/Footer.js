import { t } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {FaRegEnvelope} from 'react-icons/fa';
import {HiOutlinePhone} from 'react-icons/hi';
import {GiPositionMarker} from 'react-icons/gi';

const Container = styled('div')`
    .containerLayout{
        border-top: 2px solid black;
        border-bottom: 2px solid black;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 2.5em 8em;

        .contact {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .item {
                font-size: 1.1em;
                line-height: 100%;
                color: #888888;
                margin-bottom: 1em;

                &:hover, &:active {
                    color: #F2F2F2;
                }
            }
        }
        .address {
            display: flex;
            flex-direction: column;
            .title {
                font-size: 1.5em;
                line-height: 100%;
                color: #F2F2F2;
                margin-bottom: 1.5em;
            }
            .block {
                margin-bottom: 1.5em;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                
                .content {
                    display: flex;
                    flex-direction: column;
                }
            }
            .label {
                font-size: 0.8em;
                line-height: 100%;
                letter-spacing: 0.01em;
                color: #888888;
                margin-bottom: 0.5em;
            }
            .text {
                font-size: 1.1em;
                line-height: 100%;
                color: #F2F2F2;
                margin-bottom: 0.5em;
                max-width: 15em;
                word-wrap: break-word;
            }
            .icon {
                font-size: 1em;
                color: #FECA00;
                margin-right: 0.8em;
                padding-top: 1.4em;
            }
        }
        
    }
    .copyright{
        padding: 1em 8em;

        .text{
            font-size: 1.1em;
            line-height: 100%;
            letter-spacing: 0.01em;
            color: #888888;
        }
    }
    .contact.mobile{
        display: none;
    }

    @media (max-width: 1280px) {
        .copyright{
            padding: 15px 80px;
        }
        .containerLayout{
            padding: 40px 80px;
            .address{
                .text{
                    max-width: 140px;
                }
            }

        }
    }

    @media (max-width: 768px) {
        .containerLayout {
            padding: 40px 60px;
            flex-direction: column;
            .address{
                .text{
                    max-width: 100%;
                }
            }
        }
        .copyright{
            padding: 15px 60px;
        }
        .contact.desktop {
            display: none;
        }
        .contact.mobile {
            display: flex;
        }
    }
`;

const Footer = () => {
    const {t} = useTranslation();
    return(
        <Container>
            <div className="containerLayout">
                <div className="contact desktop">
                    <span className="item">
                        {t('About us')}
                    </span>
                    <span className="item">
                        {t('Blogs')}
                    </span>
                    <span className="item">
                        {t('Shop')}
                    </span>
                    <span className="item">
                        {t('Cart')}
                    </span>
                    <span className="item">
                        {t('Wishlist')}
                    </span>
                    <span className="item">
                        {t('Cardio ClassNames')}
                    </span>
                    <span className="item">
                        {t('Lifting Weight')}
                    </span>
                </div>
                <div className="address">
                    <span className="title">
                        {t('Get in touch')}
                    </span>
                    <div className="block">
                        <FaRegEnvelope className="icon"/>
                        <div className="content">
                            <span className="label">
                                {t('Email')}
                            </span>
                            <span className="text">
                                debbie.baker@example.com
                            </span>
                        </div>
                    </div>
                    <div className="block">
                        <HiOutlinePhone className="icon"/>
                        <div className="content">
                            <span className="label">
                                {t('Phone')}
                            </span>
                            <span className="text">
                                (217) 555-0113
                            </span>
                            <span className="text">
                                (217) 555-0118
                            </span>
                        </div>
                    </div> 
                </div>
                <div className="address">
                    <span className="title">
                        {t('New York')}
                    </span>
                    <div className="block">
                        <GiPositionMarker className="icon"/>
                        <div className="content">
                            <span className="label">
                                {t('Address')}
                            </span>
                            <span className="text">
                                8584 North Homestead Court Brooklyn
                            </span>
                        </div>
                    </div>
                    <div className="block">
                        <HiOutlinePhone className="icon"/>
                        <div className="content">
                            <span className="label">
                                {t('Phone')}
                            </span>
                            <span className="text">
                                (684) 555-0102
                            </span>
                        </div>
                    </div> 
                </div>
                <div className="address">
                    <span className="title">
                        {t('Kingston')}
                    </span>
                    <div className="block">
                        <GiPositionMarker className="icon"/>
                        <div className="content">
                            <span className="label">
                                {t('Address')}
                            </span>
                            <span className="text">
                                90 School Lane Kingston Upon Thames KT96 4GR
                            </span>
                        </div>
                    </div>
                    <div className="block">
                        <HiOutlinePhone className="icon"/>
                        <div className="content">
                            <span className="label">
                                {t('Phone')}
                            </span>
                            <span className="text">
                                (208) 555-0112
                            </span>
                        </div>
                    </div> 
                </div>
                <div className="contact mobile">
                    <span className="item">
                        {t('About us')}
                    </span>
                    <span className="item">
                        {t('Blogs')}
                    </span>
                    <span className="item">
                        {t('Shop')}
                    </span>
                    <span className="item">
                        {t('Cart')}
                    </span>
                    <span className="item">
                        {t('Wishlist')}
                    </span>
                    <span className="item">
                        {t('Cardio ClassNames')}
                    </span>
                    <span className="item">
                        {t('Lifting Weight')}
                    </span>
                </div>
            </div>
            <div className="copyright">
                <span className="text">
                    Copyright © 2022. All right reserved.
                </span>
            </div>
        </Container>
    );
}

export default Footer;