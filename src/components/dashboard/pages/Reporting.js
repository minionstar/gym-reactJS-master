import React, {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {BsPlusCircleFill} from 'react-icons/bs';
import {RiSearchEyeLine, RiPencilFill} from 'react-icons/ri';
import {IoClose, IoCheckmark} from 'react-icons/io5';
import AddUser from "./modal/addUser";
import Header from "./item/Header";
import BootStrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import tableData from "../test/constData";

const Container = styled('div')`
    display: flex;
    width: 100%;
    flex-direction: column;
    background: #1C1A1D;
    .content {
        padding: 50px 40px 0px;
    }
    .table-header{
        font-size: 14px;
        line-height: 160%;
        color: #888888;
        border-bottom: 2px solid #F2F2F2;
    }
    .table-row{
        font-size: 14px;
        line-height: 200%;
        color: #888888;
        border-bottom: 1px solid #4F4F4F;
    }
    .react-bootstrap-table-pagination {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 14px;
        line-height: 17px;
        color:#F2F2F2;
        padding: 0px -40px;
        & > *{
            display: flex;
            width: 40%;
        }
    }

    .react-bs-table-sizePerPage-dropdown .dropdown-toggle {
        background-color: unset;
        border-color: unset;
        border: none;
        font-size: 14px;
        line-height: 17px;
        box-shadow: unset;

        &:focus {
            background-color: unset;
            border-color: unset;
        }
    }
    .dropdown-menu {
        background: #1C1A1D;
    }
    .custom-dropdown {
        background: #1C1A1D;
        padding: 4px 10px;
        color: #F2F2F2;
        & > a {
            text-decoration: none;
            font-size: 14px;
            font-weight: 17px;
            color: #F2F2F2;
            &:hover, &:active {
                color:#FECA00;
            }
        }
        &:hover, &:active {
            color:#FECA00;
        }
    }
    .react-bootstrap-table-page-btns-ul{
        margin: unset;
        .page-item{
            background: unset;
            a {
                border: unset;
                background: unset;
                color: #888888;
                &:hover{
                    color:#FECA00;
                } 
            }
        }
        .active.page-item {
            a {
                color:#FECA00;
            }
        }
    }
`;

const Reporting = ()=> {
    const {t} = useTranslation();

    const columns = [
        {dataField: 'id', text: t('Report ID'),
        style: (cell, row, rowIndex, colIndex) => (
           {
               color: '#2F80ED',
           }
         )},
        {dataField: 'sub', text: t('Report sub'),
        style: (cell, row, rowIndex, colIndex) => (
            {
                color: '#D6D6D6',
            }
          )},
        {dataField: 'description', text: t('Description'),
        style: (cell, row, rowIndex, colIndex) => (
            {
                color: '#D6D6D6',
            }
          )},
        {dataField: 'date', text: t('Date')}
    ];
    const sizePerPageOptionRenderer = ({
        text,
        page,
        onSizePerPageChange
      }) => (
        <li
          key={ text }
          role="presentation"
          className="custom-dropdown"
        >
          <a
            href="#"
            tabIndex="-1"
            role="menuitem"
            data-page={ page }
            onMouseDown={ (e) => {
              e.preventDefault();
              onSizePerPageChange(page);
            } }
            
          >
            { text }
          </a>
        </li>
      );
    const options = {
        sizePerPageOptionRenderer
    };
    return(
        <Container>
            <Header title={t('Report information')} button={t('Download report')}
                openModal={()=>{}} download={true}/>
            <div className="content">
                <BootStrapTable
                    scrollX
                    keyField="id"
                    data={tableData}
                    columns={columns}
                    pagination={paginationFactory(options)}
                    bordered={ false }
                    headerClasses="table-header"
                    rowClasses="table-row"
                />
            </div>
            
        </Container>
    )
}

export default Reporting;