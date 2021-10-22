import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../styles/Authentication Components/Form.scss';
import '../../styles/fonts.scss'
import '../../styles/Global Components/Button.scss'

const axios = require('axios');

const config = 
{
    withCredentials: true,
    headers: {
      'Acess-Control-Allow-Origin':true,
      'Content-Type': 'application/x-www-form-urlencoded'

    }
}
  
export default function LogInForm() {
    let [usernameInput, setUsernameInput] = useState('');
    let [passwordInput, setPasswordInput] = useState('');
    const history = useHistory();

    let [wrongUsername, setWrongUsername] = useState(false);
    let [wrongPassword, setWrongPassword] = useState(false);
    let [noAccount, setNoAccount] = useState(false);

    function auth(username, password) {
        const params = new URLSearchParams()
        params.append('username', username)
        params.append('password', password)
    
        axios.post('http://localhost:3100/login', params, config)
        .then((result) => {
            axios.get('http://localhost:3100/', config).then((result) => {
                history.push('/your-dashboard');
                console.log(result);
            }).catch((err) => {
                // types of error:
                console.log("there is an error");
                // 1. if Wrong username 
                wrongUsername = setWrongUsername(true);
                usernameInput = setUsernameInput('');
                // 2. else if wrong password 
                wrongPassword = setWrongPassword(true);
                passwordInput = setPasswordInput('');
                // 3.new if statement: if wrongUsername == true && wrongPassword == true = no existing account. 
                    noAccount = setNoAccount(true);
                  
            })
    
        })
        .catch((err) => {
      
        })
    
    }
    return (
        <div className="form-container">
            <div className={noAccount === true ? "font-body text-body text-error" : "no-error" }><b> No Account exists with provided username and password </b></div>
            <input
                className={wrongUsername === true ? "input-container-error font-body text-body" : "input-container font-body text-body"}
                type="text" 
                value={usernameInput} 
                placeholder={wrongUsername === true ? "Wrong Username" : "UserName"}
                onChange={e => setUsernameInput(e.target.value)}
            />
        
            <input type="password" 
                className={wrongPassword === true ? "input-container-error font-body text-body" : "input-container font-body text-body"}
                value={passwordInput} 
                placeholder={wrongPassword === true ? "Wrong Password" : "Password"} 
                onChange={e => setPasswordInput(e.target.value)}
            />

            <div className="button-container" style={{background:"linear-gradient(86deg,rgba(86, 128, 233, 1) 2%, rgba(193, 200, 228, 1) 100%)",  color:"white"}} onClick={() => auth(usernameInput, passwordInput)}>
                <div className="button-wrapper">
                    <div className="text-wrapper">
                        <div className="font-body text-body" > <b> Log In</b></div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

