import React from 'react';
import { IoMdExit } from 'react-icons/io';
import { MdOutlineDashboard } from 'react-icons/md';
import { RiSearchLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import '../../styles/Nav Components/NavBar.scss';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';

export default function NavBar({ setDashboardTab, setSearchTab, setAccountTab }) {
    const handleClick = (index) => {
        if (index === 0) {
            setDashboardTab(true);
            setSearchTab(false);
            setAccountTab(false);
        }
        else if (index === 1) {
            setDashboardTab(false);
            setSearchTab(true);
            setAccountTab(false);
        }
        else {
            setDashboardTab(false);
            setSearchTab(false);
            setAccountTab(true);
        }      
       
}
    return (
        <div className="left-navbar">
            <div className="sidebar">
                <div className="logo font-title text-title"> COURSECOMERADE</div>
                <div className="tabs font-body text-body">
                    <div className="tab" onClick={() => handleClick(0)}>
                        <div className="column"></div>
                        <li> <a href="#"> <i className="icons"><MdOutlineDashboard /></i> <div className="font-subtitle text-subtitle"><b> Dashboard </b></div></a></li>
                    </div>
                    <div className="tab" onClick={() => handleClick(1)}>
                        <div className="column"></div>
                        <li> <a href="#"> <i className="icons"><RiSearchLine /> </i> <div className="font-subtitle text-subtitle"> Search </div> </a></li>
                    </div>
                    <div className="tab"onClick={() => handleClick(2)}>
                        <div className="column"></div>
                        <li> <a href="#"> <i className="icons"><CgProfile/> </i> <div className="font-subtitle text-subtitle"> My Account </div> </a></li>
                    </div>
                </div>

                  
                <div className="tabs signout">
                    <div className="tab">                 
                        <li> <a className="signout" href="#"> <i className="icons"><IoMdExit/> </i> <div className="font-subtitle text-subtitle"> Sign Out </div> </a></li>
                    </div>
                </div>
            </div>    
        </div>
    )
}
