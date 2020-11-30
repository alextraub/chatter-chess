import React, { useEffect, useState, useCallback } from "react";
import GameContainer from './components/GameContainer';
import PrivacyPolicy from './components/PrivacyPolicy';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGame, deleteGame } from "./graphql/mutations";
import { Auth, Hub, API, graphqlOperation } from 'aws-amplify';
import { ForgotPasswordForm, ResendVerificationForm, SignInForm, SignUpForm } from './components/auth';
import Page from './components/Page';

const App = () => {
	const [user, setUser] = useState({ loading: true, data: null });

	const loadSession = useCallback(async () => {
		try {
			await Auth.currentSession();
			const usr = await Auth.currentAuthenticatedUser();
			setUser({ loading: false, data: usr });
		} catch (err) {
			//
		}
	}, []);

	useEffect(() => {
		if(user === null) {
			loadSession();
		}
	});

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

	useEffect(() => {
		async function getUser() {
			return Auth.currentAuthenticatedUser()
				.then(userData => userData)
		}

		Hub.listen('auth', ({ payload: { event } }) => {
			// eslint-disable-next-line default-case
			switch (event) {
			case 'signOut':
				setUser({ loading: false, data: null });
				break;
			case 'signIn':
				getUser().then(userData => setUser({ loading: false, data: userData }));
				break;
			}
		}, [user.loading]);


		if(user.loading) {
			getUser().then(userData => {
				if(userData) {
					setUser({ data: userData, loading: false })
				} else {
					setUser({ data: null, loading: false });
				}
			})
				.catch(() => setUser({ data: null, loading: false }));
		}
	}, [user.loading]);


	return (
		<Router>
			<Switch>
				<Route exact path="/signin"  render={props => (
					<Page {...props} centered user={user}>
						<SignInForm user={user} />
					</Page>
				)} />
				<Route exact path="/" render={props => (
					<Page {...props} requireSignIn hasAccountButton user={user}>
						<GameContainer />
					</Page>
				)} />
				<Route exact path="/signup" render={props => (
					<Page {...props} centered user={user}>
						<SignUpForm user={user} />
					</Page>
				)} />
				<Route exact path="/forgot-password" render={props => (
					<Page {...props} centered user={user}>
						<ForgotPasswordForm />
					</Page>
				)} />
				<Route exact path="/resend-verification" render={props => (
					<Page {...props} centered user={user}>
						<ResendVerificationForm />
					</Page>
				)} />
				<Route exact path="/privacy" render={props => (
					<Page {...props} hasAccountButton user={user}>
						<PrivacyPolicy />
					</Page>
				)} />
			</Switch>
		</Router>
	);
};

export default App;
