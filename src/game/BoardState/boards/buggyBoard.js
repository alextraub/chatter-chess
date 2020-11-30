import { boardPositionToTuple } from '../../utils/positionUtils';

const buggyBoard = [
	{
		type: 'rook',
		player: 0,
		position: boardPositionToTuple('H1')
	},
	{
		type: 'bishop',
		player: 0,
		position: boardPositionToTuple('f1')
	},
	{
		type: 'king',
		player: 0,
		position: boardPositionToTuple('d1')
	},
	{
		type: 'bishop',
		player: 0,
		position: boardPositionToTuple('c1')
	},
	{
		type: 'rook',
		player: 0,
		position: boardPositionToTuple('a1')
	},
	{
		type: 'pawn',
		player: 0,
		position: boardPositionToTuple('a2')
	},
	{
		type: 'pawn',
		player: 0,
		position: boardPositionToTuple('b2')
	},
	{
		type: 'pawn',
		player: 0,
		position: boardPositionToTuple('c2')
	},
	{
		type: 'pawn',
		player: 0,
		position: boardPositionToTuple('e2')
	},
	{
		type: 'queen',
		player: 0,
		position: boardPositionToTuple('f7')
	},
	{
		type: 'pawn',
		player: 0,
		position: boardPositionToTuple('g2')
	},
	{
		type: 'pawn',
		player: 0,
		position: boardPositionToTuple('h2')
	},
	{
		type: 'knight',
		player: 0,
		position: boardPositionToTuple('g5')
	},
	{
		type: 'pawn',
		player: 1,
		position: boardPositionToTuple('e6')
	},
	{
		type: 'pawn',
		player: 1,
		position: boardPositionToTuple('d6')
	},
	{
		type: 'knight',
		player: 0,
		position: boardPositionToTuple('c7')
	},
	{
		type: 'pawn',
		player: 1,
		position: boardPositionToTuple('a7')
	},
	{
		type: 'pawn',
		player: 1,
		position: boardPositionToTuple('b7')
	},
	{
		type: 'pawn',
		player: 1,
		position: boardPositionToTuple('g7')
	},
	{
		type: 'pawn',
		player: 1,
		position: boardPositionToTuple('h7')
	},
	{
		type: 'rook',
		player: 1,
		position: boardPositionToTuple('h8')
	},
	{
		type: 'rook',
		player: 1,
		position: boardPositionToTuple('a8')
	},
	{
		type: 'knight',
		player: 1,
		position: boardPositionToTuple('b8')
	},
	{
		type: 'bishop',
		player: 1,
		position: boardPositionToTuple('c8')
	},
	{
		type: 'queen',
		player: 1,
		position: boardPositionToTuple('d8')
	},
	{
		type: 'king',
		player: 1,
		position: boardPositionToTuple('d7')
	},
	{
		type: 'bishop',
		player: 1,
		position: boardPositionToTuple('f8')
	}
];

export default buggyBoard;
