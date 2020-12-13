import React, {useState, useEffect, useCallback} from 'react';

import MoveInput from '../MoveInput';
import BoardComponent from '../BoardComponent';
import CapturedPieces from "../CapturedPieces";
import SwapPieces from "../SwapPieces";
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import GameState from '../../game/GameState';
import {API} from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import {GRAPHQL_AUTH_MODE} from "@aws-amplify/api";

/**
 * Container component for a single instance of a chess game. It mantains the top level state
 * as well as renders the top-level UI components for the game.
 */
const GameContainer = props => {
	const [state, setState] = useState(props.gameState ? {
		turn: props.gameState.turn,
		capturedPieces: props.gameState.getCapturedPieces(),
		check: props.gameState.check,
		board: props.gameState.board,
		swapping: props.gameState.swapping,
		swapList: props.gameState.swapList
	} : undefined);
	const [gameState, setGameState] = useState(props.gameState);
	const [loading, isLoading] = useState(false);
	const [fetching, isFetching] = useState(!props.offline);

	const updateGame = async() => {
		if(!loading) {
			isLoading(true);
			try {
				const game = GameState.asQueryObject(gameState);
				const {id} = props.match.params;
				await API.graphql({
					query: mutations.updateGame,
					variables: {
						input: {
							...game,
							id
						}
					},
					authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
				});
			} catch (error) {
				console.log(error);
			} finally {
				isLoading(false);
			}
		}
	};

	/**
	 * Updates the React state to reflect the instance's game state property
	 */
	const syncGame = useCallback(() => {
		if(gameState instanceof GameState) {
			setState({
				turn: gameState.turn,
				capturedPieces: gameState.getCapturedPieces(),
				check: gameState.check,
				board: gameState.board,
				swapping: gameState.swapping,
				swapList: gameState.swapList
			});
		}
	}, [gameState]);

	const fetchGame = useCallback(async () => {
		if(!loading) {
			isLoading(true);
			const { id } = props.match.params;
			try {
				await API.graphql({
					query: queries.getGame,
					variables: {
						id
					},
					authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
				})
					.then(({ data }) => {
						try {
							setGameState(new GameState({
								turn: data.getGame.turn,
								pieces: [...data.getGame.pieces],
								check: {
									WHITE: {
										...data.getGame.checkStatusWhite
									},
									BLACK: {
										...data.getGame.checkStatusBlack
									}
								}
							}))
						} catch {
							//
						}
					}, () => {})
					.catch(() => {}) // Fetch the data from the API
			} catch {
				setGameState(null);
			} finally {
				isLoading(false);
			}
		}

	}, [props.match, loading]);

	useEffect(() => {
		if(fetching) {
			fetchGame()
				.then(() => {
					isFetching(false);
				});
		}
	}, [fetching, fetchGame]);

	useEffect(() => {
		if(!loading && !fetching) {
			syncGame();
		}
	}, [loading, fetching, syncGame]);

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
		if(result && !props.offline) {
			console.log(gameState.pieces);
			await updateGame();
		}
		return result;
	}

	/**
	 * Promotes a piece to a specified type. This method assumes the type provided has at least one captured piece for that type, for the player prforming the
	 * promotion.
	 *
	 * @param {string} type the type of piece to promote the piece waiting to be promoted to.
	 */
	const performPromotion = async type => {
		gameState.performPromotion(type);
		syncGame();
		if(!props.offline) {
			await updateGame();
		}
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
						loading={loading}
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
			{fetching && state === undefined ? 'Loading...' : state === undefined ?
				'Not found' : <>
					<SwapPieces
						open={state.swapping !== false}
						swapList={state.swapList}
						erformPromotion={type => {performPromotion(type)}} />
					{renderStandardUI()}
				</>}
		</div>
	);

}

GameContainer.propTypes = {
	gameState: PropTypes.instanceOf(GameState), // Used for testing
	match: PropTypes.object,
	offline: PropTypes.bool
}


export default GameContainer;
