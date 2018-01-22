import { combineReducers } from 'redux';
import { union, length, assocPath } from 'ramda';

import { JOIN_GAME, START_GAME } from './constants';

const players = (state = [], action) => {
  if (action.type === JOIN_GAME && length(state) < 2)
    return union([action.meta.identity], state);
  else return state;
};

const started = (state = {}, action) => {
  switch (action.type) {
    case START_GAME:
      return assocPath(action.meta.identity, true, state);
    default:
      return state;
  }
};

const turn = (state = false, action) => {
  if (action.type === START_GAME && action.meta.identity !== 'FIXME') {
  }

  switch (action.type) {
    case JOIN_GAME:
      return 0;
    default:
      return state;
  }
};

export default combineReducers({ players, turn });
