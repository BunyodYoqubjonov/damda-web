import React, { useState } from 'react'
import { ArrowDown } from '../icons/commonIcons'
import { Typography } from '@mui/material'
import cls from './filterButton.module.scss'
import RoomAndGuestsPopover from '../roomAndGuestsPopover/roomAndGuestsPopover'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

export default function FilterRoomsButton({
  label,
  value,
  list,
  handleChange,
  name,
  isDacha
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { adult, children, room } = value
  const { locale } = useRouter()
  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <button className={cls.outlinedButton} onClick={handleClick}>
        <div className={cls.caption}>
          <span className={cls.text}>{label}</span> <ArrowDown />
        </div>
        <Typography sx={{ textAlign: 'left' }}>
          {!!room ? `${room} ${common[locale].rooms}` : ''}
          {!!adult ? `, ${adult} ${isDacha ? common[locale].guests : common[locale].adults}` : ''}
          {!!children ? `, ${children} ${common[locale].children}` : ''}
        </Typography>
      </button>

      <RoomAndGuestsPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        list={list}
        value={value}
        name={name}
        handleChange={handleChange}
        isDacha={isDacha}
      />
    </>
  )
}
