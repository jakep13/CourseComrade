import React, {useState} from 'react';
import Bar from './Bar';
import ClassResults from './ClassResults';
import ClassDatabase  from './ClassDatabase';
import FriendResults from './FriendResults';
import '../../styles/Search Component/Seach.scss';
import EmptyState from '../../Global Components/EmptyState';

export default function Search() {
    
        /* to do when backend is done */
        // cont fetchData = async() => {
        //return await fetch(<insert API URL>)
        //.then(date => {
        //  setClassList(data)
        //  setClassListDefault(data)
        //})
        //}
  
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
    
    async function makeGetRequest() {
        let res = await axios.get('http://localhost:3100/users');
        const [friendListDefault, setFriendListDefault] = useState(res.data);
        console.log(friendListDefault);
      }
      
    makeGetRequest();

    const [input, setInput] = useState('');
    const [classListDefault, setClassListDefault] = useState(ClassDatabase);
    //const [friendListDefault, setFriendListDefault] = useState(friendsResults);
    const [classList, setClassList] = useState();
    const [friendList, setFriendList] = useState();
    
    const updateInput = async (input) => {
        const filteredClass = classListDefault.filter(item => {
            return item.code.toLowerCase().includes(input.toLowerCase())
        })
        const filteredFriends = friendListDefault.filter(item => {
            return item.username.toLowerCase().includes(input.toLowerCase())
        })
        setInput(input);
        setClassList(filteredClass);
        setFriendList(filteredFriends);
    }
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
