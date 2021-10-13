import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../styles/Authentication Components/Form.scss';
import '../../styles/fonts.scss'
import '../../styles/Global Components/Button.scss'

const axios = require('axios');

const config = 
{
    withCredentials: true,
    headers: {
      'Acess-Control-Allow-Origin':true,
      'Content-Type': 'application/x-www-form-urlencoded'

    }
}
  
export default function Form( {buttonText}) {
    const [message1, setMessage1] = useState( '' );
    const [message2, setMessage2] = useState('');
    const history = useHistory();
    
    function auth(username, password) {
        const params = new URLSearchParams()
        params.append('username', username)
        params.append('password', password)
    
        axios.post('http://localhost:3100/login', params, config)
        .then((result) => {
        // Redirect
            history.push('/your-dashboard')
            console.log(result)
            console.log("we made it into this b")
            axios.get('http://localhost:3100/', config).then((result)=>{
                console.log(result)
            })
            
        })
        .catch((err) => {
        // Ask to login again
    
        })
    
    }
    return (
        <div className="form-container">
            <input
                className="input-container font-body text-body"
                type="text" 
                value={message1} 
                placeholder="Username" 
                onChange={e => setMessage1(e.target.value)}
            />
        
            <input type="text" 
                className="input-container font-body text-body"
                value={message2} 
                placeholder="Password " 
                onChange={e => setMessage2(e.target.value)}
            />

            <div className="button-container" style={{background:"linear-gradient(86deg,rgba(86, 128, 233, 1) 2%, rgba(193, 200, 228, 1) 100%)",  color:"white"}} onClick={() => auth(message1, message2)}>
                <div className="button-wrapper">
                    <div className="text-wrapper">
                        <div className="font-body text-body" > <b>{buttonText}</b></div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
