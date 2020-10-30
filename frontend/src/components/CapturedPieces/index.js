import React from 'react';
import { pieceName } from '../../game/Piece';
import {blackPieceImages, whitePieceImages} from "../ChessPiece/pieceImages";
import ChessPiece from '../ChessPiece';

export default class CapturedPieces extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	pieceCounts: {'rook': 0}
		// };
	}

	// renderPieces(black) {
	// 	return this.state.pieceCounts.entries().map([key, value] => (
	// 		<div key={key}>
	// 			<ChessPiece type={key} black={black}/>
	// 			{value}
	// 		</div>
	// 	));
	// }

	render() {
		return (
			<div id='capturedContainer'>
				<h1>Shadow Realm</h1><br/>
				<h2>Captured White Pieces: {this.props.whitePieces.length}</h2><br/>
					{Array.from(this.props.whitePieces).map((piece, index) => {
						return <ChessPiece type={pieceName(piece)} key={index}/>
					})}

				<h2>Captured Black Pieces: {this.props.blackPieces.length}</h2><br/>
					{Array.from(this.props.blackPieces).map((piece) => {
						{Array.from(this.props.whitePieces).map((piece, index) => {
							return <ChessPiece black type={pieceName(piece)} key={index}/>
						})}
					})}

			</div>
		);
	}
}