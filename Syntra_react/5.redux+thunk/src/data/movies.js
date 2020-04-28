import axios from "axios";

/*****************/
/* INITIAL STATE */
/*****************/
const initialState = {
  error: false,
  loading: false,
  data: [],
  searchStr: "",
};

/*********/
/* TYPES */
/*********/
const FETCHMOVIES = "FETCHMOVIES";
const SETMOVIES = "SETMOVIES";
const ADDMOVIES = "ADDMOVIES";
const ERRORMOVIES = "ERRORMOVIES";

/*******************/
/* ACTION CREATORS */
/*******************/

export const getMovies = (str, page = 1) => (dispatch) => {
  dispatch(fetchMovies(str));
  axios
    .get(process.env.REACT_APP_ENDPOINTS + "&s=" + str + "&page=" + page)
    .then((result) => {
      if (page === 1) {
        if (result.data.Response === "False")
          dispatch(errorMovies(`No movies found for "${str}"`));
        else dispatch(setMovies(result.data.Search));
      } else {
        if (result.data.Response === "False")
          dispatch(errorMovies(`No more movies found for "${str}"`));
        else dispatch(addMovies(result.data.Search));
      }
    })
    .catch((error) => dispatch(errorMovies("error loading API")));
};

export const fetchMovies = (str) => ({
  type: FETCHMOVIES,
  payload: str,
});
export const setMovies = (data) => ({
  type: SETMOVIES,
  payload: data,
});
export const addMovies = (data) => ({
  type: ADDMOVIES,
  payload: data,
});
export const errorMovies = (msg) => ({
  type: ERRORMOVIES,
  payload: msg,
});

/***********/
/* REDUCER */
/***********/
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCHMOVIES:
      return {
        ...state,
        error: "",
        loading: true,
        searchStr: payload,
      };
    case SETMOVIES:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case ADDMOVIES:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...payload],
      };
    case ERRORMOVIES:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
