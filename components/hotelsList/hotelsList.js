import React from 'react'
import { CircularProgress, Container, Grid, useMediaQuery } from '@mui/material'
import cls from './hotelsList.module.scss'
import HotelFilters from '../hotelFilters/hotelFilters'
import dynamic from 'next/dynamic'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import { shallowEqual, useSelector } from 'react-redux'
import NotFountText from './notFountText'
import Pagination from '../pagination/pagination'
import Loading from '../loading'

const HotelCard = dynamic(() => import('../hotelCard/hotelCard'))
const HotelCardVertical2 = dynamic(() =>
  import('../hotelCardVertical/hotelCardVertical2')
)

export default function HotelsList({
  list,
  page,
  lastPage,
  fetchResidences,
  loading,
  loadingBtn,
  facilities,
  setFacilities,
  description,
  handleChangePagination,
  topResidences = [],
}) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const { locale } = useRouter()
  const { layout } = useSelector((state) => state.theme, shallowEqual)

  return (
    <Container>
      <div className={cls.root}>
        <Grid container spacing={3}>
          {matches && (
            <Grid item xs={12} md={3}>
              <HotelFilters
                facilities={facilities}
                setFacilities={setFacilities}
              />
            </Grid>
          )}
          <Grid container item xs={12} md={9} spacing={3}>
            {list.length === 0 && (
              <Grid item xs={12}>
                <NotFountText />
              </Grid>
            )}
            {topResidences.map((item) =>
              layout === 'horizontal' ? (
                <HotelCard key={item?.id} data={item} top />
              ) : (
                <HotelCardVertical2 key={item?.id} data={item} top />
              )
            )}
            {list?.map((item) =>
              layout === 'horizontal' ? (
                <HotelCard key={item?.id} data={item} />
              ) : (
                <HotelCardVertical2 key={item?.id} data={item} />
              )
            )}
            {page !== lastPage ? (
              <Grid item xs={12}>
                <button
                  className={cls.loadMoreBtn}
                  onClick={() => fetchResidences(page + 1)}
                  disabled={loadingBtn}
                >
                  {loadingBtn ? (
                    <CircularProgress color='inherit' size={22} />
                  ) : (
                    common[locale].view_more
                  )}
                </button>
              </Grid>
            ) : (
              ''
            )}
            {lastPage > 1 && (
              <Grid item xs={12}>
                <Pagination
                  total={lastPage}
                  page={page}
                  handleChange={handleChangePagination}
                />
              </Grid>
            )}
            {list.length !== 0 && (
              <Grid item xs={12}>
                <div className={cls.content}>
                  <p>{description}</p>
                </div>
              </Grid>
            )}
            {loading && (
              <div className={cls.loading}>
                <Loading />
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}
