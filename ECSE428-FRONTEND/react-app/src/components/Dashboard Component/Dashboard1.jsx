import React, { useState } from 'react'
import '../../styles/Dashboard Component/Dashboard.scss'
import NavBar from '../Nav Components/NavBar';
import Search from '../Search Component/Search';
import Board from './Board';
import DeleteAccountForm from '../Settings Component/DeleteAccountForm';
import ModifyAccountForm from '../Settings Component/ModifyAccountForm';

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
                <div style={{ width: "100%", background: "#fafafa" }}>
                    
                    {(dashboardActive && searchActive=== false && myAccount=== false)  && (<Board />)}
                    {searchActive && <Search />}
                    {myAccount && <ModifyAccountForm />}
                    {myAccount && <DeleteAccountForm />}   
                </div>
               
            </div>
        </div>
    )
}


