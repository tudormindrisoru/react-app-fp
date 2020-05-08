import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faUserShield
} from '@fortawesome/fontawesome-free-solid';

import { useSelector } from 'react-redux';

export default function LoggedUserCard() {

  const user = useSelector(state => state.user);
  console.log(user);
  return(
    <div className="player-chosen-card">
      <a href={user.gitData.urlLink} target="_blank" rel="noopener noreferrer">
      <div className="image-wrap">
          <img src={user.gitData.avatarLink} alt="avatar" className="profile-image"/>
          <p className="image-description">Go to profile</p>
        </div>
      </a> 
        <div className="player-info">
          <div className="info-container">
            <FontAwesomeIcon icon={faUser} size="1x" className="card-icons" color="#2d3946"></FontAwesomeIcon>
            <span>{user.gitData.username}</span>
          </div>
          <div className="info-container">
            <FontAwesomeIcon icon={faUserShield} size="1x" className="card-icons" color="#2d3946"></FontAwesomeIcon>
            <span>{user.gitData.type}</span>
          </div>
        </div>
    </div>
  );
}