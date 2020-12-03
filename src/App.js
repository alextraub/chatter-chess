/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from "react";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from './routes';
import AuthProvider from './components/auth/AuthProvider';

const App = () => {

	return (
		<>
			<Router>
				<AuthProvider>
					<Switch>
						{routes}
					</Switch>
				</AuthProvider>
			</Router>
		</>
	);
};

export default App;
