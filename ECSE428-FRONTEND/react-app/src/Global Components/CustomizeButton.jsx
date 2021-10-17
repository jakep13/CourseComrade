import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Button(props) {
    const history = useHistory();

    function handleClick(option) {
        const optionString = new String(option);
        console.log(optionString);
        history.push('/' +  optionString);
    }
    return (
        <div className="button-container" onClick={() => handleClick(props.text)}>
            <div className="button-wrapper">
                <div className="text-wrapper">
                    <div className="font-body text-body"> <b>{props.text}</b></div>
                </div>
            </div>
        </div>
    )
}

