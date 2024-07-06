import React, { useState } from 'react'
import {
  Checkbox,
  Button,
  CircularProgress,
  FormControlLabel,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import cls from '../../components/auth/auth.module.scss'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import authService from '../../services/authService'
import InputSimple from '../../components/inputSimple/inputSimple'

export default function ResetPassword({ setStep, setVerifyPhone }) {
  const [loading, setLoading] = useState(false)
  const { locale } = useRouter()
  const [login, setLogin] = useState('')
  const isValid = !!login && !login.includes('_')
  const [agreed, setAgreed] = useState(true)

  const handleSubmit = (event) => {
    let body
    if (login.includes('@')) {
      body = {
        email: login,
      }
    } else {
      const phone = login.replace('+', '')
      body = {
        phone,
      }
    }
    event.preventDefault()
    setLoading(true)
    authService
      .resetPassword(body)
      .then(({ data }) => {
        setStep(1)
        setVerifyPhone({ ...data, login })
      })
      .finally(() => setLoading(false))
  }

  return (
    <form className={cls.loginForm} onSubmit={handleSubmit}>
      <Typography variant='h1' className={cls.title}>
        {common[locale].Reset_password}
      </Typography>
      <InputSimple
        name='phone'
        label={common[locale].phone_number}
        onChange={(e) => setLogin(e.target.value)}
        value={login}
        sx={{ width: '100%' }}
      />
      <div className={cls.checkboxWrapper}>
        <FormControlLabel
          control={<Checkbox name='privacy' />}
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
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
      <div className={cls.actions}>
        <Button
          fullWidth
          variant='contained'
          size='large'
          type='submit'
          disabled={!isValid || !agreed}
        >
          {loading ? (
            <CircularProgress color='inherit' size={22} />
          ) : (
            common[locale].send_sms_code
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
