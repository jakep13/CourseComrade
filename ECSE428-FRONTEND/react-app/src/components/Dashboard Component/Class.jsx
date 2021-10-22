import React from 'react'
import Box from './Box';
import'../../styles/Dashboard Component/Class.scss';

function Class() {
    return (
        <div className="class-container">
        <div className="header"> <b> My Classes</b> </div>
        <div className="body">
                <li> ECSE428</li>
                <li> ECSE316</li>
                <li> COMP251 </li>
                <li> COPM250</li>
                <li> ECSE222 </li>
        </div>

     
    </div>
    )
}

export default Class
