import React, { useState } from 'react'
import cls from './inputPassword.module.scss'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export default function InputPassword(props) {
  const { label, name, errors } = props
  const [passwordType, setPasswordType] = useState('password')

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
      return
    }
    setPasswordType('password')
  }

  return (
    <div className={`${cls.inputWrapper} ${errors ? cls.error : ''}`}>
      <label htmlFor={name} className={cls.label}>
        {label}
      </label>
      <input
        id={name}
        className={cls.input}
        autoComplete='off'
        {...props}
        type={passwordType}
      />
      <button type='button' className={cls.btn} onClick={togglePassword}>
        {passwordType === 'password' ? (
          <RemoveRedEyeIcon />
        ) : (
          <VisibilityOffIcon />
        )}
      </button>
    </div>
  )
}
