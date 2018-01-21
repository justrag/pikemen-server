export const logMiddleware = store => next => action => {
  console.log('ACTION:', action);
  next(action);
};
