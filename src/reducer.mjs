import { INC, DEC } from "./constants";
const reducer = (state = 0, { type }) => {
  switch (type) {
    case INC:
      return state + 1;
    case DEC:
      return state - 1;
    default:
      return state;
  }
};
export default reducer;
