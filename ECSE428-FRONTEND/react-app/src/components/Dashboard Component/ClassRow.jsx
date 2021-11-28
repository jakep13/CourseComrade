import React, {useState} from 'react';
import Icon from './Icon';
import Button from 'react-bootstrap/Button';
import { TiDelete } from 'react-icons/ti';
import { MdAddCircle } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import '../../styles/Dashboard Component/ClassRow.scss';
import Modal from 'react-bootstrap/Modal';
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
                console.log("cant find friends ", err);
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
                </div>     
                <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                    Friends in your class
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                    Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                    commodi aspernatur enim, consectetur. Cumque deleniti temporibus
                    ipsam atque a dolores quisquam quisquam adipisci possimus
                    laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
                    accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
                    reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
                    deleniti rem!
                    </p>
                </Modal.Body>
                </Modal>
                {buttonMessage === 'Add' && <div className="btn-container" disabled={isAdded} onClick={() => handleClick(buttonMessage, classCode)}> <div className="btn-container"> <MdAddCircle style={addStyle}/> </div> </div>}
                {buttonMessage === 'Remove' && <div disabled={isDeleted} onClick={() => handleClick(buttonMessage, classCode)}> <div className="btn-container"> <TiDelete style={deleteStyle}/> </div> </div>}
               
            </div>

        
       
        </div>

        
    )
}
