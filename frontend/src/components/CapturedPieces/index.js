import React from 'react';
import { pieceName } from '../../game/Piece';
import {blackPieceImages, whitePieceImages} from "../ChessPiece/pieceImages";

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

					{this.props.whitePieces.map((piece) => {
						if (pieceName(piece) === "pawn")
							return (
								<img src={whitePieceImages.pawn} alt={"pawn"}/>
							);
						else if (pieceName(piece) === "rook")
							return (
								<img src={whitePieceImages.rook} alt={"rook"}/>
							);
						else if (pieceName(piece) === "bishop")
							return (
								<img src={whitePieceImages.bishop} alt={"bishop"}/>
							);
						else if (pieceName(piece) === "knight")
							return (
								<img src={whitePieceImages.knight} alt={"knight"}/>
							);
						else if (pieceName(piece) === "queen")
							return (
								<img src={whitePieceImages.queen} alt={"queen"}/>
							);
						else if (pieceName(piece) === "king")
							return (
								<img src={whitePieceImages.king} alt={"king"}/>
							);
					})}

				<h2>Captured Black Pieces: {this.props.blackPieces.length}</h2><br/>

					{this.props.blackPieces.map((piece) => {
						if (pieceName(piece) === "pawn")
							return (
								<img src={blackPieceImages.pawn} alt={"pawn"}/>
							);
						else if (pieceName(piece) === "rook")
							return (
								<img src={blackPieceImages.rook} alt={"rook"}/>
							);
						else if (pieceName(piece) === "bishop")
							return (
								<img src={blackPieceImages.bishop} alt={"bishop"}/>
							);
						else if (pieceName(piece) === "knight")
							return (
								<img src={blackPieceImages.knight} alt={"knight"}/>
							);
						else if (pieceName(piece) === "queen")
							return (
								<img src={blackPieceImages.queen} alt={"queen"}/>
							);
						else if (pieceName(piece) === "king")
							return (
								<img src={blackPieceImages.king} alt={"king"}/>
							);
					})}

			</div>
		);
	}
}