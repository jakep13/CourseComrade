import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/Global Components/Button.scss';

const axios = require('axios');

const config = 
{
    withCredentials: true,
    headers: {
      'Acess-Control-Allow-Origin':true,
      'Content-Type': 'application/x-www-form-urlencoded'

    }
}

export default function ViewClassmates({show, setShow, handleClose, handleShow, code}) {
  
    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title> Friends  </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                  <small>First, enter your current password.</small>
            </Modal.Body>
        </Modal>
    )
}
