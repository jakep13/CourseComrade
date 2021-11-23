import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import '../../styles/Friends Component/FriendRow.scss';
import { MdAddCircle} from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import { ImBooks } from 'react-icons/im';
import Modal from 'react-bootstrap/Modal';
import Icon from '../Dashboard Component/Icon';
import ClassRow from '../Dashboard Component/ClassRow';
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
        params.append('code', className);
        axios.get('http://localhost:3100/friendsByCourse', params, config)
            .then((result) => {
                console.log("friends in course: ", result)
            })
            .catch((err) => {
                console.log("cant find friends");
            })
    }

    function handleClick(buttonMessage, friendName) {
        console.log("handle click code: ", friendName)
        if (buttonMessage === 'Add') {
            addFriend(friendName);
            return;
        }
        
        if (buttonMessage === 'Remove') {
            console.log("remove friend")
            //deleteFriend(friendName);
        }
    }

    function addFriend(friendName) {
        console.log("adding friend: ", friendName)

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
    let deleteStyle = { fill: "red", width:"25px", height:"25px" };
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
                    <Modal.Title id="example-custom-modal-styling-title">
                    {friendName} registered classes
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {classes.length === 0 && <EmptyState message="Friend is not registed to any classes yet"/>}
                   {classes.map((item) => {
                       return(<ClassRow classCode={item} className={item} buttonMessage={""}/>)
                   })}
                </Modal.Body>
            </Modal>
            </>
            )}
            { buttonMessage === 'Add' && <div disabled={isAdded} onClick={() => handleClick(buttonMessage, friendName)}> <div className="btn-container"> <MdAddCircle style={addStyle}/> </div> </div>}
            {buttonMessage === 'Remove' && <div disabled={isAdded} onClick={() => handleClick(buttonMessage, friendName)}> <div className="btn-container"> <TiDelete style={deleteStyle}/> </div> </div>}
            </div>
            
           
        </div>
    )
}
