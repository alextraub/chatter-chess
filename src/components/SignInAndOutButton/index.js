import React, { useState, useEffect } from 'react';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import { Button, Spinner, Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import {createGame, deleteGame} from "../../graphql/mutations";

const SignInAndOutButton = ({ user: { loading, data } }) => {
	const [isLoading, setLoading] = useState(true); // Signals a change of the currently authenticated user

	const [tooltipOpen, setTooltipOpen] = useState(false);
	const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

	useEffect(() => {
		setLoading(loading);
	}, [loading]);

	const addGame = async() => {
		try {
			const game = {
				id: data.signInUserSession.idToken.payload.userId
			};
			const gameData = await API.graphql(graphqlOperation(createGame, {input: game}));
			console.log('Game', gameData);
		} catch (error) {
			console.log('error on creating game', error);
		}
	};
	const removeGame = async() => {
		try {
			const game = {
				id: data.signInUserSession.idToken.payload.userId
			};
			await API.graphql(graphqlOperation(deleteGame, {input: game}));
		} catch (error) {
			console.log('error on deleting game', error);
		}
	};

	const id = "Tooltip-logged-in-user"

	if(isLoading) {
		return (
			<Button disabled type="button" color="primary" id={id}>
				<Spinner size="sm" />
			</Button>
		)
	} else {
		return data ?
			<>
				<Button id={id} type="button" color="primary" onClick={() => {
					setLoading(true);
					removeGame();
					Auth.signOut();
				}}>Sign out</Button>
				{/*{alert(JSON.stringify(data))}*/}
				<Tooltip
					isOpen={tooltipOpen}
					toggle={toggleTooltip}
					target={id}
				>
					{data.signInUserSession.idToken.payload.email}
				</Tooltip>
			</> :
			<Button color="primary" onClick={() => {
				setLoading(true);
				Auth.federatedSignIn();
				addGame();
			}}>Sign in</Button>
	}
}

SignInAndOutButton.propTypes = {
	user: PropTypes.shape({
		loading: PropTypes.bool, // An API call is in progress when true
		data: PropTypes.any // Data payload from the authenticated user, or null if there isn't one
	})
}

export default SignInAndOutButton;
