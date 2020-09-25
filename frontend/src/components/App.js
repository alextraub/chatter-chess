import React from "react";
import BoardComponent from './BoardComponent'

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
    </div>
);

export default App;

