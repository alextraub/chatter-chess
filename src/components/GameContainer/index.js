import React from 'react';
import PropTypes from 'prop-types';

import MoveInput from '../MoveInput';
import BoardComponent from '../BoardComponent';
import BoardState from '../../game/BoardState';
import CapturedPieces from "../CapturedPieces";
import SwapPieces from "../SwapPieces";
import { inCheck, inCheckMate } from '../../game/Check';

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

		this.boardState = this.props.boardState;
		this.capturedWhitePieces = capturedPieceObj();
		this.capturedBlackPieces = capturedPieceObj();

		this.state = {
			board: [...this.boardState.getBoard()],
			check: {
				white: {
					status: false,
					mate: false
				},
				black: {
					status: false,
					mate: false
				}
			},
			capturedWhitePieces: { ...this.capturedWhitePieces },
			capturedBlackPieces: { ...this.capturedBlackPieces },
			swapping: false, // If waiting for a piece swap, will be a board position of the piece to swap, otherwise false
			swapList: [], // Possible types of pieces to swap
			turn: this.props.turn // Number of turns made in the game
		}

		/* Bind methods to 'this' */
		this.performMove = this.performMove.bind(this);
		this.beginSwap = this.beginSwap.bind(this);
		this.getPossibleSwapArray = this.getPossibleSwapArray.bind(this);
		this.nextTurn = this.nextTurn.bind(this);
		this.currentPlayer = this.currentPlayer.bind(this);
		this.syncBoard = this.syncBoard.bind(this);
		this.updateCapturedLists = this.updateCapturedLists.bind(this);
		this.rollbackMove = this.rollbackMove.bind(this);
		this.getCheckFlags = this.getCheckFlags.bind(this);
		this.isInCheck = this.isInCheck.bind(this);
		this.isInCheckMate = this.isInCheckMate.bind(this);
	}

	static propTypes = {
		playerView: PropTypes.oneOf([0, 1, 2]),
		boardState: PropTypes.instanceOf(BoardState),
		turn: PropTypes.number
	}

	static defaultProps = {
		playerView: 2,
		boardState: new BoardState(),
		turn: 0
	}

	/**
	 * Returns the state to the point prior to making a specified valid move (specified by parameters)
	 * @param {[number, number]} from move from position
	 * @param {Piece} fromPiece the piece at from prior to making the move
	 * @param {*} to move's to position
	 * @param {Piece} toPiece the piece at to prior to making the move
	 */
	rollbackMove(from, fromPiece, to, toPiece) {
		// Remove fromPiece from correct PieceSet in order to more easily add pieces using boardState
		if(fromPiece.player === 0) {
			this.boardState.whitePieces.remove(fromPiece, from);
		} else {
			this.boardState.blackPieces.remove(fromPiece, from);
		}

		// Move the fromPiece to from
		this.boardState.placePiece(fromPiece, from);

		// Undo and place any captured piece
		if(toPiece !== null) {
			toPiece.captured = false;
			this.boardState.placePiece(toPiece, to);
		}
	}

	/**
	 *
	 * Fired when a valid move has been received, and then performs that move.
	 *
	 * @param {[number, number]} fromPos the position the piece to be hoved is currently at
	 * @param {[number, number]} toPos the position to move the piece to
	 */
	async performMove(from, to) {
		const fromPiece = this.boardState.getPiece(from);
		const toPiece = this.boardState.getPiece(to);
		this.boardState.movePiece(from, to);
		if(this.isInCheck(this.currentPlayer())) {
			this.rollbackMove(from, fromPiece, to, toPiece);
			return false;
		}
		if (toPiece !== null) {
			this.updateCapturedLists(toPiece);
		}
		await this.syncBoard();

		const swapping = this.beginSwap(to);

		if (!swapping) {
			const check = this.getCheckFlags(this.currentPlayer() === 0 ? 1 : 0);
			this.setState({
				...this.state,
				check: {
					...check
				}
			});
			if(!check.white.mate && !check.black.mate) {
				await this.nextTurn();
			}
		}

		return true;
	}

	/**
	 * Updates the check object in this.state.abs
	 * This should be called after a move is made but before it is rendered in the UI
	 */
	getCheckFlags(player) {
		let { check } = this.state;
		const newStatus = this.isInCheck(player);
		if(player === 0) {
			check = {
				...check,
				white: {
					status: newStatus,
					mate: !newStatus ?
						false :
						this.isInCheckMate(player)
				}
			}
		} else {
			check = {
				...check,
				black: {
					status: newStatus,
					mate: !newStatus ?
						false :
						this.isInCheckMate(player)
				}
			}
		}

		return check;
	}

	/**
	 * Updates the state to reflect the start of a new turn
	 */
	async nextTurn() {
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
	async syncBoard() {
		this.setState({
			...this.state,
			board: this.boardState.getBoard(),
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
				this.capturedWhitePieces :
				this.capturedBlackPieces;

			if (count > 0) { // If the player has pieces that have been captured
				const pieceTypes = this.getPossibleSwapArray(to, pieces); // All possible types of pieces that can be swapped in
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
	 * @param {[number, number]} to
	 * @param {*} pieces an object of piece types and an array of all the pieces that have been captured of that type
	 * @returns {{type: string; black: boolean;}[]} array of piece types that are currently able to be swapped in
	 */
	getPossibleSwapArray(to, pieces) {
		const curPiece = this.boardState.getPiece(to);
		const result = Object.entries(pieces)
			// Filter out any piece type with no captured pieces and then any that cannot be swapped in
			.filter(([_, pieceArr]) => {
				if(pieceArr.length > 0 && pieceArr[0].canSwapIn) {
					this.boardState.placePiece(pieceArr[0], to);
					const causesCheck = this.isInCheck(this.currentPlayer());
					return !causesCheck;
				}

				return false;
			})
			.map(([_, pieceArr]) => { // For the remaing piece arrays, map each to an object denoting what type of pieces it has and if they are black or not
				return {
					...pieceArr[0].toObject(),
					black: pieceArr[0].isBlack()
				}
			});

		if(this.boardState.getPiece(to) !== curPiece) {
			this.boardState.placePiece(curPiece, to);
		}
		return result;
	}

	/**
	 * Perform a swap with a specified piece type. This should only be called after beginSwap is called and returns true
	 *
	 * @todo supply this as an event handler to the swap component
	 * @param {string} type the type value of a piece class
	 */
	async performSwap(type) {
		const { swapping } = this.state; // Position of piece being swapped
		const { count, pieces } = this.currentPlayer() === 0 ?
			this.state.capturedWhitePieces :
			this.state.capturedBlackPieces;
		const piece = this.boardState.getPiece(swapping); // The piece being swapped out
		piece.captured = true;
		const newPiece = pieces[type].pop(); // Get the next piece of type that can be swapped in
		newPiece.captured = false; // New piece no longer is captured
		// Replace the piece
		this.boardState.placePiece(newPiece, swapping);
		if(this.currentPlayer() === 0) {
			this.capturedWhitePieces.pieces.pawn.push(piece);
		} else {
			this.capturecBlackPieces.pieces.pawn.push(piece);
		}


		this.setState({
			...this.state,
			capturedWhitePieces: this.capturedWhitePieces,
			capturecBlackPieces: this.capturedBlackPieces
		});

		// Go to next turn
		await this.syncBoard();
		this.nextTurn();
	}

	/**
	 * Returns the rendered out swap UI
	 */
	renderSwapUI() {
		return (
			<SwapPieces swapList={this.state.swapList} performSwap={type => {this.performSwap(type)}} />
		);
	}

	/**
	 * Returns all the UI elements that never are hidden
	 * @todo disable move input during a piece swap
	 */
	renderStandardUI() {
		const { swapping, check } = this.state;
		const isSwapping = swapping !== false;
		const gameOver = check.white.mate || check.black.mate;
		return (
			<>
				<MoveInput
					id="move-input"
					currentPlayer={this.currentPlayer()}
					getPiece={this.boardState.getPiece}
					performMove={this.performMove}
					disabled={isSwapping || gameOver}
				/>
				{gameOver ? <span data-testid="winner">{check.white.mate ? 'White' : 'White'} wins!</span> : ''}

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

	isInCheck(player, checkCallback=inCheck) {
		const { pieces } = player === 0 ?
			this.boardState.whitePieces :
			this.boardState.blackPieces;
		if(!pieces['king']) {
			return false;
		}

		for(let pos of pieces['king']) {
			if(checkCallback(pos, this.boardState, player)) {
				return true;
			}
		}

		return false;
	}

	isInCheckMate(player) {
		return this.isInCheck(player, inCheckMate);
	}

	render() {
		const renderUI = () => {
			if (this.state.swapping !== false) {
				return (
					<>
						{this.renderSwapUI()}
						{this.renderStandardUI()}
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
