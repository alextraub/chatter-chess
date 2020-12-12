import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {boardPositionToTuple, isValidBoardPositionString} from '../../game/utils/positionUtils'
import { Form, InputGroup, FormFeedback, InputGroupAddon, Input, Button } from 'reactstrap';


const MoveInput = ({ currentPlayer, disabled, getPiece, performMove, inCheck }) => {
	const [moveState, setMoveState] = useState({
		move: '',
		error: ''
	});

	function displayError(message) {
		setMoveState({
			move: '',
			error: message
		});
	}

	function validateInput() {
		const positions = moveState.move.split(' ').filter(p => p !== '');
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

	function validateMove(from, to) {
		const fromTuple = boardPositionToTuple(from);
		let toTuple;

		const piece = getPiece(fromTuple);
		if(!piece) {
			return `There isn't a piece at ${from}`;
		}
		if (piece.player !== currentPlayer) {
			return `You may only move a ${currentPlayer === 0 ? 'white' : 'black'} piece`;
		}
		toTuple = boardPositionToTuple(to);
		const validMove = piece.canMove(fromTuple, toTuple, 1);

		return validMove === true ?
			[fromTuple, toTuple] :
			`${validMove}`;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const { move } = moveState;

		let validPositions = validateInput(move.trim());
		if(typeof(validPositions) === 'string') {
			displayError(validPositions);
			return;
		}
		validPositions = validateMove(validPositions[0], validPositions[1]);
		const isInvalidMove = typeof(validPositions) === 'string';
		if(isInvalidMove) {
			displayError(validPositions);
		} else {
			try {
				performMove(validPositions[0], validPositions[1])
				if(inCheck(currentPlayer)) {
					displayError('That move leaves you in check');
				} else {
					setMoveState({
						move: '',
						error: ''
					})
				}

			} catch (error) {
				console.error(error);
			}
		}
	}

	function handleInputChange(event) {
		event.preventDefault();
		setMoveState({
			move: event.target.value,
			error: ''
		});
	}

	const { move, error } = moveState;

	return (
		<Form data-testid="move-input" onSubmit={handleSubmit} inline className="mb-1">
			<FormFeedback tooltip={error !== ''} data-testid="move-feedback" className={error !== '' ? 'd-block' : ''}>{error}</FormFeedback>
			<InputGroup>
				<Input
					autoComplete="off"
					data-testid="move-textbox"
					type="text"
					placeholder="Enter Move Here"
					name="move"
					value={move}
					disabled={disabled}
					invalid={error !== ''}
					onChange={handleInputChange}
				/>
				<InputGroupAddon addonType="append">
					<Button
						data-testid="move-submit"
						color="warning"
						name="move-submit"
						disabled={disabled}
						type="submit">Move</Button>
				</InputGroupAddon>
			</InputGroup>
		</Form>
	);
}

MoveInput.propTypes = {
	currentPlayer: PropTypes.oneOf([0, 1]).isRequired,
	getPiece: PropTypes.func.isRequired,
	performMove: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	inCheck: PropTypes.func
}

export default MoveInput;
