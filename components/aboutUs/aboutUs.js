import React from 'react'
import { Button, Typography } from '@mui/material'
import cls from './aboutUs.module.scss'
import { Container } from '@mui/system'
import { useRouter } from 'next/router'
import { common } from '../../locales/common'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function AboutUs() {
  const router = useRouter()
  const { locale } = useRouter()
  return (
    <div className={cls.root}>
      <Container>
        <div className={cls.hero}>
          <div className={cls.imgWrapper}>
            <LazyLoadImage alt='About damda' src='/images/about.jpg' />
          </div>
          <p className={cls.caption}>{common[locale].Company}</p>
          <Typography variant='h1' className={cls.title}>
            {common[locale].About_us}
          </Typography>
        </div>
        <div className={cls.content}>
          <Typography>{common[locale].about1}</Typography>
        </div>
        <div className={cls.content}>
          <Typography>{common[locale].about2}</Typography>
        </div>
        <div className={cls.content}>
          <Typography>{common[locale].about3}</Typography>
        </div>

        <div className={cls.content}>
          <Typography>{common[locale].about4}</Typography>
        </div>

        <div className={cls.content}>
          <Typography>{common[locale].about5}</Typography>
        </div>

        <div className={cls.content}>
          <Typography>
            {common[locale].link1} -{' '}
            <a href='https://medplaza.uz/' target='_blank' rel='noreferrer'>
              https://medplaza.uz/
            </a>{' '}
            and{' '}
            <a href='https://gomart.uz/ru/' target='_blank' rel='noreferrer'>
              https://gomart.uz/ru/
            </a>
          </Typography>
        </div>

        <div className={cls.card}>
          <Typography variant='h4' className={cls.title}>
            {common[locale].textAbout1}
          </Typography>
          <div className={cls.actions}>
            <Button variant='contained' onClick={() => router.push('/login')}>
              {common[locale].login_text}
            </Button>
            <Button variant='outlined' onClick={() => router.push('/hotels')}>
              {common[locale].about_text}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
