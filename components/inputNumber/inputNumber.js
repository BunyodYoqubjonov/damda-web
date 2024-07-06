import React from 'react'
import { TextField } from '@mui/material'
import NumberFormat from './numberFormat'

export default function InputNumber({
  label,
  name,
  onChange,
  value,
  ...props
}) {
  return (
    <TextField
      variant='standard'
      label={label}
      name={name}
      InputProps={{
        inputComponent: NumberFormat,
      }}
      onChange={onChange}
      value={value}
      {...props}
    />
  )
}
