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
import { Box } from '@mui/system'
import { setCookie } from 'nookies'
import { useRouter } from 'next/router'
import { CloseIcon } from '../icons/commonIcons'
import { common } from '../../locales/common'

const languages = [
  {
    value: 'en',
    label: 'English • United States',
  },
  {
    value: 'ru',
    label: 'Русский • Россия',
  },
  {
    value: 'uz',
    label: 'O’zbek tili(lotin) • O’zbekiston',
  },
  // {
  //   value: 'krl',
  //   label: 'Узбек тили(кирил) • Узбекистон',
  // },
]

export default function LangMenu({ open, handleClose }) {
  const router = useRouter()
  const [value, setValue] = useState(router.locale)

  const handleChange = (event) => {
    const currentLocale = event.target.value
    setValue(currentLocale)
    router.push(router.asPath, router.asPath, { locale: currentLocale })
    setCookie(null, 'locale', currentLocale, {
      maxAge: 10 * 365 * 24 * 60 * 60,
      path: '/',
    })
    handleClose()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{common[router.locale].language}</DialogTitle>
      <IconButton
        size='small'
        sx={{ position: 'absolute', top: 20, right: 12 }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      <FormGroup>
        <Grid container columnSpacing={6} mt={2}>
          {languages.map((item, index) => (
            <Grid key={index} item xs={12} sm={6}>
              <Box width='100%' p={2} borderBottom='1px solid #D2D2D765'>
                <FormControlLabel
                  control={
                    <Radio
                      checked={value === item.value}
                      value={item.value}
                      name='language'
                      onChange={handleChange}
                    />
                  }
                  label={item.label}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </FormGroup>
    </Dialog>
  )
}
