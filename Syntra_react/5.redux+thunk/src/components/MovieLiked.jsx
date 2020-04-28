import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeLiked } from "../data/liked";

export default () => {
  const dispatch = useDispatch();

  const {
    liked: { data, loading },
  } = useSelector((state) => state);

  const removeHandler = (e) => {
    dispatch(removeLiked(e.target.dataset.id));
  };

  const moreInfoHandler = (e) => {
    let ed = document.querySelector(`ul #${e.target.dataset.id}`);
    ed.classList.toggle("show");
  };

  return (
    <div className="movieresults liked">
      <h1>Movies I like</h1>
      <ul>
        {loading && <p className="msg">loading...</p>}
        {data.map((movie) => (
          <li className="item" key={movie.imdbID}>
            <p className="liketitle">{movie.Title}</p>
            <button data-id={movie.imdbID} onClick={removeHandler}>
              remove
            </button>
            <button data-id={movie.imdbID} onClick={moreInfoHandler}>
              more info
            </button>
            <ul className="info" id={movie.imdbID}>
              <li>Year: {movie.Year}</li>
              <li>Genre: {movie.Genre}</li>
              <li>Plot: {movie.Plot}</li>
              <li>Awards: {movie.Awards}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
