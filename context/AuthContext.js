import { createContext, useContext } from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from 'firebase/auth'
import { auth } from '../services/fireBase'

export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleAuthProvider)
  }

  function facebookSignIn() {
    const facebookAuthProvider = new FacebookAuthProvider()
    facebookAuthProvider.addScope("email")
    return signInWithPopup(auth, facebookAuthProvider)
  }

  return (
    <AuthContext.Provider value={{ googleSignIn, facebookSignIn }}>
      {children}
    </AuthContext.Provider>
  )
}
