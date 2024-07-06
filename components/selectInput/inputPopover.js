import React from 'react'
import {
  CircularProgress,
  FormControlLabel,
  Grid,
  Popover,
  Radio,
} from '@mui/material'
import cls from './selectInput.module.scss'

export default function InputPopover({
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
          <Grid container rowSpacing={1}>
            {list?.map((item, index) => (
              <Grid key={item.value + index} item xs={12}>
                <div className={cls.row}>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={value === item.value}
                        value={item.value}
                        name={name}
                        onChange={handleChange}
                      />
                    }
                    label={item.label}
                    sx={{ width: '100%', height: '100%' }}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </Popover>
  )
}
