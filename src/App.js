import React, { useEffect, useState } from "react";
import GameContainer from './components/GameContainer';
import SignInAndOutButton from './components/SignInAndOutButton';
import PrivacyPolicy from './components/PrivacyPolicy';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Auth, Hub } from 'aws-amplify';
import { createGame, deleteGame } from "./graphql/mutations";
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const App = () => {
	const [user, setUser] = useState({ data: null, loading: true });

	useEffect(() => {
		const addGame = async() => {
			try {
				const game = {owner: Auth.currentAuthenticatedUser()};
				const gameData = await API.graphql(graphqlOperation(createGame, {input: game}));
				console.log('Game', gameData);
			} catch (error) {
				console.log('error on creating game', error);
			}
		};
		const removeGame = async() => {
			try {
				const game = {owner: Auth.currentAuthenticatedUser()};
				await API.graphql(graphqlOperation(deleteGame, {input: game}));
			} catch (error) {
				console.log('error on deleting game', error);
			}
		};
		Hub.listen('auth', ({ payload: { event, data } }) => {
			// eslint-disable-next-line default-case
			switch (event) {
			case 'signIn':
			case 'cognitoHostedUI':
				getUser().then(userData => setUser({ data: userData, loading: false }));
				addGame();
				break;
			case 'signOut':
				removeGame();
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
					<Route path="/">
						<GameContainer />
					</Route>
				</Switch>
			</Container>
		</Router>
	);
};

export default App;
