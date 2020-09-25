import React, { Component } from 'react';

import TurnInfo from '../TurnInfo';

import './Game.css';

/**
 * A component that passes game state information to child components and manages the turn cycle
 */
export default class Game extends Component {
	constructor() {
		super();

		this.state = {
			turn: 0
		};

		this.getPlayerThisTurn = this.getPlayerThisTurn.bind(this);
		this.nextTurn = this.nextTurn.bind(this);
	}

	/**
	 * Returns which player is moving for the current turn
	 */
	getPlayerThisTurn() {
		return this.state.turn % 2;
	}

	nextTurn() {
		this.setState({
			...this.state,
			turn: this.state.turn + 1
		});
	}

	/**
	 * @todo
	 * @param {Piece} piece
	 */
	onPawnReachesSwapPosition(piece) {
	}

	render() {
		return (
			<div data-testid="game" className="game">
				Game container
				<TurnInfo
					turn={this.state.turn}
					player={this.getPlayerThisTurn() === 0 ? 'white' : 'black'}
				/>
			</div>
		)
	}
}
