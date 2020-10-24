import React from 'react';
import { render, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MoveInput from "./";

afterEach(cleanup);

test('Component renders', () => {
	render(<MoveInput />);
});

test('User can enter a move', () => {
	const { getByTestId } = render(<MoveInput/>);
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "A1 B2"
		}
	});
	expect(getByTestId("move").value).toBe('A1 B2');
});

test('Validates that move is in correct form', () => {
	const { getByTestId, getByText } = render(
		<MoveInput/>
	);
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "A1 B2"
		}
	});
	expect(getByTestId('move').value).toBe('A1 B2');
	fireEvent.click(getByTestId('button'));
	expect(getByText('Invalid Move')).toBeFalsy();
});

test('Validates you can enter a correct move in lowercase as well', () => {
	const { getByTestId, getByText } = render(
		<MoveInput/>
	);
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "a1 b2"
		}
	});
	expect(getByTestId('move').value).toBe('a1 b2');
	fireEvent.click(getByTestId('button'));
	expect(getByText('Invalid Move')).toBeFalsy();
});

test('Validates that move is in incorrect form', () => {
	const { getByTestId, getByText } = render(
		<MoveInput/>
	);
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "1A 2B"
		}
	});
	expect(getByTestId('move').value).toBe('1A 2B');
	fireEvent.click(getByTestId('button'));
	expect(getByText('Invalid Move')).toBeTruthy();
});

test('Validates that move is out of range', () => {
	const { getByTestId, getByText } = render(
		<MoveInput/>
	);
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "J9 Z7"
		}
	});
	expect(getByTestId('move').value).toBe('J9 Z7');
	fireEvent.click(getByTestId('button'));
	expect(getByText('Invalid Move')).toBeTruthy();
});

test('Validates that move cannot have 3 positions', () => {
	const { getByTestId, getByText } = render(
		<MoveInput/>
	);
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "A1 B2 C3"
		}
	});
	expect(getByTestId('move').value).toBe('A1 B2 C3');
	fireEvent.click(getByTestId('button'));
	expect(getByText('Invalid Move')).toBeTruthy();
});

test('Validates that move cannot have 1 position', () => {
	const { getByTestId, getByText } = render(
		<MoveInput/>
	);
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "A1"
		}
	});
	expect(getByTestId('move').value).toBe('A1');
	fireEvent.click(getByTestId('button'));
	expect(getByText('Invalid Move')).toBeTruthy();
});

test('Validates that moves dont have more than 2 characters', () => {
	const { getByTestId, getByText } = render(
		<MoveInput/>
	);
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "A12 B23"
		}
	});
	expect(getByTestId('move').value).toBe('A12 B23');
	fireEvent.click(getByTestId('button'));
	expect(getByText('Invalid Move')).toBeTruthy();
});

test('Validates that moves dont have less than 2 characters', () => {
	const { getByTestId, getByText } = render(
		<MoveInput/>
	);
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "A B"
		}
	});
	expect(getByTestId('move').value).toBe('A B');
	fireEvent.click(getByTestId('button'));
	expect(getByText('Invalid Move')).toBeTruthy();
});

test('Validates that move has been entered', () => {
	const { getByTestId, getByText } = render(
		<MoveInput/>
	);
	fireEvent.change(getByTestId("move"), {
		target: {
			value: ""
		}
	});
	expect(getByTestId('move').value).toBe('');
	fireEvent.click(getByTestId('button'));
	expect(getByText('Invalid Move')).toBeTruthy();
});




