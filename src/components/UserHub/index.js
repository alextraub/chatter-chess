import React from 'react';
import { Auth, Hub } from 'aws-amplify';

export default class UserHub extends React.Component {
	constructor() {
		super();

		this.state = {
			user: null
		}
	}

	componentDidMount() {
		Hub.listen("auth", ({ payload: { event, data } }) => {
			// eslint-disable-next-line default-case
			switch (event) {
			case "signIn":
				this.setState({ user: data });
				break;
			case "signOut":
				this.setState({ user: null });
				break;
			case "customOAuthState":
				this.setState({ customState: data });
			}
		});



		try {
			Auth.currentAuthenticatedUser()
				.then(user => this.setState({ user }))
				.catch(err => Error(err));
		} catch {
			//
		}
	}

	render() {
		const { user } = this.state;

		if(!user) {
			return (
				<div className="user-hub">
					<button onClick={async () => Auth.federatedSignIn()}>Sign in</button>
				</div>
			);
		} else {
			return (
				<div className="user-hub">
					<button onClick={() => Auth.signOut()}>Sign out</button>
				</div>
			);
		}


	}
}
