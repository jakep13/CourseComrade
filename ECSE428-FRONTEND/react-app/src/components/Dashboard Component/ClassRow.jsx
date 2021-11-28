import React, {useState} from 'react';
import Icon from './Icon';
import { TiDelete } from 'react-icons/ti';
import { MdAddCircle } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import '../../styles/Dashboard Component/ClassRow.scss';
import Modal from 'react-bootstrap/Modal';
import '../../styles/Friends Component/FriendRow.scss';
import EmptyState from '../../Global Components/EmptyState';
const axios = require('axios');

const config = 
{
    withCredentials: true,
    headers: {
      'Acess-Control-Allow-Origin':true,
      'Content-Type': 'application/x-www-form-urlencoded'

    }
}


export default function ClassRow({ classCode, className, buttonMessage }) {
   
    const [isAdded, setIsAdded] = useState(false);
    const [isDeleted, setIsDelete] = useState(false);
    const [show, setShow] = useState(false);
    const [friendsInClass, setFriendsInClass] = useState();

    function OpenModal(className) {
        setShow(true);
        const params = new URLSearchParams()
        params.append('course', className);
        axios.post('http://localhost:3100/friendsByCourse', params, config)
            .then((result) => {
                setFriendsInClass(result.data);
                console.log("found friendsByCourse: ", result.data)
            })
            .catch((err) => {
                console.log("cant find friends by course ", err);
            })
    }
    function addClass(className) {
        const params = new URLSearchParams()
        params.append('course', className)
        axios.post('http://localhost:3100/addCourse', params, config)
            .then((result) => {
                console.log("successfully added the course: ", className);
            })
            .catch((err) => {
                console.log("failed at adding the course: ", className);
            })
    }

    function deleteClass(className) {
        const params = new URLSearchParams()
        params.append('course', className)
        console.log(className)

        axios.post('http://localhost:3100/removeCourse', params, config)
            .then((result) => {
                console.log("successfully deleted the course: ", className);
            })
            .catch((err) => {
                console.log("failed at deleting the course: ", className);
            })
    }

    function handleClick(buttonMessage, classCode) {
        console.log("handle click code: ", classCode)
        if (buttonMessage === 'Add') {
            addClass(classCode);
            setIsAdded(true);
            return;
        }
        
        if (buttonMessage === 'Remove') {
            deleteClass(classCode);
            setIsDelete(true);
        }

    }

    let addStyle = { fill: "green" }
    let deleteStyle = { fill: "red", width: "25px", height: "25px" };
    let modalBody={ background: "#9eb5eef1"}
    return (
        <div className="row-container">
            <div className="icon"> <Icon department={classCode}/> </div>
            <div className="classCode font-round text-body">{classCode}</div>
            <div className="className font-round text-body"> {className}</div>  
            <div className="btns">
                <div className="viewUsers" onClick={() => OpenModal(classCode)}>
                    <FaUserFriends />
                </div>     
                <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                    closeButton
                >
                    <Modal.Header closeButton>
                        <Modal.Title className="font-round text-subtitle">
                            Friends in your class
                        </Modal.Title>   
                    </Modal.Header>
                    {friendsInClass?.length === 0 ? 
                        <Modal.Body>
                          <EmptyState message="Friend is not registed to any classes yet" />
                        </Modal.Body>
                        :
                        <Modal.Body style={modalBody}>
                            {friendsInClass?.map((item) => {
                                return (
                                    <div className="friend-row-container">
                                        <div className="user-icon"><Icon department={item} /></div>
                                        <div className="user-data">
                                            <div className="name font-round">{item}</div>
                                        </div>
                                    </div>
                                );      
                             })}
                        </Modal.Body>  
                    }
                </Modal>
                {buttonMessage === 'Add' && <div className="btn-container" disabled={isAdded} onClick={() => handleClick(buttonMessage, classCode)}> <div className="btn-container"> <MdAddCircle style={addStyle}/> </div> </div>}
                {buttonMessage === 'Remove' && <div disabled={isDeleted} onClick={() => handleClick(buttonMessage, classCode)}> <div className="btn-container"> <TiDelete style={deleteStyle}/> </div> </div>}
               
            </div>

        
       
        </div>

        
    )
}
