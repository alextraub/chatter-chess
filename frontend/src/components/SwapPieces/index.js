import './SwapPieces.css';
import React from 'react';
import ChessPiece from '../ChessPiece';
import PropTypes from 'prop-types';

const SwapPieces = props => {
	SwapPieces.propTypes = {
		performSwap: PropTypes.func,
		swapList: PropTypes.arrayOf(PropTypes.shape({
			type: PropTypes.string,
			black: PropTypes.bool
		}))
	};
	return (
		<div className="swap-container" data-testid="swapPieces">
			<h2>Promote Your Pawn</h2><br/>
			<p>Click the piece you wish to promote your pawn to</p>
			<ul>
				{props.swapList.map(({type, black}) => (
					<li data-testid="swapPiece" key={type} className="swap-graphic">
						<a href='#' onClick={props.performSwap(type)}>
							<ChessPiece type={type} black={black}/>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SwapPieces;