import React from 'react'; 
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGem,
  faSignOutAlt
} from '@fortawesome/fontawesome-free-solid';
import {
  Link
} from "react-router-dom";

import LogoImage from '../../assets/logo-v1.png';
import LoginImage from '../../assets/git-login.png';



export default function TopNavigation(props) {

  const user = useSelector(state => state.user);
  const displayLoginContainer = () => {
    if(user.isLogged) {
      
      return(
        <div className="top-container">
          <div className="navigation-item" id="user-container">
            <img src={user.gitData.avatarLink} alt="" className="login-image"/>
            <span className={props.classList[3]}>{user.gitData.username}</span>
          </div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="navigation-item" id="logout-container" onClick={() => props.logout()}>
              <FontAwesomeIcon icon={faSignOutAlt} size="2x" className="font-icon" color="#fff"/>
              <span className={props.classList[3]}>Logout</span>
            </div>
          </Link>
          <div className= {props.classList[2]}>
          <FontAwesomeIcon icon={faGem} size="sm" className="font-icon" color="#fff"/>
          <span id="number-of-diamonds">{user.userData.diamonds}</span>
        </div>
          
        </div>

      );
    } else return( 
      <div className="navigation-item" id="login-container" onClick = {() => props.gitLogin() }>
        <img src={LoginImage} alt="" className="login-image"/>
        <span className={props.classList[3]}>Login</span>
      </div>
    )
  }
  return(
    <div className="top-navigation">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="logo-container">
          <img src={LogoImage} alt="" id="logo"/>
          <span className={props.classList[3]}> BATTLE</span>
        </div>
      </Link>
      {displayLoginContainer()}
  </div>
  );
}