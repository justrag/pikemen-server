import { createStore, applyMiddleware } from 'redux';
import Server from 'socket.io';
import reducer from './reducers';
import { logMiddleware } from './middlewares';

const store = createStore(reducer, applyMiddleware(logMiddleware));
const io = new Server().attach(8090);
console.log('Socket server started');
store.subscribe(() => io.emit('state', store.getState()));

io.on('connection', socket => {
  socket.emit('state', store.getState());
  //socket.on('action', store.dispatch.bind(store));
  socket.on('action', store.dispatch);
});

console.log('State:', store.getState());
