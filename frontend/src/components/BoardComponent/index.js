
import React from 'react';
import BoardSquare from '../BoardSquare';
export default class BoardComponent extends React.Component {
    render() {
        let squares = [];
        let count = 1;
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (row % 2 === 0) {
                    if (col % 2 === 0) {
                        squares.push(<BoardSquare black={false} />)
                    }
                    else {
                        squares.push(<BoardSquare black={true} />)
                    }
                }
                if (row % 2 === 1) {
                    if (col % 2 === 0) {
                        squares.push(<BoardSquare black={true} />)

                    }
                    else
                        squares.push(<BoardSquare black={false} />)

                }
            }
        }

        return (
            <div className="board" > {squares}</div>
        );

    }
}