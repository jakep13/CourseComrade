import React from 'react';
import'../../styles/Dashboard Component/Icon.scss';


export default function Icon(props) {
  
    return (
        <div className= "icon-container eng-color font-subtitle text-title" >
            {props.department && props.department.charAt(0)}
        </div>
    )
}
