import React, { useState, useEffect, useContext, useCallback } from "react";
import { API } from "aws-amplify";
import { Col, Row, Button, Card, CardText, CardHeader, CardTitle, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import "./GameList.css";
import { AuthContext } from "../auth/AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
const { v4: uuidv4 } = require("uuid");

const GameList = ({ history, location }) => {
	const auth = useContext(AuthContext);
	const [games, setGames] = useState([]);
	const [loading, isLoading] = useState(true);

	const fetchGames = useCallback(async () =>{
		if(auth.user) {
			try {
				console.log("about to list games");
				console.log("current username:", auth.user.getUsername());
				const gameData = await API.graphql({
					query: queries.listGames,
					variables: {
						owner: auth.user.getUsername()
					},
					authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
				});
				console.log("game data retrieved");
				const gameList = gameData.data.listGames.items;
				console.log("game list", gameList);
				setGames(gameList);
			} catch (error) {
				console.log("error on fetching games", error);
			}
		}
	}, [auth.user]);


	useEffect(() => {
		if(loading && !auth.loading) {
			fetchGames()
				.then(() => {
					isLoading(false);
				});
		}
	}, [auth, loading, fetchGames]);


	const fetchGame = async game => {
		try {
			await API.graphql({
				query: queries.getGame,
				variables: { input: game },
				authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
			});
			console.log("Fetched Game");
		} catch (error) {
			console.log("error on fetching game", error);
		}
	};

	const addGame = async () => {
		try {
			const uuid = uuidv4();
			const pieces = [
				{
					player: "WHITE",
					type: "PAWN",
					captured: false,
					position: { row: 1, col: 0 }
				},
				{
					player: "WHITE",
					type: "PAWN",
					captured: false,
					position: { row: 1, col: 1 }
				},
				{
					player: "WHITE",
					type: "PAWN",
					captured: false,
					position: { row: 1, col: 2 }
				},
				{
					player: "WHITE",
					type: "PAWN",
					captured: false,
					position: { row: 1, col: 3 }
				},
				{
					player: "WHITE",
					type: "PAWN",
					captured: false,
					position: { row: 1, col: 4 }
				},
				{
					player: "WHITE",
					type: "PAWN",
					captured: false,
					position: { row: 1, col: 5 }
				},
				{
					player: "WHITE",
					type: "PAWN",
					captured: false,
					position: { row: 1, col: 6 }
				},
				{
					player: "WHITE",
					type: "PAWN",
					captured: false,
					position: { row: 1, col: 7 }
				},
				{
					player: "WHITE",
					type: "ROOK",
					captured: false,
					position: { row: 0, col: 0 }
				},
				{
					player: "WHITE",
					type: "ROOK",
					captured: false,
					position: { row: 0, col: 7 }
				},
				{
					player: "WHITE",
					type: "KNIGHT",
					captured: false,
					position: { row: 0, col: 1 }
				},
				{
					player: "WHITE",
					type: "KNIGHT",
					captured: false,
					position: { row: 0, col: 6 }
				},
				{
					player: "WHITE",
					type: "BISHOP",
					captured: false,
					position: { row: 0, col: 2 }
				},
				{
					player: "WHITE",
					type: "BISHOP",
					captured: false,
					position: { row: 0, col: 5 }
				},
				{
					player: "WHITE",
					type: "KING",
					captured: false,
					position: { row: 0, col: 4 }
				},
				{
					player: "WHITE",
					type: "QUEEN",
					captured: false,
					position: { row: 0, col: 3 }
				},
				{
					player: "BLACK",
					type: "PAWN",
					captured: false,
					position: { row: 6, col: 0 }
				},
				{
					player: "BLACK",
					type: "PAWN",
					captured: false,
					position: { row: 6, col: 1 }
				},
				{
					player: "BLACK",
					type: "PAWN",
					captured: false,
					position: { row: 6, col: 2 }
				},
				{
					player: "BLACK",
					type: "PAWN",
					captured: false,
					position: { row: 6, col: 3 }
				},
				{
					player: "BLACK",
					type: "PAWN",
					captured: false,
					position: { row: 6, col: 4 }
				},
				{
					player: "BLACK",
					type: "PAWN",
					captured: false,
					position: { row: 6, col: 5 }
				},
				{
					player: "BLACK",
					type: "PAWN",
					captured: false,
					position: { row: 6, col: 6 }
				},
				{
					player: "BLACK",
					type: "PAWN",
					captured: false,
					position: { row: 6, col: 7 }
				},
				{
					player: "BLACK",
					type: "ROOK",
					captured: false,
					position: { row: 7, col: 0 }
				},
				{
					player: "BLACK",
					type: "ROOK",
					captured: false,
					position: { row: 7, col: 7 }
				},
				{
					player: "BLACK",
					type: "KNIGHT",
					captured: false,
					position: { row: 7, col: 1 }
				},
				{
					player: "BLACK",
					type: "KNIGHT",
					captured: false,
					position: { row: 7, col: 6 }
				},
				{
					player: "BLACK",
					type: "BISHOP",
					captured: false,
					position: { row: 7, col: 2 }
				},
				{
					player: "BLACK",
					type: "BISHOP",
					captured: false,
					position: { row: 7, col: 5 }
				},
				{
					player: "BLACK",
					type: "KING",
					captured: false,
					position: { row: 7, col: 4 }
				},
				{
					player: "BLACK",
					type: "QUEEN",
					captured: false,
					position: { row: 7, col: 3 }
				}
			];
			const checkStatusWhite = {
				status: false,
				mate: false
			};
			const checkStatusBlack = {
				status: false,
				mate: false
			};
			const game = {
				id: uuid,
				turn: 1,
				pieces: pieces,
				checkStatusWhite: checkStatusWhite,
				checkStatusBlack: checkStatusBlack
			};
			await API.graphql({
				query: mutations.createGame,
				variables: { input: game },
				authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
			});
			setGames([...games, game]);
		} catch (error) {
			console.log("error on creating game", error);
		}
	};

	const removeGame = async idx => {
		try {
			const game = games[idx];
			const gameToBeDeleted = { id: game.id, expectedVersion: game.version };
			console.log("Removing Game", game);
			await API.graphql({
				query: mutations.deleteGame,
				variables: { input: gameToBeDeleted },
				authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
			});
			history.push(location.pathname);
		} catch (error) {
			if(error.errors.some(e => e.message !== "Variable 'input' has coerced Null value for NonNull type 'Int!'")) {
				console.log(error);
			}
		}
	};

	return (
		<Card>
			<CardHeader className="d-flex flex-row w-100 justify-content-center">
				<div className="d-inline-flex mr-auto">
					<CardTitle className="d-inline-block" tag="h2">Your Games</CardTitle>
				</div>
				<div className="d-flex flex-end py-2">
					<Button
						color="primary"
						onClick={() => addGame()}
					>
						<FontAwesomeIcon icon={faPlus} />
					</Button>
				</div>
			</CardHeader>
			<CardBody>
				<ListGroup>
					{games.map((game, idx) => {
						return (
							<ListGroupItem key={`game${idx}`}>
								<Row>
									<Col md="3" sm="3" xs="2">
										<Button
											role="button"
											aria-roledescription="play game"
											color="success"
											onClick={() => fetchGame(idx)}
										>
											<FontAwesomeIcon icon={faPlay} />
										</Button>
									</Col>
									<Col md="7" sm="5" xs="4">
										<CardText className="d-inline text-center">{`Current Turn: ${game.turn % 2 === 0 ? "Black" : "White"}`}</CardText>
									</Col>
									<Col md="2">
										<Button
											role="button"
											aria-roledescription="delete game"
											color="danger"
											onClick={async () => removeGame(idx)}
										>
											<FontAwesomeIcon icon={faTrash} />
										</Button>
									</Col>
								</Row>
							</ListGroupItem>
						)
					})}
				</ListGroup>
			</CardBody>
		</Card>
	);
};

GameList.propTypes = {
	history: PropTypes.object,
	location: PropTypes.object
}

export default GameList;
