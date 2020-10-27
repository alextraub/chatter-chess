import './MoveInput.css';
import React from 'react';

export const convertPosition = pos => {
	let pos1 = pos.charCodeAt(0) - 'A'.charCodeAt(0);
	let pos2 = pos.charAt(1);
	try {
		pos2 = parseInt(pos2) - 1;
	} catch (error){
		return -1;
	}
	if ((pos1 < 0 || pos1 > 7) || (pos2 < 0 || pos2 > 7)) {
		return -1;
	}
	return [pos1, pos2];
};

export default class MoveInput extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			move: '',
			moveError: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.validate = this.validate.bind(this);
	}

	validate(from, to) {
		if (from.length !== 2) {
			return false;
		}
		if (to.length !== 2) {
			return false;
		}
		const fromPos = convertPosition(from);
		const toPos = convertPosition(to);
		if (fromPos === -1 || toPos === -1) {
			return false;
		}
		const piece = this.props.getPiece(fromPos);
		if (!piece || piece.player !== this.props.currentPlayer) {
			return false;
		}
		return piece.canMove(fromPos, toPos);
	}

	handleSubmit(event) {
		event.preventDefault();
		const {move} = this.state;
		const command = move.trim().split(" ");
		if (command.length !== 2 || !(this.validate(command[0], command[1]))) {
			this.setState({
				...this.state,
				moveError: "Invalid Move"
			});
			return;
		}
		this.props.onMoveSuccess(convertPosition(command[0]), convertPosition(command[1]));
		this.setState({
			...this.state,
			move: '',
			moveError: ''
		}); // clear form
	}

	handleInputChange(event) {
		event.preventDefault();
		this.setState({
			...this.state,
			move: event.target.value
		});
	}

	render() {
		return (
			<div id='inputContainer'>
				<h1>Enter your move below</h1><br/>
				<h2>Please enter your move in the form of &quot;RowColumn RowColumn&quot;!</h2><br/>
				<h3>For example, if you want to move a knight from G1 to H3, you would enter this in as &quot;G1 H3&quot;.</h3><br/>
				<p>
					{this.props.currentPlayer ? (
						'It is blacks turn'
					) : (
						'It is whites turn'
					)}
				</p>
				<form onSubmit={event => {this.handleSubmit(event)}}>
					<input data-testid="move" type="text" placeholder="Enter Move Here" name="move" value={this.state.move} onChange={event => {this.handleInputChange(event)}}/>
					<div style={{color: "red"}}>{this.state.moveError}</div>
					<input type='submit' value='Submit Move'/>
				</form>
			</div>
		);
	}
}
