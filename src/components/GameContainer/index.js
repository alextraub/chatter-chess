import React from 'react';

import MoveInput from '../MoveInput';
import BoardComponent from '../BoardComponent';
import CapturedPieces from "../CapturedPieces";
import SwapPieces from "../SwapPieces";
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import GameState from '../../game/GameState';

/**
 * Container component for a single instance of a chess game. It mantains the top level state
 * as well as renders the top-level UI components for the game.
 */
class GameContainer extends React.Component {
	static propTypes = {
		gameState: PropTypes.instanceOf(GameState), // Used for testing
		location: PropTypes.object
	};

	constructor(props) {
		super(props);

		// Set the game state for this instance
		this.gameState = this.props.gameState ?
			this.props.gameState : new GameState(0, require('../../game/BoardState/boards/standardGame').default);

		// Use the game state to initialize the React state
		this.state = {
			turn: this.gameState.turn,
			capturedPieces: this.gameState.getCapturedPieces(),
			check: this.gameState.check,
			board: this.gameState.board,
			swapping: false,
			swapList: []
		}

		/* Bind methods to this */
		this.syncGame = this.syncGame.bind(this);
		this.performMove = this.performMove.bind(this);
		this.performPromotion = this.performPromotion.bind(this);
	}

	/**
	 * Updates the React state to reflect the instance's game state property
	 */
	async syncGame() {
		await this.setState({
			...this.state,
			turn: this.gameState.turn,
			capturedPieces: this.gameState.getCapturedPieces(),
			check: this.gameState.check,
			board: this.gameState.board,
			swapping: this.gameState.swapping,
			swapList: this.gameState.swapList
		});
	}

	/**
	 * Get a numeric value to represent which player's turn it is
	 * @returns {0|1} 0 for white, 1 for black
	 */
	get player() {
		return this.state.turn % 2;
	}

	/**
	 * A method that performs a move on the game state and based on the result, updates the UI
	 *
	 * @param {[number, number]} from position to move from
	 * @param {[number, number]} to position to move to
	 * @returns {boolean}
	 */
	async performMove(from, to) {
		const result = this.gameState.performMove(from, to);
		await this.syncGame();
		return result;
	}

	/**
	 * Promotes a piece to a specified type. This method assumes the type provided has at least one captured piece for that type, for the player prforming the
	 * promotion.
	 *
	 * @param {string} type the type of piece to promote the piece waiting to be promoted to.
	 */
	async performPromotion(type) {
		this.gameState.performPromotion(type);
		await this.syncGame();
	}

	/**
	 * Returns all the UI elements that never are hidden
	 * @todo disable move input during a piece swap
	 */
	renderStandardUI() {
		const { swapping, check } = this.state;
		const isSwapping = swapping !== false;
		const gameOver = check.WHITE.mate || check.BLACK.mate;


		return (
			<Row>
				<Col md="12">
					<MoveInput
						inCheck={this.gameState.isInCheck}
						currentPlayer={this.player}
						getPiece={this.gameState.getPiece}
						performMove={this.performMove}
						disabled={isSwapping || gameOver}
					/>
					{gameOver ? <span data-testid="winner">{check.WHITE.mate ? 'Black' : 'White'} wins!</span> : ''}</Col>
				<Col md="12">
					<CapturedPieces
						black={this.player !== 0}
						pieces={this.player !== 1 ?
							this.state.capturedPieces.WHITE :
							this.state.capturedPieces.BLACK}
						className="list-group-horizontal"
					/>
				</Col>
				<Col md="12">
					<BoardComponent
						id="board"
						player={this.player}
						board={this.state.board}
					/>
				</Col>
				<Col md="12">
					<CapturedPieces
						black={this.player === 0}
						pieces={this.player === 1 ?
							this.state.capturedPieces.WHITE :
							this.state.capturedPieces.BLACK}
						className="list-group-horizontal"
					/>
				</Col>
			</Row>
		);
	}

	render() {
		console.log(this.props.location);
		return (
			<div data-testid="game-container">
				<SwapPieces
					open={this.state.swapping !== false}
					swapList={this.state.swapList}
					performPromotion={type => {this.performPromotion(type)}} />
				{this.renderStandardUI()}
			</div>
		);
	}
}


export default GameContainer;
