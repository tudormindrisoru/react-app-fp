import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { removePlayers, selectFirstPlayer } from '../../actions/battle'; 
import './battle.scss';

import BattleSwitcher from '../../components/battle-switcher/battle-switcher';
import PlayerVersusPlayer from '../../components/player-versus-player/player-versus-player';
import MeVersusPlayer from '../../components/me-versus-player/me-versus-player';
import FightButton from '../../components/fight-button/fight-button';


function BattlePage(props) {
  const [battleType, setBattleType] = useState('player-vs-player');
  const [battleFought,setBattleFoght] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const battle = useSelector(state => state.battle);

  const switchBattleType = (type) => {
    dispatch(removePlayers());
    if(type === "me-vs-player") {
      dispatch(selectFirstPlayer(user.gitData));
    }
    setBattleType(type);
  }

  function mapCards() {
    switch(battleType) {
      case "player-vs-player":
        return (<PlayerVersusPlayer/>);
      case "me-vs-player": 
        return (<MeVersusPlayer/>);
      default: 
        break;
    }
  }

  function displayFightButton() {
    switch(battleType) { 
      case "player-vs-player":
        return(
          <FightButton 
            type={(battle.firstPlayer !=null && battle.secondPlayer !=null) ? 'active' : 'inactive'}
            fight = { () => fight() }
            battleFought = {battleFought}
          />
        );
      case "me-vs-player":
        return (
          <FightButton 
          type={(user.gitData.username !=null && battle.secondPlayer !=null) ? 'active' : 'inactive'}
          fight = { () => fight() }
          battleFought = {battleFought}
          />
        );
      default: 
          break;
    }
  }
  const getUserSubscription = async (username,url) => {
    const token = localStorage.getItem('access_token');
    const header = token !== null ? { 'Authorization': `token ${token}`} : {};
    return await axios.get(`${url}/${username}/subscriptions`, {
      headers: header
    })
    .then( response => {
      console.log(response.data);
      return response.data})
    .catch( error => console.log(error));
  }

  const fight = async () => {
    setBattleFoght(true);
    console.log('click');
    if(battle.firstPlayer.username !== battle.secondPlayer.username) {
      const usersApiUrl = `https://api.github.com/users`;
      const firstPlayerSubscription = await getUserSubscription(battle.firstPlayer.username, usersApiUrl);
      const secondPlayerSubscription = await getUserSubscription(battle.secondPlayer.username, usersApiUrl);
      const firstPlayerBattleInfo = {
        playerData: battle.firstPlayer,
        score: calculateScore(firstPlayerSubscription,battle.firstPlayer)
      }
      const secondPlayerBattleInfo = {
        playerData: battle.secondPlayer,
        score: calculateScore(secondPlayerSubscription,battle.secondPlayer)
      }
      if(battleType === "me-vs-player") {
      
        const diamonds = user.userData.diamonds;
        props.addBattleToHistory(firstPlayerBattleInfo, secondPlayerBattleInfo, diamonds);
      }
      
    }
  }

  const calculateScore = (playerSubscription, player) => {
    let repoSizeSum = 0;
    const numberOfRepos = playerSubscription.length;
    playerSubscription.forEach((item) => {
      repoSizeSum += item.size;
    })
    const score = (player.followers * 10) + (player.following * 2) + repoSizeSum + numberOfRepos * 10;
    return score;
  }
    return (
      <div className="battle-page">
        <BattleSwitcher switchBattleType={(type) => switchBattleType(type)}></BattleSwitcher>
          { mapCards() }
          { displayFightButton() }
      </div>
    );
}

export default BattlePage;