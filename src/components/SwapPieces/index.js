import './SwapPieces.css';
import React from 'react';
import ChessPiece from '../ChessPiece';
import PropTypes from 'prop-types';

const SwapPieces = props => {
	const renderPieceGraphics = () => {
		const { swapList } = props;
		return swapList.map(({type, black}) => (
			<li key={type} className="swap-graphic">
				<a href='#' data-testid="swap-graphic" onClick={e => {props.performSwap(type)}}>
					<ChessPiece type={type} black={black} />
				</a>
			</li>
		));
	}
	return (
		<div className="swap-container" data-testid="swap-pieces">
			<h2>Promote Your Pawn</h2><br />
			<p>Click the piece you wish to promote your pawn to</p>
			<ul>
				{renderPieceGraphics()}
			</ul>
		</div>
	);
};

SwapPieces.propTypes = {
	performSwap: PropTypes.func,
	swapList: PropTypes.arrayOf(PropTypes.shape({
		type: PropTypes.string,
		black: PropTypes.bool
	}))
};

export default SwapPieces;
