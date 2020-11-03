import './SwapPieces.css';
import React from 'react';
import ChessPiece from '../ChessPiece';

export default class SwapPieces extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="swap-container" data-testid="swap-container">
				<h2>Promote Your Pawn</h2><br/>
				<p>Click the piece you wish to promote your pawn to</p>
				<ul>
					{this.props.swapList.map((data, index) => (
						<li data-testid="swap-graphic" key={index} className="swap-graphic">
							<a href={this.props.performSwap(data.type)}>
								<ChessPiece type={data.type} black={data.black}/>
							</a>
						</li>
					))}
				</ul>
			</div>
		);
	}
}