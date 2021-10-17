import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../styles/Authentication Components/Form.scss';
import '../../styles/fonts.scss'
import '../../styles/Global Components/Button.scss';
import Card from '../../Global Components/Card';

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
    return (
        <>
            <div>
            <Card
                welcomeTitle="Delete Account"
                subTitle="You won't be able to reactivate your account and your profile will be deleted permanently."
                form="deleteAccount"
                
            />         
        </div>
        
        </>
    )
 
   /* axios.post('http://localhost:3100/deleteAccount', params, config)
    .then((result) => {
        axios.get('http://localhost:3100/', config).then((result) => {
            history.push('/');
            console.log(result);
            console.log("rania was here");
        
        })

    })*/
    
    
}