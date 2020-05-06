export const login = (user) => {
  return {
    type: 'LOGIN_USER',
    payload: user
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