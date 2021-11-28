import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { TiDelete } from 'react-icons/ti';
import { MdAddCircle} from 'react-icons/md';
import '../../styles/Friends Component/FriendRequest.scss';
import Icon from '../Dashboard Component/Icon';

const axios = require('axios');

const config = 
{
    withCredentials: true,
    headers: {
      'Acess-Control-Allow-Origin':true,
      'Content-Type': 'application/x-www-form-urlencoded'

    }
}

function FriendRequest({ requests }) {
    const [isAdded, setIsAdded] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    function acceptRequest(friendName) {
        const params = new URLSearchParams()
        params.append('username', friendName);
        axios.post('http://localhost:3100/acceptFriend', params, config)
            .then((result) => {
                console.log("friends in course: ", result)
            })
            .catch((err) => {
                console.log("cant accept friend request ", err);
            })
        setIsAdded(true);
        return;
    }

    function deleteRequest(friendName) {
        const params = new URLSearchParams()
        params.append('username', friendName);
        axios.post('http://localhost:3100/declineFriend', params, config)
            .then((result) => {
                console.log("deleted request from: ", result)
            })
            .catch((err) => {
                console.log("cant decline friend request ", err);
            })
        setIsDeleted(true);
        return;
    }
    let addStyle = {fill:"green", width:"20px", height:"20px" }
    let deleteStyle = { fill: "red", width:"25px", height:"25px" };
    return (
        <>
            {
            requests.map((item) => {
                return (
                    <div className="friend-request-container">
                        <div className="user-icon"> <Icon department={item}/> </div>
                        <div className="user-data">
                            <div className="name font-round"> {item}</div>
                        </div>
                        <div classname="btns" style={{display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                            <div disabled={isAdded} onClick={() => acceptRequest(item)} style={{marginRight:"10px"}}> <div className="btn-container add"> <MdAddCircle style={addStyle}/> </div> </div>
                            <div disabled={isDeleted} onClick={() => deleteRequest(item)} style={{marginRight:"10px"}}> <div className="btn-container"> <TiDelete style={deleteStyle}/> </div> </div>
                        </div> 
                    </div>
                )
            })
        }   
        </>
     
     
    )
}

export default FriendRequest
