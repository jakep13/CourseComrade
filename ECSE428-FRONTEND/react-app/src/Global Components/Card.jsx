import React from 'react';
import Form from '../components/Authentication Component/Form';
import '../styles/Global Components/Card.scss';
import Button from './Button';

export default function Card({
    welcomeTitle,
    subTitle,
    buttonOptions,
    form,
    formButton,
}) {
    return (
        <div className="card-container">
            <div className="card-wrapper">
                <div className="vertical-banner">
                </div>   
                <div className="content">
                    <div className="header">
                        <div className=" font-title text-title"> {welcomeTitle}</div>
                        <div className=" font-title font-body card-subtitle" style={{maxWidth:"300px"}}>{subTitle} </div>
                    </div>

                    {buttonOptions ? (buttonOptions.map(items =>{
                        return(
                            <div classname="btn-container">
                                <Button text={items}/>
                            </div>
                        )
                    })) : <></>}
                    {form ? <Form buttonText={formButton}/> : <></>}
                </div>
            </div>
        </div>
    )
}
