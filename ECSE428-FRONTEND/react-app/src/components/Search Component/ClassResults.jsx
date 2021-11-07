import React, {useState} from 'react'
import'../../styles/Dashboard Component/Class.scss';
import ClassRow from '../Dashboard Component/ClassRow';
import EmptyState from '../../Global Components/EmptyState';

function Class({results}) {
    return (
        <div className="class-container" style={{marginTop: '10px'}}>
            <div className="class-wrapper"> 
                {results.length > 0 ?
                    results.map((item) => {
                        return(
                            <ClassRow department={item.code} classCode={item.code} className={item.name} buttonMessage={"Add"}/>
                        )
                    })
                    :
                    <EmptyState message="No classes found ..."/>
                }  
        </div>

     
    </div>
    )
}

export default Class
