import React, { useState } from 'react';
import '../../styles/Authentication Components/Form.scss';
import '../../styles/fonts.scss'
import '../../styles/Global Components/Button.scss';
import ModifyAccount from '../Settings Component/ModifyAccount';
import Header from '../../Global Components/Header';

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

export default function ModifyAccountForm() {
    const [modifyAccount, setModifyAccount] = useState(false);
    const CloseModifyAccount = () => setModifyAccount(false);
    const ShowModifyAccount = () => setModifyAccount(true);
    return (
        <>
        <div>
        <Button onClick={ShowModifyAccount}> Modify Account </Button> 
        <ModifyAccount
            show={modifyAccount}
            setShow={setModifyAccount}
            handleClose={CloseModifyAccount}
            handleShow={ShowModifyAccount}
        />
       
        </div>
        
        </>
    )

    
    
}