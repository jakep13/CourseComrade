import React from 'react';
import Box from './Box';
import '../../styles/Dashboard Component/Board.scss';
import Class from './Class';
import MostPopular from './MostPopular';


export default function Board() {
    return (
        <div className="board-container">
            <div className="board-wrapper">
                <Box title={"Welcome Back user"} />
                <div className="grids">
                    <Class />
                    <MostPopular/>
                </div>
            </div>
        </div>
    )
}
