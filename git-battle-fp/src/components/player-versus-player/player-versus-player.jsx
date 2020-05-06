import React from 'react';
import { useDispatch } from 'react-redux';
import { selectFirstPlayer, selectSecondPlayer, removeFirstPlayer, removeSecondPlayer } from '../../actions/battle';

import './player-versus-player.scss';

import PlayerCard from '../player-card/player-card';

// mocked imports
import versus from '../../assets/versus-v2.png';

function PlayerVersusPlayer() {

  // const battle = useSelector( state => state.battle);
  const dispatch = useDispatch();


  // const [firstPlayer,setFirstPlayer] = useState(battle.firstPlayer);
  // const [secondPlayer,setSecondPlayer] = useState(battle.secondPlayer);

  const getFirstPlayer = (player) => {
    // setFirstPlayer(player)
    dispatch(selectFirstPlayer(player));
  }


  const getSecondPlayer = (player) => {
    // setSecondPlayer(player);
    dispatch(selectSecondPlayer(player));
  }

  const clearFirstPlayer = () => {
    dispatch(removeFirstPlayer());
    // setFirstPlayer(null);
  }

  const clearSecondPlayer = () => {
    dispatch(removeSecondPlayer());
    // setSecondPlayer(null);
  }
    return (
      <div className="card-section">
          <PlayerCard 
            getPlayer = {(player) => getFirstPlayer(player)} 
            clearPlayer = {() => clearFirstPlayer()}
          />
          <img src={versus} alt="" className="versus-image"/>
          <PlayerCard 
            getPlayer = {(player) => getSecondPlayer(player)}
            clearPlayer = {() => clearSecondPlayer()}
          />
      </div>
    );
}

export default PlayerVersusPlayer;