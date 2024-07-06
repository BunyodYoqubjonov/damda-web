import React from 'react'
import cmd from './privacy.module.scss'
import cls from '../aboutUs/aboutUs.module.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { common } from 'locales/common'
import { Typography } from '@mui/material'
import { navigation } from 'locales/navigation'
import { useRouter } from 'next/router'

export default function Privacy({ data }) {
  const { locale } = useRouter()

  return (
    <div className={cmd.container}>
      <div className={cls.hero}>
        <div className={cls.imgWrapper}>
          <LazyLoadImage alt='About damda' src='/images/about.jpg' />
        </div>
        <p className={cls.caption}>{common[locale].Company}</p>
        <Typography variant='h1' className={cls.title}>
          {navigation[locale].privacy_policy}
        </Typography>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
    </div>
  )
}
