import React from 'react';
import PropTypes from 'prop-types';

import MoveInput from '../MoveInput';
import BoardComponent from '../BoardComponent';
import BoardState from '../../game/BoardState';
import CapturedPieces from "../CapturedPieces";
import SwapPieces from "../SwapPieces";

const capturedPieceObj = () => ({
	count: 0,
	pieces: {
		pawn: [],
		rook: [],
		knight: [],
		bishop: [],
		queen: [],
		king: [],
		generic: []
	}
});

/**
 * Container component for a single instance of a chess game. It mantains the top level state
 * as well as renders the top-level UI components for the game.
 */
export default class GameContainer extends React.Component {

	constructor(props) {
		super(props);

		this.boardState = new BoardState();
		this.capturedWhitePieces = capturedPieceObj();
		this.capturedBlackPieces = capturedPieceObj();
		const board = this.boardState.returnBoardState();

		this.state = {
			board,
			capturedWhitePieces: {...this.capturedWhitePieces},
			capturedBlackPieces: {...this.capturedBlackPieces},
			turn: 0 // Number of turns made in the game
			// showSwap: false
		}

		/* Bind methods to 'this' */
		this.performMove = this.performMove.bind(this);
		this.nextTurn = this.nextTurn.bind(this);
		this.currentPlayer = this.currentPlayer.bind(this);
		this.syncBoard = this.syncBoard.bind(this);
		this.updateCapturedLists = this.updateCapturedLists.bind(this);
		this.toggleSwap = this.toggleSwap.bind(this);
	}

	static propTypes = {
		playerView: PropTypes.oneOf([0, 1, 2])
	}

	static defaultProps = {
		playerView: 2
	}

	/**
	 *
	 * Fired when a valid move has been received, and then performs that move.
	 *
	 * @param {[number, number]} fromPos the position the piece to be hoved is currently at
	 * @param {[number, number]} toPos the position to move the piece to
	 */
	performMove(from, to) {
		const capturedPiece = this.boardState.getPiece(to);
		if(capturedPiece !== null) {
			this.updateCapturedLists(capturedPiece);
		}
		this.boardState.movePiece(from, to);
		this.syncBoard();
		// Is an action needed... yes handle it here.  Such as pawn promotion, check, etc.
		// performAction();
		this.nextTurn();
	}

	/**
	 * Updates the state to reflect the start of a new turn
	 */
	nextTurn() {
		this.setState({
			...this.state,
			turn: this.state.turn + 1 // Adds 1 to the turn counter
		});
	}

	/**
	 * Updates the component to reflect the current BoardState
	 */
	syncBoard() {
		this.setState({
			...this.state,
			board: this.boardState.returnBoardState(),
			capturedWhitePieces: this.capturedWhitePieces,
			capturedBlackPieces: this.capturedBlackPieces
		});
	}

	/**
	 *
	 * Adds a piece to a list of captured pieces, belonging to the same player
	 *
	 * @param {Piece} piece - a non-null Piece instance
	 */
	updateCapturedLists(piece) {
		if(piece.isWhite()) {
			this.capturedWhitePieces.count++;
			this.capturedWhitePieces.pieces[piece.type].push(piece);
		} else {
			this.capturedBlackPieces.count++;
			this.capturedBlackPieces.pieces[piece.type].push(piece);
		}
	}

	/**
	 * The current player that needs to make a move
	 *
	 * @returns {0|1} 0 for white, 1 for black
	 */
	currentPlayer() {
		return this.state.turn % 2;
	}

	/**
	 * Toggles the display of the swap pieces component
	 *
	 *
	 */
	toggleSwap() {
		for (let i = 0; i < 8; i++) {
			const wP = this.boardState.getPiece([0, i]);
			const bP = this.boardState.getPiece([7, i]);
			if (wP.type === 'pawn' || bP.type === 'pawn') {
				// this.setState({
				// 	...this.state,
				// 	showSwap: !this.state.showSwap
				// });
				return true;
			}
		}
		return false;

	}
	//
	// myPopup(myURL, title, myWidth, myHeight) {
	// 	const left = (screen.width - myWidth) / 2;
	// 	const top = (screen.height - myHeight) / 4;
	// 	const myWindow = window.open(myURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + myWidth + ', height=' + myHeight + ', top=' + top + ', left=' + left);
	// }

	render() {
		return (
			<div data-testid="game-container" className="container">
				<MoveInput
					id="move-input"
					currentPlayer={this.currentPlayer()}
					getPiece={this.boardState.getPiece}
					performMove={this.performMove}
				/>

				<div className="row">
					<div className="col">
						<CapturedPieces
							black={this.currentPlayer() === 1}
							pieces={this.currentPlayer() === 1 ?
								this.state.capturedBlackPieces :
								this.state.capturedWhitePieces}
						/>
					</div>

					<div className="col">
						<BoardComponent
							id="board"
							player={this.props.playerView === 2 ? this.currentPlayer() : this.props.playerView}
							board={this.state.board}
						/>
						{this.toggleSwap() ?
							<SwapPieces
								black={!(this.currentPlayer())}
								// pieces={!(this.currentPlayer()) ?
								// 	this.state.capturedBlackPieces :
								// 	this.state.capturedWhitePieces}
							/> :
							null
						}
					</div>

					<div className="col">
						<CapturedPieces
							black={this.currentPlayer() !== 1}
							pieces={this.currentPlayer() !== 1 ?
								this.state.capturedBlackPieces :
								this.state.capturedWhitePieces}
						/>
					</div>
				</div>
			</div>
		);
	}
}
