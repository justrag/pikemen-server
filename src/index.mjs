import { createStore, applyMiddleware } from 'redux';
import Server from 'socket.io';
import { assocPath } from 'ramda';
import reducer from './reducers';
import { logMiddleware, remoteActionMiddleware } from './middlewares';

const io = new Server().attach(8090);
const store = createStore(
  reducer,
  applyMiddleware(logMiddleware, remoteActionMiddleware(io))
);
console.log('Socket server started');
//store.subscribe(() => io.emit('state', store.getState()));

io.on('connect', socket => {
  //socket.emit('state', store.getState());
  //socket.on('action', store.dispatch.bind(store));
  socket.on('action', action => {
    store.dispatch(assocPath(['meta', 'socket_id'], socket.id, action));
    //    socket.broadcast.emit('action', action);
  });
});

//console.log('State:', store.getState());
