import React from 'react';
import'../../styles/Dashboard Component/Icon.scss';

export default function Icon({ department }) {
    let letter = department.charAt(0).toUpperCase();

    return (
        <div className={ letter ==="E" ? "icon-container eng-color font-subtitle text-title" : "icon-container comp-color font-subtitle text-title"}>
            {letter}
        </div>
    )
}
