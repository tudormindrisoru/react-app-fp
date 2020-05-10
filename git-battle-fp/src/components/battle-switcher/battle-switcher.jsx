import React from "react";
import "./battle-switcher.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLock
} from '@fortawesome/fontawesome-free-solid';
import { useSelector } from 'react-redux';
function BattleSwitcher(props) {

  const user = useSelector(state => state.user);

  const switchButton = (type) => {
    if (type === "player-vs-player") {
      if (
        document
          .querySelector(".me-vs-player-button")
          .classList.contains("active-button")
      ) {
        document
          .querySelector(".me-vs-player-button")
          .classList.remove("active-button");
        document
          .querySelector(".player-vs-player-button")
          .classList.add("active-button");
      }
    } else if (type === "me-vs-player" && user.isLogged) {
      if (
        document
          .querySelector(".player-vs-player-button")
          .classList.contains("active-button")
      ) {
        document
          .querySelector(".player-vs-player-button")
          .classList.remove("active-button");
        document
          .querySelector(".me-vs-player-button")
          .classList.add("active-button");
      }
    }
    console.log(user.isLogged);
    if(type === "player-vs-player" || (type ==="me-vs-player" && user.isLogged)) {
      props.switchBattleType(type);
    }
  };

    return (
      <div className="switcher-container">
        <div className="battle-switcher">
          <div
            className="player-vs-player-button active-button"
            onClick={() => switchButton("player-vs-player")}
          >
            <span className="switcher-text">Player vs Player</span>
          </div>
          <div className="divider"></div>
          <div
            className="me-vs-player-button"
            onClick={() => switchButton("me-vs-player")}
          >
            <span className="switcher-text">Me vs Player</span>
          {!user.isLogged ? <FontAwesomeIcon icon={faLock} size="sm" className="lock-icon" color="#fff"/> : <div></div>}
            
          </div>
          <div></div>
        </div>
      </div>
    );
}

export default BattleSwitcher;
