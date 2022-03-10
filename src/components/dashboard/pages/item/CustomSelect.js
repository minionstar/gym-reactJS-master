import React from "react";
import Select, {components, NonceProvider} from 'react-select';
import { BsChevronUp, BsChevronDown} from 'react-icons/bs';
const { SingleValue, Option, DropdownIndicator } = components;


const langStyles = {
    container: (provided)=>({
        ...provided,
        width: '100%',
        height: '50px',
        borderRadius: '12px',
        border: '1px solid #888888',
        backgroundColor: '#1C1A1D',
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
    }),
    control: () => ({
        display: 'flex',
        height: '50px',
        padding: '0px 5px 0px 20px',
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
        paddingTop: '5px',
        
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
        padding: '10px',
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
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: 'none',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: '#888888',
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: '#888888',
    })

}
const IconSingleValue = (props) => (
    <SingleValue {...props} className='lang-content'>
        
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
                <BsChevronUp className='menu-indicator active' /> 
                : <BsChevronDown className='menu-indicator'/>
            }
        </DropdownIndicator>
      )
    );
  };

const CustomSelect = ({options, placeholder, className, onChange, ...props}) => {

    return(
        <Select
            className={className}
            styles={langStyles}
            components={{ SingleValue: IconSingleValue, Option: IconOption, 
                DropdownIndicator:IconDropdownIndicator }}
            options={options}
            isSearchable={false}
            placeholder= {placeholder}
            onChange={onChange}
            {...props}
        />
    );
}

export default CustomSelect;