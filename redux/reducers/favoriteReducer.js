import { favoriteActionTypes } from '../actions/favoriteActions/favoriteActionTypes'

const initialState = {
  favorites: [],
}

const favoriteReducer = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case favoriteActionTypes.CLEAR_FAVORITES:
      return {
        ...state,
        favorites: [],
      }
    case favoriteActionTypes.SET_TO_FAVORITES:
      return {
        ...state,
        favorites: setItemToFavorites(state.favorites, payload),
      }
    default:
      return state
  }
}

function setItemToFavorites(favorites, payload) {
  const isExist = !!favorites.find((item) => item.id === payload.id)
  if (isExist) {
    return favorites.filter((item) => item.id !== payload.id)
  }
  return [...favorites, payload]
}

export default favoriteReducer
