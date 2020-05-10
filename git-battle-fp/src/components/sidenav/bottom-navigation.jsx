import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Link
} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHistory, 
  faChevronRight, 
  // faChartBar, 
  faUserNinja,
  faLock
} from '@fortawesome/fontawesome-free-solid';



export default function BottomNavigation(props) { 
  const user = useSelector(state => state.user);
  
  return(
    <div className="bottom-navigation">
    <Link to= {user.isLogged ? "/history" : '/'} style={{ textDecoration: 'none' }} onClick={ (e) => props.changeActivePage(e)} >
      <div className="navigation-item" >
        <FontAwesomeIcon icon={faHistory} size="2x" className="font-icon" color="#fff"/>
        <span className={props.classList[3]}>History</span>
        {!user.isLogged ? <FontAwesomeIcon icon={faLock} size="sm" className="lock-icon" color="#fff"/> : <div></div> }
      </div>
    </Link>
    <Link to="/battle" style={{ textDecoration: 'none' }} onClick={ (e) => props.changeActivePage(e)}>
      <div className="navigation-item" >
      <FontAwesomeIcon icon={faUserNinja} size="2x" className="font-icon" color="#fff"/>
        <span className={props.classList[3]}>Battle</span>
      </div>
    </Link>
    {/* <Link to={user.isLogged ? "/statistics" : '/'} style={{ textDecoration: 'none' }} onClick={ (e) => props.changeActivePage(e)}>
      <div className="navigation-item" >
      <FontAwesomeIcon icon={faChartBar} size="2x" className="font-icon" color="#fff"/>
        <span className={props.classList[3]}>Statistics</span>
        {!user.isLogged ? <FontAwesomeIcon icon={faLock} size="sm" className="lock-icon" color="#fff"/> : <div></div> }
      </div>
    </Link> */}
      <div className="navigation-item" onClick={() => props.extend()}>
        <FontAwesomeIcon icon={faChevronRight} size="2x" className= {props.classList[1]} color="#fff" id="arrow-icon"/>
      </div>
  </div>
  );
}