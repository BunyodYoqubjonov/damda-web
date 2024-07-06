import React from 'react'
import { Typography } from '@mui/material'
import cls from './dachaCreateRules.module.scss'
import {
  ChildrenIcon,
  ClockIcon,
  PetsIcon,
  WalletIcon,
} from '../icons/commonIcons'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import FormEditor from 'components/formEditor'
import { common2 } from 'locales/common2'
import RuleTimes from './ruleTimes'

export default function DachaCreateRules({ valueLang, formik, data }) {
  const { locale } = useRouter()

  return (
    <div id='rules' className={cls.root}>
      <Typography variant='h6'>{common[locale].house_rules}</Typography>
      <div className={cls.wrapper}>
        <div className={cls.row}>
          <div className={cls.item}>
            <ClockIcon />
            <Typography variant='body2'>{common[locale].check_in}</Typography>
          </div>
          <div className={cls.item}>
            <RuleTimes formik={formik} name='check_in' />
          </div>
        </div>
        <div className={cls.row}>
          <div className={cls.item}>
            <ClockIcon />
            <Typography variant='body2'>{common[locale].check_out}</Typography>
          </div>
          <div className={cls.item}>
            <RuleTimes formik={formik} name='check_out' />
          </div>
        </div>

        <div className={cls.row}>
          <div className={cls.item}>
            <WalletIcon />
            <Typography variant='body2'>
              {common[locale].cancellation_prepayment} ({valueLang})
            </Typography>
          </div>
          <div className={cls.item}>
            <FormEditor
              name='cancellation'
              valueLang={valueLang}
              formik={formik}
            />
            {/* <IconButton>
              <TimesIcon />
            </IconButton> */}
          </div>
        </div>

        <div className={cls.row}>
          <div className={cls.item}>
            <ChildrenIcon />
            <Typography variant='body2'>
              {common[locale].children_beds} ({valueLang})
            </Typography>
          </div>
          <div className={cls.item}>
            <FormEditor
              name='children_and_beds'
              valueLang={valueLang}
              formik={formik}
            />
          </div>
        </div>

        <div className={cls.row}>
          <div className={cls.item}>
            <PetsIcon />
            <Typography variant='body2'>
              {common[locale].pets} ({valueLang})
            </Typography>
          </div>
          <div className={cls.item}>
            <FormEditor name='allowed' valueLang={valueLang} formik={formik} />
          </div>
        </div>
      </div>
    </div>
  )
}
