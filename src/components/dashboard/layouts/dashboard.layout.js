import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const Container = styled('div')`
    display: flex;
    flex-direction: row;
    @media (max-width: 1180px){
        flex-direction: column;
    }
`;
const DashboardLayout = () =>{
    return(
        <Container>
            <Sidebar/>
            <Outlet/>
        </Container>
    )
}

export default DashboardLayout;