import React, { useState } from 'react'
import { ArrowDown } from '../icons/commonIcons'
import { Typography } from '@mui/material'
import cls from './HomeFilter.module.scss'
import RadioPopover from '../popover/radioPopover'
import { useRouter } from 'next/router'

export default function HomeFilter({ label, value, list, handleChange, name }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { locale } = useRouter()
  const handleClick = (event, current) => {
    setAnchorEl(event?.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <button className={cls.outlinedButton} onClick={handleClick}>
        <div className={cls.caption}>
          {label} <ArrowDown />
        </div>
        <Typography
          sx={{
            textAlign: 'left',
            textOverflow: 'ellipsis',
            whiteSpace: 'hidden',
            overflow: 'hidden',
          }}
        >
          {value === undefined
            ? null
            : `${list?.find((item) => item.value == value)?.label}`}
        </Typography>
      </button>

      <RadioPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        list={list}
        value={value}
        name={name}
        handleChange={handleChange}
      />
    </>
  )
}
