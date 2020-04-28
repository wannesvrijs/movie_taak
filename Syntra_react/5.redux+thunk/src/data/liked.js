import axios from "axios";

/*****************/
/* INITIAL STATE */
/*****************/

const initialState = {
  error: false,
  loading: false,
  data: [],
};

/*********/
/* TYPES */
/*********/

const FETCHLIKED = "FETCHLIKED";
const SETLIKED = "SETLIKED";
const REMOVELIKED = "REMOVELIKED";
const ERRORLIKED = "ERRORLIKED";

/*******************/
/* ACTION CREATORS */
/*******************/
export const getLiked = (imdbID) => (dispatch) => {
  dispatch(fetchLiked());
  axios
    .get(process.env.REACT_APP_ENDPOINTS + "&i=" + imdbID)
    .then((result) => {
      dispatch(setLiked(result.data));
    })
    .catch((error) => errorLiked("api Failed loading"));
};

export const fetchLiked = () => ({
  type: FETCHLIKED,
});

export const setLiked = (data) => ({
  type: SETLIKED,
  payload: data,
});

export const errorLiked = (msg) => ({
  type: ERRORLIKED,
  payload: msg,
});

export const removeLiked = (imdbID) => ({
  type: REMOVELIKED,
  payload: imdbID,
});

/***********/
/* REDUCER */
/***********/
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCHLIKED:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case SETLIKED:
      return {
        ...state,
        loading: false,
        data: [payload, ...state.data],
      };
    case ERRORLIKED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case REMOVELIKED:
      return {
        ...state,
        data: state.data.filter((movie) => movie.imdbID !== payload),
      };
    default:
      return state;
  }
};
