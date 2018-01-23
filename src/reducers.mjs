import { combineReducers } from 'redux';
import { union, length, assocPath } from 'ramda';

import { JOIN_GAME, NEXT_TURN } from './constants';
import { initAction as initActionCreator } from './actions';

const initAction = initActionCreator();

const playersReducer = (state = [], action) => {
  if (action.type === JOIN_GAME && length(state) < 2)
    return union([action.meta.identity], state);
  else return state;
};

const turnReducer = (state = false, action, players) => {
  // Start the game if the second player just joined
  if (action.type === JOIN_GAME && length(players) == 2 && !state) return 0;
  else if (action.type === NEXT_TURN) return state + 1;
  else return state;
};

const lastActionReducer = (state = initAction, action) => action;

const defaultState = {
  players: playersReducer(undefined, initAction),
  turn: turnReducer(undefined, initAction),
  lastAction: lastActionReducer(undefined, initAction)
};

const reducer = (state = defaultState, action) => {
  const lastAction = lastActionReducer(state.lastAction, action);
  const players = playersReducer(state.players, action);
  const turn = turnReducer(state.turn, action, players);
  return { lastAction, players, turn };
};

export default reducer;
