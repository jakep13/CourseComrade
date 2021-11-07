import React, {useState} from 'react';
import Icon from './Icon';
import Button from 'react-bootstrap/Button';
import { TiDelete } from 'react-icons/ti';
import { MdAddCircle} from 'react-icons/md';
import '../../styles/Dashboard Component/ClassRow.scss';

const axios = require('axios');

const config = 
{
    withCredentials: true,
    headers: {
      'Acess-Control-Allow-Origin':true,
      'Content-Type': 'application/x-www-form-urlencoded'

    }
}


export default function ClassRow({  classCode, className, buttonMessage }) {
   
    const [isAdded, setIsAdded] = useState(false);
    const [isDeleted, setIsDelete] = useState(false);
    function addClass(className) {
        console.log("Add class");
        const params = new URLSearchParams()
        params.append('course', className)
        console.log(className)

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
        console.log(className)

        axios.post('http://localhost:3100/removeCourse', params, config)
            .then((result) => {
            // Redirect
                console.log(result)
            })
            .catch((err) => {
            })
    }

    function handleClick(buttonMessage, classCode) {
        console.log("handle click code: ", classCode)
        if (buttonMessage === 'Add') {
            console.log("add");
            addClass(classCode);
            setIsAdded(true);
            return;
        }
        
        if (buttonMessage === 'Remove') {
            console.log("remove")
            deleteClass(classCode);
        }

    }
    return (
        <div className="row-container">
            <div className="icon"> <Icon department={classCode}/> </div>
            <div className="classCode font-round text-body">{classCode}</div>
            <div className="className font-round text-body"> {className}</div>  
            {buttonMessage === 'Add' && <Button disabled={isAdded} onClick={() => handleClick(buttonMessage, classCode)}> <div className="btn-container"> <MdAddCircle /> </div> </Button>}
            {buttonMessage === 'Remove' && <Button disabled={isDeleted} onClick={() => handleClick(buttonMessage, classCode )}> <div className="btn-container"> <TiDelete/> </div> </Button>}
       
        </div>
    )
}
