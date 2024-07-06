import React from 'react'
import Loading from '.'
import cls from './loading.module.scss'

export default function PageLoading() {
  return (
    <div className={cls.pageLoading}>
      <Loading />
    </div>
  )
}
