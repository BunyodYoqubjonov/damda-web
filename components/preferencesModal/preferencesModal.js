import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  Button,
  Typography,
  useMediaQuery,
} from '@mui/material'
import cls from './preferencesModal.module.scss'
import styled from '@emotion/styled'
import FilterButton from '../filterButton/filterButton'
import { Box } from '@mui/system'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

const CenteredDialog = styled(Dialog)({
  '& .MuiDialog-container': {
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .MuiDialog-paper': {
    padding: '70px 70px 70px 52px',
    maxWidth: 930,
    width: 460,
    '@media (max-width: 576px)': {
      padding: '30px 15px',
      maxWidth: '100%',
      margin: '15px',
    },
  },
})

const languages = [
  { label: 'English', value: 'en' },
  { label: 'Russian', value: 'ru' },
  { label: 'Uzbek', value: 'uz' },
]
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
const time_zones = [{ label: 'GTM+5', value: 'gtm' }]

export default function PreferencesModal({ open, handleClose }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const [values, setValues] = useState({
    language: '',
    currency: '',
    time_zone: 'gtm',
  })

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  const { locale } = useRouter()

  return (
    <CenteredDialog onClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          paddingBottom: matches ? 5 : 4,
          borderBottom: 'none',
          fontSize: matches ? '50px !important' : '28px !important',
        }}
      >
        {common[locale].preferences}
      </DialogTitle>

      <div className={cls.formWrapper}>
        <Typography
          variant='h2'
          sx={{
            fontSize: matches ? 28 : 20,
            lineHeight: '32px',
            fontWeight: 500,
          }}
        >
          {common[locale].Generel_settings}
        </Typography>
        <Box mt={1.5} />
        <FilterButton
          label='Preferred language'
          name='language'
          value={values.language}
          list={languages}
          handleChange={handleChange}
        />
        <Box mt={1.5} />
        <FilterButton
          label='Preferred currency'
          name='currency'
          value={values.currency}
          list={currencies}
          handleChange={handleChange}
        />
        <Box mt={1.5} />
        <FilterButton
          label='Time zone'
          name='time_zone'
          value={values.time_zone}
          list={time_zones}
          handleChange={handleChange}
        />
      </div>

      <div className={cls.actions}>
        <Button variant='outlined' onClick={handleClose}>
          {common[locale].cancel}
        </Button>
        <Button
          onClose={handleClose}
          variant='contained'
          sx={{
            backgroundColor: 'common.green',
            '&:hover': {
              backgroundColor: 'common.green',
            },
          }}
        >
          {common[locale].save}
        </Button>
      </div>
    </CenteredDialog>
  )
}
