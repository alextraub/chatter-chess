import React from 'react';
import { pieceName } from '../../game/Piece';
import '../ChessPiece';
import {whitePieceImages} from "../ChessPiece/pieceImages";

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
						if (pieceName(piece) !== "pawn")
						return (
							<li>{whitePieceImages.piece}
								<input data-testid="button" type='submit' value='Swap Piece'/>
							</li>
						)
					})}
				</ul>
				<h2>Captured Black Pieces: {this.props.blackPieces.length}</h2><br/>
				<ul>
					{this.props.blackPieces.map((piece) => {
						if (pieceName(piece) !== "pawn")
						return (
							<li>{pieceName(piece)}
								<input data-testid="button" type='submit' value='Swap Piece'/>
							</li>
						)
					})}
				</ul>
			</div>
		);
	}
}