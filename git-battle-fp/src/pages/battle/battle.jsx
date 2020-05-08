import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { removePlayers } from '../../actions/battle'; 
import './battle.scss';

import BattleSwitcher from '../../components/battle-switcher/battle-switcher';
import PlayerVersusPlayer from '../../components/player-versus-player/player-versus-player';
import MeVersusPlayer from '../../components/me-versus-player/me-versus-player';
import FightButton from '../../components/fight-button/fight-button';


function BattlePage() {

  const [battleType, setBattleType] = useState('player-vs-player');
  const dispatch = useDispatch();

  const switchBattleType = (type) => {
    dispatch(removePlayers());
    setBattleType(type);
  }

  function mapData() {
    if(battleType === 'player-vs-player') {
      return (<PlayerVersusPlayer/>);
    } else if(battleType === 'me-vs-player') {
        return (<MeVersusPlayer/>);
      }
  }


  
  const battle = useSelector(state => state.battle)
    return (
      <div className="battle-page">
        <BattleSwitcher switchBattleType={(type) => switchBattleType(type)}></BattleSwitcher>
          {mapData()}
        <FightButton type={(battle.firstPlayer !=null && battle.secondPlayer !=null) ? 'active' : 'inactive'}></FightButton>
      </div>
    );
}

export default BattlePage;