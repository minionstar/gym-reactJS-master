import React, { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {BsCalendarWeekFill} from 'react-icons/bs';
import {AreaChart, XAxis, YAxis,CartesianGrid, Tooltip, Area, ResponsiveContainer} from 'recharts';
import {BiDumbbell} from 'react-icons/bi';
import {IoPerson} from 'react-icons/io5';
import {FaUserTie} from 'react-icons/fa';
import { useLocation } from "react-router-dom";

const Container = styled('div')`
    background: '#1C1A1D';
    width: calc(100% - 310px);
    border-left: 2px solid #1C1A1D;
    .header {
        height: 30px; 
        padding: 20px 39px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: black;
        border-bottom: 1px solid #1C1A1D;
        .title {
            font-weight: bold;
            font-size: 24px;
            line-height: 29px;
            letter-spacing: 0.01em;
            text-transform: uppercase;
            color: #F2F2F2;
        }

        .duration {
            font-weight: normal;
            font-size: 18px;
            line-height: 22px;
            letter-spacing: 0.01em;
            color: #888888;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .split {
                margin: 0px 20px;
            }
            .group{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .date{
                    margin-left: 13px;
                }
            }
        }
    } 
    .chart {
        width: 100%;
        height: 340px;
        background-color: black;
        color:#F2F2F2;
    }

    .content {
        padding: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .item-group {
            width: 380px;
            display: flex;
            flex-direction: column;
            & > * {
                margin-bottom: 20px;
            }
        }
        .item{
            padding: 20px;
            border-radius: 15px;
            background: black;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                min-width: 40px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 16px;
                font-size: 20px;

                .dumbbell {
                    color: #2F80ED;
                    border-radius: 0.8px;
                    transform: rotate(-30deg);
                }
                .trainer {
                    color: #e50f0f;
                }
                .person {
                    color: #18c36c;
                }
            }
            .text {
                width: 150px;
                font-size: 24px;
                line-height: 29px;
                letter-spacing: 0.01em;
                text-transform: uppercase;
                color: #888888;
                text-align: left;
            }
            .number {
                font-weight: bold;
                font-size: 64px;
                line-height: 100%;
                letter-spacing: 0.01em;
                text-transform: uppercase;
                word-wrap: break-word;
                color: #F2F2F2;
            }
            .number.dumbbell {
                color: #2F80ED;
            }
            .number.trainer {
                color: #e50f0f;
            }
            .number.person {
                color: #18c36c;
            }
        }
        .table-layout{
            border-radius: 15px;
            background-color: black;
            width: 100%;
            margin-left: 24px;
            padding: 20px;
            .table-header {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0px 20px;
                border-bottom: 1px solid #1C1A1D;
                .title {
                    font-size: 18px;
                    line-height: 22px;
                    color: #F2F2F2;
                }
                .button {
                    text-align: right;
                    letter-spacing: 0.01em;
                    text-transform: uppercase;
                    text-align: right;
                    letter-spacing: 0.01em;
                    text-transform: uppercase;
                    color: #888888;
                }
            }
            .table-content {
                display: flex;
                flex-direction: column;

                .table-item {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #1C1A1D;
                    padding: 5px 0;
                    font-size: 18px;
                    line-height: 22px;
                    letter-spacing: 0.01em;
                    color: #F2F2F2;
                    .user {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        .user-image {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            background-color: #1C1A1D;
                            margin-right: 16px;
                        }
                        .user-name {
                            position: relative;
                            width: 140px;
                            height: 22px;
                            overflow: hidden;
                            &:before{
                                position: absolute;
                                content: '';
                                width: 100%;
                                left: 0;
                                height: 100%;
                                top: 0;
                                background: linear-gradient(90deg, transparent, 
                                    transparent 60%,black);
                            }
                        }
                        .user-info {
                            display: none;
                            flex-direction: column;
                        }
                    }
                    .customers {
                        display: flex;
                        flex-direction: row;
                        align-items:center;
                        .label{
                            margin-left: 5px;
                            font-size: 14px;
                            line-height: 160%;
                            color: #969696;
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 1180px){
        width: 100%;
        .item-group{
            .item{
                .text {
                    font-size: 20px;
                    width: 100px;
                }
                .number {
                    font-size: 36px;
                }
            }
        }
    }
    @media (max-width: 768px) {
        .header {
            flex-direction: column;
            align-items: flex-start;
            height: unset;
            .title {
                font-size: 18px;
                margin-bottom: 22px;
            }
            .duration {
                font-size: 14px;
            }   
        }
        .content {
            padding: 10px;
            flex-direction: column;
            .item-group {
                flex-direction: row;
                width: unset;
                justify-content: space-around;
                .item{
                    padding: 10px;
                    max-width: 110px;
                    flex-direction: column;
                    & > * {
                        margin-bottom: 5px;
                    }
                    .text {
                        width: 80px;
                        font-size: 14px;
                        line-height: normal;
                        color: #F2F2F2;
                        font-weight: normal;
                    }
                }
            }
            .table-layout {
                margin-left: 0px;
                width: unset;
                .table-content {
                    .table-item {
                        font-size: 14px;
                        .user{
                            .user-info {
                                display: flex;
                                .user-name {
                                    font-size: 14px;
                                }
                                .customers {
                                    font-size: 14px;
                                }
                            }
                            .user-name.desktop {
                                display: none;
                            }
                        }
                        .customers.desktop {
                            display: none;
                        }
                    }
                }
               
            }
            
        }
    }

`;


const data = [
    {
      name: 'Jan',
      price: 13000,
    },
    {
      name: 'Feb',
      price: 10000,
    },
    {
      name: 'Mar',
      price: 5000,
    },
    {
      name: 'Apr',
      price: 14000,
    },
    {
        name: 'May',
        price: 6000,
    },
    {
        name: 'Jun',
        price: 20000,
    },
    {
        name: 'Jul',
        price: 23000,
    },
    {
        name: 'Aug',
        price: 20000,
    },
    {
        name: 'Sep',
        price: 21000,
    },
    {
        name:'Oct',
        price: 23000,
    },
    {
        name: 'Nov',
        price: 26000,
    },
    {
        name: 'Dec',
        price: 30000,
    }
  ];

const  CustomTooltip = ({ payload, label, active }) => {
    if (active) {
        return (
        <div style={{width: '100px'}}>
            <p className="label">{`${label} : AED ${payload[0].value}`}</p>
        </div>
        );
    }
    return null;
}

const TableItem = () => {
    const {t} = useTranslation();
    return(
        <div className="table-item">
            <div className="user">
                <div className="user-image"></div>
                <span className="user-name desktop">
                    Biffco Enterprises Ltd.
                </span>
                <div className="user-info">
                    <span className="user-name">
                        Biffco Enterprises Ltd.
                    </span>
                    <div className="customers">
                        <span>
                            60
                        </span>
                        <span className="label"> 
                            {t('customers')}
                        </span>
                    </div>
                </div>
            </div>
            <div className="customers desktop">
                <span>
                    60
                </span>
                <span className="label"> 
                    {t('customers')}
                </span>
            </div>
            <span>
                {'AED ' + (2456.00).toFixed(2).toLocaleString('en-US')}
            </span>
        </div>
    );
}
const Dashboard = () => {
    const {t} = useTranslation();
    const [gymNum, setGymNum] = useState(150);
    const [trainerNum, setTrainerNum] = useState(52);
    const [customerNum, setCustomerNum] = useState(1500);

    const renderCustomAxisYTick = ({ x, y, payload }) => {
        
        let text ='AED ' + 
            (payload.value % 1000? (payload.value / 1000).toFixed(1) :
                payload.value/1000)  + 'k';
        return (
          <text orientation="left"
            type="number" x={x} y={y} stroke="none" fill="#F2F2F2" 
            className="recharts-text recharts-cartesian-axis-tick-value" 
            textAnchor="end">
              <tspan x={x} dy="0.355em">
                  {text}
              </tspan>
           </text>
        );
      };
    const renderCustomAxisXTick = ({ x, y, payload }) => {
        return (
            <text orientation="bottom"
            type="number" x={x} y={y} stroke="none" fill="#F2F2F2" 
            className="recharts-text recharts-cartesian-axis-tick-value" 
            textAnchor="middle">
                <tspan x={x} dy="0.71em">
                    {payload.value}
                </tspan>
            </text>
        );
    };

    return(
        <Container>
            <div className="header">
                <span className="title">
                    {t('Dashboard')}
                </span>
                <div className="duration">
                    <div className="group">
                        <BsCalendarWeekFill/>
                        <span className="date"> September 9, 2022 </span>
                    </div>
                    <span className="split">
                        {t('to')}
                    </span>
                    <div className="group">
                        <BsCalendarWeekFill/>
                        <span className="date"> November 7, 2022 </span>
                    </div>
                </div>
            </div>
            <div className="chart">
                <ResponsiveContainer width="100%" height={340}>
                    <AreaChart data={data}
                        margin={{ top: 60, right: 30, left: 30, bottom: 15 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="30%" stopColor="#FFE402" stopOpacity={0.27}/>
                            <stop offset="95%" stopColor="#1C1A1D" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tickLine={false} axisLine={false} fill='#F2F2F2'
                          tick={renderCustomAxisXTick} />
                        <YAxis axisLine={false} tickLine={false} tick={renderCustomAxisYTick} fill='#F2F2F2'/>
                        <CartesianGrid vertical={false} stroke='#1C1A1D' />
                        <Tooltip content={<CustomTooltip/>}/>
                        <Area type="monotone" dataKey="price" stroke="#D9D9D9" fillOpacity={2} fill="url(#colorUv)" 
                            dot={{ stroke: '#D9D9D9', strokeWidth: 2 }} strokeWidth={2} />
            
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="content">
                <div className="item-group">
                    <div className="item">
                        <div className="icon" 
                            style={{backgroundColor: '#13335F'}}>
                            <BiDumbbell className="dumbbell"/>
                        </div>
                        <span className="text">
                            {t('Total GYM’s')}
                        </span>
                        <span className="number dumbbell">
                            {gymNum}
                        </span>
                    </div>
                    <div className="item">
                        <div className="icon" 
                            style={{backgroundColor: '#5E2323'}}>
                            <FaUserTie className="trainer" />
                        </div>
                        <span className="text">
                            {t('Total Trainer')}
                        </span>
                        <span className="number trainer">
                            {trainerNum}
                        </span>
                    </div>
                    <div className="item">
                        <div className="icon" 
                            style={{backgroundColor: '#104626'}}>
                            <IoPerson className="person"/>
                        </div>
                        <span className="text">
                            {t('Total Customer')}
                        </span>
                        <span className="number person">
                            {customerNum}
                        </span>
                    </div>
                </div>
                <div className="table-layout">
                    <div className="table-header">
                        <span className="title">
                            {t('Top  GYM’s')}
                        </span>
                        <span className="button">
                            {t('view all')}
                        </span>
                    </div>
                    <div className="table-content">
                       <TableItem/>
                       <TableItem/>
                       <TableItem/>
                       <TableItem/>
                       <TableItem/>
                       <TableItem/>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Dashboard;