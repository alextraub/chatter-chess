import React, { useState, useEffect, useContext } from "react";
import { API, Auth } from "aws-amplify";
import { Col, Row, Button, Card, CardText, CardHeader, CardTitle, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import "./GameList.css";
import { AuthContext } from "../auth/AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import LoadingDots from '../LoadingDots';
import { useHistory } from 'react-router-dom';
import { standardGame } from '../../game/utils/gameUtils';
const { v4: uuidv4 } = require("uuid");

const GameList = () => {
	const auth = useContext(AuthContext); // Access the globally authenticated user
	const [games, setGames] = useState([]); // All the user's games
	const [fetching, isFetching] = useState(true); // If an API request is being handled
	const [loading, isLoading] = useState(false); // A general indicator to prevent multiple API requests happening at once
	const history = useHistory();

	useEffect(() => {
		const fetchGames = async () =>{
			if(auth.user) { // If there is an authenticated user
				try {
					isLoading(true);
					const gameData = await API.graphql({
						query: queries.listGames,
						variables: {
							owner: auth.user.getUsername()
						},
						authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
					}); // Fetch the data from the API
					const gameList = gameData.data.listGames.items;
					setGames(gameList);
				} catch (error) {
					console.log("error on fetching games", error);
				} finally {
					isLoading(false);
				}
			}
		};

		// Anytime fetching is set to true and the globally authenticated user is not being loaded
		if(fetching && !auth.loading) {
			fetchGames()
				.then(() => {
					isFetching(false);
				});
		}
	}, [auth, fetching]);


	const addGame = async () => {
		if(!loading) {
			try {
				const uuid = uuidv4();
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
					...standardGame
				};
				isLoading(true);
				await API.graphql({
					query: mutations.createGame,
					variables: { input: game },
					authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
				});
				isFetching(true);
			} catch (error) {
				console.log("error on creating game", error);
			} finally {
				isLoading(false);
			}
		}
	};

	const removeGame = async idx => {
		if(!loading) {
			try {
				const game = games[idx];
				const gameToBeDeleted = { id: game.id, expectedVersion: game.version };
				isLoading(true);
				await API.graphql({
					query: mutations.deleteGame,
					variables: { input: gameToBeDeleted },
					authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
				});
				isFetching(true);
			} catch (error) {
				if(error.errors.some(e => e.message !== "Variable 'input' has coerced Null value for NonNull type 'Int!'")) {
					console.log(error);
				}
			} finally {
				isLoading(false);
			}
		}
	};

	return (
		<Card>
			<CardHeader className="d-flex flex-row w-100 justify-content-center">
				<div className="d-inline-flex mr-auto">
					<CardTitle className="d-inline-block" tag="h2">Your Games</CardTitle>
					<LoadingDots hidden={!loading && !fetching} />
				</div>
				<div className="d-flex flex-end py-2">
					<Button
						disabled={loading}
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
											disabled={loading}
											role="button"
											aria-roledescription="play game"
											color="success"
											onClick={async () => {
												await Auth.updateUserAttributes(auth.user, {
													'custom:active_game': game.id
												});
												history.push(`/game/${game.id}`)
											}}
										>
											<FontAwesomeIcon icon={faPlay} />
										</Button>
									</Col>
									<Col md="7" sm="5" xs="4">
										<CardText className="d-inline text-center">{`Current Turn: ${game.turn % 2 === 0 ? "White" : "Black"}`}</CardText>
									</Col>
									<Col md="2">
										<Button
											disabled={loading}
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

export default GameList;
