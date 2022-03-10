import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Header from './item/Header';
import {RiPencilFill, RiDeleteBin6Line} from 'react-icons/ri';
import AddMembership from './modal/addMembership';
import { deleteMembership, getMemberships } from '../../../fiebaseImp/js/membership';
import { useLocation } from 'react-router-dom';

const Container = styled('div')`
    display: flex;
    width: 100%;
    flex-direction: column;
    background: #1C1A1D;
    .content {
        padding: 40px;
        display: flex;
        gap: 10px 20px;
        flex-flow: row wrap;
        justify-content: center;
    }
    .item {
        width: 200px;
        border: 1px solid #888888;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        padding: 20px;
        .name {
            font-weight: bold;
            font-size: 24px;
            line-height: 120%;
            letter-spacing: 0.01em;
            text-transform: uppercase;
            color: #F2F2F2;
            margin-bottom: 15px;
        }
        .label {
            font-size: 14px;
            line-height: 17px;
            color: #888888;
            margin-bottom: 8px;
        }
        .description {
            display: flex;
            flex-direction: column;
            overflow : auto;
            height: 140px;
            
            li {
                font-size: 14px;
                line-height: 17px;
                letter-spacing: 0.01em;
                color: #F2F2F2;
                margin-bottom: 6px;
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
        .price-layout {
            display: flex;
            flex-flow: row wrap;
            gap: 0px 20px;
            justify-content: flex-start;
        }
        .price {
            display: flex;
            flex-direction: column;
            font-size: 18px;
            line-height: 22px;
            color: #F2F2F2;
            margin-bottom: 10px;
        }
    }
    .button-layout { 
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 20px;
    }
    .item-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 36px;
        border-radius: 10px;
    }
    .edit {
        background: #333333;
        color: #2F80ED;
    }
    .delete {
        background: #462224;
        color:#F03F3F;
    }
    .button-icon {
        font-size: 20px;
        margin-right: 6px;
    }
    .item-content {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #3E3E3E;
    }
    .item-btn-mobile{
        display: none;
    }
    @media (max-width: 768px)
    {
        .content{
            padding: 20px 14px;
        }
        .item {
            width: 140px;
            padding: 20px 10px;
        }
        .item-btn {
            display: none;
        }
        .button-layout {
            justify-content: space-around;
        }
        .item-btn-mobile{
            display: flex;
            width: 44px;
            height: 44px;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }
        .button-icon{
            margin: 0px;
        }
    }
`;

const MembershipItem = ({content, onEdit, onDelete}) => {
    const {t} = useTranslation();
    return(
        <div className='item'>
            <span className='name'> 
                {content.name}
            </span>
            <div className='item-content'>
                <span className='label'>
                    {t('Description')}
                </span>
                <div className='description'>
                    {
                        content.description.map((item, index) => (
                            <li key={index}>
                                {item.text? item.text : item}
                            </li>
                        ))
                    }                    
                </div>
                <div className='price-layout'>
                    <div className='price'>
                        <span className='label'>
                            {t('Monthly Price')}
                        </span>
                        <span>
                            AED {content.monthly_amount}
                        </span>
                    </div>
                    <div className='price'>
                        <span className='label'>
                            {t('Weekly Price')}
                        </span>
                        <span>
                            AED {content.weakly_amount}
                        </span>
                    </div>
                    <div className='price'>
                        <span className='label'>
                            {t('Annual Price')}
                        </span>
                        <span>
                            AED {content.annually_amount}
                        </span>
                    </div>
                </div>
            </div>
            <div className='button-layout'>
                <span className='item-btn edit' 
                    onClick={()=>onEdit(content.id)}>
                    <RiPencilFill className='button-icon'/>
                    {t('Edit')}
                </span>
                <span className='item-btn delete'
                    onClick={()=>onDelete(content.id)}>
                    <RiDeleteBin6Line className='button-icon'/>
                    {t('Delete')}
                </span>
                <span className='item-btn-mobile edit'
                    onClick={()=>onEdit(content.id)}>
                    <RiPencilFill className='button-icon'/>
                </span>
                <span className='item-btn-mobile delete'
                    onClick={()=> onDelete(content.id)}>
                    <RiDeleteBin6Line className='button-icon'/>
                </span>
            </div>
        </div>
    );
}

const ManageMembership = () => {
    const {t} = useTranslation();
    const [isAdd, setIsAdd] = useState(false);
    const [content, setContent] = useState([]);
    const {path} = useLocation();
    useEffect(()=>{
        getAllData();
    },[path])
    const closeAddModal = () => {
        setIsAdd(false);
    }
    const openAddModal = () => {
        setIsAdd(true);
    }
    const onEdit = (id) => {

    }
    const onDelete = async (id) => {
        await deleteMembership(id);
        getAllData();
    }
    const getAllData = () => {
        getMemberships()
        .then(data=>{
            setContent(data);
        })
    }
    return (
        <Container>
            <Header title={t('Membership')} button={t('Add Membership')}
                openModal = {openAddModal}/>
            <div className='content'>
               {
                   content.map((item, index)=>(
                       <MembershipItem 
                        key={index} 
                        content={item}
                        onEdit={onEdit} onDelete={onDelete} />
                   ))
               }
            </div>
            <AddMembership isOpen={isAdd} close={closeAddModal} refresh={getAllData}/>
        </Container>
    );
}

export default ManageMembership;