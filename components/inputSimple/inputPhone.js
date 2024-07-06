import React from 'react'
import ReactInputMask from 'react-input-mask'
import cls from './inputSimple.module.scss'

export default function InputPhone(props) {
  const { label, name } = props

  return (
    <div className={cls.inputWrapper}>
      <label htmlFor={name} className={cls.label}>
        {label}
      </label>
      <ReactInputMask
        mask='+\9\98 99 999 99 99'
        id={name}
        className={cls.input}
        {...props}
      />
    </div>
  )
}
