import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import UserContext from '../../../../context/UserContext';
import { useTranslation } from "react-i18next";
import {BsPlusCircleFill} from 'react-icons/bs';
import {RiSearchEyeLine, RiPencilFill} from 'react-icons/ri';
import {IoClose, IoCheckmark} from 'react-icons/io5';
import { getMembershipNames } from "../../../../fiebaseImp/js/membership";
import { useLocation } from "react-router-dom";
import { getAllUsers, changeUserActivateState } from "../../../../fiebaseImp/js/user";
import { useNavigate } from 'react-router-dom';
import { getAllClassesForGym, updateClass } from '../../../../fiebaseImp/js/gym';
import formatDate from '../../function/function';
import AddClass from './modal/addClass';
import EditClass from './modal/editClass';
const Container = styled('div')`
    display: flex;
    width: 100%;

    flex-direction: column;
    background: #1C1A1D;
    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 20px 40px;
        height: 30px;
        background-color: black;
        .title-layout {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .title {
            font-size: 24px;
            line-height: 120%;
            text-transform: uppercase;
            font-weight: bold;
            color: #F2F2F2;
            margin-right: 25px;
        }
        .button {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 14px;
            line-height: 17px;
            letter-spacing: 0.01em;
            text-transform: uppercase;
            color: #FECA00;
            .icon {
                font-size: 16px;
                margin-right: 14px;
            }
        }
        .location {
            display: flex;
            flex-direction: row;
            font-size: 14px;
            line-height: 17px;
            letter-spacing: 0.01em;
            color: #888888;
            margin-left: 20px;
        }
        .search {
            width: 260px;
            height: 50px;
            background: #1C1A1D;
            border: 1px solid #888888;
            box-sizing: border-box;
            border-radius: 12px;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0px 20px;
            font-size: 18px;
            line-height: 100%;
            color: #3E3E3E;
            .icon {
                font-size: 22px;
                margin-right: 12px;
            }
            .input {
                width: 100%;
                background: #1C1A1D;
                border: none;
                color: #888888;

                &:focus-visible {
                    outline: none;
                } 
            }
        }
    }
    .content {
        padding: 45px 40px;
        display: flex;
        flex-direction: column;
        .table-header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            line-height: 160%;
            letter-spacing: 0.01em;
            color: #888888;
            padding-bottom: 10px;
            border-bottom: 1px solid #4F4F4F;
        }
        .name {
            width: 100%;
            max-width: 300px;
            min-width: 150px;
        }
        .start-date {
            width: 100%;
            max-width: 300px;
            min-width: 150px;
        }
        .end-date {
            width: 100%;
            max-width: 300px;
            min-width: 150px;
        }
        .duration {
            width: 100%;
            max-width: 150px;
            min-width: 150px;
        }
        .capacity {
            width: 100%;
            min-width: 150px;
        }
        .type {
            width: 100%;
            max-width: 400px;
            min-width: 100px;
        }
        .controls {
            width: 100%;
            padding-right: 10px;
            max-width: 120px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .edit {
                width: 34px;
                height: 34px;
                border-radius: 50%;
                background-color: #333333;
                color: #2F80ED;
                font-size: 20px;
                display: flex;
                justify-content: center;
                align-items: center;

                &:active, &:hover {
                    background-color: #1F2F46;
                }
            }
            .activate {
                width: 73px;
                height: 32px;
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                line-height: 160%;
                background: #1E382A;
                color: #27AE60;
            }
            .activate.disable{
                background: #462224;
                color:#F03F3F;
            }
        }
        .table-content {
            display: flex;
            flex-direction: column;
            font-size: 14px;
            line-height: 160%;
            color: #D6D6D6;
            max-height: calc(100vh - 200px);
            overflow: auto;
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
            .table-row{
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 12px 0px;
                border-bottom: 1px solid #4F4F4F;
            }
        }
    }
    .control-group {
        display: none;
    }
    .controls-mobile {
        display: none;
    }
    .controls-blank {
        display: none;
        min-width: 110px;
    }
    @media (max-width: 768px){
        .header {
            flex-direction: column;
            height: unset;
            background: #1C1A1D;
            padding: 15px 20px;
            .title-layout{
                justify-content: space-between;
            }
            .search{
                margin-top: 15px;
                width: 100%;
            }
        }
        .content-layout {
            position: relative;
        }
        .content {
            border: 1px solid #4F4F4F;
            border-radius: 15px;
            margin-left: 10px;
            margin-right: 10px;
            padding: 20px 10px;
            overflow: auto;
            flex: 0 1 auto;
            .controls {
                display: none;
            }
            .controls-blank {
                display: unset;
            }
            .table-header {
                padding-bottom: 0px;
                border-bottom: none;
                & > * {
                    padding-bottom: 10px;
                    border-bottom: 1px solid #4F4F4F;
                }
                .controls-mobile{
                    display: unset;
                    position: absolute;
                    min-width:100px;
                    right: 11px;
                }
            }
            .table-content {
                max-height: unset;
                overflow: none;
                .table-row{
                    padding-bottom: 0px;
                    border-bottom: none;
                    & > * {
                        padding-bottom: 10px;
                        border-bottom: 1px solid #4F4F4F;
                    }
                    .controls-mobile {
                        display: unset;
                        position: absolute;
                        right: 11px;
                        width: 100px;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        padding-bottom: 4px;
                        .edit {
                            font-size: 24px;
                            color:#2F80ED;
                            margin-right: 16px;
                        }
                        .activate {
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 14px;
                            line-height: 160%;
                            background: #1E382A;
                            color: #27AE60;
                        }
                        .activate.disable{
                            background: #462224;
                            color:#F03F3F;
                        }
                    }
                }
            }
        }
        .control-group {
            width: 100px;
            height: 100%;
            display: unset;
            background: #000000;
            position: absolute;
            right: 0px;
            border-top-right-radius: 15px;
            border-bottom-right-radius: 15px;
            margin-right: 10px;
            border: 1px solid #4F4F4F;
            border-left: none;
        }
    }
`;

const TableRow = ({content, activate, edit}) => {
    const {t} = useTranslation();
    const onClickActivate = () =>{
        activate(content.id, !content.activated);
    }
    
    return(
        <div className="table-row">
            <span className="name">
                {content.name}
            </span>
            <span className="start-date">
                {formatDate(content.starts_date.seconds * 1000)}
            </span>
            <span className="end-date">
                {formatDate(content.ends_date.seconds * 1000)}
            </span>
            <span className="duration">
                {content.duration}
            </span>
            <span className="capacity">
                {content.capacity}
            </span>
            <div className="controls">
                <span className="edit" onClick={()=>edit(content)}>
                    <RiPencilFill/>
                </span>
                <span 
                    className={content.activated? "activate": "activate disable"}
                    onClick={()=>onClickActivate()}>
                    {content.activated? t('Activate'): t('Deactive')}
                </span>
            </div>
            <div className="controls-blank">
                &nbsp;
            </div>
            <div className="controls-mobile">
                <span className="edit" onClick={()=>edit(content)}>
                    <RiPencilFill/>
                </span>
                {
                    content.activated? 
                    <span className="activate" 
                        onClick={()=>onClickActivate()}>
                        <IoCheckmark/>
                    </span>
                    : <span className="activate disable"
                        onClick={()=>onClickActivate()}>
                        <IoClose />
                    </span>
                }
               
            </div>
        </div>
    )
}
const ManageClass = () => {
    const user = JSON.parse(localStorage.getItem('state'));
    const {t} = useTranslation();
    const [classes, setClasses] = useState([]);
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editContent, setEditContent] = useState(false);
    useEffect(()=>{
        getClassesData();
    }, []);

    const getClassesData = () => {
        getAllClassesForGym(user.content.qrCode)
        .then(data => {
            console.log(data);
            setClasses(data);
        })
    }

    const closeAddModal = () => {
        setIsAdd(false);
    }
    const openAddModal = ()=>{
        setIsAdd(true);
    }
    const openEditModal = (item) => {
        setEditContent(item);
        setIsEdit(true);
    }
    const closeEditModal = () => {
        setIsEdit(false);
    }
    const onActivate = (gymId, activation) => {
        updateClass(user.content.qrCode, gymId, {
            activated: activation
        }).then(data => {
            if(data.success)
            {
                getClassesData();
            }
        })
    }
    return(
        <Container>
            <div className="header">
                <div className="title-layout">
                    <span className="title">
                        {JSON.parse(localStorage.getItem('state')).content.name}
                    </span>
                    <span className="button" onClick={()=>openAddModal()}>
                        <BsPlusCircleFill className="icon"/>
                        {t('Add Class')}
                    </span>
                </div>
                <span className="location">
                    {JSON.parse(localStorage.getItem('state')).content.address}
                </span>
            </div>
            <div className="content-layout">
                <div className="control-group"/>
                <div className="content">
                    <div className="table-header">
                        <span className="name">
                            {t('Name')}
                        </span>
                        <span className="start-date">
                            {t('Start Date')}
                        </span>
                        <span className="end-date">
                            {t('End Date')}
                        </span>
                        <span className="duration">
                            {t('Duration')}
                        </span>
                        <span className="capacity">
                            {t('Capacity')}
                        </span>
                        <span className="controls">
                            &nbsp;
                        </span>
                        <span className="controls-blank">
                            &nbsp;
                        </span>
                        <span className="controls-mobile">
                            &nbsp;
                        </span>
                    </div>
                    <div className="table-content">
                        {
                            classes.map((item, index) => (
                                <TableRow key={index} content={item} activate={onActivate}
                                 edit={openEditModal}  />
                            ))
                        }
                    </div>
                </div>
            </div>
            <AddClass isOpen={isAdd} close={closeAddModal} refresh={getClassesData}/>
            <EditClass isOpen={isEdit} close={closeEditModal} refresh={getClassesData}
                content={editContent}/>
        </Container>
    );
}

export default ManageClass;