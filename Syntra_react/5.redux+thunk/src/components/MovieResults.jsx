import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLiked, removeLiked } from "../data/liked";

export default () => {
  const { movies, liked } = useSelector((state) => state);
  const dispatch = useDispatch();

  const IsLikedE = (e) => {
    return liked.data.some((like) => like.imdbID === e.target.dataset.imdbid);
  };

  const IsLikedID = (id) => {
    return liked.data.some((like) => like.imdbID === id);
  };

  const likeHandler = (e) => {
    const isLiked = IsLikedE(e);
    if (!isLiked) {
      dispatch(getLiked(e.target.dataset.imdbid));
    } else {
      dispatch(removeLiked(e.target.dataset.imdbid));
    }
  };

  return (
    <div className="movieresults">
      <ul>
        {movies.loading && <p className="msg">loading...</p>}
        {movies.data.length !== 0 &&
          movies.data.map((movie) => (
            <li className="result" key={movie.imdbID}>
              {movie.Title}
              <button data-imdbid={movie.imdbID} onClick={likeHandler}>
                Like
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};
