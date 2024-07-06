import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useDispatch } from 'react-redux'
import { FacebookIcon, GoogleIcon } from '../icons/brandIcons'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import authService from '../../services/authService'
import { setUser } from '../../redux/actions/authActions/authActions'
import cls from './auth.module.scss'
import { setCookie } from 'nookies'

const SocialRegister = () => {
  const dispatch = useDispatch()
  const { locale } = useRouter()
  const router = useRouter()
  const { googleSignIn, facebookSignIn } = useAuth()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn().then((res) => {
        const body = {
          name: res.user.displayName,
          email: res.user.email,
          id: res.user.uid,
        }
        authService.RegisterGoogle(body).then((response) => {
          const token = response.data.token_type + ' ' + response.access_token
          setCookie({}, 'access_token', token, {
            maxAge: 3600 * 24 * 30,
            path: '/',
          })
          dispatch(setUser(response.data.user))
          router.push('/')
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn().then((res) => {
        const body = {
          name: res.user.displayName,
          email: res.user.email,
          id: res.user.uid,
        }
        authService.RegisterFacebook(body).then((response) => {
          const token = response.data.token_type + ' ' + response.access_token
          setCookie({}, 'access_token', token, {
            maxAge: 3600 * 24 * 30,
            path: '/',
          })
          dispatch(setUser(response.data.user))
          router.push('/')
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={cls.row}>
      <button
        type='button'
        className={cls.outlinedButton}
        onClick={handleGoogleSignIn}
      >
        <GoogleIcon /> {common[locale].google_sign_up}
      </button>
      <button
        type='button'
        className={cls.outlinedButton}
        onClick={handleFacebookSignIn}
      >
        <FacebookIcon />
      </button>
    </div>
  )
}

export default SocialRegister
