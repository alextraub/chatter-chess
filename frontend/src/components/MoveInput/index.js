import React from 'react';

export default class MoveInput extends React.Component {

	initialState = {
		move: '',
		moveError: '',
		from: '',
		to: ''
	};

	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	validate = () => {
		let moveError='';
		if (!this.state.move) {
			moveError = "You need to enter a move";
			this.setState({moveError});
			console.log(this.state);
			return false;
		}
		if (this.state.move.trim().length < 5) {
			moveError = 'Invalid Move';
			this.setState({moveError});
			return false;
		}
		const command = this.state.move.split(" ");
		if (command.length !== 2) {
			moveError = 'Invalid Move';
		}
		let from = command[0];
		if (from.length !== 2) {
			moveError = 'Invalid Move';
		}
		let to = command[1];
		if (to.length !== 2) {
			moveError = 'Invalid Move';
		}
		if (!((from.charAt(0)).match(/[A-H]/gi))) {
			moveError = 'Invalid Move';
		}
		if ((from.charAt(0)).match(/[I-Z]/gi)) {
			moveError = 'Invalid Move';
		}
		if (!((from.charAt(1)).match(/[1-8]/))) {
			moveError = 'Invalid Move';
		}
		if (from.charAt(1).match(/[0]/) || from.charAt(1).match(/[9]/)) {
			moveError = 'Invalid Move';
		}
		if (!((from.charAt(1)).match(/[1-8]/))) {
			moveError = 'Invalid Move';
		}
		if (!((to.charAt(0)).match(/[A-H]/gi))) {
			moveError = 'Invalid Move';
		}
		if ((to.charAt(0)).match(/[I-Z]/gi)) {
			moveError = 'Invalid Move';
		}
		if (!((to.charAt(1)).match(/[1-8]/))) {
			moveError = 'Invalid Move';
		}
		if (to.charAt(1).match(/[0]/) || to.charAt(1).match(/[9]/)) {
			moveError = 'Invalid Move';
		}
		if (moveError) {
			this.setState({moveError});
			console.log(this.state);
			return false;
		}
		this.state.from = from;
		this.state.to = to;
		return true;
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const isValid = this.validate();
		if (isValid) {
			console.log(this.state);
			this.props.onMoveSuccess(this.state.from, this.state.to);
			//const data = this.state; // final data to be sent to backend service (not important right now)
			this.setState(this.initialState); // clear form
			console.log(this.state);
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
			<div id='inputContainer'>
				<h1>Enter your move below</h1><br/>
				<h2>Please enter your move in the form of "RowColumn RowColumn"!</h2><br/>
				<h3>For example, if you want to move a knight from G1 to H3, you would enter this in as "G1 H3".</h3><br/>
				<p>
					{this.props.currentPlayer ? (
						<p>It is blacks turn</p>
					) : (
						<p>It is whites turn</p>
					)}
				</p>
				<p>Current move is: {move}</p>
				<form onSubmit={this.handleSubmit}>
					<p><input data-testid="move" type="text" placeholder="Enter Move Here" name="move" onChange={this.handleInputChange}/></p>
					<div style={{color: "red"}}>{this.state.moveError}</div>
					<p><button>Submit Move</button></p>
				</form>
			</div>
		);
	}
}
