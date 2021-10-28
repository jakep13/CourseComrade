import React from 'react';
import '../../styles/Friends Component/Friend.scss';
import FriendRow from '../Friend Component/FriendRow';

export default function FriendResults({results}) {
    return (
        <div className="friend-container" style={{marginTop: '10px'}}>
            <div className="body">
                {results.length > 0 ?
                    results.map((item) => {
                        return ( <FriendRow name={item.username}/>)
                    })
                    : <h1> No Results </h1>
                }
            </div>
        </div>
    )
}
