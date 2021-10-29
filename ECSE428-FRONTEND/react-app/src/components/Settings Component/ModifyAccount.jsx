//import React from 'react';
//import Card from '../../Global Components/Card';
//import Header from '../../Global Components/Header';

import React, { useState } from 'react';
import Card from '../../Global Components/Card';
import '../../styles/Authentication Components/Form.scss';
import '../../styles/fonts.scss'
import '../../styles/Global Components/Button.scss';
import { useHistory } from 'react-router-dom';
import CustomizedButton from '../../Global Components/CustomizedButton';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const axios = require('axios');

const config = 
{
    withCredentials: true,
    headers: {
      'Acess-Control-Allow-Origin':true,
      'Content-Type': 'application/x-www-form-urlencoded'

    }
}

export default function ModifyAccount() {
    const history = useHistory();

    let [oldPassword, setPassword] = useState(''); // Asking for Old Password 
    let [passwordInput, setPasswordInput] = useState(''); // New Password
    let [passwordInput2, setPasswordInput2] = useState(''); // Confirm New Password

    let [wrongOldPassword, setWrongOldPassword] = useState(false);
    let [wrongMatchingPassword, setWrongMatchingPassword] = useState(false);

    function auth(password, password1, password2) {
        const params = new URLSearchParams()
        if(params.get(password) !== password){
            wrongOldPassword = setWrongOldPassword(true);
            oldPassword = setPassword('');
        }
    
        else if (password1 !== password2) {
            wrongMatchingPassword = setWrongMatchingPassword(true);
            passwordInput = setPasswordInput('');
            passwordInput2 = setPasswordInput2('');
        } else {
            params.append('password', password1)
            axios.post('http://localhost:3100/your-dashboard', params, config)
            .then((result) => {
            // Redirect
                console.log(result)
                axios.post('http://localhost:3100/your-dashboard', params,config).then((result) => {
                    history.push('/your-dashboard');
                    console.log(result);

                })
        
            })
        } 
    }

    return (
        <div className="form-container">
            <input type="password" 
                className={wrongOldPassword === true ? "input-container-error font-body text-body" : "input-container font-body text-body"}
                value={oldPassword} 
                placeholder={wrongOldPassword === true ? "Wrong Password" : "Current Password"} 
                onChange={e => setPassword(e.target.value)}
            />
        
            <input type="password" 
                name='password' 
                className={wrongMatchingPassword === true ? "input-container-error font-body text-body" : "input-container font-body text-body"}
                value={passwordInput} 
                placeholder={wrongMatchingPassword === true ? "Passwords do not match" : "New Password"} 
                onChange={e => setPasswordInput(e.target.value)}
            />

            <input type="password" 
                className={wrongMatchingPassword === true ? "input-container-error font-body text-body" : "input-container font-body text-body"}
                value={passwordInput2} 
                placeholder={wrongMatchingPassword === true ? "Passwords do not match" : "Re-type New Password"} 
                onChange={e => setPasswordInput2(e.target.value)}
            />

            <div className="button-container" style={{background:"linear-gradient(86deg,rgba(86, 128, 233, 1) 2%, rgba(193, 200, 228, 1) 100%)",  color:"white"}} onClick={() => auth(passwordInput, passwordInput2)}>
                <div className="button-wrapper">
                    <div className="text-wrapper">
                        <div className="font-body text-body" > <b> Confirm Password Change</b></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
