import React, {useState, useEffect} from 'react';
import Bar from './Bar';
import ClassResults from './ClassResults';
import ClassDatabase  from './ClassDatabase';
import FriendResults from './FriendResults';
import '../../styles/Search Component/Seach.scss';
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



export default function Search() {
    const [input, setInput] = useState('');
    const [classListDefault, setClassListDefault] = useState(ClassDatabase);
    const [friendListDefault, setFriendListDefault] = useState();
    const [classList, setClassList] = useState();
    const [friendList, setFriendList] = useState();
    
    const fetchData = async () => {
        console.log("fetching data")
        axios.get('http://localhost:3100/users', config).then((result) => {
            console.log(result.data);
            var toArray = Object.entries(result.data).reduce((ini, [k, v]) => (ini[k] = v, ini), []);
            //setFriendList(result);
            setFriendListDefault(toArray);
            console.log("fetch data for friends:", friendListDefault);

        }).catch((err) => {
            console.log(err)
        })
    }
    
  
    const updateInput = async (input) => {
        const filteredClass = classListDefault.filter(item => {
            return item.code.toLowerCase().includes(input.toLowerCase())
        })
        const filteredFriends = friendListDefault.filter(item => {
            return item.toLowerCase().includes(input.toLowerCase())
        })
        
        setInput(input);
        setClassList(filteredClass);
        setFriendList(filteredFriends);
    }

    useEffect( () => {fetchData()}, friendListDefault);
    return (
        <div className="search-container">
            <Bar input={input} setKeyword={updateInput} />
            <div className="result-board">
                <div className="classResults">
                    <div className="class-header font-round">
                        <div className="title"> <b> Classes </b> </div>
                        <div className="button"> Add New Class</div>
                    </div>
                    {classList ? <ClassResults results={classList}/>  : <EmptyState message="No classes found. Start searching"  />}

                </div>
                <div className="friendResults">
                    <div className="friend-header font-round"> <b> Friends </b></div>
                    {friendList ? <FriendResults results={friendList}/> : <EmptyState message="No friends found. Start searching"  />}
                </div>
        
            </div>

        </div>
    )
}
