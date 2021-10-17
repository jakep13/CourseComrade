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


export default function DeleteAccount({show, setShow, handleClose, handleShow}) {
    const history = useHistory();

    function deleteAccount(username, password) {
        history.push('/');
      /*  axios.post('http://localhost:3100/deleteAccount', params, config)
        .then((result) => {
            axios.get('http://localhost:3100/', config).then((result) => {
                history.push('/');
                console.log(result);
                console.log("rania was here");
            
            })
    
        })*/
    }

    return (
        <>
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title> Delete Account </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    You won't be able to reactivate your account and your profile will be deleted permanently.
                    Please confirm your action. 
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="success" onClick={deleteAccount}>
                Confirm
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}
