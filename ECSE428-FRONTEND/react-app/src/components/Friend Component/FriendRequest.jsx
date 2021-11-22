import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { TiDelete } from 'react-icons/ti';
import { MdAddCircle} from 'react-icons/md';
import '../../styles/Friends Component/FriendRequest.scss';
import Icon from '../Dashboard Component/Icon';


function FriendRequest({ requests }) {
    const [isAdded, setIsAdded] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    function acceptRequest(friendName) {
        console.log("add axios calls");
        setIsAdded(true);
        return;
    }

    function deleteRequest(friendName) {
        console.log("add axios calls");
        setIsDeleted(true);
        return;
    }
    return (
        <>
            {
            requests.map((item) => {
                return (
                    <div className="friend-request-container">
                        <div className="user-icon"> <Icon department={item.username}/> </div>
                        <div className="user-data">
                            <div className="name font-round"> {item.username}</div>
                        </div>
                        <Button disabled={isAdded} onClick={() => acceptRequest(item.username)}> <div className="btn-container add"> <MdAddCircle /> </div> </Button>
                        <Button disabled={isDeleted} onClick={() => deleteRequest(item.username)}> <div className="btn-container"> <TiDelete /> </div> </Button>
                    </div>
                )
            })
        }   
        </>
     
     
    )
}

export default FriendRequest
