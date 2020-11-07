import './CapturedPieces.css';
import React from 'react';
import PropTypes from 'prop-types';
import Piece, { Pawn, Rook, Knight, Bishop, Queen, King } from '../../game/Piece';
import ChessPiece from '../ChessPiece';

export default class CapturedPieces extends React.Component {
	static propTypes = {
		pieces: PropTypes.shape({
			count: PropTypes.number,
			pieces: PropTypes.shape({
				pawn: PropTypes.arrayOf(PropTypes.instanceOf(Pawn)),
				rook: PropTypes.arrayOf(PropTypes.instanceOf(Rook)),
				knight: PropTypes.arrayOf(PropTypes.instanceOf(Knight)),
				bishop: PropTypes.arrayOf(PropTypes.instanceOf(Bishop)),
				queen: PropTypes.arrayOf(PropTypes.instanceOf(Queen)),
				king: PropTypes.arrayOf(PropTypes.instanceOf(King)),
				generic: PropTypes.arrayOf(PropTypes.instanceOf(Piece))
			})
		}).isRequired,
		black: PropTypes.bool
	}

	static defaultProps = {
		black: false
	}

	render() {
		const { black, pieces } = this.props;

		return (
			<div className="captured-container" data-testid="capturedContainer">
				{/* <h2 data-testid={`${black ? 'black' : 'white'}-captured-total`}>Captured ({pieces.count})</h2><br /> */}
				<ul>
					{Object.entries(pieces.pieces)
						.filter(entry => entry[1].length > 0)
						.map(([type, pieceArray]) => (
							<li data-testid="captured-graphic" key={`${type}s`} className="captured-graphic">
								<ChessPiece type={type} black={black} />
								<span className="captured-count">x{pieceArray.length}</span>
							</li>
						))}
				</ul>
			</div>
		);
	}
}
