import React, {useState} from 'react';
import '../../styles/Search Component/Bar.scss';
export default function Bar({keyword, setKeyword}) {

    return (
        <div className="searchbar-container">
            <div className="results-container">
                <input
                    id="search_bar"
                    className="searchbar"
                    label="Search Class"
                    key="random1"
                    helperText="e.g. ECSE428"
                    value={keyword}
                    placeholder='Search for a class or for a person'
                    onChange={(e) => setKeyword(e.target.value)} 
                />
                
            </div>
       </div>
    )
}
