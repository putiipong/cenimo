import { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from './movie.types';

export const addToFavorite = (movie) => ({
  type: ADD_TO_FAVORITE,
  payload: movie,
});

export const removeFromFavorite = (id) => {
  console.log('id', id)
  return {
    type: REMOVE_FROM_FAVORITE,
    payload: id,
  };
};
