import React from 'react';
import '../../styles/Friends Component/Friend.scss';
import FriendRow from './FriendRow';

export default function Friend() {
    const friendList = [
        { name: 'Abdullah', commonClasses: '5' },
        { name: 'Anik', commonClasses: '4' },
        { name: 'Bethany', commonClasses: '6' },
        {name: 'Thomas', commonClasses: '7'},
    ]
    return (
        <div className="friend-container">
            <div className="header">
                <div className="main font-round"> My Friends </div>
                <div className="view-all">  See all </div>
            </div>
            <div className="body">
                {friendList.map((item) => {
                    return ( <FriendRow name={item.name} numClasses={item.commonClasses}/>)
                })}
            </div>
        </div>
    )
}
