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
export default function DeleteAccountForm() {
 
    axios.post('http://localhost:3100/deleteAccount', params, config)
    .then((result) => {
        axios.get('http://localhost:3100/', config).then((result) => {
            history.push('/');
            console.log(result);
            console.log("rania was here");
        
        })

    })
    
    
}