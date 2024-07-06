import React from 'react'
import cls from './inputSimple.module.scss'

export default function InputSimple(props) {
  const { label, name, display, type, errors } = props

  return (
    <div
      className={`${cls.inputWrapper} ${errors ? cls.error : ''}`}
      style={{ display: display }}
    >
      <label htmlFor={name} className={cls.label}>
        {label}
      </label>
      <input
        id={name}
        className={cls.input}
        autoComplete='off'
        {...props}
        type={type}
      /> 
    </div>
  )
}
