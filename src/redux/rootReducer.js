import { combineReducers } from "redux";

import movieReducer from "./Movies/movie.reducer";

const rootReducer = combineReducers({ movies: movieReducer });

export default rootReducer;