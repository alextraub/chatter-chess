import './CapturedPieces.css';
import React from 'react';
import PropTypes from 'prop-types';
import ChessPiece from '../ChessPiece';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class CapturedPieces extends React.Component {
	static propTypes = {
		pieces: PropTypes.shape({
			PAWN: PropTypes.arrayOf(PropTypes.object),
			ROOK: PropTypes.arrayOf(PropTypes.object),
			KNIGHT: PropTypes.arrayOf(PropTypes.object),
			BISHOP: PropTypes.arrayOf(PropTypes.object),
			QUEEN: PropTypes.arrayOf(PropTypes.object),
			KING: PropTypes.arrayOf(PropTypes.object),
			GENERIC: PropTypes.arrayOf(PropTypes.object)
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
