import React from 'react';
import './fight-button.scss';

import HoverFightImage from '../../assets/versus-swords-hover.png';
import FightImage from '../../assets/versus-swords.png';

class FightButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      image: FightImage
    }

    this.onHover = this.onHover.bind(this);
    this.onRelease = this.onRelease.bind(this);
  }

  onHover = () => {
    this.setState({
      image: HoverFightImage
    });
  }

  onRelease = () => {
    this.setState({
      image: FightImage
    });
  }

  render() {
    return(
      <div className="button-container">
        <button 
          className="fight-button"
          onMouseEnter = {this.onHover}
          onMouseOut = {this.onRelease}>
          <img 
            id = "fight-icon" 
            alt = "" 
            src = {this.state.image}
            style = {{width: 60, height:60}} 
          />
          <p>FIGHT</p>
        </button>
      </div>
    );
  }
}

export default FightButton;