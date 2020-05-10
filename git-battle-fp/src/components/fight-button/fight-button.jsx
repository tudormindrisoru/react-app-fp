import React from 'react';
import './fight-button.scss';

class FightButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      battle: this.props.battle,
      battleFought: false
    }
  }

  render() {
    if(this.state.battleFought) {
      return(
        <div className="button-container" >
          <button className="battle-fought">
            <span>BATTLE FOUGHT</span>
          </button>
        </div>
      );
    } else if(this.props.type === 'active') {
      return(
        <div className="button-container" >
          <button 
            className="fight-button"
            onClick = { () => this.props.fight() }
          >
          <div 
            id = "fight-icon" 
          />
          <span>FIGHT</span>
          </button>
        </div>
      );
    }
    else {
      return (<div></div>);
    }

  }
}

export default FightButton;