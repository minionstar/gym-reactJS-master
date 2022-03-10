import React from 'react';
import styled from 'styled-components';
import {BsPlusCircleFill} from 'react-icons/bs';
import {ImDownload3} from 'react-icons/im';
import {FaUserCog} from 'react-icons/fa';

const Container = styled('div')`
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
    @media (max-width: 768px){
        justify-content: space-between;
    }
`;

const Header = ({title, button, openModal, download, user}) => {
    return(
        <Container>
            <span className="title">
                {title}
            </span>
            <span className="button" onClick={openModal}>
                {download ?
                    <ImDownload3 className='icon' />:(
                        user?
                        <FaUserCog className='icon' /> :
                        <BsPlusCircleFill className="icon"/>
                    )
                }   
                {button}
            </span>
        </Container>
    )
}

export default Header;