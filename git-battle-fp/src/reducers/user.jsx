const noUserLogged = {
  username: null,
  type: null,
  avatarLink: null,
  urlLink: null,
  following: null,
  followers: null,
  diamonds: null
}

const userReducer = (state = noUserLogged,action) => {

  switch(action.type) {
    case 'LOGIN_USER':
      return action.payload;
    case 'LOGOUT_USER':
      return noUserLogged;
    case 'MODIFY_DIAMONDS':
      return {
        username: state.username,
        type: state.type,
        avatarLink: state.avatarLink,
        urlLink: state.urlLink,
        following: state.following,
        followers: state.followers,
        diamonds: action.payload
      }
    default:
      return state;
  }
}

export default userReducer;