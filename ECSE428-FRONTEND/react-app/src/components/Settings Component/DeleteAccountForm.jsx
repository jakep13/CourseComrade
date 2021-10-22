import React, { useState } from 'react';
import '../../styles/Authentication Components/Form.scss';
import '../../styles/fonts.scss'
import '../../styles/Global Components/Button.scss';
import DeleteAccount from '../Settings Component/DeleteAccount';
import Button from 'react-bootstrap/Button';
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
    const [deleteAccount, setDeleteAccount] = useState(false);
    const CloseDeleteAccount = () => setDeleteAccount(false);
    const ShowDeleteAccount = () => setDeleteAccount(true);
    return (
        <>
            <div>
                <Button onClick={ShowDeleteAccount}> Delete Account </Button> 
                <DeleteAccount
                    show={deleteAccount}
                    setShow={setDeleteAccount}
                    handleClose={CloseDeleteAccount}
                    handleShow={ShowDeleteAccount}
                />  
            
        </div>
        
        </>
    )

    
    
}