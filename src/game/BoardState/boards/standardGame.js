
const board = [
	...['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'].map((t, c) => ({
		type: t,
		player: 1,
		position: [0, c]
	})),
	...[0,1,2,3,4,5,6,7].map(c => ({
		type: 'pawn',
		player: 1,
		position: [1, c]
	})),
	...[0,1,2,3,4,5,6,7].map(c => ({
		type: 'pawn',
		player: 0,
		position: [6, c]
	})),
	...['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'].map((t, c) => ({
		type: t,
		player: 0,
		position: [7, c]
	}))
]

export default board;
