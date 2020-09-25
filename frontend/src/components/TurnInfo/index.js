import React from 'react';
import PropTypes from 'prop-types';

import './TurnInfo.css';

/**
 *
 * A UI component that displays basic information about the current turn
 *
 * @param {{turn: number; player: 'black'|'white'}} props
 */
const TurnInfo = ({ turn, player }) => {
	return (
		<div data-testid="turn-info" className="turn-info">
			<div data-testid="turn-count" className="turn-count">Turn {turn + 1}</div>
			<div data-testid="player-indicator" className="player-indicator">{`${player}'s turn`}</div>
		</div>
	)
}

TurnInfo.propTypes = {
	turn: PropTypes.number.isRequired,
	player: PropTypes.oneOf(['black', 'white']).isRequired
};

export default TurnInfo;
