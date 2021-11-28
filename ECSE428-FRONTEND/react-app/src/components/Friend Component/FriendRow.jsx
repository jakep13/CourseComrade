import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import '../../styles/Friends Component/FriendRow.scss';
import { MdAddCircle} from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import { ImBooks } from 'react-icons/im';
import Modal from 'react-bootstrap/Modal';
import Icon from '../Dashboard Component/Icon';
import '../../styles/Dashboard Component/ClassRow.scss';
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

export default function FriendRow({friendName, classes, viewClass, buttonMessage}) {

    const [isAdded, setIsAdded] = useState(false);
    const [show, setShow] = useState(false);


    function OpenModal(className) {
        setShow(true);
        const params = new URLSearchParams()
        params.append('course', className);
        console.log("here is the name " + className)
        axios.post('http://localhost:3100/friendsByCourse', params, config)
            .then((result) => {
                console.log("friends in course: ", result)
            })
            .catch((err) => {
                console.log("here is the name " + className)
                console.log("\n\ncant find friends \n \n", err);
            })
    }

    function handleClick(buttonMessage, friendName) {
        console.log("handle click code: ", friendName)
        if (buttonMessage === 'Add') {
            addFriend(friendName);
            return;
        }
        
        if (buttonMessage === 'Remove') {
            removeFriend(friendName);
            return;
        }
    }

    function removeFriend(friendName) {
        const params = new URLSearchParams()
        params.append('username', friendName)

        axios.post('http://localhost:3100/removeFriend', params, config)
            .then((result) => {
                console.log("delete friend" , result)
            })
            .catch((err) => {
                console.log("Cannot delete friend", err);
            })
    }
    function addFriend(friendName) {
        const params = new URLSearchParams()
        params.append('username', friendName)

        axios.post('http://localhost:3100/addFriend', params, config)
            .then((result) => {
                setIsAdded(true);
                console.log("sent request to" , result)
            })
            .catch((err) => {
                console.log("Cannot add friend", err);
            })
    }

    let addStyle = {fill:"green"}
    let deleteStyle = { fill: "red", width: "25px", height: "25px" };
    let modalBody={ background: "#9eb5eef1"}
    return (
        <div className="friend-row-container">
            <div className="user-icon"> <Icon department={friendName}/> </div>
            <div className="user-data">
                <div className="name font-round">{friendName}</div>
            </div>
            <div className="btns"> 
            {(classes && viewClass) && (
                <>
                <div className="viewUsers" onClick={() => OpenModal(friendName)}>
                    <ImBooks/>
                </div>  
                
                <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                >
                <Modal.Header closeButton>
                    <Modal.Title className='font-round text-subtitle'>
                    {friendName} registered classes
                    </Modal.Title>
                </Modal.Header>
               
                {classes.length === 0 ? 
                    <Modal.Body>
                        <EmptyState message="Friend is not registed to any classes yet" />
                    </Modal.Body>
                                :
                    <Modal.Body style={modalBody}>
                        {classes.map((item) => {
                            return (
                                <div className="row-container" style={{display:"grid", gridTemplateColumns: "15% 20%"}}>
                                    <div className="icon"> <Icon department={item}/> </div>
                                    <div className="classCode font-round text-body">{item}</div>
                                </div>
                            )
                        })}
                    </Modal.Body>             
                }               
            </Modal>
            </>
            )}
            { buttonMessage === 'Add' && <div disabled={isAdded} onClick={() => handleClick(buttonMessage, friendName)}> <div className="btn-container"> <MdAddCircle style={addStyle}/> </div> </div>}
            {buttonMessage === 'Remove' && <div disabled={isAdded} onClick={() => handleClick(buttonMessage, friendName)}> <div className="btn-container"> <TiDelete style={deleteStyle}/> </div> </div>}
            </div>
            
           
        </div>
    )
}
