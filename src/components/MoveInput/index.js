import React from 'react';
import PropTypes from 'prop-types';
import {boardPositionToTuple, isValidBoardPositionString} from '../../game/utils/positionUtils'
import { Form, InputGroup, FormFeedback, InputGroupAddon, Input, Button } from 'reactstrap';

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
		performMove: PropTypes.func.isRequired,
		disabled: PropTypes.bool,
		inCheck: PropTypes.func
	}


	validateInput(move) {
		const positions = move.split(' ').filter(p => p !== '');
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

	async handleSubmit(event) {
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

			let errorMessage = '';
			try {
				this.props.performMove(validPositions[0], validPositions[1])
				if(this.props.inCheck(this.props.currentPlayer)) {
					errorMessage =
						'That move leaves you in check';
				}
				this.setState({
					...this.state,
					moveError: errorMessage,
					move: ''
				});
			} catch (error) {
				console.error(error);
			}



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
			<Form data-testid="move-input" onSubmit={event => {this.handleSubmit(event)}} inline className="mb-1">
				<FormFeedback tooltip={this.state.moveError !== ''} data-testid="move-feedback" className={this.state.message !== '' ? 'd-block' : ''}>{this.state.moveError}</FormFeedback>
				<InputGroup>
					<Input
						data-testid="move-textbox"
						type="text"
						placeholder="Enter Move Here"
						name="move"
						value={this.state.move}
						disabled={this.props.disabled}
						invalid={this.state.moveError !== ''}
						onChange={event => {this.handleInputChange(event)}}
					/>
					<InputGroupAddon addonType="append">
						<Button
							data-testid="move-submit"
							color="warning"
							name="move-submit"
							disabled={this.props.disabled}
							type="submit">Move</Button>
					</InputGroupAddon>
				</InputGroup>
			</Form>
		);
	}
}
