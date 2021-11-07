import React, {useState, useEffect} from 'react'
import Box from './Box';
import'../../styles/Dashboard Component/Class.scss';
import ClassRow from './ClassRow';
import MostPopuar from './MostPopuar';
const axios = require('axios');

const config = 
{
    withCredentials: true,
    headers: {
      'Acess-Control-Allow-Origin':true,
      'Content-Type': 'application/x-www-form-urlencoded'

    }
}


function Class() {
    const [selected, setSelected] = useState({ value: 'View All' });
 
    
    const classArray = [
        { department: "ECSE", classCode: "ECSE428", className: "Software Engineering Practice" },
        { department: "ECSE", classCode: "ECSE316", className: "Signals and Networks" },
        { department: "ECSE", classCode: "ECSE222", className: "Digital Logic" },
        { department: "COMP", classCode: "COMP250", className: "Intro to Computer Science" },
        { department: "COMP", classCode: "COMP251", className: "Algorithms and Structures" },
    ];
    
    const handleChange = (e) => {
        console.log(e.target.value);
        setSelected({ value: `${e.target.value}` });
    
    }

 
    return (
        <div className="class-container">
            <div className="header">
                <div className="main font-round"> My Classes </div>
                <div className="filter-container">
                    <select placeholder='Filters'  onChange={(e) => handleChange(e)} className="filter-wrapper">
                        <option value="View All"> View All </option> 
                        <option value="Most Popular"> Most Popular</option>
                        <option value="Most Popular-Graph"> Most Popular - Graph </option>
                    </select>
                </div>
            </div>
            <div className="class-wrapper">
                {(selected.value === 'View All' || selected.value === 'Most Popular') && 
                     classArray?.map((item) => {
                        return (
                            <ClassRow  classCode={item.code} className={item.name} buttonMessage="Remove"/>
                        )
                     })
                }
                {selected.value === 'Most Popular-Graph' && <MostPopuar/>}
        </div>

     
    </div>
    )
}

export default Class
