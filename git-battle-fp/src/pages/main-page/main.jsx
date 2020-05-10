import React, { useEffect } from 'react';
import firebase from 'firebase';
import { useDispatch } from 'react-redux'; 
import axios from 'axios';
import { addUser, login, logout, getHistoryEvents, incrementDiamonds } from '../../actions/user';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import './main.scss';

import Sidenav from '../../components/sidenav/sidenav';
import BattlePage from '../battle/battle';
import HistoryPage from '../history/history';
// import StatisticsPage from '../statistics/statistics';
import WelcomePage from '../welcome-page/welcome';




export default function Main() {

  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem('access_token') !== null) {
      let token = localStorage.getItem('access_token');
      axios.get(`https://api.github.com/user`, {
        headers: {
          'Authorization': `token ${token}`
        }
      })
      .then( response => JSON.parse(JSON.stringify(response)))
      .then( result => {
        const gitData = {
          username: result.data.login,
          type: result.data.type,
          avatarLink: result.data.avatar_url,
          urlLink: result.data.html_url,
          following: result.data.following,
          followers: result.data.followers
        }
        dispatch(addUser(gitData));
        getDataFromFirebase(gitData);
      });
    }
  });

  const loginWithGithub = async () => {
      await doSignInWithGithub();
    }


  const doSignInWithGithub = async () => {

    const auth = firebase.auth();
    const githubProvider = new firebase.auth.GithubAuthProvider();
    githubProvider.addScope('user');
    githubProvider.addScope('repo');

    await auth.signInWithPopup(githubProvider).then(function(result) {
      const gitData = {
        username: result.additionalUserInfo.username,
        type: result.additionalUserInfo.profile.type,
        avatarLink: result.additionalUserInfo.profile.avatar_url,
        urlLink: result.additionalUserInfo.profile.html_url,
        following: result.additionalUserInfo.profile.following,
        followers: result.additionalUserInfo.profile.followers
      }
      localStorage.setItem('access_token', result.credential.accessToken);
      localStorage.setItem('refresh_token', result.user.refreshToken);
      dispatch(addUser(gitData));
      getDataFromFirebase(gitData);

  }).catch(function(error) {
      console.log(error);
    });
}

const getDataFromFirebase = (gitData) => {
    var userId = gitData.username;
    firebase.database().ref('users/'+ userId).once('value').then(function(snapshot) {
    const firebaseData = snapshot.val();
    if(firebaseData === null) {
      firebase.database().ref('users/' + userId).set({
        diamonds: 0,
        history: null
      });
      dispatch(login({history: null, diamonds: 0}));
  
    } else {
      dispatch(login({history: (firebaseData.history === null || firebaseData.history === undefined)  ? null : firebaseData.history , diamonds: firebaseData.diamonds}));
    }
    
    
    });
}

const doSignOut = () => {
  firebase.auth().signOut().then(function() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    dispatch(logout());
  }).catch(function(error) {
    console.log(error);
  });
}

const addBattleToHistory = async (firstPlayer, secondPlayer, currentDiamondsValue) => {
  const data = {
    myScore: firstPlayer.score,
    opponent: secondPlayer
  }
  await firebase.database().ref('users/'+ firstPlayer.playerData.username + '/history').push(data);
  await firebase.database().ref('users/'+ firstPlayer.playerData.username+ '/history').once('value').then(function(snapshot) {
    let firebaseData = snapshot.val(); 
    dispatch(getHistoryEvents(firebaseData));
        
    if(firstPlayer.score > secondPlayer.score) {
      dispatch(incrementDiamonds());
      const incrementedNumber = currentDiamondsValue + 1;
      const updatedData = {};
      updatedData['diamonds'] = incrementedNumber;
      firebase.database().ref('/users/').child(firstPlayer.playerData.username).update(updatedData);
    }
  });
}
  return(
    <div className="main">
      <Router>
        <Sidenav gitLogin = {() => loginWithGithub()} logout = {() => doSignOut()}/>
        <div id="page-container">
          <Switch>
            <Route exact path="/history">
              <HistoryPage />
            </Route>
            <Route exact path="/battle">
              <BattlePage addBattleToHistory = {(firstPlayer,secondPlayer, currentDiamondsValue) => addBattleToHistory(firstPlayer,secondPlayer,currentDiamondsValue)}/>
            </Route>
            {/* <Route path="/statistics">
              <StatisticsPage />
            </Route> */}
            <Route exact path="/">
              <WelcomePage/>
            </Route>
            <Redirect from='*' to='/' />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
