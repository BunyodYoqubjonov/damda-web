import React from 'react'
import { useRouter } from 'next/router'
import cls from './dachaCreateAbout.module.scss'
import { common } from 'locales/common'
import FormEditor from 'components/formEditor'
import { Typography } from '@mui/material'

export default function DachaCreateAbout({ valueLang, formik, error }) {
  const { locale } = useRouter()

  return (
    <div id='about' className={cls.container}>
      <Typography variant='h6'>
        {common[locale].about_summer_house} ({valueLang})
      </Typography>
      <div className={cls.space} />
      <FormEditor
        name='description'
        label={common[locale].about_summer_house}
        valueLang={valueLang}
        formik={formik}
        error={error}
      />
    </div>
  )
}
