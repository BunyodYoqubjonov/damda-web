import React, { useState } from 'react'
import cls from './dachaSingle.module.scss'
import Link from 'next/link'
import { Container } from '@mui/system'
import { Button, Grid, Typography, useMediaQuery } from '@mui/material'
import {
  Calendar,
  InformationIcon,
  WalletIcon,
  PaymentIcon,
  CrownIcon,
} from '../icons/commonIcons'
import AdvertisingModal from '../advertisingModal/advertisingModal'
import { common2 } from 'locales/common2'
import { useRouter } from 'next/router'
import { common } from 'locales/common'
import { toast } from 'react-toastify'
import differenceInDays from 'date-fns/differenceInDays'
import { parse } from 'date-fns'

export default function DachaSingle({ data }) {
  const { locale } = useRouter()
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const [openAdvertising, setOpenAdvertising] = useState(false)
  console.log(data)

  const handleOpenAdvertising = () => {
    if(data.active === 0 && status !== 'approved') {
      return toast.error(common[locale].you_need_to_activate_recidence);
    }
    setOpenAdvertising(true)
  }

  const handleCloseAdvertising = () => {
    setOpenAdvertising(false)
  }

  const subscriptionExpireDate = data?.subscription ? parse(data?.subscription.expired_at, "yyyy/MM/dd", new Date()) : new Date();

  const isSubscriptionExpired = differenceInDays(subscriptionExpireDate, new Date) < 0 || !data?.subscription;

  return (
    <div className={cls.root}>
      <Container>
        <div className={cls.header}>
          <Typography variant='h2' className={cls.title}>
            {data?.translation?.title}
            {!isSubscriptionExpired ? <CrownIcon className={cls.crownIcon} /> : ''}
          </Typography>
          {!isSubscriptionExpired ? (
            <div className={cls.subscription}>
              <span className={cls.text}>
                {common2[locale].your_tariff_plan}:
              </span>
              <span className={cls.tariff}>
                {data?.subscription?.translation?.title}
              </span>
              <span className={cls.iconWrapper}>
                <img src='/icons/crown.png' alt='crown' />
              </span>
            </div>
          ) : (
            <Button
              variant='contained'
              sx={{
                backgroundColor: 'common.green',
                '&:hover': {
                  backgroundColor: 'common.green',
                },
              }}
              onClick={handleOpenAdvertising}
            >
              {common2[locale].advertising}
            </Button>
          )}
        </div>
        <Grid container columnSpacing={4} rowSpacing={matches ? 3 : 1.5} mt={0}>
          <Grid item xs={12} sm={6} md={3}>
            <Link href={`/account/dacha/${data.id}/edit`}>
              <a className={cls.wrapper}>
                <div className={cls.iconWrapper}>
                  <InformationIcon />
                </div>
                <Typography sx={{ fontWeight: 500, mb: 1.5 }}>
                  {common2[locale].information}
                </Typography>
                <Typography variant='body2' sx={{ color: 'secondary.main' }}>
                  {common2[locale].information_desc}
                </Typography>
              </a>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Link href={`/account/dacha/${data.id}/price-orders`}>
              <a className={cls.wrapper}>
                <div className={cls.iconWrapper}>
                  <WalletIcon />
                </div>
                <Typography sx={{ fontWeight: 500, mb: 1.5 }}>
                  {common[locale].Price_orders}
                </Typography>
                <Typography variant='body2' sx={{ color: 'secondary.main' }}>
                  {common2[locale].price_orders_desc}
                </Typography>
              </a>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Link href={`/account/dacha/${data.id}/reserve?tab=${data.id}`}>
              <a className={cls.wrapper}>
                <div className={cls.iconWrapper}>
                  <Calendar />
                </div>
                <Typography sx={{ fontWeight: 500, mb: 1.5 }}>
                  {common[locale].reserve}
                </Typography>
                <Typography variant='body2' sx={{ color: 'secondary.main' }}>
                  {common2[locale].reserve_desc}
                </Typography>
              </a>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Link href={`/account/dacha/${data.id}/subscriptions`}>
              <a className={cls.wrapper}>
                <div className={cls.iconWrapper}>
                  <PaymentIcon />
                </div>
                <Typography sx={{ fontWeight: 500, mb: 1.5 }}>
                  {common2[locale].subscriptions}
                </Typography>
                <Typography variant='body2' sx={{ color: 'secondary.main' }}>
                  {common2[locale].subscriptions_desc}
                </Typography>
              </a>
            </Link>
          </Grid>
        </Grid>
      </Container>

      <AdvertisingModal
        data={data}
        open={openAdvertising}
        handleClose={handleCloseAdvertising}
      />
    </div>
  )
}
