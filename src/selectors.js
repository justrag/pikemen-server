export const getPlayers = state => state.players;
export const getSockets = state => state.sockets;

export const getOtherPlayersSocket = (state, identity) => {
  // no reselect ->
  // https://github.com/reactjs/reselect#q-how-do-i-create-a-selector-that-takes-an-argument
  const players = getPlayers(state);
  const sockets = getSockets(state);

  const otherPlayersIdentity = players.find(i => i !== identity);
  return sockets[otherPlayersIdentity];
};
