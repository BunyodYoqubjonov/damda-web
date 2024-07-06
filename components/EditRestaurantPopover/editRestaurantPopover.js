import React from 'react'
import {
  Box,
  Button,
  Radio,
  FormControlLabel,
  InputLabel,
  Popover,
  Select,
  Typography,
} from '@mui/material'
import cls from './editRestaurantPopover.module.scss'
import FormControl from '@mui/material/FormControl'
import { common } from '../../locales/common'
import MenuItem from '@mui/material/MenuItem'
import { useRouter } from 'next/router'

export default function EditRestaurantPopover({
  open,
  anchorEl,
  name,
  formik2,
  onClose = () => {},
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
}) {
  const { locale } = useRouter()
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      PaperProps={{ sx: { maxWidth: 'calc(100vw - 32px)' } }}
    >
      <div className={cls.root}>
        <div className={cls.wrapper}>
          <div className={cls.row}>
            <Typography>Type</Typography>
            <div className={cls.radioWrapper}>
              <FormControlLabel
                label={name}
                control={<Radio name={name} checked={true} />}
              />
            </div>
          </div>
          <div className={cls.row}>
            <Typography>
              {common[locale].distance} {name}
            </Typography>
            <input
              name='distance'
              placeholder='Type here'
              autoComplete='off'
              value={formik2.values?.distance}
              onChange={formik2.handleChange}
              className={cls.input}
            />
          </div>
          <div className={cls.actions}>
            <Button
              variant='contained'
              sx={{
                backgroundColor: 'common.green',
                '&:hover': {
                  backgroundColor: 'common.green',
                },
              }}
              onClick={formik2.handleSubmit}
            >
              Save
            </Button>
            <Button variant='outlined' onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Popover>
  )
}
