import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faUserShield
} from '@fortawesome/fontawesome-free-solid';

import './player-card.scss';


const url = `https://api.github.com/users`;
const fetchUserData = async (username) =>{
  return fetch(`${url}/${username}`,).then(response => {
      if(response.ok) {
          console.log("RESPONSE OK!");
          return response.json();
      } else {
          throw new Error(response);
      }
  })
  .catch( err => {
      console.log(err);
      return err;
  });
}

class PlayerCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      cardState: "blank",
      username: "",
      avatar: "",
      urlLink: "",
      type: "",
    }

    this.renderCard = this.renderCard.bind(this);
    this.search = this.search.bind(this);
    this.getUser = this.getUser.bind(this);
    this.openProfile = this.openProfile.bind(this);
    this.clear = this.clear.bind(this);
  }

  
  getUser = async () => {
    const username = document.querySelector('.card-input').value;
      const data = await fetchUserData(username);
      if(data["login"] === undefined) {
        this.setState({
          cardState: "error",
          username: this.state.username,
          avatar: this.state.avatar,
          urlLink: this.state.urlLink,
          type: this.state.type,
        });
      } else {
        this.setState({
          cardState: "chosen",
          username: data["login"],
          avatar: data["avatar_url"],
          urlLink: data["html_url"],
          type: data["type"],
        });
      }
  }

  search = () => {
    if(document.querySelector('.card-input').value !== "") {
      this.setState({
        cardState: "chosen",
        username: this.state.username,
        avatar: this.state.avatar,
        urlLink: this.state.urlLink,
        type: this.state.type,
      });
    }
  }

  openProfile = () => {
    window.opener.location = this.state.urlLink;
  }

  retry = () => {
    this.setState({
      cardState: "blank",
      username: this.state.username,
      avatar: this.state.avatar,
      urlLink: this.state.urlLink,
      type: this.state.type,
    })
  }

  clear = () => {
    this.setState({
      cardState: "blank",
      username: "",
      avatar: "",
      urlLink: "",
      type: "",
    })
  }
 
  renderCard = () => {
    if(this.state.cardState === "blank") {
      return(
        <div className="player-blank-card">
            <p className="select-player-title">Select username</p>
            <input type="text" className="card-input" />
            <button className="submit-search-button" onClick= {this.getUser} >Search</button>
        </div>
      );
    } else if(this.state.cardState === "chosen") {
      return(
        <div className="player-chosen-card">
          <a href={this.state.urlLink} target="_blank" rel="noopener noreferrer">
          <div className="image-wrap">
              <img src={this.state.avatar} alt="avatar" className="profile-image"/>
              <p className="image-description">Go to profile</p>
            </div>
          </a> 
            <div className="player-info">
              <div className="info-container">
                <FontAwesomeIcon icon={faUser} size="1x" className="card-icons" color="#2d3946"></FontAwesomeIcon>
                <span>{this.state.username}</span>
              </div>
              <div className="info-container">
                <FontAwesomeIcon icon={faUserShield} size="1x" className="card-icons" color="#2d3946"></FontAwesomeIcon>
                <span>{this.state.type}</span>
              </div>
            </div>
            <button className="clear-button" onClick={this.clear}>Clear</button>
        </div>
      );
    } else if(this.state.cardState === "error") {
      return(
        <div className="player-error-card">
            <p className="error-title">This player doesn`t exist!</p>
            <button className="retry-button" onClick= {this.retry}>Retry</button>
        </div>
      );
    }
  }
    render() {
      return (
        <div className="card-battle">
          {this.renderCard()}
        </div>
      );
    }
}

export default PlayerCard