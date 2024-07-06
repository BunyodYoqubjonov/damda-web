import React, { useState } from 'react'
import { Button, CircularProgress, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cls from './auth.module.scss'
import { common } from '../../locales/common'
import authService from '../../services/authService'
import Countdown from '../../utils/countDown'
import { ExlamationIcon } from '../icons/commonIcons'
import { setCookie } from 'nookies'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/actions/authActions/authActions'

export default function ConfirmPhone({ setStep, verifyPhone, setVerifyPhone }) {
  const [code, setCode] = useState('')
  const { locale } = useRouter()
  const [loading, setLoading] = useState(false)
  const [isTimeOver, setIsTimeOver] = useState(false)
  const dispatch = useDispatch()
 
  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    const params = {
      verifyId: verifyPhone?.verifyId,
      verifyCode: code,
    }
    if (verifyPhone?.phone) {
      authService
        .verifyPhoneCode(params)
        .then(({ data }) => {
          const token = 'Bearer' + ' ' + data.token
          setCookie({}, 'access_token', token, {
            maxAge: 3600 * 24 * 30,
            path: '/',
          })
          dispatch(setUser(data.user))
          setStep(2)
        })
        .finally(() => setLoading(false))
    } else if (verifyPhone?.email) {
      authService
        .verifyPhoneCode(params)
        .then(({ data }) => {
          const token = 'Bearer' + ' ' + data.token
          setCookie({}, 'access_token', token, {
            maxAge: 3600 * 24 * 30,
            path: '/',
          })
          dispatch(setUser(data.user))
          setStep(2)
        })
        .finally(() => setLoading(false))
    }
  }

  const resendCode = () => {
    setIsTimeOver(false)
    authService
      .resetPassword({ phone: verifyPhone?.login })
      .then(({ data }) => {
        setVerifyPhone(data)
      })
  }

  return (
    <form className={cls.loginForm} onSubmit={handleSubmit}>
      <Typography variant='h1' className={cls.title}>
        {common[locale].registration}
      </Typography>
      <Typography className={cls.caption}>
        {common[locale].enter_code_label} {verifyPhone?.phone}
      </Typography>
      <div className={`${cls.inputWrapper2} ${cls.codeWrapper}`}>
        <input
          id='verifyCode'
          name='verifyCode'
          className={cls.input}
          placeholder={common[locale].enter_code}
          autoComplete='off'
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
        <label htmlFor='verifyCode' className={cls.labelCode}>
          <Countdown setIsTimeOver={setIsTimeOver} isTimeOver={isTimeOver} />
        </label>
      </div>
      {isTimeOver ? (
        <Typography className={cls.caption}>
          <ExlamationIcon />
          {common[locale].code_not_come}{' '}
          <Button variant='text' onClick={resendCode}>
            {common[locale].send_again}
          </Button>
        </Typography>
      ) : (
        ''
      )}

      <div className={cls.actions}>
        <Button
          fullWidth
          variant='contained'
          size='large'
          type='submit'
          disabled={!code}
        >
          {loading ? (
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
