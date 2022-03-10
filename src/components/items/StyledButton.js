import styled from "styled-components";

const StyledButton = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1.3em 1em;
    color: ${props => props.active? "#1C1A1D" : "white"};
    border-radius: 0.6em;
    background: ${props => props.active? "#FECA00" : "transparent"};
    border: ${props => props.active? 'none' : '1px solid rgba(255, 255, 255, 0.4)'};
    text-transform: ${props => props.active? 'uppercase' : 'none'};
    font-family: "CabinRegular";
    font-style: normal;
    font-weight: bold;
    font-size: 0.7em;
    line-height: 130%;
    letter-spacing: 0.01em;
    margin-right: 1.5em;
    min-width: 13em;
`;

export default StyledButton;