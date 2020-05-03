import React from 'react';

import './player-versus-player.scss';

import PlayerCard from '../player-card/player-card';

// mocked imports
import versus from '../../assets/versus-v2.png';
import Player1Image from '../../assets/mocked-player1.jpg';
import Player2Image from '../../assets/mocked-player2.png';

class PlayerVersusPlayer extends React.Component {

  render() {
    return (
      <div className="card-section">
          <PlayerCard image={Player1Image}></PlayerCard>
          <img src={versus} alt="" className="versus-image"/>
          <PlayerCard image={Player2Image}></PlayerCard>
      </div>
    );
  }
}

export default PlayerVersusPlayer