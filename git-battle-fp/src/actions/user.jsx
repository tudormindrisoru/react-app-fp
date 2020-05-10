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

export const incrementDiamonds = () => {
  return {
    type: 'INCREMENT_DIAMONDS',
  };
}

export const getHistoryEvents = (historyEvents) => {
  return {
    type: 'GET_HISTORY_EVENTS',
    payload: historyEvents,
  };
}