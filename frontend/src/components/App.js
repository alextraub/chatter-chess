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
        <button onClick={click}>
            forfeit
        </button>
        <button onClick={click1}>
            reset
        </button>
        <BoardComponent />
        <MoveInput />

    </div>
);

export default App;
