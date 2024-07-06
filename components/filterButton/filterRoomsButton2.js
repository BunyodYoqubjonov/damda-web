import React, { useState } from 'react'
import { ArrowDown } from '../icons/commonIcons'
import { Typography } from '@mui/material'
import cls from './filterButton.module.scss'
import RoomAndGuestsPopover2 from '../roomAndGuestsPopover/roomAndGuestsPopover2'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

export default function FilterRoomsButton2({ label, data }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { locale } = useRouter()
  const handleClick = (event) => setAnchorEl(event?.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <button className={cls.outlinedButton} onClick={handleClick}>
        <div className={cls.caption}>
          {label} <ArrowDown />
        </div>
        <Typography sx={{ textAlign: 'left' }}>
          {data.cartAdults
            ? ` ${data.cartAdults ?? 0} ${common[locale].adults}`
            : ''}
          {data.cartChildren
            ? `, ${data.cartChildren ?? 0} ${common[locale].children}`
            : ''}
        </Typography>
      </button>

      <RoomAndGuestsPopover2
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        data={data}
      />
    </>
  )
}
