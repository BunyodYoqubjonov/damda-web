import React from 'react'
import { Button, CircularProgress, Typography } from '@mui/material'
import { DamdaLogo } from '../icons/commonIcons'
import Link from 'next/link'
import cls from './auth.module.scss'
import { useFormik } from 'formik'
import authService from '../../services/authService'
import { setCookie } from 'nookies'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/actions/authActions/authActions'
import { useRouter } from 'next/router'
import { common } from '../../locales/common'
import InputPassword from '../inputSimple/inputPassword'
import InputSimple from '../inputSimple/inputSimple'
import SocialLogin from './socialLogin'

export default function Login() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { locale } = useRouter()

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      let body
 
      if (values.login.includes('@')) {
        body = {
          email: values.login,
          password: values.password,
          lang: locale
        }
      } else {
        const phone = values.login.replace('+', '')
        body = {
          phone,
          password: values.password,
          lang: locale
        }
      }
      authService
        .login(body)
        .then(({ data }) => {
          const token = data.token_type + ' ' + data.access_token
          setCookie({}, 'access_token', token, {
            maxAge: 3600 * 24 * 30,
            path: '/',
          })
          dispatch(setUser(data.user))
          router.push('/')
        })
        .finally(() => setSubmitting(false))
    },
    validate: (values) => {
      const errors = {}
      if (!values.login) {
        errors.login = common[locale].required
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      )
        if (!values.password) {
          errors.password = 'Required'
        }
      return errors
    },
  })

  return (
    <div className={cls.root}>
      <div className={cls.wrapper}>
        <div className={cls.login}>
          <div className={cls.loginWrapper}>
            <div className={cls.brandLogo}>
              <Link href='/'>
                <a>
                  <DamdaLogo />
                </a>
              </Link>
            </div>
            <form className={cls.loginForm} onSubmit={formik.handleSubmit}>
              <Typography variant='h1' className={cls.title}>
                {common[locale].sign_in}
              </Typography>
              <div className={cls.inputWrapper}>
                <InputSimple
                  id='emailAndPhone'
                  label={common[locale].login}
                  name='login'
                  className={cls.input}
                  placeholder={common[locale].email_or_phone}
                  autoComplete='off'
                  type='text'
                  onChange={formik.handleChange}
                  value={formik.values.login}
                  errors={formik.errors?.login && formik.touched?.login}
                />
              </div>
              <div className={cls.inputWrapper}>
                <InputPassword
                  className={cls.input}
                  name='password'
                  label={common[locale].password}
                  type='password'
                  placeholder={common[locale].password}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  errors={formik.errors?.password && formik.touched?.password}
                />
              </div>
              <div className={cls.forgotPassword}>
                <Link href='/forgotPassword' className={cls.textLink}>
                  <a> {common[locale].forgot_password}</a>
                </Link>
              </div>
              <div className={cls.actions}>
                <Button type='submit' fullWidth variant='contained'>
                  {formik.isSubmitting ? (
                    <CircularProgress color='inherit' size={22} />
                  ) : (
                    common[locale].sign_in
                  )}
                </Button>

                <SocialLogin />
              </div>
              <div className={cls.footer}>
                <Typography>
                  {common[locale].account}{' '}
                  <Link href='/registration'>
                    <a className={cls.textLink}>{common[locale].sign_up}</a>
                  </Link>
                </Typography>
              </div>
            </form>
          </div>
        </div>
        <div className={cls.imgWrapper}>
          <img src='/images/login_background.jpg' alt='Damda' />
          <div className={cls.caption}>
            <Typography>{common[locale].place}</Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
