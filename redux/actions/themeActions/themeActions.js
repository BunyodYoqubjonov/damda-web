import { themeActionTypes } from './themeActionTypes'

export const setLayout = (payload) => {
  return {
    type: themeActionTypes.SET_LAYOUT,
    payload,
  }
}
