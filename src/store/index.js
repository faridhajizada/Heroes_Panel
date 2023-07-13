import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import heroes from "../reducers/heroes";
import filters from "../reducers/filters";

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({ type: action });
  }
  return next(action);
};

// const enhancer =
//   (createStore) =>
//   (...args) => {
//     const store = createStore(...args);
//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//       if (typeof action === "string") {
//         return oldDispatch({ type: action });
//       }
//       return oldDispatch(action);
//     };
//     return store;
//   };

// const store = createStore(
//   combineReducers({ heroes, filters }),
//   compose(applyMiddleware(ReduxThunk,stringMiddleware))
// );

const store = configureStore({
  reducer: { heroes, filters },
  middleware: getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
