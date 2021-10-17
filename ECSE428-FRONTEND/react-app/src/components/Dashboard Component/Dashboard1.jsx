import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import DeleteAccount from '../Settings Component/DeleteAccount';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import '../../styles/Dashboard Component/Dashboard.scss'

const axios = require('axios');

const config = 
{
    withCredentials: true,
    headers: {
      'Acess-Control-Allow-Origin':true,
      'Content-Type': 'application/x-www-form-urlencoded'

    }
}

export default function Dashboard1() {

    const [deleteAccount, setDeleteAccount] = useState(false);
    const CloseDeleteAccount = () => setDeleteAccount(false);
    const ShowDeleteAccount = () => setDeleteAccount(true);
    //const [showDeteAccountMessage, setDeleteAccountMessage] = useState(false);
    
    const [myClass, setClass] = useState('')

    function getClassName(className) {
        console.log(className);
        setClass(className);
    }

    function addClass(className) {
        const params = new URLSearchParams()
        params.append('course', className)
        //console.log(className)

        axios.post('http://localhost:3100/addCourse', params, config)
            .then((result) => {
            // Redirect
                console.log(result)
            })
            .catch((err) => {
            })
    }

    function deleteClass(className) {
        const params = new URLSearchParams()
        params.append('course', className)
        //console.log(className)

        axios.post('http://localhost:3100/removeCourse', params, config)
            .then((result) => {
            // Redirect
                console.log(result)
            })
            .catch((err) => {
            })
    }

    function getClasses() {
        
    }

    return (

        <div>
            <h1> Welcome to your dashboard </h1>

        <div className='dashboard-container'>

            <ButtonGroup variant="outlined" aria-label="add/drop classes">
                    
                   <TextField
                        id="search_bar"
                        label="Search Class"
                        helperText="e.g. ECSE428"
                        onChange={(e) => getClassName(e.target.value)} 
                    />

                    <Button onClick={() => {addClass(myClass)}}> Add Class </Button>
                    <Button onClick={() => {deleteClass(myClass)}}> Delete Class</Button>
                </ButtonGroup>  

            <div> <Button onClick={ShowDeleteAccount}> Settings </Button> 
            </div>



            {deleteAccount &&
              
               <DeleteAccount
                    show={deleteAccount}
                    setShow={setDeleteAccount}
                    handleClose={CloseDeleteAccount}
                    handleShow={ShowDeleteAccount}
                />
            }

            </div> 
        </div>
    )
}


