import React, { useState } from 'react'
import { Typography } from '@mui/material'
import { DamdaLogo } from '../icons/commonIcons'
import cls from './auth.module.scss'
import RegistrationDetailsForm from './registrationDetailsForm'
import RegistrationForm from './registrationForm'
import ConfirmPhone from './confirmPhone'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { common } from 'locales/common'

const renderForm = (step, setStep, verifyPhone, setVerifyPhone) => {
  switch (step) {
    case 0:
      return (
        <RegistrationForm setStep={setStep} setVerifyPhone={setVerifyPhone} />
      )

    case 1:
      return (
        <ConfirmPhone
          setStep={setStep}
          verifyPhone={verifyPhone}
          setVerifyPhone={setVerifyPhone}
        />
      )

    case 2:
      return (
        <RegistrationDetailsForm setStep={setStep} verifyPhone={verifyPhone} />
      )
    default:
      break
  }
}

export default function Registration() {
  const [step, setStep] = useState(0);
  const {locale} = useRouter()
  const [verifyPhone, setVerifyPhone] = useState(null)

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

        <div className={`${cls.imgWrapper} ${cls.register}`}>
          <img src='/images/register_background.jpg' alt='Damda' />
          <div className={cls.caption}>
            <Typography>{common[locale].place}</Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
