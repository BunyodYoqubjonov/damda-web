import React, { useState } from 'react'
import { ArrowDown } from '../icons/commonIcons'
import { Typography } from '@mui/material'
import cls from './filterButton.module.scss'
import DachaGuestsPopover from '../dachaGuestsPopover/dachaGuestsPopover'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { common } from '../../locales/common'

export default function FilterGuestsButton({ label }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { locale } = useRouter()

  const { adult, children } = useSelector((state) => state.order.order)

  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <button className={cls.outlinedButton} onClick={handleClick}>
        <div className={cls.caption}>
          {common[locale][label]} <ArrowDown />
        </div>
        <Typography
          sx={{ textAlign: 'left' }}
        >{`${adult} ${common[locale].adults}, ${children} ${common[locale].children}`}</Typography>
      </button>

      <DachaGuestsPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
      />
    </>
  )
}
