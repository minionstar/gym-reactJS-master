import React, {useContext, useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {BsPlusCircleFill} from 'react-icons/bs';
import {IoMapSharp} from 'react-icons/io5';
import {RiPencilFill} from 'react-icons/ri';
import AddGym from "./modal/addgym";
import EditGym from "./Gym/editGymModal";
import {  changeGymActivation, getGyms } from "../../../fiebaseImp/js/gym";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from 'react-qr-code';
import { getGymOwners } from "../../../fiebaseImp/js/user";
import { getMembershipNames } from "../../../fiebaseImp/js/membership";
import UserContext from "../../../context/UserContext";


const Container = styled('div')`
    display: flex;
    width: 100%;
    flex-direction: column;
    background: #1C1A1D;
    .header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 20px 40px;
        height: 30px;
        background-color: black;
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
    }
    .content {
        display: flex;
        flex-direction: column;
        padding: 18px 40px;
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
        .gymImage {
            width: 100%;
            max-width: 180px;
            .image-gym {
                width:120px;
                height: 120px;
                border-radius: 15px;
            }
        }
        .qrcode {
            width: 100%;
            max-width: 180px;
            .image {
                width:90px;
                height: 90px;
            }
        }
        .gymname {
            width: 100%;
            max-width: 300px;
        }
        .location {
            width: 100%;
            font-size: 14px;
            line-height: 160%;
            letter-spacing: 0.01em;
            color: #888888;
            .map-icon {
                width: 44px;
                min-width: 44px;
                height: 44px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                color: white;
                margin-right: 10px;
                &:hover, &:active {
                    background: #333333;
                }
            }
        }
        .controls {
            width: 100%;
            max-width: 150px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .edit {
                width: 44px;
                height: 44px;
                border-radius: 50%;
                background-color: #333333;
                color: #2F80ED;
                font-size: 24px;
                display: flex;
                justify-content: center;
                align-items: center;

                &:active, &:hover {
                    background-color: #1F2F46;
                }
            }
            .activate {
                width: 93px;
                height: 42px;
                border-radius: 10px;
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
        .table-content{
            display: flex;
            flex-direction: column;
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
        }
        .table-row {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 12px 0px;
            border-bottom: 1px solid #4F4F4F;
            .gymname {
                font-size: 18px;
                line-height: 22px;
                color: #D6D6D6;
            }
            .location {
                display: flex;
                flex-direction: row;
                align-items: center;
            }
        }
        .table-row-mobile {
            display: none;
        }
    }

    @media (max-width: 768px){
        .header {
            justify-content: space-between;
        }
        .content{
            padding: 10px;
            .table-header {
                display: none;
            }
            .table-row {
                display: none;
            }
            .table-content {
                max-height: unset;
                overflow: none;
            }
            .table-row-mobile {
                display: flex;
                border: 1px solid #4F4F4F;
                border-radius: 15px;
                margin-bottom: 10px;
                padding: 18px;
                flex-direction: column;
                
                .image-gym {
                    width:80px;
                    height: 80px;
                    border-radius: 15px;
                    margin-right: 10px;
                }
                .image {
                    width:70px;
                    height: 70px;
                }
                .info {
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    .text{
                        display: flex;
                        flex-direction: column;
                        margin-left: 24px;
                        .gymname {
                            font-size: 18px;
                            line-height: 22px;
                            color: #D6D6D6;
                        }
                        .location {
                            font-size: 14px;
                            line-height: 160%;
                            letter-spacing: 0.01em;
                            color: #888888;
                        }
                    }
                }
                .button-group {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    .map-view {
                        font-size: 14px;
                        line-height: 160%;
                        letter-spacing: 0.01em;
                        color: #F6F6F6;
                        .icon {
                            font-size: 20px;
                            margin-right: 6px;
                        }
                    }
                    .controls {
                        display: flex;
                        flex-direction: row;
                        .edit {
                            width: 74px;
                            height: 34px;
                            background-color: #333333;
                            color: #2F80ED;
                            border-radius: 10px;
                            font-size: 14px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-right: 10px;
                            .icon {
                                margin-right: 5px;
                                font-size: 18px;
                            }
                            &:active, &:hover {
                                background-color: #1F2F46;
                            }
                        }
                        .activate {
                            width: 83px;
                            height: 34px;
                            border-radius: 10px;
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
        
    }
`;

const TableRow = ({content, openEdit, refresh}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    return(
        <React.Fragment>
            <div className="table-row" >
                <div className="gymImage">
                    <img src={content.images&&content.images.length>0? content.images[0] : undefined} className="image-gym" />
                </div>
                <div className="qrcode">
                    <QRCode value={content.qrCode} size={70} bgColor="#D6D6D6"
                        fgColor="#1C1A1D"/>
                </div>
                <span className="gymname">
                    {content.name}
                </span> 
                <div className="location">
                    <span className="map-icon">
                        <IoMapSharp/>
                    </span>
                    {content.address}
                </div>
                <div className="controls">
                    <span className="edit" onClick={()=>{
                        openEdit(content)}}>
                        <RiPencilFill/>
                    </span>
                    <span className={content.activated? "activate": "activate disable"}
                        onClick={()=>{
                            changeGymActivation(content.qrCode, !content.activated);
                            refresh();
                        }}>
                        {content.activated? t('Activate'): t('Deactive')}
                    </span>
                </div>
            </div>
            <div className="table-row-mobile">
                <div className="info">
                    <div>
                        <img src={content.image} className="image-gym"/>
                    </div>
                    <div>
                        <QRCode value={content.qrCode} size={50} bgColor="#D6D6D6"
                        fgColor="#1C1A1D"/>
                    </div>
                    
                    <div className="text">
                        <span className="gymname">
                            {content.name}
                        </span>
                        <span className="location">
                            3891 Ranchview Dr. Richardson, California 62639
                        </span>
                    </div>
                </div>
                <div className="button-group">
                    <span className="map-view">
                        <IoMapSharp className="icon"/>
                        {t('View on map')}
                    </span>
                    <div className="controls">
                        <span className="edit" onClick={()=>{
                            openEdit(content)}}>
                            <RiPencilFill className="icon"/>
                            {t('Edit')}
                        </span>
                        <span className={content.activated? "activate": "activate disable"}>
                            {content.activated? t('Activate'): t('Deactive')}
                        </span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
const ManageGym = ()=>{
    const {t} = useTranslation();
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [gyms, setGyms] = useState([]);
    const [user, setUser] = useContext(UserContext);
    const {path} = useLocation();
    const [gymOwners, setGymOwners] = useState([]);
    const [memberships, setMemberships] =  useState([]);
    const navigate = useNavigate();
    const [selectedQrCode, setSelectedQrCode] = useState('');
    const [selectedGymName, setSelectedGymName] = useState('');

    const closeAddModal = () =>{
        setIsAdd(false);
    }
    const closeEditModal = () => {
        setIsEdit(false);
    }
    // const openEditModal = (code, name) => {
    //     setSelectedQrCode(code);
    //     setSelectedGymName(name);
    //     setIsEdit(true);
    // }

    const openEditModal = (content) => {
        // localStorage.setItem('content', JSON.stringify(content));
        // localStorage.setItem('owners', JSON.stringify(gymOwners));
        // localStorage.setItem('memberships', JSON.stringify(memberships));

        setUser({...user, content: content, owners: gymOwners, memberships: memberships});
        navigate('/gymeditmain',
        {state: {content:content, owners: gymOwners, memberships: memberships}});
        localStorage.setItem('state', JSON.stringify({content:content, owners: gymOwners, memberships: memberships}));
    }
    const openAddModal = () => {
        setIsAdd(true);
    }

    const getAllGyms = () => {
        getGyms()
		.then((datas)=>{
			let temp_gyms  =[];
			datas.forEach((data)=>{
				let temp = {...data.data(), qrCode:data.id};
				temp_gyms.push(temp);
			});
            if(JSON.parse(localStorage.getItem('profile')).role.includes(4)){
                setGyms(temp_gyms);
            }
            else{
                let temp = [];
                temp_gyms.forEach(item=>{
                    if(item.owner === JSON.parse(localStorage.getItem('profile')).id){
                        temp.push(item);
                    }
                })
                setGyms(temp);
            }			
		})
    }

    useEffect(()=>{
        getAllGyms();
        getGymOwners()
        .then(data => {
            setGymOwners(data);
        });
        getMembershipNames()
        .then(data => {
            setMemberships(data);
        });
    }, [path]);

    return(
        <Container>
            <div className="header">
                <span className="title">
                    {t('Gym’s list')}
                </span>
                <span className="button" onClick={openAddModal}>
                    <BsPlusCircleFill className="icon"/>
                    {t('Add GyM’s')}
                </span>
            </div>
            <div className="content">
                <div className="table-header">
                    <span className="gymImage">
                        {t('Image')}
                    </span>
                    <span className="qrcode">
                        {t('QR code')}
                    </span>
                    <span className="gymname">
                        {t('GYM’s name')}
                    </span>
                    <span className="location">
                        {t('Location')}
                    </span>
                    <span className="controls">
                        {""}
                    </span>
                </div>
                <div className="table-content">
                    {
                        gyms.map((item, index)=>(
                            <TableRow 
                                key={index}
                                content={item}
                                openEdit={openEditModal}
                                refresh={getAllGyms}/>
                        ))
                    }
                </div>
            </div>
            <AddGym isOpen={isAdd} close={closeAddModal} refresh={getAllGyms} />
            <EditGym isOpen={isEdit} close={closeEditModal}
                owners={gymOwners} memberships={memberships} 
                qrCode={selectedQrCode} refresh={getAllGyms} gymName = {selectedGymName}/>
        </Container>
    );
}

export default ManageGym;