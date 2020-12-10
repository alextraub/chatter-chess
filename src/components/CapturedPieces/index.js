import './CapturedPieces.css';
import React from 'react';
import PropTypes from 'prop-types';
import Piece, { Pawn, Rook, Knight, Bishop, Queen, King } from '../../game/Piece';
import ChessPiece from '../ChessPiece';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

export default class CapturedPieces extends React.Component {
	static propTypes = {
		pieces: PropTypes.shape({
			pawn: PropTypes.arrayOf(PropTypes.object),
			rook: PropTypes.arrayOf(PropTypes.object),
			knight: PropTypes.arrayOf(PropTypes.object),
			bishop: PropTypes.arrayOf(PropTypes.object),
			queen: PropTypes.arrayOf(PropTypes.object),
			king: PropTypes.arrayOf(PropTypes.object),
			generic: PropTypes.arrayOf(PropTypes.object)
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
