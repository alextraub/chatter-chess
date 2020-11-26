import React, { useState } from 'react';
import { Form, FormText, Input, FormGroup, Label, Button } from 'reactstrap';
import { Auth } from 'aws-amplify';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	return (
		<Form onSubmit={async e => {
			e.preventDefault();
			try {
				await Auth.signIn(email, password);
				setErrorMessage('');
			} catch (err) {
				setErrorMessage('Email and or password do not match');
			}
		}}>
			<FormText color="danger" hidden={errorMessage === ''}>{errorMessage}</FormText>
			<FormGroup>
				<Label for="signin-email">Email</Label>
				<Input
					id="signin-email"
					type="email"
					value={email}
					required
					onChange={e => {
						setEmail(e.target.value);
						setErrorMessage('');
					}}
					placeholder="name@example.com" />
			</FormGroup>
			<FormGroup>
				<Label for="signin-password">Password</Label>
				<Input
					id="signin-password"
					type="password"
					value={password}
					required
					placeholder="Password"
					onChange={e => {
						setErrorMessage('');
						setPassword(e.target.value);
					}} />
			</FormGroup>

			<Button type="submit">Login</Button>
		</Form>
	)
}

export default LoginForm;
