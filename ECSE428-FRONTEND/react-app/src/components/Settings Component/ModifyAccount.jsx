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
   // let [oldUsername, setUsername] = useState(''); // Asking for Old Password 
    let [oldPassword, setPassword] = useState(''); // Asking for Old Password 

    let [usernameInput, setUsernameInput] = useState('');
    let [passwordInput, setPasswordInput] = useState(''); // New Password
    let [passwordInput2, setPasswordInput2] = useState(''); // Confirm New Password

    let [wrongOldPassword, setWrongOldPassword] = useState(false);
    let [wrongUsername, setWrongUsername] = useState(false);
    let [wrongMatchingPassword, setWrongMatchingPassword] = useState(false);

   


    function mod(password, newUsername, password1, password2) {
        const params = new URLSearchParams()

        //TODO 
        //If old Username is incorrect
        // if( params.get('password') !== password){
        //     wrongUsername = setWrongUsername(true);
        //     //oldUsername = setUsername('');
        //     wrongOldPassword = setWrongOldPassword(true);
        //     oldPassword = setPassword('');
        // }
         if (password1 !== password2) {
            wrongMatchingPassword = setWrongMatchingPassword(true);
            passwordInput = setPasswordInput('');
            passwordInput2 = setPasswordInput2('');
        } else {
            params.append('username', newUsername)
            params.append('password', password1)
            axios.post('http://localhost:3100/your-dashboard', params, config)
            .then((result) => {
                console.log(result)
                axios.get('http://localhost:3100/your-dashboard', params,config).then((result) => {
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
        } 
    }

   

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title> Change username/password </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                  <small>First, enter your current password.</small>
            </Modal.Body>
            

            <input type="password" 
                className={wrongOldPassword === true ? "input-container-error font-body text-body" : "input-container font-body text-body"}
               value={oldPassword} 
              placeholder={wrongOldPassword === true ? "Wrong Password" : "Current Password"} 
              onChange={e => setPassword(e.target.value)}
            />
              
              <Modal.Body>
              <small>Enter new username and/or password.</small>
            </Modal.Body>
            <input
                className={wrongUsername === true ? "input-container-error font-body text-body" : "input-container font-body text-body"}
                type="text" 
                value={usernameInput} 
                placeholder={wrongUsername === true ? "username already taken" : "New UserName "}
                onChange={e => setUsernameInput(e.target.value)}
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
                placeholder={wrongMatchingPassword === true ? "Passwords do not match" : "Re-type new Password"} 
                onChange={e => setPasswordInput2(e.target.value)}
            />

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
