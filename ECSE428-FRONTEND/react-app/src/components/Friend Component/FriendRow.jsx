import React from 'react';
import '../../styles/Friends Component/FriendRow.scss';

export default function FriendRow({name, numClasses}) {
    return (
        <div className="friend-row-container">
            <div className="user-icon"> Icon </div>
            <div className="user-data">
                <div className="name font-round">{name}</div>
                {numClasses &&  <div className="classes font-round">{numClasses} in common</div>}    
            </div>
            
        </div>
    )
}
