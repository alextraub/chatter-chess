import React from "react";

import MoveInput from "./MoveInput";

const App = () => (
    <div>
        <h1>Chatter Chess</h1>
        <small>Play chess with your voice</small>
        <MoveInput />
    </div>
);

export default App;

import React from "react";
import BoardComponent from './BoardComponent'
import MoveInput from "./MoveInput";

function click() {
    console.log('you lose');
}
function click1() {
    console.log("resetting game");
    <BoardComponent />
}

const App = () => (
    <div>
        <h1>Chatter Chess</h1>
        <small>Play chess with your voice</small>
        < BoardComponent />
        <button onClick={click}>
            forfeit
        </button>
        <button onClick={click1}>
            reset
        </button>
        <MoveInput />
    </div>
);

export default App;
