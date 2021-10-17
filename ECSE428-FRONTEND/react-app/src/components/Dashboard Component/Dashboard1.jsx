import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import DeleteAccount from '../Settings Component/DeleteAccount';



export default function Dashboard1() {
    const [deleteAccount, setDeleteAccount] = useState(false);
    const CloseDeleteAccount = () => setDeleteAccount(false);
    const ShowDeleteAccount = () => setDeleteAccount(true);
    //const [showDeteAccountMessage, setDeleteAccountMessage] = useState(false);
    return (
        <div>    
            Welcome to your dashboard. Here are the following actions you can take: 
            <div> <Button onClick={ShowDeleteAccount}> Settings </Button> </div>
            <div> Add Classes </div>
            <div> Remove Classes </div>
            {deleteAccount &&
              
               <DeleteAccount
                    show={deleteAccount}
                    setShow={setDeleteAccount}
                    handleClose={CloseDeleteAccount}
                    handleShow={ShowDeleteAccount}
            />
            }
        </div>
    )
}


