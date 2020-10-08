import React from 'react';
import PropTypes from 'prop-types';

import BoardSquare from '../BoardSquare';
import Piece from '../../game/Piece/Piece';

export default class BoardComponent extends React.Component {
    static propTypes = {
        playerView: PropTypes.oneOf([0, 1]),
        board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(Piece)))
    }

    render() {
        let squares = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.props.board[row][col];
                if (row % 2 === 0) {
                    if (col % 2 === 0) {
                        squares.push(<BoardSquare key={`${row}-${col}`} piece={piece} />)
                    }
                    else {
                        squares.push(<BoardSquare key={`${row}-${col}`} black piece={piece} />)
                    }
                }
                if (row % 2 === 1) {
                    if (col % 2 === 0) {
                        squares.push(<BoardSquare key={`${row}-${col}`} black piece={piece} />)

                    }
                    else
                        squares.push(<BoardSquare key={`${row}-${col}`} piece={piece} />)
                }
            }
        }
        return (
            <div className="board" > {this.props.player === 0 ? squares : squares.reverse}</div>
        );

    }
}
