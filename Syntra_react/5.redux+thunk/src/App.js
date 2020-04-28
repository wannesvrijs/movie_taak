import React from "react";

import { Provider } from "react-redux";

import MovieSearcher from "./components/MovieSearcher";
import MovieLiked from "./components/MovieLiked";
import store from "./data";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="left">
          <MovieSearcher />
        </div>
        <div className="right">
          <MovieLiked />
        </div>
      </div>
    </Provider>
  );
}

export default App;
