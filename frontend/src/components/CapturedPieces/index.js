import React from 'react';
import { pieceName } from '../../game/Piece';

export default class CapturedPieces extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id='capturedContainer'>
				<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Creepster+Caps" />
				<h1>Shadow Realm</h1><br/>
				<h2>Captured White Pieces: {this.props.whitePieces.length}</h2><br/>
				<ul>
					{this.props.whitePieces.map((piece) => {
						return (
							<li>{pieceName(piece)}</li>
						)
					})}
				</ul>
				<h2>Captured Black Pieces: {this.props.blackPieces.length}</h2><br/>
				<ul>
					{this.props.blackPieces.map((piece) => {
						return (
							<li>{pieceName(piece)}</li>
						)
					})}
				</ul>
			</div>
		);
	}
}