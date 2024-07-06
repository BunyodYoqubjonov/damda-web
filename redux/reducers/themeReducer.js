import { themeActionTypes } from '../actions/themeActions/themeActionTypes'

const initialState = {
  layout: 'horizontal',
}

const themeReducer = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case themeActionTypes.SET_LAYOUT:
      return {
        ...state,
        layout: payload,
      }

    default:
      return state
  }
}

export default themeReducer
