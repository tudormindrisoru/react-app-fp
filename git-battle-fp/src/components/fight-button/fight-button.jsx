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

  onHover = (e) => {
    e.stopPropagation();
    document.querySelector(".fight-button span").style.color = "#fff";
    document.querySelector('.fight-button').style.backgroundColor = "#2d3946";
    this.setState({
      image: HoverFightImage
    });
  }

  onRelease = () => {
    document.querySelector(".fight-button span").style.color = "#2d3946";
    document.querySelector('.fight-button').style.backgroundColor = "transparent";
    this.setState({
      image: FightImage
    });
  }


  render() {
    if(this.props.type === 'active') {
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
            <span
            >FIGHT</span>
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