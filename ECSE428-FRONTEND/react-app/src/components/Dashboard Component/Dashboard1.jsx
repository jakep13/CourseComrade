import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import DeleteAccount from '../Settings Component/DeleteAccount';
//import ButtonGroup from '@mui/material/ButtonGroup';
//import TextField from '@mui/material/TextField';
import '../../styles/Dashboard Component/Dashboard.scss'
import NavBar from '../Nav Components/NavBar';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Search from '../Search Component/Search';
import Board from './Board';
import DeleteAccountForm from '../Settings Component/DeleteAccountForm';

const axios = require('axios');

const config = 
{
    withCredentials: true,
    headers: {
      'Acess-Control-Allow-Origin':true,
      'Content-Type': 'application/x-www-form-urlencoded'

    }
}

export default function Dashboard1() {

    let [dashboardActive, setDashboardActive] = useState(true);
    let [searchActive, setSearchActive] = useState(false);
    let [myAccount, setMyAccount] = useState(false);

    return (
        <div className="dashboard-content-margin">
            <div className="dashboard-container">
                <NavBar
                    setDashboardTab={setDashboardActive}
                    setSearchTab={setSearchActive}
                    setAccountTab={setMyAccount}
                />
                <div style={{ width:"100%" , background:"#fafafa"}}>
                    {(dashboardActive && searchActive=== false && myAccount=== false)  && (<Board />)}
                    {searchActive && <Search />}
                    {myAccount && <DeleteAccountForm />}
                </div>
               
            </div>
        </div>
    )
}


