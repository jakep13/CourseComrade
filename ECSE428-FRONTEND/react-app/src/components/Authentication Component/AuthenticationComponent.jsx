import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Card from '../../Global Components/Card';
import Header from '../../Global Components/Header';


export default function AuthenticationComponent() {
    const authenticationOptions=["Log In", "Create Account"];
    return (
        <>
            <Header/>
            <div className="content-margin">
            <Card
                welcomeTitle="Welcome to CourseComerade"
                subTitle=" Select your method of authentication to have access to the application"
                form="authentication"
                options={authenticationOptions}
            />
            </div>
        </>
    )
}
