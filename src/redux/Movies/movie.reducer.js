import { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from './movie.types';

const initialState = {
  favorites: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FROM_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((movie) => movie.id !== action.payload),
      };
    default:
      return state;
  }
};

export default movieReducer;
