import React from 'react';
import MoveInput from '../MoveInput';
import BoardComponent from '../BoardComponent';
import BoardState from '../../game/BoardState';

/**
 * Container component for a single instance of a chess game. It mantains the top level state
 * as well as renders the top-level UI components for the game.
 */
export default class GameContainer extends React.Component {
	constructor() {
		super();

		this.boardState = new BoardState();

		this.state = {
			board: this.boardState.returnBoardState(),
			turn: 0 // Number of turns made in the game
		}

		/* Bind methods to 'this' */
		this.handleSuccessfulMove = this.handleSuccessfulMove.bind(this);
		this.nextTurn = this.nextTurn.bind(this);
		this.currentPlayer = this.currentPlayer.bind(this);
	}

	handleSuccessfulMove(fromPos, toPos) {
		this.boardState.movePiece(fromPos, toPos);
		this.setState({
			...this.state,
			board: this.boardState.returnBoardState()
		});

		this.nextTurn();
	}

	/**
	 * Called when a turn ends, and updates the state to reflect this
	 */
	nextTurn() {
		this.setState({
			...this.state,
			turn: this.state.turn + 1 // Adds 1 to the turn counter
		});
	}

	/**
	 * The current player that needs to make a move
	 *
	 * @returns {0|1} 0 for white, 1 for black
	 */
	currentPlayer() {
		return this.state.turn % 2;
	}

	render() {
		return (
			<div data-testid="game-container">
				<MoveInput
					currentPlayer={this.currentPlayer()}
					onMoveSuccess={this.handleSuccessfulMove}
				/>
				<BoardComponent board={this.state.board}/>
			</div>
		);
	}
}
