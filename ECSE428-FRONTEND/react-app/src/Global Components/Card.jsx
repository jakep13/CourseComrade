import React from 'react';
import CreateAccountForm from '../components/Authentication Component/CreateAccountForm';
import LogInForm from '../components/Authentication Component/LogInForm';
import DeleteAccountForm from '../components/Settings Component/DeleteAccountForm';
import '../styles/Global Components/Card.scss';
import Button from './Button';

export default function Card(props) {
    return (
        <div className="card-container">
            <div className="card-wrapper">
                <div className="vertical-banner">
                </div>   
                <div className="content">
                    <div className="header">
                        <div className=" font-title text-title"> {props.welcomeTitle}</div>
                        <div className=" font-title font-body card-subtitle" style={{maxWidth:"300px"}}>{props.subTitle} </div>
                    </div>

                    {(props.form === 'authentication' && props.options) && props.options.map((items) => {
                        return (
                        <div classname="btn-container">
                            <Button text={items}/>
                        </div>)
                    }) 
                   }
                    {props.form === 'login' && <LogInForm />}
                    {props.form === 'createAccount' && <CreateAccountForm/>}
                    {props.form === 'deleteAccount' && <DeleteAccountForm/>}

                </div>
            </div>
        </div>
    )
}
