import './MoveInput.css';
import React from 'react';
import {boardPositionToTuple, isValidBoardPositionString} from '../../game/utils/boardPosition'

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
		if (!isValidBoardPositionString(from) || !isValidBoardPositionString(to)) {
			return false
		}
		let fromPos;
		let toPos;
		try {
			fromPos = boardPositionToTuple(from);
			toPos = boardPositionToTuple(to);
		} catch (error){
			return false
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
		this.props.onMoveSuccess(boardPositionToTuple(command[0]), boardPositionToTuple(command[1]));
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
					<div data-testid="error" style={{color: "red"}}>{this.state.moveError}</div>
					<input data-testid="button" type='submit' value='Submit Move'/>
				</form>
			</div>
		);
	}
}
