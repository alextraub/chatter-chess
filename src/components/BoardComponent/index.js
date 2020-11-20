import React from 'react';
import PropTypes from 'prop-types';
import './BoardComponent.css';
import BoardSquare from '../BoardSquare';
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
					const black = (row % 2 === 0 ^ col % 2 === 0) === 1;
					squares.push(<BoardSquare key={position} position={position} black={black} piece={piece} />)
				}
			}
			if (this.props.player === 1) {
				squares = squares.reverse();
			}
			return (
				<div className="board-container mx-0">
					{squares}
				</div>
			);
		}
}
