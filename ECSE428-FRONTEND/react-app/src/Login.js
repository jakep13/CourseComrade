import logo from './logo.svg';
import './App.css';
import LogIn from './components/LogIn Component/LogIn';
import Card from './Global Components/Card.jsx';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
const axios = require('axios')


const config = 
{
    withCredentials: true,
    headers: {
        'Acess-Control-Allow-Origin':true,
      'Content-Type': 'application/x-www-form-urlencoded'

    }
  }
  
function auth(username, password) {

    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    axios.post('http://localhost:3100/login', params, config)
    .then((result) => {
    // Redirect
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



function Login() {

    const [message1, setMessage1] = useState( '' );
    const [message2, setMessage2] = useState( '' );


  return (
      <div>
        <input type="text" 
        value={message1} 
        placeholder="username" 
        onChange={ e => setMessage1(e.target.value)}/>
        
        <input type="text" 
        value={message2} 
        placeholder="password" 
        onChange={ e => setMessage2(e.target.value)}/>

        <Button variant = "primary" size = "lg" onClick= {()=> {auth(message1, message2) }} >
            Login
        </Button>

        
      </div>


  );
}


export default Login;
