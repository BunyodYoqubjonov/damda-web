import React from 'react'
import { FormControlLabel, Popover, Radio } from '@mui/material'
import cls from './popover.module.scss'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

export default function RadioPopover({
  open,
  anchorEl,
  onClose = () => {},
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
  value = '',
  handleChange = () => {},
  list = [],
  name = '',
  multiple,
}) {
  const onChange = (event) => {
    onClose()
    handleChange(event)
  }
  const { locale } = useRouter()
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >
      <div className={cls.root}>
        <div className={cls.wrapper}>
          {list.map((item, index) => (
            <div key={index}>
              <FormControlLabel
                control={
                  <Radio
                    checked={value == item.value}
                    value={item.value}
                    name={name}
                    onChange={onChange}
                  />
                }
                label={multiple ? common[locale][item.label] : item.label}
              />
            </div>
          ))}
        </div>
      </div>
    </Popover>
  )
}
