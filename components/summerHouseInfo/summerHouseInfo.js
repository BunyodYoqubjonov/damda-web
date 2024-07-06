import React from 'react'
import { Button, Typography } from '@mui/material'
import cls from './summerHouseInfo.module.scss'
import { Container } from '@mui/system'
import { cooperation } from 'locales/cooperation'
import { useRouter } from 'next/router'

export default function SummerHouseInfo({ title, content }) {
  const { locale } = useRouter()

  return (
    <div className={cls.root}>
      <Container>
        <div className={cls.hero}>
          <div className={cls.imgWrapper}>
            <img src='/images/about.jpg' alt='Summer house' />
          </div>
          <p className={cls.caption}>{cooperation[locale].caption}</p>
          <Typography variant='h1' className={cls.title}>
            {title}
          </Typography>
        </div>
        <div className={cls.content}>
          <Typography dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <div className={cls.card}>
          <Typography variant='h4' className={cls.title}>
            {cooperation[locale].any_questions}
          </Typography>
          <div className={cls.actions}>
            <Button variant='contained' href='tel:+998971008040'>
              {cooperation[locale].contact}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
