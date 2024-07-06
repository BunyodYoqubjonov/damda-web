import React from 'react'
import { FormControlLabel, Grid, Popover, Radio } from '@mui/material'
import cls from './popover.module.scss'
import { useRouter } from 'next/router'
import { navigation } from '../../locales/navigation'

export default function ResidentPopover({
  open,
  anchorEl,
  onClose = () => {},
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
  value = '',
  handleChange = () => {},
  list = [],
  name = '',
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
          <Grid container spacing={2}>
            {list.map((item, index) => (
              <Grid key={index} item xs={6}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={value == item.value}
                      value={item.value}
                      name={name}
                      onChange={onChange}
                    />
                  }
                  label={
                    navigation[locale][item.label]
                      ? navigation[locale][item.label]
                      : item.label
                  }
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </Popover>
  )
}
