import React from 'react'
import { Typography } from '@mui/material'
import { ArrowDown } from '../icons/commonIcons'
import cls from './blogItem.module.scss'
import { useRouter } from 'next/router'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { BASE_URL } from 'constants/env'
import { common2 } from 'locales/common2'
import Link from 'next/link'

export default function BlogItem({ item }) {
  const { locale } = useRouter()

  return (
    <div className={cls.card}>
      <Link
        href={{ pathname: `/blog/${item?.alias}`, query: { index: item.id } }}
      >
        <a className={cls.imageContainer}>
          <LazyLoadImage
            src={
              BASE_URL +
              item?.galleries?.find((item) =>
                item.cover_type == 1 ? 1 : item.position === 'main'
              )?.path
            }
            alt={item.translation?.title}
          />
          <div className={cls.user}>
            <img src='/favicon.png' alt='user' />
            <span className={cls.name}>Damda.uz</span>
          </div>
        </a>
      </Link>

      <Link
        href={{ pathname: `/blog/${item?.alias}`, query: { index: item.id } }}
      >
        <a>
          <h3 className={cls.title}>{item.translation?.title}</h3>
        </a>
      </Link>
      <Typography
        className={cls.description}
        dangerouslySetInnerHTML={{
          __html: item.translation?.short_description,
        }}
      />
      <Link
        href={{ pathname: `/blog/${item?.alias}`, query: { index: item.id } }}
      >
        <a className={cls.link}>
          {common2[locale].more}
          <ArrowDown />
        </a>
      </Link>
    </div>
  )
}
