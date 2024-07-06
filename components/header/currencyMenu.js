import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Radio,
} from '@mui/material'
import { CloseIcon } from '../icons/commonIcons'
import { Box } from '@mui/system'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

const currencies = [
  {
    value: 'USD',
    label: 'USD • United States dollar',
  },
  {
    value: 'UZS',
    label: 'UZS • Uzbekistan sum',
  },
  {
    value: 'RUB',
    label: 'RUB • Russian ruble',
  },
  {
    value: 'EUR',
    label: 'EUR • Euro',
  },
]

export default function CurrencyMenu({ open, handleClose, setValue, value }) {
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  const { locale } = useRouter()

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{common[locale].Currency}</DialogTitle>
      <IconButton
        size='small'
        sx={{ position: 'absolute', top: 20, right: 12 }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      <FormGroup>
        <Grid container columnSpacing={6} mt={2}>
          <Grid item xs={12}>
            {currencies.map((item, index) => (
              <Box
                key={index}
                width='100%'
                p={2}
                borderBottom='1px solid #D2D2D765'
                sx={{
                  '&:last-child': {
                    borderBottom: 'none',
                    paddingBottom: 0,
                  },
                }}
              >
                <FormControlLabel
                  control={
                    <Radio
                      checked={value === item.value}
                      value={item.value}
                      name='currency'
                      onChange={handleChange}
                    />
                  }
                  label={item.label}
                />
              </Box>
            ))}
          </Grid>
        </Grid>
      </FormGroup>
    </Dialog>
  )
}
