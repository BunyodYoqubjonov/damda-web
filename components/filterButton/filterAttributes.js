import React, { useState } from 'react'
import { ArrowDown } from '../icons/commonIcons'
import { Typography } from '@mui/material'
import cls from './filterButton.module.scss'
import AttributesRadio from '../popover/attributesRadio'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

export default function FilterAttributes({
  label,
  value,
  list,
  handleChange,
  name,
  multiple,
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event?.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const { locale } = useRouter()
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
          {multiple
            ? `${list?.filter((item) => item.value).length} ${
                common[locale].selected
              }`
            : list?.find((item) => item.value == value)?.label}
        </Typography>
      </button>

      {multiple && (
        <AttributesRadio
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
