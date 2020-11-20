import React from 'react';
import { Auth, Hub } from 'aws-amplify';
import { Button } from 'reactstrap';

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
					<Button color="primary" onClick={() => Auth.federatedSignIn()}>Sign in</Button>
				</div>
			);
		} else {
			return (
				<div className="user-hub m-0">
					<Button type="button" color="primary" onClick={() => Auth.signOut()}>Sign out</Button>
				</div>
			);
		}
	}
}
