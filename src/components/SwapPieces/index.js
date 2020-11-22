import React from 'react';
import ChessPiece from '../ChessPiece';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader, ListGroup, ListGroupItem } from 'reactstrap';

const SwapPieces = props => {
	const renderPieceGraphics = () => {
		const { swapList } = props;
		return swapList.map(({type, black}) => (
			<ListGroupItem tag="button"
				aria-label={type}
				data-testid="swap-button"
				type="button"
				action color="primary" key={type}
				onClick={e => {props.performSwap(type)}}
				className="d-inline-flex w-auto h-auto mx-1">
				<ChessPiece type={type} black={black} />
			</ListGroupItem>
		));
	}
	return (
		<div>
			<Modal isOpen={props.open} data-testid="swap-pieces">
				<ModalHeader>Promote Your Pawn</ModalHeader>
				<ModalBody>
					<p>Click the piece you wish to promote your pawn to</p>
					<ListGroup tag='div' horizontal>
						{renderPieceGraphics()}
					</ListGroup>
				</ModalBody>
			</Modal>
		</div>
	);
};

SwapPieces.propTypes = {
	open: PropTypes.bool,
	performSwap: PropTypes.func,
	swapList: PropTypes.arrayOf(PropTypes.shape({
		type: PropTypes.string,
		black: PropTypes.bool
	}))
};

export default SwapPieces;
