import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux'; 
import axios from 'axios';
import { addUser, login, logout } from '../../actions/user';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './main.scss';

import Sidenav from '../../components/sidenav/sidenav';
import BattlePage from '../battle/battle';
import HistoryPage from '../history/history';
import StatisticsPage from '../statistics/statistics';
import WelcomePage from '../welcome-page/welcome';




export default function Main() {

  // const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect");
    console.log(localStorage.getItem('access_token'));
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
      console.log("UPDATE DONE");
    }


  const doSignInWithGithub = async () => {

    const auth = firebase.auth();
    const githubProvider = new firebase.auth.GithubAuthProvider();
    githubProvider.addScope('user');
    githubProvider.addScope('repo');

    await auth.signInWithPopup(githubProvider).then(function(result) {
      console.log(result);
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
      console.log("aici git login");
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
  }
    dispatch(login({history: firebaseData.history == null ? null : firebaseData.history , diamonds: firebaseData.diamonds}));
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

  return(
    <div className="main">
      <Router>
        <Sidenav gitLogin = {() => loginWithGithub()} logout = {() => doSignOut()}/>
        <div id="page-container">
          <Switch>
            <Route path="/history">
              <HistoryPage />
            </Route>
            <Route path="/battle">
              <BattlePage />
            </Route>
            <Route path="/statistics">
              <StatisticsPage />
            </Route>
            <Route exact path="/">
              <WelcomePage/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
