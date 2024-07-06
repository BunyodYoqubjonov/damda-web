import React from 'react'
import cls from './guideList.module.scss'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

const NotFountText = () => {
  const { locale } = useRouter()
  return (
    <div className={cls.content}>
      <p>{common[locale].not_found_text1}</p>
      <p>{common[locale].not_found_text2}</p>
      <p>{common[locale].not_found_text3}</p>
    </div>
  )
}

export default NotFountText
