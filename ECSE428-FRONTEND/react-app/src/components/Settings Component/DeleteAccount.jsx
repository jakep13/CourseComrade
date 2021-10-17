import React from 'react';
import Header from '../../Global Components/Header';
import Card from '../../Global Components/Card';
import '../../styles/Authentication Components/Form.scss';
import '../../styles/fonts.scss'
import '../../styles/Global Components/Button.scss'
import Button from '../../Global Components/CustomizedButton';



export default function deleteAccount() {
    return (
        <div>
            <Card
                welcomeTitle="Delete Account"
                subTitle="You won't be able to reactivate your account and your profile will be deleted permanently."
                
                //form="deleteAccount"
                
            />
            <button onclick="this.props.deleteAccount()">
            Delete Account
            </button>
                
          
        </div>
    )
}