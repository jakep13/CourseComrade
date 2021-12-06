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
    let [invalidPassword, setInvalidPassword] = useState(false);

    function auth(username, password1, password2) {

        if(password1 !== password2){        
                setWrongPassword(true);
                setInvalidPassword(false);
                setPasswordInput("");
                setPasswordInput2("");
        }
        else{
            const params = new URLSearchParams()
            params.append('username', username)
            params.append('password', password1)

            axios.post('http://localhost:3100/createAccount', params, config)
            .then((result) => {
                console.log("successful account creation")
                axios.post('http://localhost:3100/login', params,config).then((result) => {
                    history.push('/your-dashboard');
                    console.log("successful account creation and redirection into account");
                }).catch((err) => {
                   
                      
                })
        
            })
            .catch((err) => {
                if(err.response.data.message == "invalid password"){
                    setInvalidPassword(true);
                    setWrongPassword(false);
                    setPasswordInput("");
                    setPasswordInput2("");
                }
                if(err.response.data.message === "username already taken"){
                    setWrongUsername(true);
                    setUsernameInput("");
                }
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
                style={{ textAlign:"center", padding:"10px"}}
            />
        
            {wrongPassword === false && invalidPassword === false && 
                <>
                    <input type="password" 
                    className= "input-container font-body text-body"
                    value={passwordInput} 
                    placeholder="Enter password."
                    onChange={e => setPasswordInput(e.target.value)}
                    style={{ textAlign:"center", padding:"10px"}}
                    />
    
                    <input type="password" 
                        className="input-container font-body text-body"
                        value={passwordInput2} 
                        placeholder= "Enter password again"
                        onChange={e => setPasswordInput2(e.target.value)}
                        style={{ textAlign:"center", padding:"10px"}}
                    />
             </>
            }

            {wrongPassword === true  && invalidPassword === false &&
                <>
                    <input type="password" 
                    className= "input-container-error font-body text-body"
                    value={passwordInput} 
                    placeholder="Passwords do not match"
                    onChange={e => setPasswordInput(e.target.value)}
                    style={{ textAlign:"center", padding:"10px"}}
                    />
    
                    <input type="password" 
                        className="input-container-error font-body text-body"
                        value={passwordInput2} 
                        placeholder= "Passwords do not match"
                        onChange={e => setPasswordInput2(e.target.value)}
                        style={{ textAlign:"center", padding:"10px"}}
                    />
             </>
            }
            {invalidPassword === true  && wrongPassword === false &&
                <>
                    <input type="password" 
                    className= "input-container-error font-body text-body"
                    value={passwordInput} 
                    placeholder="Passwords must be between 3-20 characters with 1 number"
                    onChange={e => setPasswordInput(e.target.value)}
                    style={{ textAlign:"center", padding:"10px"}}
                    />
    
                    <input type="password" 
                        className="input-container-error font-body text-body"
                        value={passwordInput2} 
                        placeholder= "Passwords must be between 3-20 characters with 1 number"
                        onChange={e => setPasswordInput2(e.target.value)}
                        style={{ textAlign:"center", padding:"10px"}}
                    />
             </>
            }
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