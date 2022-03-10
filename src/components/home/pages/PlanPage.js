import Slider from "@farbenmeer/react-spring-slider";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import StyledButton from "../../items/StyledButton";
import { useMediaQuery } from "react-responsive";
import { getMemberships } from "../../../fiebaseImp/js/membership";

const Container = styled('div')`
    padding: 3.5em 8em;
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
    .title {
        font-weight: bold;
        font-size: 4em;
        line-height: 130%;
        letter-spacing: 0.01em;
        color: #F2F2F2;
    }
    .plan-layout {
        height: 37.5em;
    }
    .plan-item {
        background: #000000;
        border-radius: 1.3em;
        height: 32.5em;
        min-height: 32.5em;
        min-width: 15em;
        width: 16%;
        display: flex;
        flex-direction: column;
        padding: 2em 1.3em 1em;
        margin-right: 1.3em;
    }
    .name-layout {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .item-dot {
        width: 0.6em;
        height: 0.6em;
        border-radius: 50%;
        margin-right: 1em;
    }
    .item-name {
        font-weight: bold;
        font-size: 1.5em;
        line-height: 1.6em;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: #F2F2F2;
    }
    .item-list {
        font-weight: normal;
        font-size: 1.1em;
        line-height: 1.4em;
        letter-spacing: 0.01em;
        color: #F2F2F2;
        height: 13.75em;
        overflow: auto;
        margin-top: 2.5em;
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
    .item-split {
        width: 100%;
        height: 1px;
        background: #2F2F2F;
        margin-top: 2.5em;
    }
    .item-purchase{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .price-layout {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0.5em 0em;
    }
    .item-price {
        font-weight: bold;
        font-size: 1.5em;
        line-height: 110%;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: #F2F2F2;
    }
    .item-duration {
        font-size: 0.8em;
        line-height: 120%;
        letter-spacing: 0.01em;
        color: #606060;
        margin-top: 0.1em;
        margin-left: 1em;
    }
    .item-button {
        width: calc(100% - 2.5em);
        margin-top: 0.3em;
        margin-right: 0px;
    }
    .plan-container {
        display: flex;
        justify-content: center;
    }
    @media (max-width: 1280px) {
        padding: 13px 80px; 

    }

    @media (max-width: 768px) {
        padding: 13px 60px;
        .pricing {
            text-align: center;
            font-size: 14px;
            margin-bottom: 0px;
        }
        .title {
            font-size: 36px;
            text-align: center;
            line-height: 100%;
            margin-top: 5px;
        }
    }
    @media (max-width: 576px){
        padding: 13px 25px; 
    }
`;

const PlanItem = (props) => {
    const {t} = useTranslation();
    const randomColor = ()=>{
        return "#" + Math.floor(Math.random()*16777215).toString(16);
    }
    return(
        <div className="plan-item">
            <div className="name-layout">
                <span className="item-dot" 
                    style={{background:randomColor()}}/>
                <span className="item-name"> {props.name} </span>
            </div>
            <ul className="item-list">
                {
                    props.description.map((item, index)=>(
                        <li key={index}>{item.text? item.text: item}</li>
                    ))
                }
            </ul>
            <div className="item-split"></div>
            <div className="item-purchase">
                <div className="price-layout">
                    <span className="item-price"> 
                        {`AED ${props.price_month}`} 
                    </span>
                    <span className="item-duration"> 
                        {t("/per month")} 
                    </span>
                </div>
                <div className="price-layout">
                    <span className="item-price"> 
                        {`AED ${props.price_week}`} 
                    </span>
                    <span className="item-duration"> 
                        {t("/per week")} 
                    </span>
                </div>
                <div className="price-layout">
                    <span className="item-price"> 
                        {`AED ${props.price_year}`} 
                    </span>
                    <span className="item-duration"> 
                        {t("/per year")} 
                    </span>
                </div>
                <StyledButton className="item-button" 
                    active={true} onClick={()=>{
                        props.onPlan();
                    }}>
                    Choose the plan
                </StyledButton>
            </div>
        </div>
    );
}
const PlanPage = ()=>{
    const {t} = useTranslation();
    const [active, setActive] = useState('');
    const [slideCnt, setSlideCnt] = useState(0);
    const [memberships, setMemberships] = useState([]);
    const is1280 = useMediaQuery({ query: "(max-width:1280px)" });
    const is768 = useMediaQuery({ query: "(max-width:768px)" });
    const is576 = useMediaQuery({ query: "(max-width:576px)" });
    const [isCentered, setIsCentered] = useState(false);
    useLayoutEffect(()=>{
        setSlideCnt(Math.min(3.8, (window.innerWidth - 240) / 280));
        setIsCentered( 4 > memberships.length);
        if(is1280){
            setSlideCnt((window.innerWidth - 240) / 280);
            setIsCentered((window.innerWidth - 240) / 280 > memberships.length);
        }
        if(is768){
            setSlideCnt((window.innerWidth - 200) / 280);
            setIsCentered((window.innerWidth - 200) / 280 > memberships.length);
        }
        if(is576){
            setSlideCnt((window.innerWidth - 90) / 280);
            setIsCentered((window.innerWidth - 90) / 280 > memberships.length);
        }
    });

    useEffect(()=>{
        getMemberships()
        .then(datas =>{
            let temp_memberships = [];
			datas.forEach((data)=>{
				temp_memberships.push({...data});
			})
			setMemberships(temp_memberships);
        })
    },[]);

    const randomColor = ()=>{
        return "#" + Math.floor(Math.random()*16777215).toString(16);
    }
    const onPlan = ()=>{
        setActive('plan');
    }

    return(
        <Container id="plan">
            <p className="pricing"> 
                {t('Pricing')} 
            </p>
            <p className="title">
                {t("Choose a Plan")} 
            </p>
            {!isCentered &&  
            <div className="plan-layout">
                <Slider
                    slidesAtOnce = { slideCnt}
                >
                    {
                        memberships.map((item, index)=>(
                            <PlanItem name={item.name} description={item.description}
                                key={index} 
                                price_month={item.monthly_amount}
                                price_week={item.weakly_amount} 
                                price_year={item.annually_amount} 
                                onPlan={onPlan}/>
                        ))
                    }         
                </Slider>
            </div>}
            {
                isCentered && 
                <div className="plan-container">
                     {
                        memberships.map((item, index)=>(
                            <PlanItem name={item.name} description={item.description}
                                key={index} price_month={item.monthly_amount}
                                price_week={item.weakly_amount} 
                                price_year={item.annually_amount}  
                                onPlan={onPlan}/>
                        ))
                    }    
                </div>
            }
        </Container>
    );
}

export default PlanPage;