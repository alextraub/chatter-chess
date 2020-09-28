import Knight from './';
import BoardState, { mockGetPiece } from '../../../__mocks__/boardStateMock';

beforeEach(() => {
	BoardState.mockClear();
	mockGetPiece.mockClear();
})
