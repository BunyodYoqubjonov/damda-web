import React from 'react'
import { FormControlLabel, Switch, Typography } from '@mui/material'
import styled from '@emotion/styled'
import cls from './switchInput.module.scss'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#F19204',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}))

export default function SwitchInput({ label, value, onChanges = {}, name }) {
  const { locale } = useRouter()
  return (
    <div className={cls.root}>
      <div className={cls.wrapper}>
        <div className={cls.item}>
          <Typography variant='caption'>{label}</Typography>
          <Typography sx={{ fontWeight: 500 }}>
            {value ? common[locale].yes : common[locale].no}
          </Typography>
        </div>
        <div className={cls.switch}>
          <FormControlLabel
            name={name}
            value={value}
            onChanges={value}
            control={
              <IOSSwitch sx={{ m: 1 }} checked={value} onChange={onChanges} />
            }
          />
        </div>
      </div>
    </div>
  )
}
