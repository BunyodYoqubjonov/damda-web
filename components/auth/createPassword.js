import React from 'react'
import { Button, CircularProgress, Typography } from '@mui/material'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import cls from './auth.module.scss'
import { common } from '../../locales/common'
import authService from '../../services/authService'
import { setUser } from '../../redux/actions/authActions/authActions'
import InputPassword from '../inputSimple/inputPassword'

export default function CreatePassword() {
  const dispatch = useDispatch()
  const { locale } = useRouter()
  const userData = useSelector((state) => state.auth.user, shallowEqual)
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      password: '',
      password_confirmation: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      authService
        .updatePasswordByLogin(userData.id, values)
        .then(({ data }) => {
          dispatch(setUser(data))
          router.push('/')
        })
        .finally(() => setSubmitting(false))
    },
    validate: (values) => {
      const errors = {}

      if (!values.password) {
        errors.password = common[locale].passwordRequired
      } else if (values.password.replace(/\s/g, '').length < 6) {
        errors.password = common[locale].passwordRequired
      }
      if (!values.password_confirmation) {
        errors.password_confirmation = common[locale].passwordRequired
      } else if (values.password !== values.password_confirmation) {
        errors.password_confirmation = common[locale].passwordDontMatch
      }
      return errors
    },
  })

  return (
    <form className={cls.loginForm} onSubmit={formik.handleSubmit}>
      <Typography variant='h1' className={cls.title}>
        {common[locale].Reset_password}
      </Typography>

      <div className={cls.inputWrapper3}>
        <InputPassword
          id='password'
          name='password'
          label={common[locale].create_new_password}
          type='password'
          className={cls.input}
          autoComplete='off'
          onChange={formik.handleChange}
          value={formik.values.password}
          errors={formik.errors?.password && formik.touched?.password}
        />
      </div>
      <div style={{ color: 'red', fontSize: '14px', marginBottom: 10 }}>
        {formik.errors?.password && formik.touched?.password
          ? formik.errors?.password
          : ''}
      </div>

      <div className={cls.inputWrapper3}>
        <InputPassword
          id='password_confirmation'
          name='password_confirmation'
          type='password'
          label={common[locale].confirm_password}
          className={cls.input}
          autoComplete='off'
          onChange={formik.handleChange}
          value={formik.values.password_confirmation}
          errors={
            formik.errors?.password_confirmation &&
            formik.touched?.password_confirmation
          }
        />
      </div>
      <div style={{ color: 'red', fontSize: '14px' }}>
        {formik.errors?.password_confirmation &&
        formik.touched?.password_confirmation
          ? formik.errors?.password_confirmation
          : ''}
      </div>

      <div className={cls.actions}>
        <Button fullWidth variant='contained' size='large' type='submit'>
          {formik.isSubmitting ? (
            <CircularProgress color='inherit' size={22} />
          ) : (
            common[locale].submit
          )}
        </Button>
      </div>
      <div className={cls.footer}>
        <Typography>
          {common[locale].have_account}{' '}
          <Link href='/login'>
            <a className={cls.textLink}>{common[locale].sign_in}</a>
          </Link>
        </Typography>
      </div>
    </form>
  )
}
