import React from 'react'
import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material'
import { common } from 'locales/common'
import cls from './loadMoreBtn.module.scss'

export default function LoadMoreBtn({
  loading = false,
  fetchData = () => {},
  page = 1,
}) {
  const { locale } = useRouter()

  return (
    <button
      className={cls.loadMoreBtn}
      onClick={() => fetchData(page + 1)}
      disabled={loading}
    >
      {loading ? (
        <CircularProgress color='inherit' size={22} />
      ) : (
        common[locale].view_more
      )}
    </button>
  )
}
