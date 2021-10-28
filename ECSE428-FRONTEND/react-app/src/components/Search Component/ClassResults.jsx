import React, {useState} from 'react'
import'../../styles/Dashboard Component/Class.scss';
import ClassRow from '../Dashboard Component/ClassRow';


function Class({results}) {
    return (
        <div className="class-container" style={{marginTop: '10px'}}>
            <div className="class-wrapper"> 
                {results.length > 0 ?
                    results.map((item) => {
                        return(
                        <ClassRow department={item.department} classCode={item.classCode} className={item.className} />
                        )
                    })
                    :
                    <h1> No results </h1>
                }  
        </div>

     
    </div>
    )
}

export default Class
