import React, {useContext, useEffect, useState} from "react";
import logo from '../../../assets/images/home/Logo.png';
import topMenu from '../../../assets/images/home/topmenu.png';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";
import Select, {components} from 'react-select';
import i18n from "../../../locales/locale";
import { useTranslation } from "react-i18next";
import Login from "./modal/login";
import Signup from "./modal/signup";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
const { SingleValue, Option } = components;


const Container = styled('div')`
    display: flex;
    position: fixed;
    z-index: 100;
    top:0;
    right:0;
    left:0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-family: "CabinRegular";
    font-size: 0.8em;
    font-style: normal;
    line-height: 120%;
    text-align: left;
    background: '#000000B8';
    padding: 0.8em 6em;
    background-color: black;
    .logo {
        margin: 1.3em auto 1.3em 8em;
    }
    .menuLayout{
        display: flex;
        align-items: center;
    }
    .image {
        width: 13em;
        height: 2em;
    }
    .toggle-btn {
        display: none;
    }
    a {
        text-decoration: none;
    }
    @media (max-width: 1280px) {
        .menuLayout {
            display: none;
        }
        .image {
            width: 155px;
            height: 24px;
        }
        .toggle-btn {
            display: unset;
            width: 24px;
            height: 24px;
        }
    }
    @media (max-width: 992px) {
        padding: 13px 80px;
    }
    @media (max-width: 768px) {
        padding: 13px 60px;
        .menuLayout {
            display: none;
        }
        .image {
            width: 155px;
            height: 24px;
        }
        .toggle-btn {
            display: unset;
            width: 24px;
            height: 24px;
        }
    }
    @media (max-width: 576px){
        padding: 13px 25px; 
    }
`;
const ToggleMenu = styled('div')`
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 80;
    background: black;
    right: 20px;
    top: 50px;
    font-family: "CabinRegular";
    font-size: 14px;
    font-style: normal;
    line-height: 17px;
    letter-spacing: 0.01em;
    text-align: left;
    width: 100px;
    justify-content: space-between;

    .lang {
        display: flex;
        justify-content: space-around;
    }
`;
const NavLink = styled('span') `
    color: ${props => props.selected? "#FECA00" : "white"};
    margin-left: ${props => props.lang? '0px' : "0.8em"};
    margin-right: ${props => props.lang? '0px' : "0.8em"};
    text-decoration: none;

    &:hover, &:active{
        color: #FECA00;
    }
`;

const langStyles = {
    container: (provided)=>({
        ...provided,
        marginLeft: '0.8em',
        marginRight: '0.8em',
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
    }),
    control: () => ({
        width: '3em',
        display: 'flex',
        alignItems:'center',
    }),
    indicatorSeparator: () => ({
        color: 'transparent',
    }),
    dropdownIndicator: () => ({
        color: 'white',
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isFocused? '#FECA00':'white',
        backgroundColor: '#1C1A1D',
        display: 'flex',
        width: '3em',
        flexDirection: 'row',
        alignItems: 'center',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'white',
        cursor: 'pointer'
    }),
    menu: (provided) => ({
        ...provided,
        padding: 0,
        margin: 0,
        backgroundColor: 'transparent',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        cursor: 'pointer'
    }),
    input: (provided) => ({
        ...provided,
        textAlign: 'left',
        color: 'white',
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '0.5em 0px',
    }),
}
const IconSingleValue = (props) => (
    <SingleValue {...props}>
        {/* <img src={props.data.image} style={{ borderRadius: '50%', marginRight: '10px' }}/> */}
        <NavLink  lang="true" onClick={props.data.onClick}>
            {props.data.label}
        </NavLink>
    </SingleValue>
);

const IconOption = (props) => (
    <Option {...props}>
        {/* <img src={props.data.image} style={{ borderRadius: '50%', marginRight: '10px' }}/> */}
        <NavLink  lang="true" onClick={props.data.onClick}>
            {props.data.label}
        </NavLink>
    </Option>
);

const Header = ()=>{
   const {t} = useTranslation();
   const [user, setUser] = useState({});
   const [toggle, setToggle] = useState(false);
   const [openLogin, setOpenLogin] = useState(false);
   const [openSignup, setOpenSignup] = useState(false);
   const [currentPath, setCurrentPath] = useState('first');

   const navigate = useNavigate();
   const onLogin = ()=>{
       setOpenLogin(!openLogin);
   }
   const onSignup = ()=>{
       setOpenSignup(!openSignup);
   }
   const changeLanguage = lng => {
        setUser({...user, lang: lng});
        i18n.changeLanguage(lng).then(() => {});
    };
    const onLangEn = () =>{
        changeLanguage('en');
    }
    const onLangAr = () =>{
        changeLanguage('ar');
    }
    const onToggle = () => {
        setToggle(!toggle);
    }
    const options = [
        {
            value: 'english',
            label: t('EN'),
            onClick: onLangEn,
            // image: EnglishFlag
        },
        {
            value: 'arabic',
            label: t('AR'),
            onClick: onLangAr,
            // image: UAE FLag
        }
    ];

    return(
        <div>
            <Container>
                <img src={logo} className="image"/>
                <div className="menuLayout">
                    <ScrollLink
                        to="first"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <NavLink selected={currentPath === 'first'} 
                            onClick={()=>{
                                scroll.scrollToTop();
                                setCurrentPath('first')
                                }}>
                            <span> {t('Home')} </span>
                        </NavLink>
                    </ScrollLink>
                    <ScrollLink
                        to="work"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <NavLink selected={currentPath === 'work'} 
                            onClick={()=>setCurrentPath('work')}>
                            <span> {t('Work')} </span>
                        </NavLink>
                    </ScrollLink>
                    <ScrollLink
                        to="plan"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <NavLink selected={currentPath === 'plan'} 
                            onClick={()=>setCurrentPath('plan')}>
                            <span> {t('Plan')} </span>
                        </NavLink>
                    </ScrollLink>
                    <ScrollLink
                        to="trainer"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <NavLink selected={currentPath === 'trainer'} 
                            onClick={()=>setCurrentPath('trainer')}>
                            <span> {t('Trainer')} </span>
                        </NavLink>
                    </ScrollLink>
                    <ScrollLink
                        to="feedback"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <NavLink selected={currentPath === 'feedback'} 
                            onClick={()=>setCurrentPath('feedback')}>
                            <span> {t('Feedback')} </span>
                        </NavLink>
                    </ScrollLink>
                    <ScrollLink
                        to="blog"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <NavLink selected={currentPath === 'blog'} 
                            onClick={()=>setCurrentPath('blog')}>
                            <span> {t('Blog')} </span>
                        </NavLink>
                    </ScrollLink>
                    <ScrollLink
                        to="download"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <NavLink selected={currentPath === 'download'} 
                            onClick={()=>setCurrentPath('download')}>
                            <span> {t('Download')} </span>
                        </NavLink>
                    </ScrollLink>
                    <ScrollLink
                        to="subscribe"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <NavLink selected={currentPath === 'subscribe'} 
                            onClick={()=>setCurrentPath('subscribe')}>
                            <span> {t('Subscribe')} </span>
                        </NavLink>
                    </ScrollLink>
                    <Select
                        styles={langStyles}
                        components={{ SingleValue: IconSingleValue, Option: IconOption }}
                        options={options}
                        isSearchable={false}
                        placeholder= {t('EN')}
                    />
                    {
                        localStorage.getItem('isAuthenticated') &&
                        <React.Fragment>
                            <NavLink selected={false} 
                                onClick={()=>{}}>
                                <span> {JSON.parse(localStorage.getItem('profile')).sure_name} </span>
                            </NavLink>
                            <NavLink selected={false} 
                                onClick={()=>{navigate('/dashboard')}}>
                                <span> {t('To Dashboard')} </span>
                            </NavLink>
                        </React.Fragment>

                    }
                    {
                        !localStorage.getItem('isAuthenticated') &&
                        <React.Fragment>
                            <NavLink selected={currentPath === 'login'} 
                                onClick={()=>onLogin()}>
                                <span> {t('Log in')} </span>
                            </NavLink>
                            <NavLink selected={currentPath === 'singup'} 
                                onClick={()=>onSignup()}>
                                <span> {t('Sign up')} </span>
                            </NavLink>
                        </React.Fragment>
                    }
                   
                </div>
                <img src={topMenu} className="toggle-btn" onClick={onToggle}/>

            </Container>
            {
                toggle &&
                <ToggleMenu>
                   <ScrollLink
                        to="first"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <NavLink selected={currentPath === 'first'} 
                            onClick={()=>{
                                scroll.scrollToTop();
                                setCurrentPath('first')
                                }}>
                            <span> {t('Home')} </span>
                        </NavLink>
                    </ScrollLink>
                    <ScrollLink
                        to="work"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <NavLink selected={currentPath === 'work'} 
                            onClick={()=>setCurrentPath('work')}>
                            <span> {t('Work')} </span>
                        </NavLink>
                    </ScrollLink>
                    <ScrollLink
                        to="plan"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <NavLink selected={currentPath === 'plan'} 
                            onClick={()=>setCurrentPath('plan')}>
                            <span> {t('Plan')} </span>
                        </NavLink>
                    </ScrollLink>
                    <ScrollLink
                        to="trainer"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <NavLink selected={currentPath === 'trainer'} 
                            onClick={()=>setCurrentPath('trainer')}>
                            <span> {t('Trainer')} </span>
                        </NavLink>
                    </ScrollLink>
                    <ScrollLink
                        to="feedback"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <NavLink selected={currentPath === 'feedback'} 
                            onClick={()=>setCurrentPath('feedback')}>
                            <span> {t('Feedback')} </span>
                        </NavLink>
                    </ScrollLink>
                    <ScrollLink
                        to="blog"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <NavLink selected={currentPath === 'blog'} 
                            onClick={()=>setCurrentPath('blog')}>
                            <span> {t('Blog')} </span>
                        </NavLink>
                    </ScrollLink>
                    <ScrollLink
                        to="download"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <NavLink selected={currentPath === 'download'} 
                            onClick={()=>setCurrentPath('download')}>
                            <span> {t('Download')} </span>
                        </NavLink>
                    </ScrollLink>
                    <ScrollLink
                        to="subscribe"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <NavLink selected={currentPath === 'subscribe'} 
                            onClick={()=>setCurrentPath('subscribe')}>
                            <span> {t('Subscribe')} </span>
                        </NavLink>
                    </ScrollLink>
                    <div className="lang">
                        <NavLink to="/" lang="true" onClick={onLangEn}>
                            {t('EN')}
                        </NavLink>
                        <NavLink to="/" lang="true" onClick={onLangAr}>
                            {t('AR')}
                        </NavLink>
                    </div>
                    {
                        localStorage.getItem('isAuthenticated') &&
                        <React.Fragment>
                            <NavLink selected={false} 
                                onClick={()=>{}}>
                                <span> {JSON.parse(localStorage.getItem('profile')).sure_name} </span>
                            </NavLink>
                            <NavLink selected={false} 
                                onClick={()=>{navigate('/dashboard')}}>
                                <span> {t('To Dashboard')} </span>
                            </NavLink>
                        </React.Fragment>

                    }
                    {
                        !localStorage.getItem('isAuthenticated') &&
                        <React.Fragment>
                            <NavLink selected={currentPath === 'login'} 
                                onClick={()=>onLogin()}>
                                <span> {t('Log in')} </span>
                            </NavLink>
                            <NavLink selected={currentPath === 'singup'} 
                                onClick={()=>onSignup()}>
                                <span> {t('Sign up')} </span>
                            </NavLink>
                        </React.Fragment>
                    }
                </ToggleMenu>
            }
            <Login isOpen={openLogin} close={onLogin} openSignup={onSignup} />
            <Signup isOpen={openSignup} close={onSignup} openLogin={onLogin}/>
        </div>
    );
}

export default Header;
