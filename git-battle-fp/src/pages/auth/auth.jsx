import React from 'react';
import './auth.scss';

import GitLogin from '../../components/gitLogin/githubLogin';
import BackgroundImage from '../../assets/ninja-background.png';
export default function AuthPage() {
  return(
    <div className = "auth-page">
      <GitLogin/>
      <div className = "background-container">
        <img src={BackgroundImage} alt="" className="background-image"/>
      </div>
    </div>
  );
}
