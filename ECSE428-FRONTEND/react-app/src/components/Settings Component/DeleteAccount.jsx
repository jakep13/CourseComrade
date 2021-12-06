import React, { useState } from 'react';
import Header from '../../Global Components/Header';
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


export default function DeleteAccount({show, setShow, handleClose, handleShow}) {
    const history = useHistory();
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errInput, setErrInput] = useState(false);

    function deleteAccount(username) {
       const params = new URLSearchParams();
       params.append("username", username)
       axios.post('http://localhost:3100/deleteAccount', params, config)
        .then((result) => {
            console.log(result.response.data.message);
            }) 
        .catch((err) => {
           console.log("here")
           setErrInput(true);
           setUsernameInput("");
           setPasswordInput("");
           setErrInput("");
        })

        history.push("/")
    }

    return (
        <>
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title> Delete Account </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    You won't be able to reactivate your account and your profile will be deleted permanently.
                    Please confirm your action. 
                </p>
                <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
                <input
                    className= {errInput === true ? "input-container-error font-body text-body": "input-container font-body text-body"}
                    type="text" 
                    value={usernameInput} 
                    placeholder= {errInput === true ? "Error with input username" : "Enter your username "}
                    onChange={e => setUsernameInput(e.target.value)}
                    style={{borderRadius:"10px", textAlign:"center", padding:"10px", marginBottom:"5px"}}
                />

                 <input 
                 type="password" 
                className={errInput === true ? "input-container-error font-body text-body": "input-container font-body text-body"}
                value={passwordInput} 
                placeholder={errInput === true ? "Error with input password" : "Enter your password" }
                onChange={e => setPasswordInput(e.target.value)}
                style={{borderRadius:"10px", textAlign:"center", padding:"10px"}}
                />
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="success" onClick={() => deleteAccount(usernameInput)}>
                Confirm
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}
