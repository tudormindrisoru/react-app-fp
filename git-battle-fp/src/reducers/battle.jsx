const noPlayerChosen = {
  firstPlayer: null,
  secondPlayer: null
}

const battleReducer = (state = noPlayerChosen,action) => {

  switch(action.type) {
    case 'SELECT_FIRST_PLAYER':
      return {
        firstPlayer: action.payload,
        secondPlayer: state.secondPlayer
      };
    case 'SELECT_SECOND_PLAYER':
      return {
        firstPlayer: state.firstPlayer,
        secondPlayer: action.payload
      };
    case 'REMOVE_FIRST_PLAYER':
      return {
        firstPlayer: noPlayerChosen.firstPlayer,
        secondPlayer: state.secondPlayer
      };
    case 'REMOVE_SECOND_PLAYER':
      return {
        firstPlayer: state.firstPlayer,
        secondPlayer: noPlayerChosen.firstPlayer
      };
    case 'REMOVE_PLAYERS':
      return noPlayerChosen;
    default:
      return state;
  }
}

export default battleReducer;