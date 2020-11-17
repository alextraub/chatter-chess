import React from "react";
import GameContainer from './components/GameContainer';
import UserHub from './components/UserHub';

const App = () => (
	<div>
		<UserHub />
		<GameContainer />
		<p>Credits</p>
		Chess piece graphics by <a href="https://en.wikipedia.org/wiki/User:Cburnett">Colin M.L. Burnett</a>
	</div>
);

export default App;
