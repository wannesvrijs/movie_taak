import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../data/movies";

export default () => {
  const [searchStr, setSearchstr] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { movies } = useSelector((state) => state);

  const loadMore = (e) => {
    e.preventDefault();
    dispatch(getMovies(searchStr, page + 1));
    setPage(page + 1);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    searchStr === "" ? setError(true) : setError(false);
    if (!error) {
      dispatch(getMovies(searchStr));
    }
  };

  return (
    <div className="movieform">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          onChange={(e) => {
            setSearchstr(e.target.value);
            setError(false);
          }}
          value={searchStr}
          className={error && "error"}
        />
        <input type="submit" value="Zoek films" />
      </form>
      {movies.data.length !== 0 && (
        <a className="loadmore" href="" onClick={loadMore}>
          load more...
        </a>
      )}
      {movies.error && <p className="msg">{movies.error}</p>}
    </div>
  );
};
