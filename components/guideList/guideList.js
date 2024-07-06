import React from 'react'
import { CircularProgress, Container, Grid, useMediaQuery } from '@mui/material'
import cls from './guideList.module.scss'
import dynamic from 'next/dynamic'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import NotFountText from './notFountText'
import GuideCardVertical2 from '../guideCardVertical/guideCardVertical2'
import GuideFilters from '../guideFilters/guideFilters'

const GuideCard = dynamic(() => import('../GuideCard/guideCard'))

export default function GuideList({
  searchTerm,
  setSearchTerm,
  setValues,
  values,
  setDays,
  setPrice,
  list,
  page,
  pageSize,
  lastPage,
  clearFilter,
  days,
  price,
  fetchResidences,
  loading,
  params,
}) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const { locale } = useRouter()

  return (
    <Container>
      <div className={cls.root}>
        <Grid container spacing={3}>
          {matches && (
            <Grid item xs={12} md={3}>
              <GuideFilters
                values={values}
                setValues={setValues}
                clearFilter={clearFilter}
                days={days}
                setDays={setDays}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                price={price}
                setPrice={setPrice}
                params={params}
              />
            </Grid>
          )}
          {values?.layout === 'horizontal' ? (
            <Grid item xs={12} md={9}>
              {list?.map((item) => (
                <GuideCard key={item?.id} data={item} />
              ))}
              {page !== lastPage ? (
                <button
                  className={cls.loadMoreBtn}
                  onClick={() => fetchResidences(page + 1, pageSize)}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress color='inherit' size={22} />
                  ) : (
                    common[locale].view_more
                  )}
                </button>
              ) : (
                ''
              )}
              <NotFountText />
            </Grid>
          ) : (
            ' '
          )}
          {values.layout === 'vertical' ? (
            <Grid container xs={12} md={9} mt={3}>
              {list?.map((item, index) => (
                <Grid
                  key={index + item?.id + item.translation?.title}
                  item
                  xs={11}
                  sm={6}
                  md={4}
                  mb={3}
                >
                  <GuideCardVertical2 data={item} />
                </Grid>
              ))}
              {page !== lastPage ? (
                <button
                  className={cls.loadMoreBtn}
                  onClick={() => fetchResidences(page + 1, pageSize)}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress color='inherit' size={22} />
                  ) : (
                    common[locale].view_more
                  )}
                </button>
              ) : (
                ''
              )}
              <div style={{ marginLeft: '24px' }}>
                <NotFountText />
              </div>
            </Grid>
          ) : (
            ' '
          )}
        </Grid>
      </div>
    </Container>
  )
}
