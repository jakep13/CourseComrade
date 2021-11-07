import React from 'react';
import { RiGhostLine } from 'react-icons/ri';
import '../styles/Global Components/EmptyState.scss';


export default function EmptyState({message}) {
    return (
        <div className="empty-container" style={{marginTop: '10px'}}>
            <RiGhostLine />
            <div className="font-round text">
                {message}
            </div>
            
        </div>
    )
}
