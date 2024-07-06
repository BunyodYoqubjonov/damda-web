import React, { useState } from 'react'
import { ArrowDown } from '../icons/commonIcons'
import { Typography } from '@mui/material'
import cls from './filterButton.module.scss'
import DateRangePopover from '../popover/dateRangePopover'
import { format } from 'date-fns'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

export default function FilterDateButton({ values, handleChange, disabled }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { locale } = useRouter()
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const onChange = (event) => {
    handleChange(event)
    handleClose()
  }

  return (
    <>
      <button className={cls.outlinedButton} onClick={handleClick}>
        <div className={cls.wrapper}>
          <div className={cls.box}>
            <div className={cls.caption}>
              <span className={cls.text}>{common[locale].arrival}</span>{' '}
              <ArrowDown />
            </div>
            <Typography sx={{ textAlign: 'left', whiteSpace: 'nowrap' }}>
              {values?.from && format(values.from, 'dd MMM yyyy')}
            </Typography>
          </div>
          <div className={cls.box}>
            <div className={cls.caption}>
              <span className={cls.text}>{common[locale].departure}</span>{' '}
              <ArrowDown />
            </div>
            <Typography sx={{ textAlign: 'left', whiteSpace: 'nowrap' }}>
              {values?.to && format(values.to, 'dd MMM yyyy')}
            </Typography>
          </div>
        </div>
      </button>

      <DateRangePopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        value={values}
        handleChange={onChange}
        disabled={disabled}
      />
    </>
  )
}
