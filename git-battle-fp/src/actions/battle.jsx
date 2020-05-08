export const selectFirstPlayer = (player) => {
  return {
    type: 'SELECT_FIRST_PLAYER',
    payload: player
  };
}

export const selectSecondPlayer = (player) => {
  return {
    type: 'SELECT_SECOND_PLAYER',
    payload: player
  };
}

export const removeFirstPlayer = () => {
  return {
    type: 'REMOVE_FIRST_PLAYER',
  };
}

export const removeSecondPlayer = () => {
  return {
    type: 'REMOVE_SECOND_PLAYER',
  };
}

export const removePlayers = () => {
  return {
    type: 'REMOVE_PLAYERS'
  };
}