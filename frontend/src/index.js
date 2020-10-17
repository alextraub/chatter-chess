import './index.css';
import './components/BoardPiece/BoardPiece.css';
import './components/BoardSquare/BoardSquare.css';
import './components/MoveInput/MoveInput.css';
import './components/CapturedPieces/CapturedPieces.css';

import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

const APP_ROOT = "root";

ReactDOM.render(<App />, document.getElementById(APP_ROOT));
