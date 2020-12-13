const standardGamePieces = [
	...['ROOK', 'KNIGHT', 'BISHOP', 'QUEEN', 'KING', 'BISHOP', 'KNIGHT', 'ROOK'].map((t, c) => ({
		type: t,
		player: 'BLACK',
		position: { row: 0, col: c },
		captured: false
	})),
	...[0,1,2,3,4,5,6,7].map(c => ({
		type: 'PAWN',
		player: 'BLACK',
		position: { row: 1, col: c },
		captured: false
	})),
	...[0,1,2,3,4,5,6,7].map(c => ({
		type: 'PAWN',
		player: 'WHITE',
		position: { row: 6, col: c },
		captured: false
	})),
	...['ROOK', 'KNIGHT', 'BISHOP', 'QUEEN', 'KING', 'BISHOP', 'KNIGHT', 'ROOK'].map((t, c) => ({
		type: t,
		player: 'WHITE',
		position: { row: 7, col: c },
		captured: false
	}))
];

const startingCheckStatus = {
	WHITE: {
		status: false,
		mate: false
	},
	BLACK: {
		status: false,
		mate: false
	}
}

const standardGame = {
	turn: 0,
	check: { ...startingCheckStatus },
	pieces: [...standardGamePieces],
	swapping: null,
	swapList: []
}

export {
	standardGamePieces,
	standardGame,
	startingCheckStatus
};
