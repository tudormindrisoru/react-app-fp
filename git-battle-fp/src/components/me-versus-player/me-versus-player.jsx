import React from 'react';
import { useDispatch } from 'react-redux';
import { selectFirstPlayer, selectSecondPlayer, removeFirstPlayer, removeSecondPlayer } from '../../actions/battle';

import './me-versus-player.scss';

import PlayerCard from '../player-card/player-card';
import LoggedUserCard from '../logged-user-card/logged-user-card';
// mocked imports
import versus from '../../assets/versus-v2.png';

function MeVersusPlayer() {

  // const battle = useSelector( state => state.battle);
  const dispatch = useDispatch();


  // const [firstPlayer,setFirstPlayer] = useState(battle.firstPlayer);
  // const [secondPlayer,setSecondPlayer] = useState(battle.secondPlayer);


  const getSecondPlayer = (player) => {
    // setSecondPlayer(player);
    dispatch(selectSecondPlayer(player));
  }


  const clearSecondPlayer = () => {
    dispatch(removeSecondPlayer());
    // setSecondPlayer(null);
  }
    return (
      <div className="card-section">
          {/* <PlayerCard 
            getPlayer = {(player) => getFirstPlayer(player)} 
            clearPlayer = {() => clearFirstPlayer()}
          /> */}
          <LoggedUserCard/>
          <img src={versus} alt="" className="versus-image"/>
          <PlayerCard 
            getPlayer = {(player) => getSecondPlayer(player)}
            clearPlayer = {() => clearSecondPlayer()}
          />
      </div>
    );
}

export default MeVersusPlayer;