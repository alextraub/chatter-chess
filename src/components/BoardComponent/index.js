import './BoardComponent.css';
import React from 'react';
import PropTypes from 'prop-types';

import BoardSquare from '../BoardSquare';
import Piece from '../../game/Piece/Piece';
import { boardPositionToString } from '../../game/utils/positionUtils';

export default class BoardComponent extends React.Component {
		static propTypes = {
			player: PropTypes.oneOf([0, 1]),
			board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
				type: PropTypes.string,
				player: PropTypes.oneOf([0, 1])
			})))
		}

		render() {
			let squares = [];
			for (let row = 0; row < 8; row++) {
				for (let col = 0; col < 8; col++) {
					const piece = this.props.board[row][col];
					const position = boardPositionToString([row, col]);
					if (row % 2 === 0) {
						if (col % 2 === 0) {
							squares.push(<BoardSquare
								key={position}
								piece={piece}
								position={position}
							/>)
						}
						else {
							squares.push(<BoardSquare
								key={position}
								black
								piece={piece}
								position={position}
							/>)
						}
					}
					if (row % 2 === 1) {
						if (col % 2 === 0) {
							squares.push(<BoardSquare
								key={position}
								black
								piece={piece}
								position={position}
							/>)

						} else {
							squares.push(<BoardSquare
								key={position}
								piece={piece}
								position={position}
							/>)
						}
					}
				}
			}
			if (this.props.player === 1) {
				squares = squares.reverse();
			}
			return (
				<div className="board-container">
					<div className="board" > {squares}</div>
				</div>
			);

		}
}
