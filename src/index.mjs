import { createStore } from "redux";
import Server from "socket.io";
import reducer from "./reducer";
import { inc } from "./actions";

const store = createStore(reducer);
const io = new Server().attach(8090);
console.log("Socket server started")
store.subscribe(() => io.emit("state", store.getState()));

io.on("connection", socket => {
  socket.emit("state", store.getState());
  //socket.on('action', store.dispatch.bind(store));
  socket.on("action", store.dispatch);
});

store.dispatch(inc());
store.dispatch(inc());
store.dispatch(inc());
store.dispatch(inc());
store.dispatch(inc());
store.dispatch(inc());
console.log("State:",store.getState())
