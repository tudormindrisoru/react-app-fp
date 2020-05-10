import React from 'react';
import { useSelector } from 'react-redux';
import BackgroundImage from '../../assets/ninja-background.png';
import './welcome.scss';

export default function WelcomePage() {
  const user = useSelector(state => state.user);
    return(
      <div className="welcome-page"> 
        <div className="message-container">
          <p className="message">Welcome, 
            {user.gitData.username !== null ? 
              <span id="welcome-user">{user.gitData.username}</span> 
            : "fighter"}!
          </p>
        </div>
      <img src= {BackgroundImage} alt="" id="welcome-background"/>
      {/* <div className ></div> */}
      </div>
    )
}