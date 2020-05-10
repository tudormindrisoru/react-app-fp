import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faUserShield
} from '@fortawesome/fontawesome-free-solid';
import axios from 'axios';

import './player-card.scss';


const url = `https://api.github.com/users`;
const fetchPlayerData = async (username) =>{
  console.log(username);
  const token = localStorage.getItem('access_token');
  const header = token !== null ? { 'Authorization': `token ${token}`} : {};
  return await axios.get(`${url}/${username}`, {
    headers: header
  }).then(response => {
    return response.data;
  })
  .catch(err => {
      console.log(err);
      return err;
  });
}

class PlayerCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cardState: "blank",
      username:  "",
      avatar: "",
      urlLink: "",
      type: "",
    }

    this.renderCard = this.renderCard.bind(this);
    this.getUser = this.getUser.bind(this);
    this.openProfile = this.openProfile.bind(this);
    this.retry = this.retry.bind(this);
  }


  getUser = async () => {
      const data = await fetchPlayerData(this.state.username);
      if(data["login"] === undefined) {
        this.setState({
          cardState: "error",
          username: this.state.username,
          avatar: "",
          urlLink: "",
          type: "",
          errorMessage: data['message']
        });
      } else {
        this.setState({
          cardState: "chosen",
          username: data["login"],
          avatar: data["avatar_url"],
          urlLink: data["html_url"],
          type: data["type"],
        });

        this.props.getPlayer({
          username: data["login"],
          type: data["type"],
          avatar: data["avatar_url"],
          urlLink: data["html_url"],
          following: data['following'],
          followers: data['followers']
        });
      }
  }

  openProfile = () => {
    window.opener.location = this.state.urlLink;
  }

  retry = () => {
    this.setState({
      cardState: "blank",
      username: "",
      avatar: "",
      urlLink: "",
      type: "",
      inputValue: ""
    })
    this.props.clearPlayer();
  }

  onChangeInput = (e) => {
    console.log(e.target.value);
    this.setState({
      cardState: this.state.cardState,
      username: e.target.value,
      avatar: this.state.username,
      urlLink: this.state.urlLink,
      type: this.state.type,
    });
  }
 
  renderCard = () => {
    if(this.state.cardState === "blank") {
      return(
        <div className="player-blank-card">
          <p className="select-player-title">Select player</p>
          <div className="input-field">
            <input type="text" className="username-input" onChange = {(e) => this.onChangeInput(e)} required />
            <label htmlFor="username-input"> Username</label>
          </div>
          <div className="submit-button-container">
            <button className="submit-search-button" onClick= {this.state.username !=="" ? this.getUser : {}} >Search</button>
          </div>

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
            <button className="clear-button" onClick={this.retry}>Clear</button>
        </div>
      );
    } else if(this.state.cardState === "error") {
      return(
        <div className="player-error-card">
            <p className="error-title">{this.state.errorMessage}</p>
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