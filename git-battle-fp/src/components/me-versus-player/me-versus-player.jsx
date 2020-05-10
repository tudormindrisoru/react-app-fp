import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSecondPlayer, removeSecondPlayer } from '../../actions/battle';

import './me-versus-player.scss';

import PlayerCard from '../player-card/player-card';
import LoggedUserCard from '../logged-user-card/logged-user-card';
// mocked imports
import versus from '../../assets/versus-v2.png';

function MeVersusPlayer() {

  const selectUser = useSelector(state => state.user);

  const dispatch = useDispatch();


  const getSecondPlayer = (player) => {

    dispatch(selectSecondPlayer(player));
  }

  const clearSecondPlayer = () => {
    dispatch(removeSecondPlayer());
  }
    return (
      <div className="card-section">
          <LoggedUserCard user = {selectUser}/>
          <img src={versus} alt="" className="versus-image"/>
          <PlayerCard 
            getPlayer = {(player) => getSecondPlayer(player)}
            clearPlayer = {() => clearSecondPlayer()}
          />
      </div>
    );
}

export default MeVersusPlayer;