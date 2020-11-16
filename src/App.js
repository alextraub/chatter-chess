import React from "react";
import GameContainer from './components/GameContainer';
import { withAuthenticator } from '@aws-amplify/ui-react';


const App = () => (
	<div>
		<GameContainer />
		<p>Credits</p>
		Chess piece graphics by <a href="https://en.wikipedia.org/wiki/User:Cburnett">Colin M.L. Burnett</a>
	</div>
);

// export default withAuthenticator(App);
export default App;
