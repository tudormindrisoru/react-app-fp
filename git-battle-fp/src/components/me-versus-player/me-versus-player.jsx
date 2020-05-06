import React from 'react';

import './me-versus-player.scss';

import PlayerCard from '../player-card/player-card';

// mocked imports
import versus from '../../assets/versus-v2.png';

class PlayerVersusPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: null,
      player2: null
    }
  }
  render() {
    return (
      <div className="card-section">
          <PlayerCard></PlayerCard>
          <img src={versus} alt="" className="versus-image"/>
          <PlayerCard></PlayerCard>
      </div>
    );
  }
}

export default PlayerVersusPlayer