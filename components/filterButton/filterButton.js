import React, { useState } from 'react'
import { ArrowDown } from '../icons/commonIcons'
import { Typography } from '@mui/material'
import cls from './filterButton.module.scss'
import RadioPopover from '../popover/radioPopover'
import CheckboxPopover from '../popover/checkboxPopover'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

export default function FilterButton({
  label,
  value,
  list,
  handleChange,
  name,
  multiple,
  closeEvent = () => {},
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { locale } = useRouter()
  const handleClick = (event, current) => setAnchorEl(event?.currentTarget)
  const handleClose = () => {
    setAnchorEl(null)
    closeEvent()
  }

  return (
    <>
      <button className={cls.outlinedButton} onClick={handleClick}>
        <div className={cls.caption}>
          <span className={cls.text}>{label}</span> <ArrowDown />
        </div>
        <Typography
          sx={{
            textAlign: 'left',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {multiple
            ? `${list?.filter((item) => item.value).length}
                         ${common[locale].selected}`
            : common[locale][list?.find((item) => item.value == value)?.label]}
        </Typography>
      </button>

      {multiple ? (
        <CheckboxPopover
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          list={list}
          value={value}
          name={name}
          handleChange={handleChange}
        />
      ) : (
        <RadioPopover
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          list={list}
          value={value}
          name={name}
          handleChange={handleChange}
        />
      )}
    </>
  )
}
