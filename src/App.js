import React, { useEffect, useState } from "react";
import GameContainer from './components/GameContainer';
import SignInAndOutButton from './components/SignInAndOutButton';
import PrivacyPolicy from './components/PrivacyPolicy';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Auth, Hub } from 'aws-amplify';
// import * as mutations from "./graphql/mutations";
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
// import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import GameList from "./components/GameList";
Amplify.configure(awsconfig);
// const {v4 : uuidv4} = require('uuid');

const App = () => {
	const [user, setUser] = useState({ data: null, loading: true });

	useEffect(() => {
		// const uuid = uuidv4();
		//
		// const addGame = async() => {
		// 	try {
		// 		const pieces = [{player: "WHITE", type: "PAWN", captured: false},
		// 			{player: "WHITE", type: "PAWN", captured: false},
		// 			{player: "WHITE", type: "PAWN", captured: false},
		// 			{player: "WHITE", type: "PAWN", captured: false},
		// 			{player: "WHITE", type: "PAWN", captured: false},
		// 			{player: "WHITE", type: "PAWN", captured: false},
		// 			{player: "WHITE", type: "PAWN", captured: false},
		// 			{player: "WHITE", type: "PAWN", captured: false},
		// 			{player: "WHITE", type: "ROOK", captured: false},
		// 			{player: "WHITE", type: "ROOK", captured: false},
		// 			{player: "WHITE", type: "KNIGHT", captured: false},
		// 			{player: "WHITE", type: "KNIGHT", captured: false},
		// 			{player: "WHITE", type: "BISHOP", captured: false},
		// 			{player: "WHITE", type: "BISHOP", captured: false},
		// 			{player: "WHITE", type: "KING", captured: false},
		// 			{player: "WHITE", type: "QUEEN", captured: false},
		// 			{player: "BLACK", type: "PAWN", captured: false},
		// 			{player: "BLACK", type: "PAWN", captured: false},
		// 			{player: "BLACK", type: "PAWN", captured: false},
		// 			{player: "BLACK", type: "PAWN", captured: false},
		// 			{player: "BLACK", type: "PAWN", captured: false},
		// 			{player: "BLACK", type: "PAWN", captured: false},
		// 			{player: "BLACK", type: "PAWN", captured: false},
		// 			{player: "BLACK", type: "PAWN", captured: false},
		// 			{player: "BLACK", type: "ROOK", captured: false},
		// 			{player: "BLACK", type: "ROOK", captured: false},
		// 			{player: "BLACK", type: "KNIGHT", captured: false},
		// 			{player: "BLACK", type: "KNIGHT", captured: false},
		// 			{player: "BLACK", type: "BISHOP", captured: false},
		// 			{player: "BLACK", type: "BISHOP", captured: false},
		// 			{player: "BLACK", type: "KING", captured: false},
		// 			{player: "BLACK", type: "QUEEN", captured: false}
		// 		];
		// 		const checkStatusWhite = {
		// 			status: false,
		// 			mate: false
		// 		};
		// 		const checkStatusBlack = {
		// 			status: false,
		// 			mate: false
		// 		};
		// 		const game = {
		// 			id: uuid,
		// 			turn: 1,
		// 			pieces: pieces,
		// 			checkStatusWhite: checkStatusWhite,
		// 			checkStatusBlack: checkStatusBlack,
		// 		};
		// 		const gameData = await API.graphql({query: mutations.createGame, variables: {input: game}, authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS});
		// 		console.log('Game', gameData);
		// 	} catch (error) {
		// 		console.log('error on creating game', error);
		// 	}
		// };

		Hub.listen('auth', ({ payload: { event, data } }) => {
			// eslint-disable-next-line default-case
			console.log(event);
			switch (event) {
			case 'signIn':
				// addGame();
				// break;
			case 'cognitoHostedUI':
				getUser().then(userData => setUser({ data: userData, loading: false }));
				break;
			case 'signOut':
				setUser({ data: null, loading: false });
				break;
			case 'signIn_failure':
			case 'cognitoHostedUI_failure':
				console.error('Sign in failure', data);
				break;
			}
		});

		getUser().then(userData => setUser({ data: userData, loading: false }));
	}, []);

	function getUser() {
		return Auth.currentAuthenticatedUser()
			.then(userData => userData)
			.catch(err => {

			});
	}

	return (
		<Router>
			<SignInAndOutButton user={user} />
			<Container className="justify-content-center">
				<Switch>
					<Route path="/privacy">
						<PrivacyPolicy />
					</Route>
					<Route path="/games">
						<GameList />
					</Route>
					<Route path="/">
						<GameContainer />
					</Route>
				</Switch>
			</Container>
		</Router>
	);
};

export default App;
