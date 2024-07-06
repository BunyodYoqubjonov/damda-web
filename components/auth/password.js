import React, { useState } from 'react'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { DamdaLogo } from '../icons/commonIcons'
import cls from './auth.module.scss'
import SendSms from './sendSms'
import ResetPassword from './resetPassword'
import CreatePassword from './createPassword'
import { common } from '../../locales/common'

const renderForm = (step, setStep, verifyPhone, setVerifyPhone) => {
  switch (step) {
    case 0:
      return <ResetPassword setStep={setStep} setVerifyPhone={setVerifyPhone} />

    case 1:
      return (
        <SendSms
          setStep={setStep}
          verifyPhone={verifyPhone}
          setVerifyPhone={setVerifyPhone}
        />
      )

    case 2:
      return <CreatePassword setStep={setStep} verifyPhone={verifyPhone} />
    default:
      break
  }
}

export default function Password() {
  const [step, setStep] = useState(0)
  const [verifyPhone, setVerifyPhone] = useState(null)
  const { locale } = useRouter()

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
            {renderForm(step, setStep, verifyPhone, setVerifyPhone)}
          </div>
        </div>
        <div className={cls.imgWrapper}>
          <img src='/images/login_background.jpg' alt='Italy park' />
          <div className={cls.caption}>
            <Typography>{common[locale].place}</Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
