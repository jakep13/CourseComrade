import React, {useState} from 'react';
import Bar from './Bar';
import ClassResults from './ClassResults';
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
    const searchClassResults = [
            { department: 'ECSE', code: 'ECSE428', className: 'Software Engineering Practices' },
            { department: 'ECSE', code: 'ECSE200', className: 'Electric Circuits 1' },
            { department: 'ECSE', code: 'ECSE222', className: 'Digital Logic' },
            { department: 'ECSE', code: 'ECSE408', className: 'Communication Systems' },
            { department: 'ECON', code: 'ECON337', className: 'Intro Econometrics 1' },
            { department: 'ECON', code: 'ECON546', className: 'Game Theory' },
            { department: 'ECON', code: 'ECON225', className: 'Economics of the Environment' },
            { department: 'COMP', code: 'COMP202', className: 'Foundation of Programmations' },
            { department: 'COMP', code: 'COMP208', className: 'Computer Programming for PS&E' },
            { department: 'COMP', code: 'COMP250', className: 'Intro to Computer Science' },
            { department: 'COMP', code: 'COMP251', className: 'Algorithms and Structures' },
    ];

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
    const [classListDefault, setClassListDefault] = useState(searchClassResults);
    const [friendListDefault, setFriendListDefault] = useState(friendsResults);
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
