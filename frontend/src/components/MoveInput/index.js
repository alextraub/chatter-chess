import React from 'react';

const initialState = {
	move: '',
	moveError: '',
	from: '',
	to: ''
};

export default class MoveInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	validate = () => {
		let moveError='';
		if (!this.state.move) {
			moveError = 'Invalid Move';
		}
		const command = this.state.move.split(" ");
		let from = command[0];
		let to = command[1];
		if (!from.charAt(0).match(/[1-8]/)) {
			moveError = 'Invalid Move';
		}
		if (!from.charAt(1).match(/[A-H]/gi)) {
			moveError = 'Invalid Move';
		}
		if (!to.charAt(0).match(/[1-8]/)) {
			moveError = 'Invalid Move';
		}
		if (!to.charAt(1).match(/[A-H]/gi)) {
			moveError = 'Invalid Move';
		}
		if (moveError) {
			this.setState({moveError});
			return false;
		}
		this.setState({from, to});
		return true;
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const isValid = this.validate();
		if (isValid) {
			console.log(this.state);
			const data = this.state; // final data to be sent to backend service (not important right now)
			this.setState(initialState); // clear form
		}
	};

	handleInputChange = (event) => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	render() {
		const {move} = this.state;
		return (
			<div>
				<h1>Enter your move below</h1>
				<h2>Please enter your move in the form of RowColumn RowColumn!</h2>
				<h3>For example, if you want to move a knight from 1G to 3H, you would enter this in as "1G 3H".</h3>
				<p>Current move is: {move}</p>
				<form onSubmit={this.handleSubmit}>
					<p><input type="text" placeholder="Enter Move Here" name="move" onChange={this.handleInputChange}/></p>
					<div>{this.state.moveError}</div>
					<p><button>Submit Move</button></p>
				</form>
			</div>
		);
	}
}
