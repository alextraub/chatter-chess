import React from 'react';
import PropTypes from 'prop-types';
import Piece, { pieceName } from '../../game/Piece';
import ChessPiece from '../ChessPiece';

export default class CapturedPieces extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	pieceCounts: {'rook': 0}
		// };
	}

	static propTypes = {
		whitePieces: PropTypes.arrayOf(PropTypes.instanceOf(Piece)),
		blackPieces: PropTypes.arrayOf(PropTypes.instanceOf(Piece))
	}

	// renderPieces(black) {
	// 	return this.state.pieceCounts.entries().map([key, value] => (
	// 		<div key={key}>
	// 			<ChessPiece type={key} black={black}/>
	// 			{value}
	// 		</div>
	// 	));
	// }

	render() {
		return (
			<div id='capturedContainer'>
				{/* <h1>Shadow Realm</h1><br/> */}
				<div>
					<h2>Captured White Pieces: {this.props.whitePieces.length}</h2><br/>
					{this.props.whitePieces.map((piece, index) => {
						return <ChessPiece type={pieceName(piece)} key={index}/>
					})}
				</div>

				<div>
					<h2>Captured Black Pieces: {this.props.blackPieces.length}</h2><br/>
					{this.props.blackPieces.map((piece, index) => {
						return <ChessPiece black type={pieceName(piece)} key={index}/>
					})}
				</div>
			</div>
		);
	}
}
