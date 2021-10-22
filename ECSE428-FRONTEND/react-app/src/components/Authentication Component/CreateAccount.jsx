import React from 'react';
import Card from '../../Global Components/Card';
import Header from '../../Global Components/Header';

export default function CreateAccount() {
    return (
        <div>
            <Header/>
            <Card
                welcomeTitle={"Create your Account"}
                subTitle={" Please select a username and password"}
                form="createAccount"
            />
        </div>
    )
}
