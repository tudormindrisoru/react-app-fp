
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import './sidenav.scss';

import BottomNavigation from './bottom-navigation';
import TopNavigation from './top-navigation';


export default function Sidenav(props) {

  const [extended, setextended] = useState(false);
  const [activePage,setactivePage] = useState("main");
  const [classList, setclassList] = useState(['sidenav-container', 'font-icon', 'diamonds-container', 'navigation-labels label-hidden']);
  
  const user = useSelector(state => state.user);
  const extend = () => {
    if(extended) {
      setclassList(['sidenav-container ', 'font-icon', 'diamonds-container ','navigation-labels label-hidden']);
    } else if(!extended) {
      setclassList(['sidenav-container extended-sidenav', 'font-icon rotated-icon', 'diamonds-container diamonds-container-extended', 'navigation-labels']);
      let labels = document.getElementsByClassName('navigation-labels');
      for(let index = 0; index < labels.length; index++) {
        labels[index].classList.remove('label-hidden')
      }
    }
    setextended(!extended);
  }

  const changeActivePage = (e) => {
    if(extended === true) {
      extend();
    }
    setactivePage(e.target.value);
  }
  
  return (
    <div className= {classList[0]}>
      <div className="sidenav-navigation">
        <TopNavigation
          user = { user }
          classList = {classList}
          gitLogin = {() => props.gitLogin()}
          logout = {() => props.logout()} 
        />
        <BottomNavigation 
          user = { user}
          classList = {classList} 
          extend = {() => {extend()}} 
          changeActivePage = {(e) => changeActivePage(e)}
        />

      </div>
    </div>
  );
}