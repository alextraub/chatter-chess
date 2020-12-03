import React, { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Auth, Hub } from 'aws-amplify';

const defaultAuthState = {
	loading: true,
	user: null, // null means no user is authenticated
	authenticated: false // true if there is currently an authenticated user, false otherwise
}

/**
 * A global user authentication context
 */
const AuthContext = createContext(defaultAuthState);

/**
 * A wrapper that provides global authentication context access for consumers subscribed to the context Provider within this component.
 * The context will detect signin/out events and update the context globally.
 */
const AuthProvider = props => {
	const [authState, setAuthState] = useState(defaultAuthState); // Holds the value of the auth context
	const [hasSession, setHasSession] = useState(false); // Make sure session only is loaded on the first load

	const loadSession = useCallback(async () => {
		if(!hasSession) {
			try {
				await Auth.currentSession();
				const user = await Auth.currentAuthenticatedUser();
				setAuthState({
					user: user,
					authenticated: true,
					loading: false
				})
			} catch (err) {
				setAuthState({
					...authState,
					loading: false
				})
				console.log(err);
			}
			setHasSession(true);
		}
	}, [authState, hasSession]);

	/*
		Keeps authentication state updated when a session is yet to be loaded, a user signs in, or a user signs out.
	*/
	useEffect(() => {
		loadSession();


		function getUser() {
			return Auth.currentAuthenticatedUser()
				.then(usr => usr)
				.catch(err => console.log(err));
		}

		Hub.listen('auth', ({ payload: { event, data } }) => {
			if(event === 'signOut' && (authState.authenticated || authState.user !== null)) {
				setAuthState({
					user: null,
					authenticated: false
				});
			} else if(event === 'signIn' && hasSession && !authState.authenticated) {
				setAuthState({
					...authState,
					loading: true
				})
				getUser().then(usr => {
					setAuthState({
						user: usr,
						authenticated: true,
						loading: false
					})
				})
			}
		});
	});

	return(
		<AuthContext.Provider value={authState}>
			{props.children}
		</AuthContext.Provider>
	)
};

AuthProvider.propTypes = {
	children: PropTypes.element
}

export default AuthProvider;
export { AuthContext };
