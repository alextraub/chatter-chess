/*
	This file contains useful utility functions for checking and converting board position input
*/

/**
 * Determine if an array is a valid board position, in a tuple format.abs
 * Valid format is: [number, number] where both elements are integers in the range 0 to 7, inclusive
 *
 * @param {*} position
 */
export const isValidBoardPositionTuple = position => {
	if(!Array.isArray(position) || position.length !== 2) {
		return false;
	}
	const [col, row] = position;
	if(typeof(row) !== 'number' || typeof(col) !== 'number') {
		return false;
	}

	return Number.isInteger(row) && Number.isInteger(col) &&
		(row >= 0 && row < 8) && (col >= 0 && col < 8);
}

/**
 * Determine if a string represents a valid board position.
 * Valid strings are length 2 starting with a letter between a and h, inclusive (upper or lower case)
 * followed by a digit between 1 and 8, inclusive.
 *
 * @param {string} position
 */
export const isValidBoardPositionString = position => {
	if(typeof(position) !== 'string') {
		return false;
	}
	const positionRE = /^[a-hA-H][1-8]$/;
	return positionRE.test(position);
}

/**
 * Determine if a given position is a valid representation of a board position
 *
 * @param {string|any[]} position
 * @throws {Error} position is undefined
 * @throws {TypeError} position is not a string or an array
 */
export const isValidBoardPosition = position => {
	if(position === undefined)
		throw new Error('isValidBoardPosition expected 1 argument but got 0');
	if(Array.isArray(position))
		return isValidBoardPositionTuple(position);
	if(typeof(position) === 'string')
		return isValidBoardPositionString(position);

	throw new TypeError(`isValidBoardPosition expected an argument of type Array or string but got ${typeof(position)}`);
}

/**
 * Converts a board position from a tuple representation to a string.abs
 * Note: the returned string uses upper case column letters
 *
 * @param {[number, number]} position
 * @throws {TypeError} position is not a valid tuple representation of a board position
 */
export const boardPositionToString = position => {
	if(!Array.isArray(position) || !isValidBoardPositionTuple(position)) {
		throw new TypeError(`boardPositionToString expected a valid board position, [0-7, 0-7], but got ${position}`);
	}

	let [row, col] = position;
	row = 7 - row + 1; // Convert the row

	const colCode = 'A'.charCodeAt(0) + col; // Get the char code for the col
	col = String.fromCharCode(colCode); // convert col

	return `${col}${row}`;
}

/**
 * Given a board position as a string representation, get that position as a tuple representation.
 * Note: Column letter can be upper or lower case
 *
 * @param {string} position
 * @return {[number, number]}
 * @throws {TypeError} position is not a valid string representation of a board position
 */
export const boardPositionToTuple = position => {
	if(!(typeof(position) === 'string') || !isValidBoardPositionString(position)) {
		throw new TypeError(`boardPositionToTuple expected a valid board position string but got ${position}`);
	}

	let [col, row] = position.split('');
	row = 7 - parseInt(row) + 1; // Convert the row
	col = col.toUpperCase(); // Make sure the col is upper case
	col = col.charCodeAt(0) - 'A'.charCodeAt(0); // convert the col

	return [row, col];
}
