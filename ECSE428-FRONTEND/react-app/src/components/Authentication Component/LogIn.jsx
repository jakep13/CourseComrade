import React from 'react';
import Header from '../../Global Components/Header';
import Card from '../../Global Components/Card';

export default function LogIn() {
    return (
        <div>
            <Card
                welcomeTitle="Enter Username & Password"
                subTitle=" You must have an account to access this application. If you do not have an account, create one now!"
                form="login"
            />
        </div>
    )
}
