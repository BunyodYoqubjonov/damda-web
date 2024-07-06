import React from 'react'
import cls from './hotelsList.module.scss'
import { meta } from '../../locales/meta'
import { useRouter } from 'next/router'

const NotFountText = () => {
  const { locale } = useRouter()
  return (
    <div className={cls.content}>
      <p>{meta[locale].not_found_text}</p>
    </div>
  )
}

export default NotFountText
