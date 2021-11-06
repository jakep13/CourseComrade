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
    
        /* to do when backend is done */
    const friendsResults = [
        { username: 'James' },
        { username: 'Robert' },
        { username: 'Micheal' },
        { username: 'John' },
        { username: 'William' },
        { username: 'Richard' },
        { username: 'Joseph' },
        { username: 'Mary' },
        { username: 'Patricia'},
        { username: 'Jennifer' },
        { username: 'Linda' },
        { username: 'Elizabeth' },
        { username: 'Susan' },
        { username: 'Jessica'},
        
    ]
    

    const [input, setInput] = useState('');
    const [classListDefault, setClassListDefault] = useState(ClassDatabase);
    const [friendListDefault, setFriendListDefault] = useState();
    const [classList, setClassList] = useState();
    const [friendList, setFriendList] = useState();
    
    const updateInput = async (input) => {
        const filteredClass = classListDefault.filter(item => {
            return item.code.toLowerCase().includes(input.toLowerCase())
        })
        /*const filteredFriends = friendListDefault.filter(item => {
            return item.username.toLowerCase().includes(input.toLowerCase())
        })*/
        setInput(input);
        setClassList(filteredClass);
        //setFriendList(filteredFriends);
    }

    const fetchData = async () => {
        console.log("fetching data")
        axios.get('http://localhost:3100/users').then((result) => {
            setFriendListDefault(result);
            console.log("fetch data for friends:", friendListDefault);

            //axios.get('http://')
            
        }).catch((err) => {
            console.log(err)
        })
    }
  

    useEffect( () => {fetchData()},[]);
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
