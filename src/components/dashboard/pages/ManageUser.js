import React, {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {BsPlusCircleFill} from 'react-icons/bs';
import {RiSearchEyeLine, RiPencilFill} from 'react-icons/ri';
import {IoClose, IoCheckmark} from 'react-icons/io5';
import AddUser from "./modal/addUser";
import { getMembershipNames } from "../../../fiebaseImp/js/membership";
import { useLocation } from "react-router-dom";
import { getAllUsers } from "../../../fiebaseImp/js/user";
import { changeUserActivateState } from "../../../fiebaseImp/js/user";
import { useNavigate } from 'react-router-dom';

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
        .surename {
            width: 100%;
            max-width: 300px;
            min-width: 150px;
        }
        .username {
            width: 100%;
            max-width: 300px;
            min-width: 150px;
        }
        .mobile {
            width: 100%;
            max-width: 150px;
            min-width: 150px;
        }
        .membership {
            width: 100%;
            min-width: 200px;
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

const TableRow = ({content, memberships, openEdit, onActivate}) => {
    const {t} = useTranslation();
    const [membership, setMembership] = useState('');
    const [description, setDescription] = useState('');
    useEffect(()=>{
        for(let i = 0; i < memberships.length; i++)
        {
            if(memberships[i].value === content.membership){
                setMembership(memberships[i].label);
                setDescription(memberships[i].description);
                break;
            }
        }
    }, [content]);

    const onClickActivate = () => {
        onActivate(content.id, !content.activated);
    }
    
    return(
        <div className="table-row">
            <span className="surename">
                {content.surename}
            </span>
            <span className="username">
                {content.username}
            </span>
            <span className="mobile">
                {content.mobile}
            </span>
            <span className="type">
                {content.type}
            </span>
            <span className="membership">
                {membership}
            </span>
            <div className="controls">
                <span className="edit" onClick={()=>openEdit(content, membership, description)}>
                    <RiPencilFill/>
                </span>
                <span 
                    className={content.activated? "activate": "activate disable"}
                    onClick={onClickActivate}>
                    {content.activated? t('Activate'): t('Deactive')}
                </span>
            </div>
            <div className="controls-blank">
                &nbsp;
            </div>
            <div className="controls-mobile">
                <span className="edit" onClick={()=>openEdit(content, membership, description)}>
                    <RiPencilFill/>
                </span>
                {
                    content.activated? 
                    <span className="activate" 
                        onClick={onClickActivate}>
                        <IoCheckmark/>
                    </span>
                    : <span className="activate disable"
                        onClick={onClickActivate}>
                        <IoClose />
                    </span>
                }
               
            </div>
        </div>
    )
}
const ManageUser = ()=> {
    const {t} = useTranslation();
    const [isAdd, setIsAdd] = useState(false);
    const {path} = useLocation();
    const [memberships, setMemberships] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [content,setContent] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        getMembershipNames()
        .then(data => {
            setMemberships(data);
        });
        getUsers();
    },[path]);

    const getUsers = () => {
        getAllUsers()
        .then(data => {
            setUsers(data);
            setContent(data);
        });
    }
    
    const openAddModal = () => {
        setIsAdd(true)
    }
    
    const closeAddModal = () => {
        setIsAdd(false);
    }
    const openEdit = (content, membership, description) => {
        navigate('/edituser', {state:{...content,
            membership: membership, 
            description: description}});
    }
    const onSearch = (e) =>{
        setSearch(e.target.value);
        let temp = [];
        users.forEach( item=> {
            if(item.username && item.username.toLowerCase().includes(e.target.value.toLowerCase())){
                temp.push(item);
            }
        });
        setContent(temp);
    }
    const onActivate = (id, state) => {
        changeUserActivateState(id, state)
        .then(data=>{
            if(data.success === 'success')
            {
                getUsers();
            }
        })
    }
    const activate = true;
    return(
        <Container>
            <div className="header">
                <div className="title-layout">
                    <span className="title">
                        {t('Users')}
                    </span>
                    <span className="button" onClick={openAddModal}>
                        <BsPlusCircleFill className="icon"/>
                        {t('Add User')}
                    </span>
                </div>
                <div className="search">
                    <RiSearchEyeLine className="icon"/>
                    <input className="input" placeholder={t('Search Users')}
                        value={search} 
                        onChange={e => onSearch(e.target.value)}/>
                </div>
            </div>
            <div className="content-layout">
                <div className="control-group"/>
                <div className="content">
                    <div className="table-header">
                        <span className="surename">
                            {t('Sure Name')}
                        </span>
                        <span className="username">
                            {t('Username')}
                        </span>
                        <span className="mobile">
                            {t('Mobile Number')}
                        </span>
                        <span className="type">
                            {t('type')}
                        </span>
                        <span className="membership">
                            {t('Membership')}
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
                            content.map((item, index) => (
                                <TableRow content={item} 
                                    memberships={memberships} 
                                    openEdit={openEdit}
                                    onActivate={onActivate}
                                    key={index}/>
                            ))
                        }
                    </div>
                </div>
            </div>
            <AddUser isOpen={isAdd} close={closeAddModal} memberships={memberships}
               refresh={getUsers} />
        </Container>
    )
}

export default ManageUser;