import React, { useLayoutEffect,useState} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import StyledButton from './../../items/StyledButton';
import { useMediaQuery } from "react-responsive";
import img_blog1 from '../../../assets/images/home/blog1.png';
import img_blog2 from '../../../assets/images/home/blog2.png';
import img_blog3 from '../../../assets/images/home/blog3.png';
import img_blog4 from '../../../assets/images/home/blog4.png';
import Slider from "@farbenmeer/react-spring-slider";

const Container = styled('div')`
    padding: 3.75em 8em;
    .pricing {
        text-align: left;
        font-weight: bold;
        font-size: 1.1em;
        line-height: 130%;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: #FFCC00;
    }
    .header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-end;
    }
    .title {
        font-weight: bold;
        font-size: 4em;
        line-height: 100%;
        letter-spacing: 0.01em;
        color: #F2F2F2;
        margin-right: 3.75em;
    }
    .content {
        display: flex;
        flex-direction: row;
        margin-top: 3.5em;
        justify-content: space-between;
        height: 31.25em;
    }
    
    .item {
        display: flex;
        flex-direction: column;
        /* width: 280px; */
        margin-right: 1.3em;
        .image {
            width: 17.5em; 
            height: 17.5em;
            border-radius: 1.3em;
        }
        .content {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            height: 11em;
            margin-top: 1em;
        }
        .title {
            font-size: 1.5em;
            line-height: 130%;
            letter-spacing: 0.01em;
            color: #F2F2F2;
        }
        .description {
            margin-top:1.3em;
            font-size: 0.8em;
            line-height: 160%;
            color: #888888;
            position: relative;
            height: 6.4em;
            overflow: hidden;
            &:before{
                position: absolute;
                content: '';
                width: 100%;
                left: 0;
                height: 100%;
                top: 0;
                background: linear-gradient(180deg, transparent, 
                    transparent 60%,#1c1a1d);
            }
        }
        .date {
            color: #888888;
            font-size: 0.8em;
            line-height: 160%;
        }
    }
    .btn-mobile {
        display: none;
    }
    .btn-layout {
        display: none;
    }
    .content-container {
        display: flex;
        justify-content: center;
        margin-top: 2.5em;
    }
    @media (max-width: 1280px) {
        padding: 13px 80px; 
    }

    @media (max-width: 768px) {
        padding: 13px 60px;
        .pricing {
            text-align: center;
        }
        .btn-desktop{
            display: none;
        }
        .header{
            justify-content: center;

            .title{
                margin-right: 0px;
            }
        }
        .btn-mobile {
            display: unset;
            text-align: center;
            margin-bottom: 30px;
        }
        .btn-layout {
            display: unset;
            display: flex;
            justify-content: center;
            margin-top: 60px;
        }
    }
    @media (max-width: 576px){
        padding: 13px 25px; 
    }
`;
const BlogPage = ()=>{
    const {t} = useTranslation();
    const [slideCnt, setSlideCnt] = useState(0);
    const is1280 = useMediaQuery({ query: "(max-width:1280px)" });
    const is768 = useMediaQuery({ query: "(max-width:768px)" });
    const is576 = useMediaQuery({ query: "(max-width:576px)" });
    const blogLength = 4;
    const [isCentered, setIsCentered] = useState(false);
    useLayoutEffect(()=>{
        setSlideCnt((window.innerWidth - 320) / 280);
        setIsCentered((window.innerWidth - 320) / 280 > blogLength);
        if(is1280){
            setSlideCnt((window.innerWidth - 240) / 280);
            setIsCentered((window.innerWidth - 240) / 280 > blogLength);
        }
        if(is768){
            setSlideCnt((window.innerWidth - 200) / 280);
            setIsCentered((window.innerWidth - 200) / 280 > blogLength);
        }
        if(is576){
            setSlideCnt((window.innerWidth - 90) / 280);
            setIsCentered((window.innerWidth - 90) / 280 > blogLength);
        }
    })
    return(
        <Container>
            <p className="pricing"> 
                {t('About body')}
            </p>
            <div className="header">
                <span className="title">
                    {t('Our Blog')}
                </span>
                <StyledButton active={true} className="btn-desktop">
                    {t('View all')}
                </StyledButton>
            </div>
            {!isCentered && 
            <div className="content">
                <Slider
                    slidesAtOnce = { slideCnt}
                >
                    <div className="item">
                        <img src={img_blog1} className="image"/>
                        <div className="content">
                            <span className="title">
                                ABS of steel
                            </span>
                            <div className="description">
                                10 technologies that will transform the global
                                economy by 2025 
                                Learn what it takes to hire and inspire 
                                your talent with an employee-centric
                                organizational model. 
                            </div>
                        </div>
                        <span className="date">
                            1 Feb, 2020
                        </span>
                    </div>
                    <div className="item">
                        <img src={img_blog2} className="image"/>
                        <div className="content">
                            <span className="title">
                                Total body conditioning
                            </span>
                            <div className="description">
                                Learn what it takes to hire and inspire your 
                                talent with an employee-centric organizational model. 
                                Get our free guide: 5 keys to successful organizational 
                                design  
                            </div>
                        </div>
                        <span className="date">
                            8 Sep, 2020
                        </span>
                    </div>
                    <div className="item">
                        <img src={img_blog3} className="image"/>
                        <div className="content">
                            <span className="title">
                                Body blast
                            </span>
                            <div className="description">
                                The key to surviving this new industrial revolution is 
                                leading it. That requires two key elements of agile businesses:
                                awareness of disruptive technology and a plan to develop 
                                talent that can make the most of it. 
                            </div>
                        </div>
                        <span className="date">
                            21 Sep, 2020
                        </span>
                    </div>
                    <div className="item">
                        <img src={img_blog4} className="image"/>
                        <div className="content">
                            <span className="title">
                                Flow & restore yoga
                            </span>
                            <div className="description">
                                With so many technologies emerging on 
                                so many fronts, it’s a challenge to keep up. 
                                Every advance is billed as “the next big thing.
                                ” Combining a report by The McKinsey Global Institute
                                and knowledge of 
                            </div>
                        </div>
                        <span className="date">
                            24 May, 2020
                        </span>
                    </div>
                </Slider>
            </div>
            }
            {
                isCentered && 
                <div className="content-container">
                    <div className="item">
                        <img src={img_blog1} className="image"/>
                        <div className="content">
                            <span className="title">
                                ABS of steel
                            </span>
                            <div className="description">
                                10 technologies that will transform the global
                                economy by 2025 
                                Learn what it takes to hire and inspire 
                                your talent with an employee-centric
                                organizational model. 
                            </div>
                        </div>
                        <span className="date">
                            1 Feb, 2020
                        </span>
                    </div>
                    <div className="item">
                        <img src={img_blog2} className="image"/>
                        <div className="content">
                            <span className="title">
                                Total body conditioning
                            </span>
                            <div className="description">
                                Learn what it takes to hire and inspire your 
                                talent with an employee-centric organizational model. 
                                Get our free guide: 5 keys to successful organizational 
                                design  
                            </div>
                        </div>
                        <span className="date">
                            8 Sep, 2020
                        </span>
                    </div>
                    <div className="item">
                        <img src={img_blog3} className="image"/>
                        <div className="content">
                            <span className="title">
                                Body blast
                            </span>
                            <div className="description">
                                The key to surviving this new industrial revolution is 
                                leading it. That requires two key elements of agile businesses:
                                awareness of disruptive technology and a plan to develop 
                                talent that can make the most of it. 
                            </div>
                        </div>
                        <span className="date">
                            21 Sep, 2020
                        </span>
                    </div>
                    <div className="item">
                        <img src={img_blog4} className="image"/>
                        <div className="content">
                            <span className="title">
                                Flow & restore yoga
                            </span>
                            <div className="description">
                                With so many technologies emerging on 
                                so many fronts, it’s a challenge to keep up. 
                                Every advance is billed as “the next big thing.
                                ” Combining a report by The McKinsey Global Institute
                                and knowledge of 
                            </div>
                        </div>
                        <span className="date">
                            24 May, 2020
                        </span>
                    </div>
            </div>
            }
            <div className="btn-layout">
                <StyledButton active={true} className="btn-mobile">
                    {t('View all Articles')}
                </StyledButton>
            </div>
           
        </Container>
    );
}

export default BlogPage;