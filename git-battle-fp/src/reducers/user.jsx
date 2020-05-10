const noUserLogged = {
  isLogged: false,
  gitData: {
    username: null,
    type: null,
    avatarLink: null,
    urlLink: null,
    following: null,
    followers: null,
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
  
    case 'INCREMENT_DIAMONDS':
      return {
        isLogged: state.isLogged,
        gitData: state.gitData,
        userData: {
          history: state.userData.history,
          diamonds: state.userData.diamonds + 1
        }
      }
    case 'GET_HISTORY_EVENTS':
      return {
        isLogged: state.isLogged,
        gitData: state.gitData,
        userData: {
          history: action.payload,
          diamonds: state.userData.diamonds
        }
      }
    default:
      return state;
  }
}

export default userReducer;