
const board = [
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
]

export default board;
