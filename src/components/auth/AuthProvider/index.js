import React, { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Auth, Hub } from 'aws-amplify';

const defaultAuthState = {
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

	/*
		Loads a session with any saved authenticated user
		This should only be called on the first load where there isn't any session loaded yet
	 */
	const loadSession = useCallback(async () => {
		try {
			await Auth.currentSession();
			const user = await Auth.currentAuthenticatedUser();
			setAuthState({
				authenticated: true,
				user
			});
		} catch (err) {
			setAuthState({
				authenticated: false,
				user: null
			});
		}
	}, []);

	/*
		Loads current authenticated user.
		This should only be called after a session has been loaded and there is no current authenticated user prior to the call to this function
	*/
	const loadUser = useCallback(async () => {
		try {
			const user = await Auth.currentAuthenticatedUser();
			setAuthState({
				user,
				authenticated: true
			});
		} catch {
			setAuthState({
				user: null,
				authenticated: false
			})
		}
	}, []);

	/*
		Keeps authentication state updated when a session is yet to be loaded, a user signs in, or a user signs out.
	*/
	useEffect(() => {
		if(!hasSession) {
			loadSession();
			setHasSession(true);
		}

		Hub.listen('auth', ({ payload: { event, data } }) => {
			if(event === 'signOut' && (authState.authenticated || authState.user !== null)) {
				setAuthState({
					user: null,
					authenticated: false
				});
			} else if(event === 'signIn' && hasSession) {
				loadUser();
			}
		});
	}, [hasSession, loadSession, authState, loadUser]);

	return (
		<AuthContext.Provider value={authState}>
			{props.children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.element
}

export default AuthProvider;
export { AuthContext };
