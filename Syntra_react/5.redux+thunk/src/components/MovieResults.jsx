import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLiked, removeLiked } from "../data/liked";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { IconButton } from "@material-ui/core";

export default () => {
  const { movies, liked } = useSelector((state) => state);
  const dispatch = useDispatch();

  const IsLiked = (id) => {
    return liked.id.some((like) => id === like);
  };

  const likeHandler = (e, movieid) => {
    console.log(e.target, movieid);
    const isLiked = IsLiked(movieid);
    if (!isLiked) {
      dispatch(getLiked(movieid));
    } else {
      dispatch(removeLiked(movieid));
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
              <a onClick={(e) => likeHandler(e, movie.imdbID)}>
                {liked.id.some((like) => movie.imdbID === like) ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};
