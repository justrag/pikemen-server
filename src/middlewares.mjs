export const logMiddleware = ({ getState }) => next => action => {
  console.log('==============');
  console.log('PREV STATE:', getState());
  console.log('ACTION:', action);
  next(action);
  console.log('NEW STATE:', getState());
};
