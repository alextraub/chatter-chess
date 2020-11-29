import React, { useEffect, useState } from "react";
import GameContainer from './components/GameContainer';
import PrivacyPolicy from './components/PrivacyPolicy';
import { Route, Switch } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';
import SignInForm from './components/Authenticator/SignInForm';
import SignUpForm from './components/Authenticator/SignUpForm';
import ResendVerificationForm from './components/Authenticator/ReseendVerificationForm';
import Page from './components/Page';
import ForgotPasswordForm from './components/Authenticator/ForgotPasswordForm';

const App = () => {
	const [user, setUser] = useState({ loading: true, data: null });

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
				console.log(userData)
				if(userData) {
					setUser({ data: userData, loading: false })
				} else {
					setUser({ data: null, loading: false });
				}
			})
				.catch(() => setUser({ data: null, loading: false }));
		}
	}, [user]);


	return (
		<Switch>
			<Route exact path="/signin">
				<Page centered user={user}>
					<SignInForm user={user} />
				</Page>
			</Route>
			<Route exact path="/">
				<Page requireSignIn hasAccountButton user={user}>
					<GameContainer />
				</Page>
			</Route>
			<Route exact path="/signup">
				<Page centered user={user}>
					<SignUpForm user={user} />
				</Page>
			</Route>
			<Route exact path="/forgot-password">
				<Page centered user={user}>
					<ForgotPasswordForm />
				</Page>
			</Route>
			<Route exact path="/resend-verification">
				<Page centered user={user}>
					<ResendVerificationForm />
				</Page>
			</Route>
			<Route exact path="/privacy">
				<Page hasAccountButton user={user}>
					<PrivacyPolicy />
				</Page>
			</Route>
		</Switch>
	);
};

export default App;
