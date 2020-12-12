import React, {useState, useEffect, useContext, useCallback} from 'react';

import MoveInput from '../MoveInput';
import BoardComponent from '../BoardComponent';
import CapturedPieces from "../CapturedPieces";
import SwapPieces from "../SwapPieces";
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import GameState from '../../game/GameState';
import {API} from "aws-amplify";
import * as queries from "../../graphql/queries";
import {GRAPHQL_AUTH_MODE} from "@aws-amplify/api";
import {AuthContext} from "../auth/AuthProvider";

/**
 * Container component for a single instance of a chess game. It mantains the top level state
 * as well as renders the top-level UI components for the game.
 */
const GameContainer = (props) => {
	const auth = useContext(AuthContext); // Access the globally authenticated user
	const [state, setState] = useState();
	const [gameState, setGameState] = useState(props.gameState);

	/**
	 * Updates the React state to reflect the instance's game state property
	 */
	const syncGame = () => {
		setState({
			...state,
			turn: gameState.turn,
			capturedPieces: gameState.getCapturedPieces(),
			check: gameState.check,
			board: gameState.board,
			swapping: gameState.swapping,
			swapList: gameState.swapList
		});
	};

	const fetchGame = useCallback(async () => {
		const {id} = props.match.params;
		try {
			const gameData = await API.graphql({
				query: queries.getGame,
				variables: {
					id
				},
				authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
			}); // Fetch the data from the API
			setGameState(new GameState(gameData.turn, gameData.pieces, {
				WHITE: {...gameData.checkStatusWhite},
				BLACK: {...gameData.checkStatusBlack}
			}));
			syncGame();
		} catch (error) {
			console.log(error);
		}

	}, [syncGame, auth, props.match]);

	useEffect(() => {
		if (!gameState) {
			fetchGame();
		}
	}, [gameState, fetchGame]);

	// /**
	//  * Updates the React state to reflect the instance's game state property
	//  */
	// const syncGame = () => {
	// 	setState({
	// 		...state,
	// 		turn: gameState.turn,
	// 		capturedPieces: gameState.getCapturedPieces(),
	// 		check: gameState.check,
	// 		board: gameState.board,
	// 		swapping: gameState.swapping,
	// 		swapList: gameState.swapList
	// 	});
	// };

	/**
	 * Get a numeric value to represent which player's turn it is
	 * @returns {0|1} 0 for white, 1 for black
	 */
	const currentPlayer = () => {
		return state.turn % 2;
	}

	/**
	 * A method that performs a move on the game state and based on the result, updates the UI
	 *
	 * @param {[number, number]} from position to move from
	 * @param {[number, number]} to position to move to
	 * @returns {boolean}
	 */
	const performMove = async(from, to) => {
		const result = gameState.performMove(from, to);
		syncGame();
		return result;
	}

	/**
	 * Promotes a piece to a specified type. This method assumes the type provided has at least one captured piece for that type, for the player prforming the
	 * promotion.
	 *
	 * @param {string} type the type of piece to promote the piece waiting to be promoted to.
	 */
	const performPromotion = async(type) => {
		gameState.performPromotion(type);
		syncGame();
	}

	/**
	 * Returns all the UI elements that never are hidden
	 * @todo disable move input during a piece swap
	 */
	const renderStandardUI = () => {
		const { swapping, check } = state;
		const isSwapping = swapping !== false;
		const gameOver = check.WHITE.mate || check.BLACK.mate;


		return (
			<Row>
				<Col md="12">
					<MoveInput
						inCheck={gameState.isInCheck}
						currentPlayer={currentPlayer()}
						getPiece={gameState.getPiece}
						performMove={performMove}
						disabled={isSwapping || gameOver}
					/>
					{gameOver ? <span data-testid="winner">{check.WHITE.mate ? 'Black' : 'White'} wins!</span> : ''}</Col>
				<Col md="12">
					<CapturedPieces
						black={currentPlayer() !== 0}
						pieces={currentPlayer() !== 1 ?
							state.capturedPieces.WHITE :
							state.capturedPieces.BLACK}
						className="list-group-horizontal"
					/>
				</Col>
				<Col md="12">
					<BoardComponent
						id="board"
						player={currentPlayer()}
						board={state.board}
					/>
				</Col>
				<Col md="12">
					<CapturedPieces
						black={currentPlayer() === 0}
						pieces={currentPlayer() === 1 ?
							state.capturedPieces.WHITE :
							state.capturedPieces.BLACK}
						className="list-group-horizontal"
					/>
				</Col>
			</Row>
		);
	}


	return (
		<div data-testid="game-container">
			<SwapPieces
				open={state.swapping !== false}
				swapList={state.swapList}
				performPromotion={type => {performPromotion(type)}} />
			{renderStandardUI()}
		</div>
	);

}

GameContainer.propTypes = {
	gameState: PropTypes.instanceOf(GameState), // Used for testing
	match: PropTypes.object
}


export default GameContainer;
