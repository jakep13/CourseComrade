import React from 'react';
import Button from 'react-bootstrap/Button';
import Icon from './Icon';
import  '../../styles/Dashboard Component/ClassRow.scss';

export default function ClassRow({department, classCode, className}) {
    return (
        <div className="row-container">
            <div className="icon"> <Icon department={department}/> </div>
            <div className="classCode font-round text-body">{classCode}</div>
            <div className="className font-round text-body"> {className}</div>   
        </div>
    )
}
