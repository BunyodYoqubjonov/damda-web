import { favoriteActionTypes } from './favoriteActionTypes'

export const clearFavoritesAction = () => ({
  type: favoriteActionTypes.CLEAR_FAVORITES,
})

export const setToFavoritesAction = (payload) => (dispatch) => {
  dispatch({
    type: favoriteActionTypes.SET_TO_FAVORITES,
    payload,
  })
}
