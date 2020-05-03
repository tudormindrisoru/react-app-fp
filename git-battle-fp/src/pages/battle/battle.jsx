import React from 'react';

import './battle.scss';

import BattleSwitcher from '../../components/battle-switcher/battle-switcher';
import PlayerVersusPlayer from '../../components/player-versus-player/player-versus-player';
import FightButton from '../../components/fight-button/fight-button';

class BattlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      battleType: 'player-vs-player'
    };

    this.switchBattleType = this.switchBattleType.bind(this);
  }

  switchBattleType = (type) => {
    this.setState({
      battleType: type
    });
  }

  mapData = () => {
    if(this.state.battleType === 'player-vs-player') {
      return (<PlayerVersusPlayer ></PlayerVersusPlayer>);
    } else if(this.state.battleType === 'me-vs-player') {
        return (<h1>My battles component!</h1>);
    }

  }
  render() {
    return (
      <div className="battle-page">
        <BattleSwitcher switchBattleType={this.switchBattleType}></BattleSwitcher>
          {this.mapData()}
        <FightButton></FightButton>
      </div>
    );
  }
}

export default BattlePage;