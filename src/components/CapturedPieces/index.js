import './CapturedPieces.css';
import React from 'react';
import PropTypes from 'prop-types';
import Piece, { Pawn, Rook, Knight, Bishop, Queen, King } from '../../game/Piece';
import ChessPiece from '../ChessPiece';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

export default class CapturedPieces extends React.Component {
	static propTypes = {
		pieces: PropTypes.shape({
			pawn: PropTypes.arrayOf(PropTypes.instanceOf(Pawn)),
			rook: PropTypes.arrayOf(PropTypes.instanceOf(Rook)),
			knight: PropTypes.arrayOf(PropTypes.instanceOf(Knight)),
			bishop: PropTypes.arrayOf(PropTypes.instanceOf(Bishop)),
			queen: PropTypes.arrayOf(PropTypes.instanceOf(Queen)),
			king: PropTypes.arrayOf(PropTypes.instanceOf(King)),
			generic: PropTypes.arrayOf(PropTypes.instanceOf(Piece))
		}).isRequired,
		black: PropTypes.bool,
		className: PropTypes.string
	}

	static defaultProps = {
		black: false,
		className: ''
	}

	render() {
		const { black, pieces } = this.props;
		return (
			<ListGroup data-testid="capturedContainer" className={this.props.className}>
				{Object.entries(pieces)
					.filter(entry => entry[1].length > 0)
					.map(([type, pieceArray]) => (
						<ListGroupItem color="primary" data-testid="captured-graphic" key={`${type}s`}>
							<ChessPiece type={type} black={black} quantity={pieceArray.length > 1 ? pieceArray.length : 0} />
						</ListGroupItem>
					))}
			</ListGroup>
		);
	}
}
