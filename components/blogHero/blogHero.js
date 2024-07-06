import React from 'react'
import { Container } from '@mui/system'
import cls from './blogHero.module.scss'
import { Typography } from '@mui/material'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import { common2 } from 'locales/common2'

export default function BlogHero() {
  const { locale } = useRouter()

  return (
    <div className={cls.root}>
      <Container>
        <div className={cls.hero}>
          <div className={cls.imgWrapper}>
            <img src='/images/blog.jpg' alt='Recommended' />
          </div>
          <p className={cls.caption}>{common[locale].Recommendation}</p>
          <Typography variant='h1' className={cls.title}>
            {common2[locale].blog_text}
          </Typography>
        </div>
      </Container>
    </div>
  )
}
