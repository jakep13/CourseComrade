import React, {useState, useEffect, useMemo} from 'react';
import '../../styles/Friends Component/Friend.scss';
import FriendRequest from './FriendRequest';
import FriendRow from './FriendRow';
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

export default function Friend() {
    const [selected, setSelected] = useState({ value: 'View All' });
    const [rawData, setRawData] = useState();
  
    const friends = useMemo(() => {
        if (!rawData) return [];

        const filteredFriends = rawData.filter(item => {
            return item.status.toLowerCase().includes("accepted")
        })
        console.log(filteredFriends);
        return filteredFriends;
    }, [rawData])


    const requestList = useMemo(() => {
        if (!rawData) return [];

        const rawFilteredRequests = rawData.filter(item => {
            return item.status.toLowerCase().includes("pending");
        });
        const filteredRequests = [];
        for (let r = 0; r < Object.keys(rawFilteredRequests).length; r++) {
            filteredRequests.push(rawFilteredRequests[r].friend.username);
        }
        return filteredRequests;
    }, [rawData])

    const handleChange = (e) => {
        setSelected({ value: `${e.target.value}` });
    
    }

    useEffect(() => { 
        axios.get('http://localhost:3100/friends', config).then((result) => {
            setRawData(result.data)
            console.log("successfully found data for /friends ENDPOINT")
        }).catch((err) => {
            console.log("ERROR failed at finding data for /friends ENDPOINT")
        });

    }, []);
    return (
        <div className="friend-container">
            <div className="header">
                <div className="main font-round"> My Friends </div>
                <div className="view-all">
                <div className="filter-container">
                    <select placeholder='Filters'  onChange={(e) => handleChange(e)} className="filter-wrapper">
                        <option value="View All"> View All </option> 
                        <option value="Requests"> My Friend Requests</option>
                    </select>
                </div>
                
                </div>
            </div>
            <div className="body">
                {(selected.value === 'View All' ) && friends &&
                    friends.map((item) => {
                        return ( <FriendRow friendName={item.friend.username} classes={item.friend.courses} viewClass={true} buttonMessage={"Remove"}/>)
                    })
                }
                {(selected.value === 'View All' ) && !friends &&
                  <EmptyState message="No Friends found. Start adding friends in the search bar"  />
                }
                {(selected.value === 'Requests' ) && <FriendRequest requests={requestList}/>}

            </div>
        </div>
    )
}
