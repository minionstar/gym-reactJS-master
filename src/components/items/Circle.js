import styled from "styled-components";

const Circle = styled('div')`
    position: absolute;
    right: ${props => props.right? props.right : 0};
    width: ${props => props.size? props.size : 0};
    height: ${props => props.size? props.size : 0};
    opacity: 0.2;
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 50%;
`;

export default Circle;