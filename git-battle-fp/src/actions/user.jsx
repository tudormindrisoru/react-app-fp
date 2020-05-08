export const addUser = (user) => {
  return {
    type: 'ADD_USER',
    payload: user
  };
}

export const login = (userData) => {
  return {
    type: 'LOGIN_USER',
    payload: userData
  };
}

export const logout = () => {
  return {
    type: 'LOGOUT_USER',
  };
}

export const modifyDiamonds = (number) => {
  return {
    type: 'MODIFY_DIAMONDS',
    payload: number
  };
}
