import { authActionTypes } from './authActionTypes'

export const setUser = (user) => {
  return {
    type: authActionTypes.SET_USER,
    payload: user,
  }
}

export const logout = () => ({
  type: authActionTypes.LOGOUT,
})
