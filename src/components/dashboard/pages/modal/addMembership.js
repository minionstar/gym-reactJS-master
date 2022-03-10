import React, {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import {BsPlusCircleFill, BsCheckCircleFill} from 'react-icons/bs';
import { MdDescription } from "react-icons/md";
import { addMembership } from "../../../../fiebaseImp/js/membership";
import {RiCloseCircleFill} from 'react-icons/ri';

const Container = styled('div')`
    width: 498px;
    background-color: black;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    padding: 30px 40px;
    .error {
        border-color: red !important;
    }
    .header {
        font-weight: bold;
        font-size: 24px;
        line-height: 29px;
        text-transform: uppercase;
        color: #F2F2F2;
    }
    .content {
        display:flex;
        flex-direction: column;
        margin-top: 40px;
    }
    .label{
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0.01em;
        color: #888888;
        margin-bottom: 8px;
    }
    .input {
        color: #888888;
        background: #1C1A1D;
        border-radius: 12px;
        border: 1px solid #888888;
        height: 50px;
        padding-left: 10px;
        margin-bottom: 20px;
    }
    .button{
        width: 110px;
        height: 50px; 
        display: flex;
        justify-content: center;
        align-items: center;
        color: #F2F2F2;
        font-size: 18px;
        line-height: 22px;
        border-radius: 10px;
        border: 1px solid #888888;
        margin-left: 16px;
    }
    .button.active{
        text-transform: uppercase;
        color: #000000;
        background: #FECA00;
        border: none;
    }
    .button-group{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin-top: 40px;
    }
    .description {
        display: flex;
        flex-direction: column;
        overflow : auto;
        max-height: 140px;
        padding: 10px 0px;
        
        .description-item {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
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
    .description-layout {
        display: flex;
        flex-direction: column;
        height: 250px;
        margin-bottom: 20px;
    }
    .create-description {
        display: flex;
        flex-direction: column;
    }
    .disable {
        display: none;
    }
    .button-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        line-height: 160%;
        color: #888888;
        margin-top:10px;
        span {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        
        .create-container{
            display:flex;
            flex-direction: row;
            gap: 20px;
        }
        .add {
            color:#FECA00;
        }
        .icon {
            margin-right: 8px;
            font-size: 18px;
        }
    }
    .price-layout {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        gap: 0px 20px;
        & > div {
            display: flex;
            flex-direction: column;
        }
    }
    .message {
        display: flex;
        align-items: center;
        margin-top: 10px;
        height: 20px;
    }
    .error-msg {
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0.01em;
        color: red;
    }
    .success-msg {
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0.01em;
        color: #F2F2F2;
    }
    .delete {
        color: #F03F3F;
        font-size: 1em;
    }
    @media (max-width: 768px) {
        width: 300px;
        height: unset;
        .header {
            margin-bottom: 20px;
        }
        
        .button {
            margin-right: 0px;
        }
        .button-group {
            justify-content: space-between;
            margin-top: 30px;
        }
    }
`;


const AddMembership = (props) => {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isAddDesc, setIsAddDesc] = useState(false);
    const [description, setDescription] = useState([]);
    const [name, setName] = useState('');
    const [priceMonth, setPriceMonth] = useState('');
    const [priority, setPriority] = useState('');
    const [priceWeek, setPriceWeek] = useState('');
    const [priceAnnual, setPriceAnnual] = useState('');

    const [nameError, setNameError] = useState(false);
    const [monthError, setMonthError] = useState(false);
    const [weekError, setWeekError] = useState(false);
    const [annualError, setAnnualError] = useState(false);
    const [priorityError, setPriorityError] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [newDesc, setNewDesc] = useState('');
    const [disable, setDisable] = useState(false);
    useEffect(()=>{
        setIsOpen(props.isOpen);
    }, [props]);

    const resetStates = ()=>{
        setIsAddDesc(false);
        setName('');
        setPriceAnnual('');
        setPriceMonth('');
        setPriceWeek('');
        setNameError(false);
        setMonthError(false);
        setWeekError(false);
        setAnnualError(false);
        setDescription([]);
        setPriorityError(false);
        setNewDesc('');
        setPriority('');
        setDisable(false);
    }
    const hideModal = () => {   
        resetStates();
        emptyMessage();
        setIsOpen(false);
        props.close();
    }
    const emptyMessage = ()=>{
        setCreateError(false);
        setCreateSuccess(false);
    }
    const onAddDescItem = () => {
        setIsAddDesc(true);
    }
    const closeAddDesc = () => {
        setIsAddDesc(false);
        setNewDesc('');
    }

    const onSave = () => {
        if(disable)
            return;
        if(name === '' || 
            priceMonth === '' || isNaN(priceMonth) ||
            priceWeek === ''  || isNaN(priceWeek) ||
            priceAnnual === '' || isNaN(priceAnnual)
            ){
            setNameError(name === '');
            setMonthError(priceMonth === '' || isNaN(priceMonth));
            setWeekError(priceWeek === ''  || isNaN(priceWeek));
            setAnnualError(priceAnnual === '' || isNaN(priceAnnual));
            // setPriorityError(priority === '' || isNaN(priority));
            return;
        }
        setDisable(true);
        addMembership(name,description, priceMonth, priceAnnual, priceWeek)
        .then(data=>{
            if(data.success !== '')
            {
                setCreateSuccess(true);
                setDisable(false);
                resetStates();
                props.refresh();
            }
            else{
                setCreateError(true);
            }
        })
        
    }
    const onAddDescription = () =>{
        if(newDesc === '')
            return;
        let temp = description;
        temp.push(newDesc);
        setDescription(temp);
        setNewDesc('');
    }
    const onDeleteItem = (index) => {
        let temp = description;
        temp.splice(index, 1);
        let newDescription = [];
        temp.forEach(item =>{
            newDescription.push(item);
        })
        setDescription(newDescription);
    }
    return (
        <Modal
        show={isOpen}
        onHide={hideModal}
        centered
        dialogClassName="login-modal"
        >  
            <Container>
                <div className="header">
                    {t('Add Membership')}
                </div>
                <div className="content">
                    <span className="label">
                        {t('Name')}
                    </span>
                    <input 
                        className={nameError? "input error" :"input"}
                        value={name}
                        onChange={e => {
                            setName(e.target.value);
                            emptyMessage();
                            setNameError(false);
                        }}/>
                    <div className="description-layout">
                        <span className="label">
                            {t('Description')}
                        </span>
                        <div className="description">
                        {
                            description.map((item, index)=>(
                                <div key={index} className="description-item">
                                    <li>
                                        {item}
                                    </li>
                                    <RiCloseCircleFill className="delete" 
                                        onClick={()=>onDeleteItem(index)}/>
                                </div>
                            )) 
                        }
                        </div>
                        <div className={isAddDesc? "create-description": "disable"}>
                            <input className="input" value={newDesc}
                                onChange={e => setNewDesc(e.target.value)}/>
                        </div>
                        <div className="button-container">
                            <span onClick={onAddDescItem}>
                                <BsPlusCircleFill className="icon"/>
                                {t('Add items')}
                            </span>
                            <div className="create-container">
                                <span onClick={closeAddDesc}>
                                    {t('Cancel')}
                                </span>
                                <span className="add" onClick={onAddDescription}>
                                    <BsCheckCircleFill className="icon"/>
                                    {t('Add')}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* <span className="label">
                        {t('Priority')}
                    </span>
                    <input 
                        className={priorityError? "input error": "input"}
                        value={priority}
                        onChange={e =>{
                            emptyMessage();
                            setPriorityError(false);
                            setPriority(e.target.value);
                        }}/> */}
                    <div className="price-layout">
                        <div>
                            <span className="label">
                                {t('Monthly Price')}
                            </span>
                            <input 
                                className={monthError? "input error": "input"}
                                value={priceMonth}
                                onChange={e =>{
                                    emptyMessage();
                                    setMonthError(false);
                                    setPriceMonth(e.target.value);
                                }}/>
                        </div>
                        <div>
                            <span className="label">
                                {t('Weekly Price')}
                            </span>
                            <input 
                                className={weekError? "input error" : "input"}
                                value={priceWeek}
                                onChange={e=>{
                                    emptyMessage();
                                    setWeekError(false);
                                    setPriceWeek(e.target.value);
                                }}/>
                        </div>
                        <div>
                            <span className="label">
                                {t('Annual Price')}
                            </span>
                            <input 
                                className={annualError? "input error" : "input"}
                                value={priceAnnual}
                                onChange={e=>{
                                    emptyMessage();
                                    setAnnualError(false);
                                    setPriceAnnual(e.target.value);
                                }}/>
                        </div>
                    </div>
                </div>
                <div className="message">
                    { 
                        createError &&
                        <span className="error-msg">
                            {t('Cannot create a new membership. Try again.')}
                        </span>
                    }
                    {
                        createSuccess && 
                        <span className="success-msg">
                            {t('New Membership is created successfully.')}
                        </span>
                    }
                </div>
                <div className="button-group">
                    <span className="button" onClick={hideModal}>
                        {t('Cancel')}
                    </span>
                    <span className="button active" onClick={onSave}>
                        {t('Save')}
                    </span>
                </div>
            </Container>
        </Modal>
    );
}

export default AddMembership;