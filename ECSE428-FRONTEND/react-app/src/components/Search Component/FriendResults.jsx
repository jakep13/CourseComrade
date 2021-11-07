import React from 'react';
import '../../styles/Friends Component/Friend.scss';
import FriendRow from '../Friend Component/FriendRow';
import EmptyState from '../../Global Components/EmptyState';

export default function FriendResults({results}) {
    return (
        <div className="friend-container" style={{marginTop: '10px'}}>
            <div className="body">
                {results.length > 0 ?
                    results.map((item) => {
                        console.log(item)
                        return ( <FriendRow friendName={item} buttonMessage={"Add"}/>)
                    })
                    :    <EmptyState message="No friends found ..."/>
                }
            </div>
        </div>
    )
}
