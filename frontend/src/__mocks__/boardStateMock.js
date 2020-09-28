export const mockGetPiece = jest.fn();
const mock = jest.fn().mockImplementation(() => {
	return {
		getPiece: mockGetPiece
	}
});

export default mock;
