import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../styles/fonts.scss'
import '../../styles/Global Components/Button.scss';

const axios = require('axios');

const config = 
{
    withCredentials: true,
    headers: {
      'Acess-Control-Allow-Origin':true,
      'Content-Type': 'application/x-www-form-urlencoded'

    }
}

export default function ModifyAccount({show, setShow, handleClose, handleShow}) {
    const history = useHistory();
    let [oldPassword, setPassword] = useState(''); // Asking for Old Password 

    let [usernameInput, setUsernameInput] = useState('');
    let [passwordInput, setPasswordInput] = useState(''); // New Password
    let [passwordInput2, setPasswordInput2] = useState(''); // Confirm New Password

    let [wrongOldPassword, setWrongOldPassword] = useState(false);
    let [wrongUsername, setWrongUsername] = useState(false);
    let [takenUsername, setTakenUsername] = useState(false);
    let [wrongMatchingPassword, setWrongMatchingPassword] = useState(false);

   


    function mod(oldPassword, newUsername, password1, password2) {
        const params = new URLSearchParams();
        if(password1 != password2){
            console.log("wrong password");
            wrongMatchingPassword = setWrongMatchingPassword(true);
            passwordInput = setPasswordInput('');
            passwordInput2 = setPasswordInput2('');
        }else{
            params.append('username', newUsername);
            params.append('password', password1);
            axios.put('http://localhost:3100/modifyAccount', params,config)
            .then((result) => {
                console.log("sucess")
            })
            .catch((err) => {
                if(err.response.data.message === "invalid password"){
                    setWrongMatchingPassword(true);
                };
                if(err.response.data.message === "invalid username - must be between 3-20 characters"){
                    setWrongUsername(true);
                    setUsernameInput('');
                } 
                if (err.response.data.message === "username already taken") {
                    setTakenUsername(true);
                    setUsernameInput('');
                }
            })
        }
       
    } 
    

   

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title> Change username/password </Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <small> First, Enter your current password : </small>

            <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
                <input type="password" 
                    className={wrongOldPassword === true ? "input-container-error font-body text-body" : "input-container font-body text-body"}
                    value={oldPassword} 
                    placeholder={wrongOldPassword === true ? "Wrong Password" : "Current Password"} 
                    onChange={e => setPassword(e.target.value)}
                    style={{borderRadius:"10px", textAlign:"center", padding:"10px", marginBottom:"15px"}}
                />
            </div>
            <small style={{display:"flex", justifyContent:"alignStart"}}> Enter the credentials that must be changed:  </small>  
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>

                    {wrongUsername === false && takenUsername === false && 
                        <input
                            className= "input-container font-body text-body"
                            type="text" 
                            value={usernameInput} 
                            placeholder= "New Username "
                            onChange={e => setUsernameInput(e.target.value)}
                            style={{borderRadius:"10px", textAlign:"center", padding:"10px", marginBottom:"5px"}}
                        />
                    }
                    {wrongUsername === true &&  
                        <input
                            className="input-container-error font-body text-body"
                            type="text" 
                            value={usernameInput} 
                            placeholder={"invalid username - must be between 3-20 characters" }
                            onChange={e => setUsernameInput(e.target.value)}
                            style={{borderRadius:"10px", textAlign:"center", padding:"10px", marginBottom:"5px"}}
                        />
                    }
                    {takenUsername === true && 
                        <input
                            className="input-container-error font-body text-body"
                            type="text" 
                            value={usernameInput} 
                            placeholder={"username already taken" }
                            onChange={e => setUsernameInput(e.target.value)}
                            style={{borderRadius:"10px", textAlign:"center", padding:"10px", marginBottom:"5px"}}
                        />
                    }
                

                    <input type="password" 
                        name='password' 
                        className={wrongMatchingPassword === true ? "input-container-error font-body text-body" : "input-container font-body text-body"}
                        value={passwordInput} 
                        placeholder={wrongMatchingPassword === true ? "Passwords do not match" : "New Password"} 
                        onChange={e => setPasswordInput(e.target.value)}
                        style={{borderRadius:"10px", textAlign:"center", padding:"10px", marginBottom:"5px"}}
                    />


                    <input type="password" 
                        className={wrongMatchingPassword === true ? "input-container-error font-body text-body" : "input-container font-body text-body"}
                        value={passwordInput2} 
                        placeholder={wrongMatchingPassword === true ? "Passwords do not match" : "Re-type new Password"} 
                        onChange={e => setPasswordInput2(e.target.value)}
                        style={{borderRadius:"10px", textAlign:"center", padding:"10px", marginBottom:"5px"}}
                    />
            </div>
            </Modal.Body>

            <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="success" onClick={() => mod(oldPassword,usernameInput, passwordInput, passwordInput2)}>
                Confirm
            </Button>
            
            </Modal.Footer>
        </Modal>   
    )
}
