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
			value: "A1 B2"
		}
	});
	expect(getByTestId("move").value).toBe('A1 B2');
});

test('Validates that move is in correct form', () => {
	let component = renderer.create(<MoveInput/>).getInstance();
	component.state.move = "A1 B2";
	component.validate();
	expect(component.state.move).toBe("A1 B2");
	expect(component.state.from).toBe("A1");
	expect(component.state.to).toBe("B2");
	expect(component.state.moveError).toBe("");
	component.state.from = "";
	component.state.to = "";
});

test('Validates you can enter a correct move in lowercase as well', () => {
	let component = renderer.create(<MoveInput/>).getInstance();
	component.state.move = "a1 b2";
	component.validate();
	expect(component.state.move).toBe("a1 b2");
	expect(component.state.from).toBe("a1");
	expect(component.state.to).toBe("b2");
	expect(component.state.moveError).toBe("");
	component.state.from = "";
	component.state.to = "";
});

test('Validates that move is in incorrect form', () => {
	let component = renderer.create(<MoveInput/>).getInstance();
	component.state.move = "1A 2B";
	component.validate();
	expect(component.state.move).toBe("1A 2B");
	expect(component.state.from).toBe("");
	expect(component.state.to).toBe("");
	expect(component.state.moveError).toBe("Invalid Move");
});

test('Validates that move is out of range', () => {
	let component = renderer.create(<MoveInput/>).getInstance();
	component.state.move = "J9 Z0";
	component.validate();
	expect(component.state.move).toBe("J9 Z0");
	expect(component.state.from).toBe("");
	expect(component.state.to).toBe("");
	expect(component.state.moveError).toBe("Invalid Move");
});

test('Validates that move has 2 positions', () => {
	let component = renderer.create(<MoveInput/>).getInstance();
	component.state.move = "A1 B2 C3";
	component.validate();
	expect(component.state.move).toBe("A1 B2 C3");
	expect(component.state.from).toBe("");
	expect(component.state.to).toBe("");
	expect(component.state.moveError).toBe("Invalid Move");
});

test('Validates that move doesnt have 1 position', () => {
	let component = renderer.create(<MoveInput/>).getInstance();
	component.state.move = "A1";
	component.validate();
	expect(component.state.move).toBe("A1");
	expect(component.state.from).toBe("");
	expect(component.state.to).toBe("");
	expect(component.state.moveError).toBe("Invalid Move");
});

test('Validates that moves dont have more than 2 characters', () => {
	let component = renderer.create(<MoveInput/>).getInstance();
	component.state.move = "A12 B23";
	component.validate();
	expect(component.state.move).toBe("A12 B23");
	expect(component.state.from).toBe("");
	expect(component.state.to).toBe("");
	expect(component.state.moveError).toBe("Invalid Move");
});

test('Validates that moves dont have less than 2 characters', () => {
	let component = renderer.create(<MoveInput/>).getInstance();
	component.state.move = "A B";
	component.validate();
	expect(component.state.move).toBe("A B");
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




