import React from 'react';
import Box from './Box';
import '../../styles/Dashboard Component/Board.scss';
import Class from './Class';
import Friend from '../Friend Component/Friend';



export default function Board() {
    return (
        <div className="board-container">
            <div className="board-wrapper">
                <Box title={"Welcome Back user"} />
                <div className="grids">
                    <div className="classes">
                        <Class />
                    </div>
                    <div className="most-popular"> <Friend/></div>
                </div>
            </div>
        </div>
    )
}
