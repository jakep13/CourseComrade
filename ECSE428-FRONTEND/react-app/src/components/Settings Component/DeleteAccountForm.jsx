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
    const history = useHistory();

    const deleteAcc = () => {

    
    console.log("CALLED HERE")
    var params = {}
    axios.post('http://localhost:3100/deleteAccount', params, config)
    .then((result) => {
        console.log("HERE WE ARE")
     
        console.log()
        history.push('/Log In');
        // axios.get('http://localhost:3100/', config).then((result) => {
            
        //     console.log(result);
        //     console.log("rania was here");
        
        // })

    })

}
    return (
        <div className="form-container">
          
    

            <div className="button-container" style={{background:"linear-gradient(86deg,rgba(86, 128, 233, 1) 2%, rgba(193, 200, 228, 1) 100%)",  color:"white"}} onClick={() => deleteAcc()}>
                <div className="button-wrapper">
                    <div className="text-wrapper">
                        <div className="font-body text-body" > <b> Delete Account</b></div>
                    </div>
                </div>
            </div>
        </div>   
    )
}