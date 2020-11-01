import './SwapPieces.css';
import React from 'react';
import PropTypes from 'prop-types';
import Piece, { Pawn, Rook, Knight, Bishop, Queen, King } from '../../game/Piece';
import ChessPiece from '../ChessPiece';

export default class SwapPieces extends React.Component {
	static propTypes = {
		// pieces: PropTypes.shape({
		// 	count: PropTypes.number,
		// 	pieces: PropTypes.shape({
		// 		pawn: PropTypes.arrayOf(PropTypes.instanceOf(Pawn)),
		// 		rook: PropTypes.arrayOf(PropTypes.instanceOf(Rook)),
		// 		knight: PropTypes.arrayOf(PropTypes.instanceOf(Knight)),
		// 		bishop: PropTypes.arrayOf(PropTypes.instanceOf(Bishop)),
		// 		queen: PropTypes.arrayOf(PropTypes.instanceOf(Queen)),
		// 		king: PropTypes.arrayOf(PropTypes.instanceOf(King)),
		// 		generic: PropTypes.arrayOf(PropTypes.instanceOf(Piece))
		// 	})
		// }).isRequired,
		black: PropTypes.bool
	};

	static defaultProps = {
		black: false
	};

	render() {
		const { black } = this.props;

		return (
			<div className="swap-container" data-testid="swap-container">
				<h2>Would you like to promote your pawn?</h2><br/>
				<ul>
					<li data-testid="swap-bishop" className="swap-graphic">
						<ChessPiece type='bishop' black={black}/>
						<input type='submit' value='Promote to Bishop'/>
					</li>
					<li data-testid="swap-knight" className="swap-graphic">
						<ChessPiece type='knight' black={black}/>
						<input type='submit' value='Promote to Knight'/>
					</li>
					<li data-testid="swap-rook" className="swap-graphic">
						<ChessPiece type='rook' black={black}/>
						<input type='submit' value='Promote to Rook'/>
					</li>
					<li data-testid="swap-queen" className="swap-graphic">
						<ChessPiece type='queen' black={black}/>
						<input type='submit' value='Promote to Queen'/>
					</li>
					{/*{Object.entries(pieces.pieces)*/}
					{/*	.filter(entry => entry[1].length > 0)*/}
					{/*	.map(([type, pieceArray]) => (*/}
					{/*		<li data-testid="swap-graphic" key={`${type}s`} className="swap-graphic">*/}
					{/*			<ChessPiece type={type} black={black}/>*/}
					{/*			<span className="swap-count">x{pieceArray.length}</span>*/}
					{/*			<input type='submit' value='Swap Piece'/>*/}
					{/*		</li>*/}
					{/*	))}*/}
				</ul>
			</div>
		);
	}
}