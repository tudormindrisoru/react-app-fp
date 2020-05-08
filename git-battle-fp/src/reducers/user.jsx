const noUserLogged = {
  isLogged: false,
  gitData: {
    username: null,
    type: null,
    avatarLink: null,
    urlLink: null,
    following: null,
    followers: null,
    diamonds: null
  },
  userData: {
    diamonds: null,
    history: null
  }
}

const userReducer = (state = noUserLogged,action) => {

  switch(action.type) {
    case 'LOGIN_USER':
      return {
        isLogged: true,
        gitData: state.gitData,
        userData: action.payload
      }
    case 'ADD_USER':
      return {
        isLogged: state.isLogged,
        gitData: action.payload,
        userData: state.userData
      };
    case 'LOGOUT_USER':
      return noUserLogged;
  
    case 'MODIFY_DIAMONDS':
      return {
        isLogged: state.isLogged,
        gitData: state.gitData,
        userData: {
          history: state.userData.history,
          diamonds: action.payload
        }
      }
    default:
      return state;
  }
}

export default userReducer;