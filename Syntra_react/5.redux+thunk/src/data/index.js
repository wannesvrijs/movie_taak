import { createStore, combineReducers, applyMiddleware } from "redux";
import movieReducer from "./movies";
import likedReducer from "./liked";
import thunk from "redux-thunk";
import logger from "redux-logger";

export default createStore(
  combineReducers({
    movies: movieReducer,
    liked: likedReducer,
  }),
  applyMiddleware(thunk, logger)
);
