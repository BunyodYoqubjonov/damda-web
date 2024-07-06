import React, { useState } from 'react'
import { ArrowDown } from '../icons/commonIcons'
import { Typography } from '@mui/material'
import cls from './selectInput.module.scss'
import InputPopover from './inputPopover'

export default function SelectInput({
  label,
  value,
  list,
  handleChange,
  name,
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event, current) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onSelect = (event) => {
    handleChange(event)
    setAnchorEl(null)
  }

  return (
    <>
      <button type='button' className={cls.input} onClick={handleClick}>
        <div className={cls.label}>
          <Typography sx={{ textAlign: 'left' }}>
            {value ? list?.find((item) => item.value === value)?.label : label}
          </Typography>
          <ArrowDown />
        </div>
      </button>

      <InputPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        list={list}
        value={value}
        name={name}
        handleChange={onSelect}
      />
    </>
  )
}
