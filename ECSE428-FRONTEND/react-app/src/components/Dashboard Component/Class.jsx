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

export default function Class() {
    const [selected, setSelected] = useState({ value: 'View All' });
    const [registeredClass, setRegisteredClass] = useState();

    const fetchData = async () => {
     
        axios.get('http://localhost:3100/courses', config).then((result) => {
            setRegisteredClass(result.data);
        }).catch((err) => {
            console.log("ERROR")
        })
    }
    
   
    
    const handleChange = (e) => {
        console.log(e.target.value);
        setSelected({ value: `${e.target.value}` });
    
    }

    useEffect( () => {fetchData()});
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
                     registeredClass?.map((item) => {
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
