import React from 'react'
import { Typography } from '@mui/material'
import cls from './houseRules.module.scss'
import {
  ChildrenIcon,
  ClockIcon,
  PetsIcon,
  WalletIcon,
} from '../icons/commonIcons'
import { navigation } from '../../locales/navigation'
import { useRouter } from 'next/router'
import { common } from '../../locales/common'

export default function HouseRules({ data }) {
  const { locale } = useRouter()

  return (
    <div id='rules' className={cls.root}>
      <Typography variant='h6'>{navigation[locale].house_rules}</Typography>
      <div className={cls.wrapper}>
        <div className={cls.row}>
          <div className={cls.item}>
            <ClockIcon />
            <Typography variant='body2'>{common[locale].check_in}</Typography>
          </div>
          <div className={cls.item}>
            <Typography variant='body2'>
              {data.check_in?.map((item) => item.replace(':', '.')).join('/')}
            </Typography>
          </div>
        </div>
        <div className={cls.row}>
          <div className={cls.item}>
            <ClockIcon />
            <Typography variant='body2'>{common[locale].check_out}</Typography>
          </div>
          <div className={cls.item}>
            <Typography variant='body2'>
              {data.check_out?.map((item) => item.replace(':', '.')).join('/')}
            </Typography>
          </div>
        </div>

        <div className={cls.row}>
          <div className={cls.item}>
            <WalletIcon />
            <Typography variant='body2'>
              {common[locale].cancellation_prepayment}
            </Typography>
          </div>
          <div className={cls.item}>
            <Typography
              variant='body2'
              dangerouslySetInnerHTML={{
                __html: data.translation?.cancellation,
              }}
            />
          </div>
        </div>

        <div className={cls.row}>
          <div className={cls.item}>
            <ChildrenIcon />
            <Typography variant='body2'>
              {common[locale].children_beds}
            </Typography>
          </div>
          <div className={cls.item}>
            <Typography
              variant='body2'
              dangerouslySetInnerHTML={{
                __html: data.translation?.children_and_beds,
              }}
            />
          </div>
        </div>

        <div className={cls.row}>
          <div className={cls.item}>
            <PetsIcon />
            <Typography variant='body2'>{common[locale].pets}</Typography>
          </div>
          <div className={cls.item}>
            <Typography
              variant='body2'
              dangerouslySetInnerHTML={{
                __html: data.translation?.allowed,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
