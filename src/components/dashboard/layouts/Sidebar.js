import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Logo from '../../../assets/images/Logo.png';
import {HiHome, HiMenuAlt3} from 'react-icons/hi';
import { BsChevronUp, BsChevronDown} from 'react-icons/bs';
import { MdSpaceDashboard, MdHotelClass } from 'react-icons/md';
import {FaUsers, FaDumbbell} from 'react-icons/fa';
import {RiUserFill} from 'react-icons/ri';
import {TiWarning} from 'react-icons/ti';
import {GrDomain} from 'react-icons/gr';
import {IoSettings, IoLanguage} from 'react-icons/io5';
import {AiOutlineExport, AiFillDashboard} from 'react-icons/ai';
import {RiArrowGoBackLine} from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import i18n from '../../../locales/locale';
import Select, {components} from 'react-select';
const { SingleValue, Option, DropdownIndicator } = components;

const Container = styled('div')`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    align-items: center;
    width: 310px;
    padding: 0px;
    background-color: black;
    .header {
        width: 100%;
        height: 34px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 18px 32px;
        border-bottom: 1px solid #1C1A1D;
        .logo {
            width: 210px;
            height: 32px;
        }
    }
    .link {
        text-decoration: none;
    }
    .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 100%;
        .menu-group {
            display: flex;
            flex-direction:column;
            padding: 20px;
        }
        .setting-group {
            display: flex;
            flex-direction: column;
        }
        .menu {
            border-radius: 15px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            padding: 22px 30px;
            font-size: 18px;
            line-height: 22px;
            color: #888888;
            width: 210px;
            margin-bottom: 5px;
            

            &:active, &:hover {
                color: #FBD806;
                background: #211C00;
            }
        }
        .menu.active {
            color: #FBD806;
            background: #211C00;
        }
        .icon {
            margin-right: 26.5px ;
            font-size: 24px;
        }
        .icon.active {
            color: #FECA00;
        }
        .lang-select{
            border-top: 1px solid #1C1A1D;
            padding: 0px 20px 16px 20px;
            font-size: 18px;
            line-height: 22px;
            color: #888888;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }
    .lang-content {
        padding: 16px 0px 0px 28px;
        display: flex;
        align-items: center;
    }
    .lang-menu-text {
        width: 100%;
    }
    .menu-indicator {
        padding-top: 16px;
    }
    .menu-indicator.active {
        color: #FECA00;
    }
    #react-select-2-listbox {
        border-radius: 15px;
    }
    .toggle-menu-btn{
        display: none;
    }
    
    @media (max-width: 1180px){
        width: unset;
        min-height: unset;
        padding: 8px 25px;
        .header {
            justify-content: space-between;
            .logo {
                width: 155px;
                height: 24px;
            }
        }
        .toggle-menu-btn{
            display: unset;
            color: #F2F2F2;
            font-size: 30px;
        }
        .content.active {
            display: none;
        }
    }
`;

const Menu = ({icon, text, link, active, onClick}) => {
    return(
        <Link to={link} className='link' onClick={onClick? onClick : ()=>{}}>
            <div className={active? 'menu active' :'menu'}>
                {icon}
                {text}
            </div>  
        </Link>
    );
}
const langStyles = {
    container: (provided)=>({
        ...provided,
        width: '100%',
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
    }),
    control: () => ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    }),
    group: () => ({
        backgroundColor:'red',
        padding: '30px',
        borderRadius: '15px',
    }),
    indicatorSeparator: () => ({
        color: 'transparent'
    }),
    dropdownIndicator: () => ({
        color: '#888888'
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isFocused? '#FECA00':'#888888',
        backgroundColor: '#1C1A1D',
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '30px',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#888888',
        cursor: 'default'
    }),
    menu: (provided) => ({
        ...provided,
        padding: 0,
        margin: 0,
        backgroundColor: '#1C1A1D',
        borderRadius: '15px',
        padding: '5px 72px 30px',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#888888',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        cursor: 'pointer',
    }),
    input: (provided) => ({
        ...provided,
        textAlign: 'left',
        color: 'white',
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '0px',
    }),
}
const IconSingleValue = (props) => (
    <SingleValue {...props} className='lang-content'>
        <IoLanguage className={props.selectProps.menuIsOpen?'icon active': 'icon'}/>
        {/* <img src={props.data.image} style={{ borderRadius: '50%', marginRight: '10px' }}/> */}
        <span className='lang-menu-text' onClick={props.data.onClick} >
            {props.data.label}
        </span>
    </SingleValue>
);


const IconOption = (props) => (
    <Option {...props}>
        {/* <img src={props.data.image} style={{ borderRadius: '50%', marginRight: '10px' }}/> */}
        <span className='lang-menu-text' onClick={props.data.onClick}>
            {props.data.label}
        </span>
    </Option>
);
const IconDropdownIndicator = props => {
    return (
      DropdownIndicator && (
        <DropdownIndicator {...props}>
            {
                props.selectProps.menuIsOpen? 
                <BsChevronDown className='menu-indicator active' /> 
                : <BsChevronUp className='menu-indicator'/>
            }
        </DropdownIndicator>
      )
    );
  };
export default function Sidebar() {
    const {t} = useTranslation();
    const {pathname} = useLocation();
    const [user, setUser] = useState({});
    const [visible, setVisible] = useState(false);

    const GeneralMenus = [
        {
            icon: <HiHome className='icon'/>,
            text: t('To home page'),
            link: '/',
        },
        {
            icon: <MdSpaceDashboard className='icon'/>,
            text: t('Dashboard'),
            link: '/dashboard',
        },
        {
            icon: <FaDumbbell className='icon'/>,
            text: t('Manage Gyms'),
            link: '/gym',
        },
        {
            icon: <RiUserFill className='icon'/>,
            text: t('Manage User'),
            link: '/user',
        },
        {
            icon: <FaUsers className='icon'/>,
            text: t('Manage Membership'),
            link: '/membership',
        },
        // {
        //     icon: <TiWarning className='icon'/>,
        //     text: t('Reporting'),
        //     link: '/reporting',
        // },
    ];

    const GymEditMenu = [
        {
            icon: <RiArrowGoBackLine className='icon'/>,
            text: t('Back to Dashboard'),
            link: '/gym',
        },
        {
            icon: <AiFillDashboard className='icon'/>,
            text: t('Edit Gym'),
            link: '/gymeditmain',
        },
        {
            icon: <MdHotelClass className='icon'/>,
            text: t('Manage Class'),
            link: '/gymeditclass',
        },
        {
            icon: <FaUsers className='icon'/>,
            text: t('Manage Trainer'),
            link: '/gymedittrainer',
        },
    ]
    const Settings = [
        {
            icon: <IoSettings className='icon'/>,
            text: t('Settings'),
            link: '/settings',
        },
        {
            icon: <AiOutlineExport className='icon'/>,
            text: t('Log Out'),
            link: '/',
        },
    ];
    const changeLanguage = lng => {
        console.log(lng);
        setUser({...user, lang: lng});
        i18n.changeLanguage(lng).then(() => {});
    };
    const onLangEn = (e) =>{
        changeLanguage('en');
        e.preventDefault();
    }
    const onLangAr = (e) =>{
        changeLanguage('ar');
        e.preventDefault();
    }

    const options = [
        {
            value: 'english',
            label: t('English'),
            onClick: onLangEn,
            // image: EnglishFlag
        },
        {
            value: 'arabic',
            label: t('Arabic'),
            onClick: onLangAr,
            // image: UAE FLag
        }
    ];
    const showMenu = () =>{
        setVisible(!visible);
    }

    const [menus, setMenus] = useState([]);
    useEffect(()=>{
        var userInfo = JSON.parse(localStorage.getItem('profile'));
        
        if(pathname.startsWith('/gymedit')){
            setMenus(GymEditMenu);
        }
        else {
            setMenus([GeneralMenus[0]]);
            if(userInfo.role)
            {
                if(userInfo.role.includes(4)){
                    setMenus(GeneralMenus);
                }
                else if(userInfo.role.includes(3)){
                    setMenus([GeneralMenus[0],GeneralMenus[2]]);
                }
            }
        }
       
    }, [pathname]);

    const navigate = useNavigate();
    return(
        <Container>
            <div className='header'>
                <div className='logo'>
                    <img src={Logo} className='logo'/>
                </div>
                <HiMenuAlt3 className='toggle-menu-btn' onClick={showMenu}/>
            </div>
            <div className={visible? 'content': 'content active'}>
                <div className='menu-group'>
                    {
                        menus.map((item, index)=>(
                            <Menu icon={item.icon} text={item.text} 
                                link={item.link} key={index} active={pathname === item.link}/>
                        ))
                    }
                </div>
                <div className='setting-group'>
                    <div className='menu-group'>
                        {
                            Settings.map((item, index) => {
                                if(item.link === '/'){
                                    return  <Menu icon={item.icon} text={item.text} 
                                    link={item.link} key={index} active={pathname === item.link}
                                    onClick={()=>{
                                        localStorage.clear();
                                    }}/>
                                }
                                return <Menu icon={item.icon} text={item.text} 
                                link={item.link} key={index} active={pathname === item.link}/>
                            })
                        }
                    </div>
                    <div className='lang-select'> 
                        
                        <Select
                            styles={langStyles}
                            components={{ SingleValue: IconSingleValue, Option: IconOption, 
                                DropdownIndicator:IconDropdownIndicator }}
                            options={options}
                            isSearchable={false}
                            menuPlacement = "top"
                            placeholder= {
                                <div className='lang-content'>
                                    <IoLanguage className='icon' />
                                    <span className='lang-menu-text' >
                                        {t('English')}
                                    </span>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
}