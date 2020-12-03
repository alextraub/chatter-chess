/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from "react";
import GameContainer from './components/GameContainer';
import PrivacyPolicy from './components/PrivacyPolicy';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { createGame, deleteGame } from "./graphql/mutations";
// import { API, graphqlOperation } from 'aws-amplify';
import { ForgotPasswordForm, ResendVerificationForm, SignInForm, SignUpForm } from './components/auth';
import Page from './components/Page';
import AuthProvider from './components/auth/AuthProvider';
import routes from './routes';

const App = () => {
	// const addGame = async() => {
	// 	try {
	// 		const game = {owner: Auth.currentAuthenticatedUser()};
	// 		const gameData = await API.graphql(graphqlOperation(createGame, {input: game}));
	// 		console.log('Game', gameData);
	// 	} catch (error) {
	// 		console.log('error on creating game', error);
	// 	}
	// };
	// const removeGame = async() => {
	// 	try {
	// 		const game = {owner: Auth.currentAuthenticatedUser()};
	// 		await API.graphql(graphqlOperation(deleteGame, {input: game}));
	// 	} catch (error) {
	// 		console.log('error on deleting game', error);
	// 	}
	// };

	const routeOptions = ({ path, component, key=path, passRouterProps=false, centered=false, requireSignIn=false, noAccountButton=false }) => ({
		key,
		path,
		component,
		passRouterProps,
		centered,
		requireSignIn,
		noAccountButton
	});

	return (
		<Router>
			<AuthProvider>
				<Switch>
					{/* <Route exact path="/signin">
						<Page centered noAccountButton>
							<SignInForm />
						</Page>
					</Route>
					<Route exact path="/">
						<Page requireSignIn>
							<GameContainer />
						</Page>
					</Route>
					<Route exact path="/signup">
						<Page centered noAccountButton>
							<SignUpForm />
						</Page>
					</Route>
					<Route exact path="/forgot-password">
						<Page centered>
							<ForgotPasswordForm />
						</Page>
					</Route>
					<Route exact path="/resend-verification">
						<Page centered>
							<ResendVerificationForm />
						</Page>
					</Route>
					<Route exact path="/privacy">
						<Page>
							<PrivacyPolicy />
						</Page>
					</Route> */}
					{routes}
				</Switch>
			</AuthProvider>
		</Router>
	);
};

export default App;