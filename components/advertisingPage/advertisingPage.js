import React from 'react'
import { Button, Typography } from '@mui/material'
import cls from './advertisingPage.module.scss'
import { Container } from '@mui/system'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function AdvertisingPage() {
  const { locale } = useRouter()
  const sendTelegram = () => window.open(`https://t.me/damdauz`)
  return (
    <div className={cls.root}>
      <Container>
        <div className={cls.hero}>
          <div className={cls.imgWrapper}>
            <LazyLoadImage alt='About damda' src='/images/about.jpg' />
          </div>
          <p className={cls.caption}>{common[locale].Support}</p>
          <Typography variant='h1' className={cls.title}>
            {common[locale].Advertising}
          </Typography>
        </div>
        <div className={cls.content}>
          <Typography>{common[locale].AdvertisingText}</Typography>
        </div>

        <div className={cls.card}>
          <Typography variant='h4' className={cls.title}>
            {common[locale].AdvertisingText2}
          </Typography>
          <div className={cls.actions}>
            <Button variant='contained' href='tel:+998971008040'>
              +998 97 100 80 40
            </Button>
            <Button variant='outlined' href='mailto:info@damda.uz'>
              E-mail
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
