import React from 'react'
import { useRouter } from 'next/router'
import cmd from './terms.module.scss'
import cls from '../aboutUs/aboutUs.module.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Typography } from '@mui/material'
import { common } from 'locales/common'
import { navigation } from 'locales/navigation'

export default function TermsConditions({ data }) {
  const { locale } = useRouter()

  return (
    <div className={cmd.container}>
      <div className={cls.hero}>
        <div className={cls.imgWrapper}>
          <LazyLoadImage alt='About damda' src='/images/about.jpg' />
        </div>
        <p className={cls.caption}>{common[locale].Company}</p>
        <Typography variant='h1' className={cls.title}>
          {navigation[locale].terms}
        </Typography>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
    </div>
  )
}
