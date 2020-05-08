import React, { useState } from 'react';
import * as firebase from 'firebase';
import './githubLogin.scss';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { login, modifyDiamonds } from '../../actions/user';
const accesTokenUrl = `https://github.com/login/oauth/access_token`;
const oAuthUrl = `https://github.com/login/oauth/authorize`;
const REDIRECT_URL = "http://localhost:3000";
const githubFields = ['user', 'public_repo'];
const client = {
  id: "2ec1b4f28c7ae374dde0",
  secret: "58ebaef21dae1e6f3b42701cf09d0cba6407404c",
};
const tokenUrl = `${oAuthUrl}?client_id=${client.id}&redirect_uri=${encodeURIComponent(REDIRECT_URL)}&scope=${encodeURIComponent(githubFields.join(' '))}`;

const createToken = async (code) =>{

  const headers = {
    Accept: 'application/json', 'Content-Type': 'application/json',
  };
  const url =
    `${accesTokenUrl}` +
    `?client_id=${client.id}` +
    `&client_secret=${client.secret}` +
    `&code=${code}`;

  axios.get(url, headers)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  
}

 export default function GitLogin() {

  const [user, setuser] = useState(null);

  const serverValue = firebase.database.ServerValue;
  const emailAuthProvider = firebase.auth.EmailAuthProvider;
  const auth = firebase.auth();
  const db = firebase.database();

  const dispatch = useDispatch();

  const githubProvider = new firebase.auth.GithubAuthProvider();
  githubProvider.addScope('user');
  githubProvider.addScope('repo');

  const doSignInWithGithub = async () => {

    await auth.signInWithPopup(githubProvider).then(function(result) {
      console.log(result);
      const userData = {
        username: result.additionalUserInfo.username,
        type: result.additionalUserInfo.profile.type,
        avatarLink: result.additionalUserInfo.profile.avatar_url,
        urlLink: result.additionalUserInfo.profile.html_url,
        following: result.additionalUserInfo.profile.following,
        followers: result.additionalUserInfo.profile.followers,
        diamonds: 0
      }
      setuser(userData);
      dispatch(login(userData));
    }).catch(function(error) {
      console.log(error);
    });;
  }

  return (
    <div></div>
      // <button className="git-button" onClick={doSignInWithGithub}>SIGN IN WITH GITHUB</button>

    // <GitHubLogin clientId = {client.id}
    //         onSuccess={onSuccessGithub}
    //         buttonText="SIGN IN WITH GITHUB"
    //         className="git-button"
    //         valid={true}
    //         redirectUri = {REDIRECT_URL}
    //       />

    // <div className="github-login">
    //   <div className="username-field">
    //     <input value = {username} type="text" id="username-input" onChange = {(event) => setusername(event.target.value)} required />
    //     <label htmlFor="username-input" id="username-label"> Username</label>
    //   </div>
    //   <div className="password-field">
    //     <input value = {password} type="password" id="password-input" onChange = {(event) => setpassword(event.target.value)} required />
    //     <label htmlFor="password-input" id="password-label"> Password</label>
    //   </div>
    // </div>
  );
}
