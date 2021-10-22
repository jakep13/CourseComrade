import React, {useState} from 'react';
import '../../styles/Search Component/Bar.scss';
import Button from 'react-bootstrap/Button';

const axios = require('axios');

const config = 
{
    withCredentials: true,
    headers: {
      'Acess-Control-Allow-Origin':true,
      'Content-Type': 'application/x-www-form-urlencoded'

    }
}

export default function Bar() {
    let [classResults, setClassResults] = useState(0);
    const [addClasses, setAddClasses] = useState(false);
    const CloseAddClass = () => setAddClasses(false);
    const ShowAddClass = () => setAddClasses(true);

    const [myClass, setClass] = useState('');

    
    function getClassName(className) {
        console.log(className);
        setClass(className);
    }

    function deleteClass(className) {
        const params = new URLSearchParams()
        params.append('course', className)
        //console.log(className)

        axios.post('http://localhost:3100/removeCourse', params, config)
            .then((result) => {
            // Redirect
                console.log(result)
            })
            .catch((err) => {
            })
    }
    function addClass(className) {
        const params = new URLSearchParams()
        params.append('course', className)
        //console.log(className)

        axios.post('http://localhost:3100/addCourse', params, config)
            .then((result) => {
            // Redirect
                console.log(result)
            })
            .catch((err) => {
         })
    }


    return (
        <div className="searchbar-container">
            {/* <input className="searchbar" type="search" placeholder='Search a friend or a class' ></input>*/}
            <div className="results-container">
                    <input
                        id="search_bar"
                        className="searchbar"
                         label="Search Class"
                         helperText="e.g. ECSE428"
                         onChange={(e) => getClassName(e.target.value)} 
                     />
 
                     <Button onClick={() => {addClass(myClass)}}> Add Class </Button>
                     <Button onClick={() => {deleteClass(myClass)}}> Delete Class</Button>
            </div>
       </div>
    )
}
