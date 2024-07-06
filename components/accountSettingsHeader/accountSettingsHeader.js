import React from 'react'
import { useRouter } from 'next/router'
import { Container } from '@mui/system'
import { Typography } from '@mui/material'
import cls from './accountSettingsHeader.module.scss'
import { common } from '../../locales/common'
import { numberToPrice } from '../../utils/numberToPrice'

export default function AccountSettingsHeader({ data }) {
  const { locale } = useRouter()

  return (
    <div className={cls.root}>
      <Container>
        <div className={cls.header}>
          <div className={cls.item}>
            <Typography className={cls.title}>
              {data?.firstname} {data?.lastname}
            </Typography>
            <Typography className={cls.subtitle}>
              {data?.email ? (
                <>
                  {data?.email}
                  <span className={cls.separator} />
                </>
              ) : (
                ''
              )}
              {data?.phone ? data?.phone : ''}
            </Typography>
          </div>
          <div className={cls.item}>
            <div className={cls.btnWrapper}>
              <div>
                <Typography variant='caption' className={cls.caption}>
                  {common[locale].your_wallet}
                </Typography>
                <Typography sx={{ fontWeight: 500 }} className={cls.price}>
                  {numberToPrice(data?.wallet?.price, locale)}
                </Typography>
              </div>
              {/* <button className={cls.button}>
                <PlusIcon />
              </button> */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
