import {API} from "aws-amplify";
import * as queries from "../../graphql/queries";
import {GRAPHQL_AUTH_MODE} from "@aws-amplify/api";

function fetchGame(username) {
	return API.graphql({
		query: queries.getGame,
		variables: {owner: username},
		authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
	});
}

function updateTurn(username) {
	const game = fetchGame(username);
	game.turn++;
}

export default class GameState {

	// const fetchGame = async (username) => {
	// 	return API.graphql({
	// 		query: queries.getGame,
	// 		variables: {owner: username},
	// 		authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
	// 	});
	// };

	// const updateGame = async (game) => {
	// 	await API.graphql({
	// 		query: mutations.updateGame,
	// 		variables: { input: game },
	// 		authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
	// 	});
	// };

  	// updateTurn(username) {
		// const game = fetchGame(username);
		// game.turn++;
  	// }

  	movePiece(username, [from1, from2], [to1, to2]) {
		const game = fetchGame(username);
		const pieces = game.pieces;
		let pieceToMove = null;
		let king = null;
		pieces.map((piece) => {
			if (from1 === piece.position.row && from2 === piece.position.col) {
				pieceToMove = piece;
			// for check and checkmate
			} else if (piece.type === "KING") {
				king = piece;
			}
		});
		pieceToMove.position.row = to1;
		pieceToMove.position.col = to2;
		updateTurn(username);
	}

	capturePiece(username, [from1, from2], [to1, to2]) {
		const game = fetchGame(username);
		const pieces = game.pieces;
		let pieceToCapture = null;
		let pieceToMove = null;
		pieces.map((piece) => {
			if (to1 === piece.position.row && to2 === piece.position.col) {
				pieceToCapture = piece;
			} else if (from1 === piece.position.row && from2 === piece.position.col) {
				pieceToMove = piece;
			}
		});
		if (pieceToCapture !== null) {
			if (pieceToCapture.player !== pieceToMove.player) {
				pieceToCapture.captured = true;
				pieceToCapture.position = null;
			}
		}
		pieceToMove.position.row = to1;
		pieceToMove.position.col = to2;
		updateTurn(username);
	}

	promotePawn(username, promotionPiece, [row, col]) {
		const game = fetchGame(username);
		const pieces = game.pieces;
		let pawnToPromote = null;
		pieces.map((piece) => {
			if (row === piece.position.row && col === piece.position.col) {
				pawnToPromote = piece;
			}
		});
		pawnToPromote.type = promotionPiece;
		updateTurn(username);
	}
}