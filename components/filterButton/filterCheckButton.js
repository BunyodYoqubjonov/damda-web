import React, { useState } from 'react'
import { ArrowDown } from '../icons/commonIcons'
import { Typography } from '@mui/material'
import cls from './filterButton.module.scss'
import RadioPopover2 from '../popover/radioPopover2'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

export default function FilterCheckButton({
  label,
  value,
  list,
  handleChange,
  name,
  multiple,
  className,
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const { locale } = useRouter()

  return (
    <>
      <button
        type='button'
        className={className ? className : cls.outlinedButton}
        onClick={handleClick}
      >
        <div className={cls.caption}>
          <span className={cls.text}>{label}</span> <ArrowDown />
        </div>
        <Typography
          sx={{
            textAlign: 'left',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            overflow: 'hidden',
            width: multiple ? '90%' : '100%',
          }}
        >
          {multiple
            ? common[locale][list?.find((item) => item.value == value)?.label]
            : list?.find((item) => item.value == value)?.label}
        </Typography>
      </button>

      <RadioPopover2
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        list={list}
        value={value}
        multiple={multiple}
        name={name}
        handleChange={handleChange}
      />
    </>
  )
}
