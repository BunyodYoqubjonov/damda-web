import React from 'react'
import {
  Checkbox,
  Button,
  CircularProgress,
  FormControlLabel,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/actions/authActions/authActions'
import cls from './auth.module.scss'
import { common } from '../../locales/common'
import authService from '../../services/authService'
import InputSimple from '../inputSimple/inputSimple'
import InputPassword from '../inputSimple/inputPassword'

export default function RegistrationDetailsForm() {
  const dispatch = useDispatch()
  const { push, locale } = useRouter()
  const selected = useSelector((state) => state.auth.user, shallowEqual)
  const formik = useFormik({
    initialValues: {
      lastname: '',
      password: '',
      firstname: '',
      password_confirm: '',
      privacy: true,
    },
    onSubmit: (values, { setSubmitting }) => {
      const postData = {
        lastname: values.lastname,
        firstname: values.firstname,
        password: values.password,
        password_confirmation: values.password_confirm,
        id: selected.id,
      }
      authService
        .updatePassword(postData)
        .then(({ data }) => {
          dispatch(setUser(data))
          push('/')
        })
        .finally(() => setSubmitting(false))
    },
    validate: (values) => {
      const errors = {}

      if (!values.firstname) {
        errors.firstname = 'Required'
      }
      if (!values.lastname) {
        errors.lastname = 'Required'
      }
      if (!values.password) {
        errors.password = common[locale].passwordRequired
      } else if (values.password.replace(/\s/g, '').length < 6) {
        errors.password = common[locale].passwordRequired
      }
      if (!values.password_confirm) {
        errors.password_confirm = common[locale].passwordRequired
      } else if (values.password !== values.password_confirm) {
        errors.password_confirm = common[locale].passwordDontMatch
      }
      if (!values.privacy) {
        errors.privacy = common[locale].required
      }

      return errors
    },
  })

  return (
    <form className={cls.loginForm} onSubmit={formik.handleSubmit}>
      <Typography variant='h1' className={cls.title}>
        {common[locale].registration}
      </Typography>
      <div className={cls.inputWrapper}>
        <InputSimple
          id='firstname'
          name='firstname'
          label={common[locale].first_name}
          placeholder={common[locale].first_name}
          className={cls.input}
          autoComplete='off'
          onChange={formik.handleChange}
          value={formik.values.firstname}
          errors={formik.errors?.firstname && formik.touched?.firstname}
        />
      </div>
      <div className={cls.inputWrapper}>
        <InputSimple
          id='lastname'
          name='lastname'
          className={cls.input}
          autoComplete='off'
          placeholder={common[locale].last_name}
          label={common[locale].last_name}
          onChange={formik.handleChange}
          value={formik.values.lastname}
          errors={formik.errors?.lastname && formik.touched?.lastname}
        />
      </div>
      <div className={cls.inputWrapper}>
        <InputPassword
          id='password'
          name='password'
          type='password'
          label={common[locale].password}
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

      <div className={cls.inputWrapper}>
        <InputPassword
          id='password_confirm'
          name='password_confirm'
          type='password'
          className={cls.input}
          autoComplete='off'
          label={common[locale].confirmation_password}
          onChange={formik.handleChange}
          value={formik.values.password_confirm}
          errors={
            formik.errors?.password_confirm && formik.touched?.password_confirm
          }
        />
      </div>
      <div style={{ color: 'red', fontSize: '14px' }}>
        {formik.errors?.password_confirm && formik.touched?.password_confirm
          ? formik.errors?.password_confirm
          : ''}
      </div>

      <div className={cls.checkboxWrapper}>
        <FormControlLabel
          control={
            <Checkbox
              name='privacy'
              onChange={formik.handleChange}
              checked={formik.values.privacy}
            />
          }
          label={
            <Typography className={cls.label}>
              {common[locale].i_agree_to}{' '}
              <a href='#' className={cls.textLink}>
                {common[locale].privacy_policy}
              </a>
            </Typography>
          }
        />
      </div>
      <div style={{ color: 'red', fontSize: '14px' }}>
        {formik.errors?.privacy && formik.touched?.privacy
          ? formik.errors?.privacy
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
