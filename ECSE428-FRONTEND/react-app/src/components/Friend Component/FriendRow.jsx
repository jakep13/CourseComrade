import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import '../../styles/Friends Component/FriendRow.scss';
import { MdAddCircle} from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
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

export default function FriendRow({friendName, classes, buttonMessage}) {

    const [isAdded, setIsAdded] = useState(false);

    function handleClick(buttonMessage, friendName) {
        console.log("handle click code: ", friendName)
        if (buttonMessage === 'Add') {
            addFriend(friendName);
            setIsAdded(true);
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
        params.append('addFriend', friendName)

        axios.post('http://localhost:3100/addFriend', params, config)
            .then((result) => {
            // Redirect
                console.log(result)
            })
            .catch((err) => {
            })
    }

    return (
        <div className="friend-row-container">
            <div className="user-icon"> <Icon department={friendName}/> </div>
            <div className="user-data">
                <div className="name font-round">{friendName}</div>
                {classes &&  <div className="classes font-round">{classes}</div>}    
            </div>
            { buttonMessage === 'Add' && <Button disabled={isAdded} onClick={() => handleClick(buttonMessage, friendName)}> <div className="btn-container"> <MdAddCircle /> </div> </Button>}
            { buttonMessage === 'Remove' && <Button disabled={isAdded} onClick={() => handleClick(buttonMessage, friendName)}> <div className="btn-container"> <TiDelete/> </div> </Button>}
        </div>
    )
}
