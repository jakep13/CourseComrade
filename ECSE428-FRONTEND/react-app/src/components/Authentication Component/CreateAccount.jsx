import React from 'react';
import Card from '../../Global Components/Card';

export default function CreateAccount() {
    return (
        <div>
            <Card
                welcomeTitle={"Create your Account"}
                subTitle={" Please select a username and password"}
                form="createAccount"
            />
        </div>
    )
}
