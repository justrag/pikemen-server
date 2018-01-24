import { JOIN_GAME, MOVE } from './constants';
import { getOtherPlayersSocket } from './selectors';
import { assocPath, dissocPath } from 'ramda';

export const logMiddleware = ({ getState }) => next => action => {
  console.log('==============');
  console.log('PREV STATE:', getState());
  console.log('ACTION:', action);
  next(action);
  console.log('NEW STATE:', getState());
};

export const remoteActionMiddleware = io => store => next => action => {
  if ([JOIN_GAME, MOVE].includes(action.type)) {
    // the whole 'verify if the move is legal' stuff will go before here
    io
      .to(getOtherPlayersSocket(store.getState(), action.meta.identity))
      .emit(
        'action',
        dissocPath(
          ['meta', 'remoteToServer'],
          assocPath(['meta', 'remoteToClient'], true, action)
        )
      );
    next(action);
  }
};
