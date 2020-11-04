import React from 'react';
import PropTypes from 'prop-types';

import MoveInput from '../MoveInput';
import BoardComponent from '../BoardComponent';
import BoardState from '../../game/BoardState';
import CapturedPieces from "../CapturedPieces";

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
			capturedWhitePieces: { ...this.capturedWhitePieces },
			capturedBlackPieces: { ...this.capturedBlackPieces },
			swapping: false, // If waiting for a piece swap, will be a board position of the piece to swap, otherwise false
			swapList: [], // Possible types of pieces to swap
			turn: 0 // Number of turns made in the game
		}

		/* Bind methods to 'this' */
		this.performMove = this.performMove.bind(this);
		this.beginSwap = this.beginSwap.bind(this);
		this.getPossibleSwapArray = this.getPossibleSwapArray.bind(this);
		this.nextTurn = this.nextTurn.bind(this);
		this.currentPlayer = this.currentPlayer.bind(this);
		this.syncBoard = this.syncBoard.bind(this);
		this.updateCapturedLists = this.updateCapturedLists.bind(this);
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
		if (capturedPiece !== null) {
			this.updateCapturedLists(capturedPiece);
		}
		this.boardState.movePiece(from, to);
		this.syncBoard();
		if (!this.beginSwap()) {
			this.nextTurn();
		}
	}

	/**
	 * Updates the state to reflect the start of a new turn
	 */
	nextTurn() {
		this.setState({
			...this.state,
			swapping: false,
			swapList: [],
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
		if (piece.isWhite()) {
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
	 * Begins the piece swap sequence of events, if the conditions for a swap are met
	 *
	 * @param {[number, number]} to board position of piece attempting to be swapped
	 * @returns {boolean} True if a swap has been started or false otherwise
	 */
	beginSwap(to) {
		const piece = this.boardState.getPiece(to);
		if (piece.canSwapOut && to[0] === piece.swapRow) { // Piece is swappable and at a swappble position
			const { count, pieces } = piece.player === 0 ?
				this.state.capturedWhitePieces :
				this.state.capturedBlackPieces;

			if (count > 0) { // If the player has pieces that have been captured
				const pieceTypes = this.getPossibleSwapArray(pieces); // All possible types of pieces that can be swapped in
				if (pieceTypes.length > 0) { // Only move forward in the swap procedure if there are pieces that can be swapped in
					this.setState({ // Set state to be in the middle of swapping a piece
						...this.state,
						swapping: to,
						swapList: pieceTypes
					});
					return true;
				}
			}
		}

		return false;
	}

	/**
	 *
	 * This method is a helper for getting possible swap piece types
	 *
	 * @param {*} pieces an object of piece types and an array of all the pieces that have been captured of that type
	 * @returns {{type: string; black: boolean;}[]} array of piece types that are currently able to be swapped in
	 */
	getPossibleSwapArray(pieces) {
		return Object.values(pieces)
			// Filter out any piece type with no captured pieces and then any that cannot be swapped in
			.filter(pieceArr => pieceArr.length > 0 && pieceArr[0].canSwapIn)
			.map(pieceArr => { // For the remaing piece arrays, map each to an object denoting what type of pieces it has and if they are black or not
				return {
					black: pieceArr[0].isBlack(),
					type: pieceArr[0].type
				}
			});
	}

	/**
	 * Perform a swap with a specified piece type. This should only be called after beginSwap is called and returns true
	 *
	 * @todo supply this as an event handler to the swap component
	 * @param {string} type the type value of a piece class
	 */
	performSwap(type) {
		const { swapping } = this.state;
		const { count, pieces } = this.currentPlayer() === 0 ?
			this.state.capturedWhitePieces :
			this.state.capturedBlackPieces;
		const piece = this.boardState.getPiece(swapping); // The piece being swapped out
		const newPiece = pieces[type].pop(); // Get the next piece of type that can be swapped in
		newPiece.captured = false; // New piece no longer is captured
		// Replace the piece
		this.boardState.returnBoardState()[swapping[0]][swapping[1]] = newPiece;
		piece.boardState = null; // Remove old piece from the game

		if (this.currentPlayer() === 0) {
			this.setState({
				...this.state,
				capturedWhitePieces: {
					count: count - 1,
					pieces
				}
			})
		} else {
			this.setState({
				...this.state,
				capturedBlackPieces: {
					count: count - 1,
					pieces
				}
			});
		}

		// Go to next turn
		this.syncBoard();
		this.nextTurn();
	}

	/**
	 * Returns the rendered out swap UI
	 * @todo
	 */
	renderSwapUI() {

		return (
			<SwapPieces SwapList={this.state.swapList} performSwap={this.performSwap} />
		);


	}

	/**
	 * Returns all the UI elements that never are hidden
	 * @todo disable move input during a piece swap
	 */
	renderStandardUI() {
		return (
			<>
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
			</>
		);
	}

	render() {
		const renderUI = () => {
			if (this.state.swapping !== false) {
				return (
					<>
						{this.renderStandardUI()}
						{this.renderSwapUI()}
					</>
				)
			} else {
				return <>{this.renderStandardUI()}</>;
			}
		}

		return (
			<div data-testid="game-container" className="container">
				{renderUI()}
			</div>
		);
	}
}
