import React, { useEffect, useState } from "react";
import GameContainer from './components/GameContainer';
import SignInAndOutButton from './components/SignInAndOutButton';
import PrivacyPolicy from './components/PrivacyPolicy';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Auth, Hub } from 'aws-amplify';

const App = () => {
	const [user, setUser] = useState({ data: null, loading: true });

	useEffect(() => {
		Hub.listen('auth', ({ payload: { event, data } }) => {
			// eslint-disable-next-line default-case
			switch (event) {
			case 'signIn':
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
					<Route path="/">
						<GameContainer />
					</Route>
				</Switch>
			</Container>
		</Router>
	);
};

export default App;
