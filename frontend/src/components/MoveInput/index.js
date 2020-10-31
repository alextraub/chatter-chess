import './MoveInput.css';
import React from 'react';
import PropTypes from 'prop-types';
import {boardPositionToTuple, isValidBoardPositionString} from '../../game/utils/boardPosition'

export default class MoveInput extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			move: '',
			moveError: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.validateInput = this.validateInput.bind(this);
		this.validateMove = this.validateMove.bind(this);
	}

	static propTypes = {
		currentPlayer: PropTypes.oneOf([0, 1]).isRequired,
		getPiece: PropTypes.func.isRequired,
		performMove: PropTypes.func.isRequired
	}

	validateInput(move) {
		const positions = move.split(' ').filter(p => p != '');
		let from;
		let to;
		if(positions.length !== 2) {
			switch(positions.length) {
			case 0: return 'Please provide a move';
			case 1: return 'Please provide a position to move to';
			default: return 'You may only move a piece to one position at a time';
			}
		}

		[from, to] = positions;
		const isFromInvalid = !isValidBoardPositionString(from);
		const isToInvalid = !isValidBoardPositionString(to);
		if(isFromInvalid || isToInvalid) {
			if(isFromInvalid && isToInvalid) {
				return `${from} and ${to} are not valid positions`;
			}
			return `${isFromInvalid ? from : to} is not a valid position`;
		}

		return [from, to];
	}

	validateMove(from, to) {
		const fromTuple = boardPositionToTuple(from);
		let toTuple;

		const piece = this.props.getPiece(fromTuple);
		if(!piece) {
			return `There isn't a piece at ${from}`;
		}
		if (piece.player !== this.props.currentPlayer) {
			return `You may only move a ${this.props.currentPlayer === 0 ? 'white' : 'black'} piece`;
		}
		toTuple = boardPositionToTuple(to);
		const validMove = piece.canMove(fromTuple, toTuple, 1);

		return validMove === true ?
			[fromTuple, toTuple] :
			`${validMove}`;
	}

	handleSubmit(event) {
		event.preventDefault();
		const { move } = this.state;

		let validPositions = this.validateInput(move.trim());
		if(typeof(validPositions) === 'string') {
			this.setState({
				...this.state,
				move: '',
				moveError: validPositions
			});
			return;
		}
		validPositions = this.validateMove(validPositions[0], validPositions[1]);
		const isInvalidMove = typeof(validPositions) === 'string';
		if(isInvalidMove) {
			this.setState({
				...this.state,
				move: '',
				moveError: validPositions
			});
		} else {
			this.props.performMove(validPositions[0], validPositions[1]);
			this.setState({
				...this.state,
				move: ''
			});
		}
	}

	handleInputChange(event) {
		event.preventDefault();
		this.setState({
			...this.state,
			move: event.target.value,
			moveError: ''
		});
	}

	render() {
		return (
			<div id='inputContainer' data-testid="move-input">
				<form onSubmit={event => {this.handleSubmit(event)}}>
					<input data-testid="move" type="text" placeholder="Enter Move Here" name="move" value={this.state.move} onChange={event => {this.handleInputChange(event)}}/>
					<div data-testid="error" style={{color: "red"}}>{this.state.moveError}</div>
					<input data-testid="button" type='submit' value='Submit Move'/>
				</form>
			</div>
		);
	}
}
