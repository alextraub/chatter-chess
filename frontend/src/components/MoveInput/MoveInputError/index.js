import React from 'react';
import PropTypes from 'prop-types';

import { boardPositionToTuple } from '../../../game/utils/boardPosition';

export default class MoveInputError extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			message: ''
		}
	}

	static propTypes = {
		from: PropTypes.string,
		to: PropTypes.string,
		moveError: PropTypes.string,
		currentPlayer: PropTypes.oneOf([0, 1]),
		getPiece: PropTypes.func,
		canMove: PropTypes.func
	}

	getIsOpponentPieceError() {
		return `You can only move ${this.props.currentPlayer ? 'black' : 'white'} pieces`;
	}

	validateMove() {
		if(this.props.moveError) {
			return this.props.moveError;
		}

		const from = boardPositionToTuple(this.props.from);
		const piece = this.props.getPiece(from);

		if(!piece) {
			return `No piece located at ${this.state.from}`;
		}

		if(piece.player !== this.props.currentPlayer) {
			return this.getIsOpponentPieceError();
		}



		return '';
	}

	render() {
		this.setState({
			...this.state,
			message: this.validateMove()
		});

		return this.state.message ? (
			<p data-testid="move-error">{this.state.message}</p>
		) : '';
	}
}
