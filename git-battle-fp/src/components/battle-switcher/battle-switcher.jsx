import React from "react";
import "./battle-switcher.scss";
class BattleSwitcher extends React.Component {
  // constructor(props) {
  // 	super(props);

  // }

  switchButton = (type) => {
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
    } else if (type === "me-vs-player") {
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
    this.props.switchBattleType(type);
  };
  render() {
    return (
      <div className="switcher-container">
        <div className="battle-switcher">
          <div
            className="player-vs-player-button active-button"
            onClick={() => this.switchButton("player-vs-player")}
          >
            <span className="switcher-text">Player vs Player</span>
          </div>
          <div className="divider"></div>
          <div
            className="me-vs-player-button"
            onClick={() => this.switchButton("me-vs-player")}
          >
            <span className="switcher-text">Me vs Player</span>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default BattleSwitcher;
