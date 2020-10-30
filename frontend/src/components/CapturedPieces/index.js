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
					{Array.from(this.props.whitePieces).map((piece) => {
						if (pieceName(piece) === "pawn")
							return (
								<img src={whitePieceImages.pawn} alt={"wpawn"}/>
							);
						else if (pieceName(piece) === "rook")
							return (
								<img src={whitePieceImages.rook} alt={"wrook"}/>
							);
						else if (pieceName(piece) === "bishop")
							return (
								<img src={whitePieceImages.bishop} alt={"wbishop"}/>
							);
						else if (pieceName(piece) === "knight")
							return (
								<img src={whitePieceImages.knight} alt={"wknight"}/>
							);
						else if (pieceName(piece) === "queen")
							return (
								<img src={whitePieceImages.queen} alt={"wqueen"}/>
							);
						else if (pieceName(piece) === "king")
							return (
								<img src={whitePieceImages.king} alt={"wking"}/>
							);
					})}

				<h2>Captured Black Pieces: {this.props.blackPieces.length}</h2><br/>
					{Array.from(this.props.blackPieces).map((piece) => {
						if (pieceName(piece) === "pawn")
							return (
								<img src={blackPieceImages.pawn} alt={"bpawn"}/>
							);
						else if (pieceName(piece) === "rook")
							return (
								<img src={blackPieceImages.rook} alt={"brook"}/>
							);
						else if (pieceName(piece) === "bishop")
							return (
								<img src={blackPieceImages.bishop} alt={"bbishop"}/>
							);
						else if (pieceName(piece) === "knight")
							return (
								<img src={blackPieceImages.knight} alt={"bknight"}/>
							);
						else if (pieceName(piece) === "queen")
							return (
								<img src={blackPieceImages.queen} alt={"bqueen"}/>
							);
						else if (pieceName(piece) === "king")
							return (
								<img src={blackPieceImages.king} alt={"bking"}/>
							);
					})}

			</div>
		);
	}
}