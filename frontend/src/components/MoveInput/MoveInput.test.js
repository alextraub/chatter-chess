import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import MoveInput from "./";

afterEach(cleanup);

test('Component renders', () => {
	render(<MoveInput />);
});

test('User can enter a move', () => {
	const { getByTestId } = render(<MoveInput/>);
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "1A 2B"
		}
	});
	expect(getByTestId("move").value).toBe('1A 2B');
});

test('Validates that move is in correct form', () => {
	let component = renderer.create(<MoveInput/>).getInstance();
	component.state.move = "1A 2B";
	component.validate();
	expect(component.state.move).toBe("1A 2B");
	expect(component.state.from).toBe("1A");
	expect(component.state.to).toBe("2B");
	expect(component.state.moveError).toBe("");
	component.state.from = "";
	component.state.to = "";
});

test('Validates that move is in incorrect form', () => {
	let component = renderer.create(<MoveInput/>).getInstance();
	component.state.move = "A1 B2";
	component.validate();
	expect(component.state.move).toBe("A1 B2");
	expect(component.state.from).toBe("");
	expect(component.state.to).toBe("");
	expect(component.state.moveError).toBe("Invalid Move");
});

test('Validates that move has been entered', () => {
	let component = renderer.create(<MoveInput/>).getInstance();
	component.state.move = "";
	component.validate();
	expect(component.state.move).toBe("");
	expect(component.state.from).toBe("");
	expect(component.state.to).toBe("");
	expect(component.state.moveError).toBe("You need to enter a move");
});




