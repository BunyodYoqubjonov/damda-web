import React, { useState } from 'react'
import {
  Checkbox,
  Button,
  CircularProgress,
  FormControlLabel,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import cls from './auth.module.scss'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import authService from '../../services/authService'
import InputSimple from '../inputSimple/inputSimple'
import SocialRegister from './socialRegister'
import { useFormik } from 'formik'

export default function RegistrationForm({ setStep, setVerifyPhone }) {
  const { locale } = useRouter()
  const [error, setError] = useState('')
  const [agreed, setAgreed] = useState(true)

  const formik = useFormik({
    initialValues: {
      login: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)

      let body
      if (values.login.includes('@')) {
        body = {
          email: values.login,
          lang: locale
        }
      } else {
        const phone = values.login.replace('+', '')
        body = {
          phone,
          lang: locale,
        }
      }
      authService
        .register(body)
        .then(({ data }) => {
          setStep(1)
          setVerifyPhone({ ...data, login: values.login })
        })
        .catch((e) => {
          console.log(e)
          setError(e?.data?.params)
        })
        .finally(() => setSubmitting(false))
    },
    validate: (values) => {
      setError("")
      const errors = {}
      if (!values.login) {
        errors.login = common[locale].required;
        setError({email: common[locale].required})
      } else if (values.login.includes('@')) {
        if (
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.login)
        ) {
          errors.login = common[locale].error_email
          setError({email: common[locale].error_email})
        }
      } else if (!/^([0-9\s\-\+\(\)]*)$/i.test(values.login)) {
        errors.login = common[locale].error_phone
        setError({phone: common[locale].error_phone})
      }
      return errors
    },

    validateOnBlur: true
  })

  return (
    <form className={cls.loginForm} onSubmit={formik.handleSubmit}>
      <Typography variant='h1' className={cls.title}>
        {common[locale].registration}
      </Typography>
      <InputSimple
        name='login'
        label={common[locale].phone_number}
        placeholder={common[locale].phone_number}
        onChange={formik.handleChange}
        value={formik.values.login}
        errors={formik.errors?.login && formik.touched?.login}
        sx={{ width: '100%' }}
      />
      <div style={{ color: 'red' }}>
        {error?.phone ? error?.phone : error?.email}
      </div>
      <div className={cls.checkboxWrapper}>
        <FormControlLabel
          control={<Checkbox name='privacy' />}
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          label={
            locale === 'uz' ? (
              <Typography className={cls.label}>
                <a href='#' className={cls.textLink}>
                  {common[locale].privacy_policy}
                </a>
                ga roziman
              </Typography>
            ) : (
              <Typography className={cls.label}>
                {common[locale].i_agree_to}{' '}
                <a href='#' className={cls.textLink}>
                  {common[locale].privacy_policy}
                </a>
              </Typography>
            )
          }
        />
      </div>
      <div className={cls.actions}>
        <Button
          fullWidth
          variant='contained'
          size='large'
          type='submit'
          disabled={!agreed}
        >
          {formik.isSubmitting ? (
            <CircularProgress color='inherit' size={22} />
          ) : (
            common[locale].send_sms_code
          )}
        </Button>
        <SocialRegister />
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
