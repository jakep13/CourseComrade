import React, {useState} from 'react';
import '../../styles/Dashboard Component/WelcomeBox.scss';
import { PieChart } from 'react-minimal-pie-chart';
import welcome from './561.jpg';

const axios = require('axios');

const config = 
{
    withCredentials: true,
    headers: {
      'Acess-Control-Allow-Origin':true,
      'Content-Type': 'application/x-www-form-urlencoded'

    }
}


function Box({ title, body }) {
    return (
        <div className="welcome-container">
            <div className="header">
                <div className="greetings font-round">
                    <div className="main"> Welcome Back</div>
                    <div className="body"> All your classes in one place</div>
                </div>
            </div>          
        </div>
    )
}

export default Box;
