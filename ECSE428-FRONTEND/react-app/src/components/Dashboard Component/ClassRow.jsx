import React, {useState} from 'react';
import Icon from './Icon';
import Button from 'react-bootstrap/Button';
import { TiDelete } from 'react-icons/ti';
import { MdAddCircle } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import '../../styles/Dashboard Component/ClassRow.scss';
import ViewClassmates from '../../Global Components/ViewClassmates';
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
    const [viewClassmates, setViewClassmates] = useState(false);
    const CloseModal = () => setViewClassmates(false);
    const ShowModal = () => setViewClassmates(true);


    function OpenModal(className) {
        ShowModal();
        const params = new URLSearchParams()
        console.log(className);
        //params.append('code', className);
        axios.get('http://localhost:3100/friendsByCourse', params, config)
            .then((result) => {
                console.log("friends in course: ", result)
            })
            .catch((err) => {
            })
    }
    function addClass(className) {
        const params = new URLSearchParams()
        params.append('course', className)
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

    let addStyle = {fill:"green"}
    let deleteStyle = { fill: "red", width:"25px", height:"25px" };
    return (
        <div className="row-container">
            <div className="icon"> <Icon department={classCode}/> </div>
            <div className="classCode font-round text-body">{classCode}</div>
            <div className="className font-round text-body"> {className}</div>  
            <div className="btns">
                <div className="viewUsers" onClick={() => OpenModal(classCode)}>
                    <FaUserFriends />
                    <ViewClassmates
                        show={viewClassmates}
                        setShow={setViewClassmates}
                        handleClose={CloseModal}
                        handleShow={ShowModal}
                        code = {classCode}
                    />
                </div>
                
                {buttonMessage === 'Add' && <div className="btn-container" disabled={isAdded} onClick={() => handleClick(buttonMessage, classCode)}> <div className="btn-container"> <MdAddCircle style={addStyle}/> </div> </div>}
                {buttonMessage === 'Remove' && <div disabled={isDeleted} onClick={() => handleClick(buttonMessage, classCode)}> <div className="btn-container"> <TiDelete style={deleteStyle}/> </div> </div>}
               
            </div>

        
       
        </div>
    )
}
