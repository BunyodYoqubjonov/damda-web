import React from 'react'
import cls from './pagination.module.scss'
import {
  Pagination as MuiPagination,
  PaginationItem,
  useMediaQuery,
} from '@mui/material'
import { useRouter } from 'next/router'
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from '@mui/icons-material'
import { common2 } from '../../locales/common2'

export default function Pagination({
  total = 0,
  page = 0,
  handleChange = () => {},
}) {
  const { locale } = useRouter()
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const Prev = () =>
    matches ? (
      <div>{common2[locale].prev_short}</div>
    ) : (
      <ArrowBackIosNewOutlined fontSize='14px' />
    )
  const Next = () =>
    matches ? (
      <div>{common2[locale].next_short}</div>
    ) : (
      <ArrowForwardIosOutlined fontSize='14px' />
    )

  return (
    <div className={cls.root}>
      {total !== 1 && (
        <MuiPagination
          variant='outlined'
          shape='rounded'
          count={total}
          page={page}
          size={matches ? 'medium' : 'small'}
          boundaryCount={matches ? 2 : 1}
          onChange={handleChange}
          renderItem={(item) => (
            <PaginationItem
              components={{ previous: Prev, next: Next }}
              {...item}
            />
          )}
        />
      )}
    </div>
  )
}
