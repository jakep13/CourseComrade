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
  
export default function CreateAccountForm() {
    let [usernameInput, setUsernameInput] = useState('');
    let [passwordInput, setPasswordInput] = useState('');
    let [passwordInput2, setPasswordInput2] = useState('');
    const history = useHistory();

    let [wrongUsername, setWrongUsername] = useState(false);
    let [wrongPassword, setWrongPassword] = useState(false);

    function auth(username, password1, password2) {

        if (password1 !== password2) {
            wrongPassword = setWrongPassword(true);
            passwordInput = setPasswordInput('');
            passwordInput2 = setPasswordInput2('');
        }
        else {

            const params = new URLSearchParams()
            params.append('username', username)
            params.append('password', password1)
        
            axios.post('http://localhost:3100/login', params, config)
            .then((result) => {
            // Redirect
                //
                //console.log(result)
                //console.log("we made it into this b")
                axios.get('http://localhost:3100/', config).then((result) => {
                    history.push('/your-dashboard');
                    console.log(result);
                }).catch((err) => {
                    // types of error:
                    console.log("there is an error");
                    // 1. if username already taken 
                    wrongUsername = setWrongUsername(true);
                    usernameInput = '';
                      
                })
        
            })
            .catch((err) => {
          
            })
        }
       
    }
    return (
        <div className="form-container">
            <input
                className={wrongUsername === true ? "input-container-error font-body text-body" : "input-container font-body text-body"}
                type="text" 
                value={usernameInput} 
                placeholder={wrongUsername === true ? "username already taken" : "UserName "}
                onChange={e => setUsernameInput(e.target.value)}
            />
        
            <input type="password" 
                className={wrongPassword === true ? "input-container-error font-body text-body" : "input-container font-body text-body"}
                value={passwordInput} 
                placeholder={wrongPassword === true ? "Passwords do not match" : "Password"} 
                onChange={e => setPasswordInput(e.target.value)}
            />

            <input type="password" 
                className={wrongPassword === true ? "input-container-error font-body text-body" : "input-container font-body text-body"}
                value={passwordInput2} 
                placeholder={wrongPassword === true ? "Passwords do not match" : "Password"} 
                onChange={e => setPasswordInput2(e.target.value)}
            />

            <div className="button-container" style={{background:"linear-gradient(86deg,rgba(86, 128, 233, 1) 2%, rgba(193, 200, 228, 1) 100%)",  color:"white"}} onClick={() => auth(usernameInput, passwordInput, passwordInput2)}>
                <div className="button-wrapper">
                    <div className="text-wrapper">
                        <div className="font-body text-body" > <b> Create Account</b></div>
                    </div>
                </div>
            </div>
        </div>
        
        
    )
}

