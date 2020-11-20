import React from "react";
import GameContainer from './components/GameContainer';
import UserHub from './components/UserHub';
import PrivacyPolicy from './components/PrivacyPolicy';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

const App = () => (
	<Router>
		<UserHub />
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

export default App;
