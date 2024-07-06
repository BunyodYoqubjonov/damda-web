import React from 'react'
import { Checkbox, FormControlLabel, Grid, Popover } from '@mui/material'
import cls from './popover.module.scss'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

export default function AttributesRadio({
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
              <Grid key={index} item xs={12}>
                <FormControlLabel
                  control={
                    <>
                      <Checkbox
                        checked={item.value}
                        name={item.key}
                        onChange={(event) => handleChange(event, name)}
                      />
                      <span
                        style={{ margin: '0 10px' }}
                        className={item.icon}
                      />
                    </>
                  }
                  label={item.label}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </Popover>
  )
}
